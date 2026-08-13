"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../database");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// 获取所有语言
router.get('/languages', (_req, res) => {
    try {
        const languages = database_1.db.prepare('SELECT * FROM languages').all();
        res.json(languages);
    }
    catch (err) {
        console.error('Get languages error:', err);
        res.status(500).json({ error: '获取语言列表失败' });
    }
});
// 获取某语言的所有课程
router.get('/courses/:languageId', (req, res) => {
    try {
        const { languageId } = req.params;
        const courses = database_1.db.prepare(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM units u WHERE u.course_id = c.id) as unit_count
      FROM courses c 
      WHERE c.language_id = ? 
      ORDER BY c.order_index ASC
    `).all(languageId);
        res.json(courses);
    }
    catch (err) {
        console.error('Get courses error:', err);
        res.status(500).json({ error: '获取课程列表失败' });
    }
});
// 获取课程详情（含单元）
router.get('/courses/detail/:courseId', auth_1.authMiddleware, (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;
        const course = database_1.db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
        if (!course) {
            res.status(404).json({ error: '课程不存在' });
            return;
        }
        const units = database_1.db.prepare(`
      SELECT u.*,
        (SELECT COUNT(*) FROM words w WHERE w.unit_id = u.id) as word_count,
        (SELECT COUNT(*) FROM grammar_exercises g WHERE g.unit_id = u.id) as grammar_count,
        (SELECT COUNT(*) FROM listening_exercises l WHERE l.unit_id = u.id) as listening_count,
        (SELECT COUNT(*) FROM speaking_exercises s WHERE s.unit_id = u.id) as speaking_count
      FROM units u 
      WHERE u.course_id = ? 
      ORDER BY u.order_index ASC
    `).all(courseId);
        // 获取用户的学习进度
        const unitsWithProgress = units.map(unit => {
            const progress = database_1.db.prepare(`
        SELECT status, score 
        FROM user_progress 
        WHERE user_id = ? AND unit_id = ? AND exercise_type = 'unit'
      `).get(userId, unit.id);
            return {
                ...unit,
                progress: progress || { status: 'not_started', score: 0 },
            };
        });
        res.json({
            ...course,
            units: unitsWithProgress,
        });
    }
    catch (err) {
        console.error('Get course detail error:', err);
        res.status(500).json({ error: '获取课程详情失败' });
    }
});
// 获取单元详情（含所有练习）
router.get('/units/:unitId', auth_1.authMiddleware, (req, res) => {
    try {
        const { unitId } = req.params;
        const userId = req.user.id;
        const unit = database_1.db.prepare('SELECT * FROM units WHERE id = ?').get(unitId);
        if (!unit) {
            res.status(404).json({ error: '单元不存在' });
            return;
        }
        const words = database_1.db.prepare('SELECT * FROM words WHERE unit_id = ? ORDER BY id ASC').all(unitId);
        const grammarExercises = database_1.db.prepare('SELECT * FROM grammar_exercises WHERE unit_id = ? ORDER BY id ASC').all(unitId);
        const listeningExercises = database_1.db.prepare('SELECT * FROM listening_exercises WHERE unit_id = ? ORDER BY id ASC').all(unitId);
        const speakingExercises = database_1.db.prepare('SELECT * FROM speaking_exercises WHERE unit_id = ? ORDER BY id ASC').all(unitId);
        // 获取单词熟练度
        const wordsWithMastery = words.map(word => {
            const mastery = database_1.db.prepare(`
        SELECT mastery_level, correct_count, wrong_count, next_review_at
        FROM user_word_mastery
        WHERE user_id = ? AND word_id = ?
      `).get(userId, word.id);
            return {
                ...word,
                mastery: mastery || { mastery_level: 0, correct_count: 0, wrong_count: 0 },
            };
        });
        res.json({
            ...unit,
            words: wordsWithMastery,
            grammarExercises,
            listeningExercises,
            speakingExercises,
        });
    }
    catch (err) {
        console.error('Get unit detail error:', err);
        res.status(500).json({ error: '获取单元详情失败' });
    }
});
// 个性化学习路径推荐
router.get('/recommendations', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const user = database_1.db.prepare('SELECT target_language, proficiency_level, experience FROM users WHERE id = ?').get(userId);
        if (!user) {
            res.status(404).json({ error: '用户不存在' });
            return;
        }
        // 获取用户当前学习的语言的课程
        const courses = database_1.db.prepare(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM units u WHERE u.course_id = c.id) as unit_count
      FROM courses c 
      WHERE c.language_id = ? 
      ORDER BY c.order_index ASC
    `).all(user.target_language || 'en');
        // 获取用户待复习的单词（基于间隔重复）
        const today = new Date().toISOString();
        const reviewWords = database_1.db.prepare(`
      SELECT w.*, uwm.next_review_at, l.name as language_name
      FROM user_word_mastery uwm
      JOIN words w ON uwm.word_id = w.id
      JOIN units u ON w.unit_id = u.id
      JOIN courses c ON u.course_id = c.id
      JOIN languages l ON c.language_id = l.id
      WHERE uwm.user_id = ? AND uwm.next_review_at <= ?
      AND uwm.mastery_level < 5
      ORDER BY uwm.next_review_at ASC
      LIMIT 20
    `).all(userId, today);
        // 获取用户已完成的练习统计
        const stats = database_1.db.prepare(`
      SELECT 
        exercise_type,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM user_progress
      WHERE user_id = ?
      GROUP BY exercise_type
    `).all(userId);
        // 生成每日推荐
        const recommendations = [];
        // 1. 待复习单词推荐
        if (reviewWords.length > 0) {
            recommendations.push({
                type: 'review',
                title: `复习 ${reviewWords.length} 个待复习单词`,
                description: '基于间隔重复算法，这些单词需要复习了',
                icon: '🔄',
                priority: 1,
                data: reviewWords,
            });
        }
        // 2. 推荐下一个未完成的单元
        const progress = database_1.db.prepare(`
      SELECT up.unit_id, up.status
      FROM user_progress up
      WHERE up.user_id = ? AND up.exercise_type = 'unit'
    `).all(userId);
        const completedUnitIds = progress.filter(p => p.status === 'completed').map(p => p.unit_id);
        const inProgressUnitIds = progress.filter(p => p.status === 'in_progress').map(p => p.unit_id);
        for (const course of courses) {
            const units = database_1.db.prepare('SELECT * FROM units WHERE course_id = ? ORDER BY order_index ASC').all(course.id);
            for (const unit of units) {
                if (inProgressUnitIds.includes(unit.id)) {
                    recommendations.push({
                        type: 'continue',
                        title: `继续学习: ${unit.title}`,
                        description: course.title,
                        icon: '📖',
                        priority: 2,
                        unitId: unit.id,
                        courseId: course.id,
                    });
                    break;
                }
                if (!completedUnitIds.includes(unit.id)) {
                    recommendations.push({
                        type: 'next',
                        title: `开始学习: ${unit.title}`,
                        description: course.title,
                        icon: '⭐',
                        priority: 3,
                        unitId: unit.id,
                        courseId: course.id,
                    });
                    break;
                }
            }
            if (recommendations.length >= 3)
                break;
        }
        // 3. 根据薄弱点推荐练习类型
        const statsMap = {};
        stats.forEach(s => {
            statsMap[s.exercise_type] = { total: s.total, completed: s.completed };
        });
        const exerciseTypes = [
            { key: 'grammar', name: '语法练习', icon: '✏️' },
            { key: 'listening', name: '听力训练', icon: '🎧' },
            { key: 'speaking', name: '口语跟读', icon: '🗣️' },
            { key: 'vocabulary', name: '单词记忆', icon: '📚' },
        ];
        for (const et of exerciseTypes) {
            const s = statsMap[et.key] || { total: 0, completed: 0 };
            if (s.completed < 10) {
                recommendations.push({
                    type: 'practice',
                    title: `加强${et.name}训练`,
                    description: '多做练习，提高熟练度',
                    icon: et.icon,
                    priority: 4,
                    exerciseType: et.key,
                });
                break;
            }
        }
        res.json({
            recommendations: recommendations.sort((a, b) => a.priority - b.priority).slice(0, 5),
            reviewWords,
            stats,
        });
    }
    catch (err) {
        console.error('Get recommendations error:', err);
        res.status(500).json({ error: '获取推荐失败' });
    }
});
exports.default = router;
