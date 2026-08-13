"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const auth_1 = __importDefault(require("./routes/auth"));
const courses_1 = __importDefault(require("./routes/courses"));
const learning_1 = __importDefault(require("./routes/learning"));
const achievements_1 = __importDefault(require("./routes/achievements"));
const community_1 = __importDefault(require("./routes/community"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 初始化数据库
(0, database_1.initDatabase)();
(0, database_1.seedData)();
// API 路由
app.use('/api/auth', auth_1.default);
app.use('/api', courses_1.default);
app.use('/api/learning', learning_1.default);
app.use('/api/achievements', achievements_1.default);
app.use('/api/community', community_1.default);
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
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: '服务器内部错误' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
