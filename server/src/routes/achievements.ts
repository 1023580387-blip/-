import { Router, Response } from 'express';
import { db } from '../database';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { checkAchievements } from './learning';

const router = Router();

// 获取所有成就
router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const achievements = db.prepare(`
      SELECT a.*, 
        CASE WHEN ua.id IS NOT NULL THEN 1 ELSE 0 END as unlocked,
        ua.unlocked_at
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
      ORDER BY a.id ASC
    `).all(userId);

    res.json(achievements);
  } catch (err) {
    console.error('Get achievements error:', err);
    res.status(500).json({ error: '获取成就列表失败' });
  }
});

// 获取用户已解锁的成就
router.get('/my', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const achievements = db.prepare(`
      SELECT a.*, ua.unlocked_at
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ?
      ORDER BY ua.unlocked_at DESC
    `).all(userId);

    res.json(achievements);
  } catch (err) {
    console.error('Get my achievements error:', err);
    res.status(500).json({ error: '获取我的成就失败' });
  }
});

// 排行榜
router.get('/leaderboard', authMiddleware, (_req, res: Response) => {
  try {
    const leaderboard = db.prepare(`
      SELECT 
        u.id, 
        u.username, 
        u.avatar, 
        u.level, 
        u.experience,
        u.streak_days,
        u.target_language,
        (SELECT COUNT(*) FROM user_achievements ua WHERE ua.user_id = u.id) as achievement_count,
        (SELECT COALESCE(SUM(xp_earned), 0) FROM daily_records dr WHERE dr.user_id = u.id) as total_xp
      FROM users u
      ORDER BY (u.level * 10000 + u.experience) DESC
      LIMIT 20
    `).all();

    res.json(leaderboard);
  } catch (err) {
    console.error('Get leaderboard error:', err);
    res.status(500).json({ error: '获取排行榜失败' });
  }
});

export default router;
