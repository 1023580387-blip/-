"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAchievements = checkAchievements;
const express_1 = require("express");
const database_1 = require("../database");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// 计算升级所需经验
function getXPForLevel(level) {
    return level * 100;
}
// 检查并解锁成就
function checkAchievements(userId, type, count) {
    const unlocked = [];
    const achievements = database_1.db.prepare(`
    SELECT a.* FROM achievements a 
    WHERE a.condition_type = ? 
    AND a.id NOT IN (SELECT achievement_id FROM user_achievements WHERE user_id = ?)
  `).all(type, userId);
    for (const ach of achievements) {
        if (count >= ach.condition_value) {
            try {
                database_1.db.prepare('INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)').run(userId, ach.id);
                unlocked.push(ach);
                // 发放奖励经验
                if (ach.reward_xp > 0) {
                    addXP(userId, ach.reward_xp);
                }
            }
            catch (e) {
                // 唯一约束冲突，忽略
            }
        }
    }
    return unlocked;
}
// 添加经验值
function addXP(userId, xp) {
    const user = database_1.db.prepare('SELECT level, experience FROM users WHERE id = ?').get(userId);
    if (!user)
        return { leveledUp: false, newLevel: 0 };
    let newXP = user.experience + xp;
    let newLevel = user.level;
    let leveledUp = false;
    while (newXP >= getXPForLevel(newLevel)) {
        newXP -= getXPForLevel(newLevel);
        newLevel++;
        leveledUp = true;
    }
    database_1.db.prepare('UPDATE users SET experience = ?, level = ? WHERE id = ?').run(newXP, newLevel, userId);
    // 检查等级成就
    if (leveledUp) {
        checkAchievements(userId, 'level', newLevel);
    }
    return { leveledUp, newLevel };
}
// 更新每日学习记录
function updateDailyRecord(userId, data) {
    const today = new Date().toISOString().split('T')[0];
    const existing = database_1.db.prepare('SELECT * FROM daily_records WHERE user_id = ? AND study_date = ?').get(userId, today);
    if (existing) {
        database_1.db.prepare(`
      UPDATE daily_records SET 
        xp_earned = xp_earned + ?,
        words_studied = words_studied + ?,
        minutes_spent = minutes_spent + ?,
        exercises_completed = exercises_completed + ?
      WHERE user_id = ? AND study_date = ?
    `).run(data.xp || 0, data.words || 0, data.minutes || 0, data.exercises || 0, userId, today);
    }
    else {
        database_1.db.prepare(`
      INSERT INTO daily_records (user_id, study_date, xp_earned, words_studied, minutes_spent, exercises_completed)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, today, data.xp || 0, data.words || 0, data.minutes || 0, data.exercises || 0);
    }
}
// 更新或插入学习进度
function upsertProgress(userId, data) {
    const existing = database_1.db.prepare(`
    SELECT * FROM user_progress 
    WHERE user_id = ? 
    AND COALESCE(course_id, 0) = COALESCE(?, 0)
    AND COALESCE(unit_id, 0) = COALESCE(?, 0)
    AND COALESCE(word_id, 0) = COALESCE(?, 0)
    AND exercise_type = ?
  `).get(userId, data.courseId || null, data.unitId || null, data.wordId || null, data.exerciseType);
    if (existing) {
        database_1.db.prepare(`
      UPDATE user_progress SET 
        status = ?,
        score = ?,
        attempts = attempts + 1,
        last_studied_at = CURRENT_TIMESTAMP,
        completed_at = CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE completed_at END
      WHERE id = ?
    `).run(data.status, data.score || existing.score || 0, data.status, existing.id);
    }
    else {
        database_1.db.prepare(`
      INSERT INTO user_progress (user_id, course_id, unit_id, word_id, exercise_type, status, score, attempts, last_studied_at, completed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CASE WHEN ? = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END)
    `).run(userId, data.courseId || null, data.unitId || null, data.wordId || null, data.exerciseType, data.status, data.score || 0, data.status);
    }
}
// 记录单词学习结果
router.post('/word-result', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const { wordId, isCorrect, unitId } = req.body;
        if (!wordId) {
            res.status(400).json({ error: '缺少单词ID' });
            return;
        }
        // 更新单词熟练度
        const existing = database_1.db.prepare('SELECT * FROM user_word_mastery WHERE user_id = ? AND word_id = ?').get(userId, wordId);
        let masteryLevel = 0;
        let correctCount = 0;
        let wrongCount = 0;
        if (existing) {
            masteryLevel = existing.mastery_level;
            correctCount = existing.correct_count;
            wrongCount = existing.wrong_count;
        }
        if (isCorrect) {
            correctCount++;
            masteryLevel = Math.min(masteryLevel + 1, 5);
        }
        else {
            wrongCount++;
            masteryLevel = Math.max(masteryLevel - 1, 0);
        }
        // 间隔重复：基于掌握级别计算下次复习时间
        const intervals = [0, 1, 2, 4, 7, 14]; // 天数
        const nextReviewDays = intervals[masteryLevel] || 0;
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + nextReviewDays);
        if (existing) {
            database_1.db.prepare(`
        UPDATE user_word_mastery SET
          mastery_level = ?,
          correct_count = ?,
          wrong_count = ?,
          last_reviewed_at = CURRENT_TIMESTAMP,
          next_review_at = ?
        WHERE id = ?
      `).run(masteryLevel, correctCount, wrongCount, nextReviewDate.toISOString(), existing.id);
        }
        else {
            database_1.db.prepare(`
        INSERT INTO user_word_mastery (user_id, word_id, mastery_level, correct_count, wrong_count, last_reviewed_at, next_review_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
      `).run(userId, wordId, masteryLevel, correctCount, wrongCount, nextReviewDate.toISOString());
        }
        // 记录进度和奖励
        const xp = isCorrect ? 5 : 2;
        upsertProgress(userId, {
            wordId,
            unitId: unitId || null,
            exerciseType: 'vocabulary',
            status: masteryLevel >= 3 ? 'completed' : 'in_progress',
            score: masteryLevel,
        });
        addXP(userId, xp);
        updateDailyRecord(userId, { xp, words: 1 });
        // 检查词汇成就
        const totalWords = database_1.db.prepare(`
      SELECT COUNT(*) as count FROM user_word_mastery 
      WHERE user_id = ? AND mastery_level >= 3
    `).get(userId);
        const achUnlocked = checkAchievements(userId, 'words', totalWords.count || 0);
        // 检查练习总数成就
        const totalExercises = database_1.db.prepare(`
      SELECT COUNT(*) as count FROM user_progress 
      WHERE user_id = ? AND status = 'completed'
    `).get(userId);
        const achExercises = checkAchievements(userId, 'exercises', totalExercises.count || 0);
        res.json({
            success: true,
            masteryLevel,
            xpEarned: xp,
            nextReviewAt: nextReviewDate.toISOString(),
            achievements: [...achUnlocked, ...achExercises],
        });
    }
    catch (err) {
        console.error('Word result error:', err);
        res.status(500).json({ error: '记录学习结果失败' });
    }
});
// 记录练习结果（语法/听力/口语）
router.post('/exercise-result', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const { exerciseType, unitId, isCorrect, score } = req.body;
        if (!exerciseType) {
            res.status(400).json({ error: '缺少练习类型' });
            return;
        }
        const validTypes = ['grammar', 'listening', 'speaking'];
        if (!validTypes.includes(exerciseType)) {
            res.status(400).json({ error: '无效的练习类型' });
            return;
        }
        const xpEarned = (score || (isCorrect ? 100 : 0)) / 20; // 5 XP for 100% score
        const finalXP = Math.max(Math.round(xpEarned), isCorrect ? 3 : 1);
        upsertProgress(userId, {
            unitId: unitId || null,
            exerciseType,
            status: (score || 0) >= 80 ? 'completed' : 'in_progress',
            score: score || (isCorrect ? 100 : 0),
        });
        const levelResult = addXP(userId, finalXP);
        updateDailyRecord(userId, { xp: finalXP, exercises: 1 });
        // 检查成就
        const achievements = [];
        const totalByType = database_1.db.prepare(`
      SELECT COUNT(*) as count FROM user_progress 
      WHERE user_id = ? AND exercise_type = ? AND status = 'completed'
    `).get(userId, exerciseType);
        achievements.push(...checkAchievements(userId, exerciseType, totalByType.count || 0));
        const totalExercises = database_1.db.prepare(`
      SELECT COUNT(*) as count FROM user_progress 
      WHERE user_id = ? AND status = 'completed'
    `).get(userId);
        achievements.push(...checkAchievements(userId, 'exercises', totalExercises.count || 0));
        // 检查连续学习天数成就
        const user = database_1.db.prepare('SELECT streak_days FROM users WHERE id = ?').get(userId);
        if (user) {
            achievements.push(...checkAchievements(userId, 'streak', user.streak_days || 0));
        }
        res.json({
            success: true,
            xpEarned: finalXP,
            leveledUp: levelResult.leveledUp,
            newLevel: levelResult.newLevel,
            achievements,
        });
    }
    catch (err) {
        console.error('Exercise result error:', err);
        res.status(500).json({ error: '记录练习结果失败' });
    }
});
// 完成单元
router.post('/complete-unit', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const { unitId, courseId } = req.body;
        if (!unitId) {
            res.status(400).json({ error: '缺少单元ID' });
            return;
        }
        upsertProgress(userId, {
            courseId: courseId || null,
            unitId,
            exerciseType: 'unit',
            status: 'completed',
            score: 100,
        });
        const xpEarned = 50;
        const levelResult = addXP(userId, xpEarned);
        updateDailyRecord(userId, { xp: xpEarned });
        // 检查连续学习
        const today = new Date().toISOString().split('T')[0];
        const user = database_1.db.prepare('SELECT last_study_date, streak_days FROM users WHERE id = ?').get(userId);
        if (user.last_study_date !== today) {
            let newStreak = user.streak_days;
            if (user.last_study_date) {
                const diffDays = Math.floor((new Date(today).getTime() - new Date(user.last_study_date).getTime()) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    newStreak++;
                }
                else if (diffDays > 1) {
                    newStreak = 1;
                }
            }
            else {
                newStreak = 1;
            }
            database_1.db.prepare('UPDATE users SET last_study_date = ?, streak_days = ? WHERE id = ?').run(today, newStreak, userId);
            const achStreak = checkAchievements(userId, 'streak', newStreak);
            res.json({
                success: true,
                xpEarned,
                leveledUp: levelResult.leveledUp,
                newLevel: levelResult.newLevel,
                newStreak,
                achievements: achStreak,
            });
            return;
        }
        res.json({
            success: true,
            xpEarned,
            leveledUp: levelResult.leveledUp,
            newLevel: levelResult.newLevel,
        });
    }
    catch (err) {
        console.error('Complete unit error:', err);
        res.status(500).json({ error: '完成单元失败' });
    }
});
// 获取用户学习统计
router.get('/stats', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const user = database_1.db.prepare('SELECT level, experience, streak_days, daily_goal FROM users WHERE id = ?').get(userId);
        if (!user) {
            res.status(404).json({ error: '用户不存在' });
            return;
        }
        // 总练习完成数
        const progressSummary = database_1.db.prepare(`
      SELECT exercise_type, 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        AVG(score) as avg_score
      FROM user_progress 
      WHERE user_id = ?
      GROUP BY exercise_type
    `).all(userId);
        // 单词统计
        const wordStats = database_1.db.prepare(`
      SELECT 
        COUNT(*) as total_words,
        SUM(CASE WHEN mastery_level >= 5 THEN 1 ELSE 0 END) as mastered_words,
        SUM(CASE WHEN mastery_level >= 3 THEN 1 ELSE 0 END) as familiar_words,
        SUM(correct_count) as total_correct,
        SUM(wrong_count) as total_wrong
      FROM user_word_mastery 
      WHERE user_id = ?
    `).get(userId);
        // 最近7天学习记录
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        const weekDate = sevenDaysAgo.toISOString().split('T')[0];
        const weeklyRecords = database_1.db.prepare(`
      SELECT study_date, xp_earned, words_studied, minutes_spent, exercises_completed
      FROM daily_records
      WHERE user_id = ? AND study_date >= ?
      ORDER BY study_date ASC
    `).all(userId, weekDate);
        // 今日进度
        const today = new Date().toISOString().split('T')[0];
        const todayRecord = database_1.db.prepare('SELECT * FROM daily_records WHERE user_id = ? AND study_date = ?').get(userId, today);
        // 成就统计
        const achievementStats = database_1.db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM user_achievements ua WHERE ua.user_id = ?) as unlocked,
        (SELECT COUNT(*) FROM achievements) as total
    `).get(userId);
        // 排行榜
        const leaderboard = database_1.db.prepare(`
      SELECT u.id, u.username, u.avatar, u.level, u.experience, u.streak_days,
        (SELECT COUNT(*) FROM user_achievements ua WHERE ua.user_id = u.id) as achievement_count
      FROM users u
      ORDER BY (u.level * 1000 + u.experience) DESC
      LIMIT 10
    `).all();
        const userRank = database_1.db.prepare(`
      WITH ranked_users AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY (level * 1000 + experience) DESC) as rank
        FROM users
      )
      SELECT rank FROM ranked_users WHERE id = ?
    `).get(userId);
        res.json({
            user: {
                level: user.level,
                experience: user.experience,
                xpForNextLevel: getXPForLevel(user.level),
                streakDays: user.streak_days,
                dailyGoal: user.daily_goal,
            },
            progressSummary,
            wordStats,
            weeklyRecords,
            todayRecord: todayRecord || { xp_earned: 0, words_studied: 0, minutes_spent: 0, exercises_completed: 0 },
            achievementStats,
            leaderboard,
            userRank: userRank?.rank || null,
        });
    }
    catch (err) {
        console.error('Get stats error:', err);
        res.status(500).json({ error: '获取学习统计失败' });
    }
});
exports.default = router;
