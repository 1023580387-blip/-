import express from 'express';
import cors from 'cors';
import { initDatabase, seedData } from './database';
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import learningRoutes from './routes/learning';
import achievementRoutes from './routes/achievements';
import communityRoutes from './routes/community';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 初始化数据库
initDatabase();
seedData();

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api', courseRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/community', communityRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Language Learning Platform API is running',
    endpoints: {
      auth: '/api/auth/*',
      courses: '/api/courses/*, /api/languages',
      learning: '/api/learning/*',
      achievements: '/api/achievements/*',
      community: '/api/community/*',
    }
  });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
