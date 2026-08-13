"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../database");
const auth_1 = require("../middleware/auth");
const learning_1 = require("./learning");
const router = (0, express_1.Router)();
// 获取帖子列表
router.get('/', auth_1.authMiddleware, (req, res) => {
    try {
        const { languageId, category, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        const params = [];
        const whereClauses = [];
        if (languageId) {
            whereClauses.push('p.language_id = ?');
            params.push(languageId);
        }
        if (category) {
            whereClauses.push('p.category = ?');
            params.push(category);
        }
        const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
        const posts = database_1.db.prepare(`
      SELECT p.*, 
        u.username, 
        u.avatar, 
        u.level,
        l.name as language_name,
        l.flag as language_flag,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN languages l ON p.language_id = l.id
      ${whereSQL}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);
        const total = database_1.db.prepare(`
      SELECT COUNT(*) as count FROM posts p ${whereSQL}
    `).get(...params);
        res.json({
            posts,
            total: total?.count || 0,
            page: Number(page),
            limit: Number(limit),
        });
    }
    catch (err) {
        console.error('Get posts error:', err);
        res.status(500).json({ error: '获取帖子列表失败' });
    }
});
// 获取热门帖子
router.get('/hot', auth_1.authMiddleware, (_req, res) => {
    try {
        const posts = database_1.db.prepare(`
      SELECT p.*, 
        u.username, 
        u.avatar, 
        u.level,
        l.name as language_name,
        l.flag as language_flag,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN languages l ON p.language_id = l.id
      ORDER BY (p.likes * 2 + p.views + (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) * 3) DESC
      LIMIT 10
    `).all();
        res.json(posts);
    }
    catch (err) {
        console.error('Get hot posts error:', err);
        res.status(500).json({ error: '获取热门帖子失败' });
    }
});
// 获取帖子详情
router.get('/:postId', auth_1.authMiddleware, (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        // 增加浏览量
        database_1.db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(postId);
        const post = database_1.db.prepare(`
      SELECT p.*, 
        u.username, 
        u.avatar, 
        u.level,
        l.name as language_name,
        l.flag as language_flag
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN languages l ON p.language_id = l.id
      WHERE p.id = ?
    `).get(postId);
        if (!post) {
            res.status(404).json({ error: '帖子不存在' });
            return;
        }
        const comments = database_1.db.prepare(`
      SELECT c.*, u.username, u.avatar, u.level
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `).all(postId);
        res.json({
            post,
            comments,
        });
    }
    catch (err) {
        console.error('Get post detail error:', err);
        res.status(500).json({ error: '获取帖子详情失败' });
    }
});
// 创建帖子
router.post('/', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const { title, content, languageId, category } = req.body;
        if (!title || !content) {
            res.status(400).json({ error: '标题和内容都不能为空' });
            return;
        }
        const result = database_1.db.prepare(`
      INSERT INTO posts (user_id, title, content, language_id, category)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, title, content, languageId || null, category || 'general');
        const postId = Number(result.lastInsertRowid);
        // 检查社区成就
        const postCount = database_1.db.prepare('SELECT COUNT(*) as count FROM posts WHERE user_id = ?').get(userId);
        const achievements = (0, learning_1.checkAchievements)(userId, 'posts', postCount.count || 0);
        const post = database_1.db.prepare(`
      SELECT p.*, u.username, u.avatar, u.level
      FROM posts p JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `).get(postId);
        res.status(201).json({
            post,
            achievements,
        });
    }
    catch (err) {
        console.error('Create post error:', err);
        res.status(500).json({ error: '创建帖子失败' });
    }
});
// 点赞帖子
router.post('/:postId/like', auth_1.authMiddleware, (req, res) => {
    try {
        const { postId } = req.params;
        const post = database_1.db.prepare('SELECT id FROM posts WHERE id = ?').get(postId);
        if (!post) {
            res.status(404).json({ error: '帖子不存在' });
            return;
        }
        database_1.db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?').run(postId);
        const updated = database_1.db.prepare('SELECT likes FROM posts WHERE id = ?').get(postId);
        res.json(updated);
    }
    catch (err) {
        console.error('Like post error:', err);
        res.status(500).json({ error: '点赞失败' });
    }
});
// 创建评论
router.post('/:postId/comments', auth_1.authMiddleware, (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        const { content } = req.body;
        if (!content) {
            res.status(400).json({ error: '评论内容不能为空' });
            return;
        }
        const post = database_1.db.prepare('SELECT id FROM posts WHERE id = ?').get(postId);
        if (!post) {
            res.status(404).json({ error: '帖子不存在' });
            return;
        }
        const result = database_1.db.prepare(`
      INSERT INTO comments (post_id, user_id, content)
      VALUES (?, ?, ?)
    `).run(postId, userId, content);
        const commentId = Number(result.lastInsertRowid);
        const comment = database_1.db.prepare(`
      SELECT c.*, u.username, u.avatar, u.level
      FROM comments c JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).get(commentId);
        res.status(201).json(comment);
    }
    catch (err) {
        console.error('Create comment error:', err);
        res.status(500).json({ error: '创建评论失败' });
    }
});
// 点赞评论
router.post('/comments/:commentId/like', auth_1.authMiddleware, (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = database_1.db.prepare('SELECT id FROM comments WHERE id = ?').get(commentId);
        if (!comment) {
            res.status(404).json({ error: '评论不存在' });
            return;
        }
        database_1.db.prepare('UPDATE comments SET likes = likes + 1 WHERE id = ?').run(commentId);
        const updated = database_1.db.prepare('SELECT likes FROM comments WHERE id = ?').get(commentId);
        res.json(updated);
    }
    catch (err) {
        console.error('Like comment error:', err);
        res.status(500).json({ error: '点赞失败' });
    }
});
exports.default = router;
