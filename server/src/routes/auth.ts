import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database';
import { generateToken, AuthRequest, authMiddleware } from '../middleware/auth';

const router = Router();

// 注册
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: '用户名、邮箱和密码都不能为空' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: '密码至少需要6个字符' });
      return;
    }

    // 检查用户名是否已存在
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email) as any;
    if (existingUser) {
      res.status(400).json({ error: '用户名或邮箱已被注册' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db.prepare(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    ).run(username, email, hashedPassword);

    const userId = Number(result.lastInsertRowid);
    const token = generateToken({ id: userId, username, email });

    const user = db.prepare('SELECT id, username, email, avatar, level, experience, target_language, proficiency_level, daily_goal, streak_days, created_at FROM users WHERE id = ?').get(userId);

    res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: '注册失败，请重试' });
  }
});

// 登录
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: '用户名和密码都不能为空' });
      return;
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(username, username) as any;

    if (!user) {
      res.status(401).json({ error: '用户名或密码错误' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: '用户名或密码错误' });
      return;
    }

    const token = generateToken({ id: user.id, username: user.username, email: user.email });

    // 更新last_study_date和streak_days
    updateStreak(user.id);

    const safeUser = db.prepare('SELECT id, username, email, avatar, level, experience, target_language, proficiency_level, daily_goal, streak_days, last_study_date, created_at FROM users WHERE id = ?').get(user.id);

    res.json({
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: '登录失败，请重试' });
  }
});

// 获取当前用户信息
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = db.prepare('SELECT id, username, email, avatar, level, experience, target_language, proficiency_level, daily_goal, streak_days, last_study_date, created_at FROM users WHERE id = ?').get(userId);

    if (!user) {
      res.status(404).json({ error: '用户不存在' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// 更新用户信息
router.put('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { username, email, avatar, target_language, proficiency_level, daily_goal, password } = req.body;

    const fields: string[] = [];
    const values: any[] = [];

    if (username) {
      fields.push('username = ?');
      values.push(username);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }
    if (avatar !== undefined) {
      fields.push('avatar = ?');
      values.push(avatar);
    }
    if (target_language) {
      fields.push('target_language = ?');
      values.push(target_language);
    }
    if (proficiency_level) {
      fields.push('proficiency_level = ?');
      values.push(proficiency_level);
    }
    if (daily_goal !== undefined) {
      fields.push('daily_goal = ?');
      values.push(daily_goal);
    }
    if (password) {
      if (password.length < 6) {
        res.status(400).json({ error: '密码至少需要6个字符' });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push('password = ?');
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      res.status(400).json({ error: '没有要更新的字段' });
      return;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);

    const user = db.prepare('SELECT id, username, email, avatar, level, experience, target_language, proficiency_level, daily_goal, streak_days, last_study_date, created_at FROM users WHERE id = ?').get(userId);

    res.json(user);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: '更新用户信息失败' });
  }
});

function updateStreak(userId: number) {
  const today = new Date().toISOString().split('T')[0];
  const user = db.prepare('SELECT last_study_date, streak_days FROM users WHERE id = ?').get(userId) as any;

  if (user) {
    let newStreak = user.streak_days;
    
    if (user.last_study_date) {
      const lastDate = new Date(user.last_study_date);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak = user.streak_days + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    db.prepare('UPDATE users SET last_study_date = ?, streak_days = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(today, newStreak, userId);
  }
}

export default router;
