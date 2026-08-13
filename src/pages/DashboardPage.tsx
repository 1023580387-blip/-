import { useStore, mockCourses } from '../store';
import { StatCard, ProgressBar, Badge } from '../components/UI';
import { languageNames, levelNames, courseTypeNames, formatMinutes } from '../utils';
import { Link } from 'react-router-dom';
import { Play, Clock, Star, Users, ArrowRight, BookOpen, Target, Flame, Award } from 'lucide-react';
import { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import type { Course } from '../types';

export function DashboardPage() {
  const {
    user, dailyRecords, getProgressByCourse, getRecommendedCourses,
    learningProgresses, getTotalWordsLearned, getTotalLessonsCompleted
  } = useStore();

  const enrolledCourses = useMemo(() => {
    if (!user) return [];
    return mockCourses
      .map((course: Course) => ({
        course,
        progress: getProgressByCourse(course.id),
        enrolled: learningProgresses.some(p => p.courseId === course.id && p.userId === user.id),
      }))
      .filter((x: {enrolled: boolean}) => x.enrolled);
  }, [user, learningProgresses, mockCourses]);

  const recommendedCourses = getRecommendedCourses();

  const chartData = useMemo(() => {
    const last14: { date: string; minutes: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const record = dailyRecords.find(r => r.date === dateStr);
      last14.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        minutes: record?.studyMinutes || 0,
      });
    }
    return last14;
  }, [dailyRecords]);

  const todayRecord = dailyRecords.find(
    r => r.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="relative z-10">
          <p className="text-white/80 mb-2">
            {new Date().getHours() < 12 ? '早上好' : new Date().getHours() < 18 ? '下午好' : '晚上好'}，{user?.username}！🌟
          </p>
          <h1 className="text-3xl font-bold mb-4">今天继续您的{languageNames[user?.currentLanguage || 'en'].name}学习吧！</h1>
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-300" />
              <span>已连续学习 <strong className="text-white">{user?.streak || 0}</strong> 天</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-300" />
              <span>今日学习 <strong className="text-white">{todayRecord?.studyMinutes || 0}</strong> 分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-300" />
              <span>累计积分 <strong className="text-white">{user?.points?.toLocaleString() || 0}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="已学课程节数"
          value={getTotalLessonsCompleted()}
          icon="📚"
          trend="+2 本周"
          color="primary"
        />
        <StatCard
          title="已掌握单词"
          value={getTotalWordsLearned()}
          icon="📝"
          trend="+5 今日"
          color="secondary"
        />
        <StatCard
          title="累计学习时长"
          value={formatMinutes(user?.totalStudyMinutes || 0)}
          icon="⏱️"
          color="accent"
        />
        <StatCard
          title="当前级别"
          value={levelNames[user?.currentLevel || 'beginner'].name}
          icon={languageNames[user?.currentLanguage || 'en'].flag}
          trend={languageNames[user?.currentLanguage || 'en'].nativeName}
          color="warn"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Study Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">📊 近14天学习趋势</h2>
            <Link to="/progress" className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              查看详情 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value} 分钟`, '学习时长']}
                />
                <Area type="monotone" dataKey="minutes" stroke="#0ea5e9" strokeWidth={3} fill="url(#colorMinutes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-5">
          <div className="card bg-gradient-to-br from-primary-50 to-white">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-500" />
              快速开始
            </h3>
            <div className="space-y-3">
              <Link to="/practice/vocabulary" className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-primary-50 transition-colors border border-primary-100 group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{courseTypeNames.vocabulary.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">单词记忆</p>
                    <p className="text-xs text-gray-500">卡片式学习</p>
                  </div>
                </div>
                <Play className="w-5 h-5 text-primary-400 group-hover:text-primary-600 transition-colors" />
              </Link>
              <Link to="/practice/grammar" className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-secondary-50 transition-colors border border-secondary-100 group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{courseTypeNames.grammar.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">语法练习</p>
                    <p className="text-xs text-gray-500">选择+填空</p>
                  </div>
                </div>
                <Play className="w-5 h-5 text-secondary-400 group-hover:text-secondary-600 transition-colors" />
              </Link>
              <Link to="/practice/speaking" className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-accent-50 transition-colors border border-accent-100 group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{courseTypeNames.speaking.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">口语跟读</p>
                    <p className="text-xs text-gray-500">情景对话</p>
                  </div>
                </div>
                <Play className="w-5 h-5 text-accent-400 group-hover:text-accent-600 transition-colors" />
              </Link>
              <Link to="/practice/listening" className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-warn-50 transition-colors border border-warn-100 group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{courseTypeNames.listening.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">听力训练</p>
                    <p className="text-xs text-gray-500">场景听力</p>
                  </div>
                </div>
                <Play className="w-5 h-5 text-warn-400 group-hover:text-warn-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">📖 正在学习的课程</h2>
            <Link to="/courses" className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              全部课程 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledCourses.map(({ course, progress }) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="card-hover group"
              >
                <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info">{languageNames[course.language].flag} {languageNames[course.language].name}</Badge>
                  <span className={`badge ${levelNames[course.level].color}`}>{levelNames[course.level].name}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.totalLessons}节课</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {course.rating}</span>
                </div>
                <ProgressBar value={progress} height="sm" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">✨ 为您推荐</h2>
          <Link to="/courses" className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
            更多 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedCourses.map(course => (
            <div key={course.id} className="card-hover group">
              <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="info">{languageNames[course.language].flag} {languageNames[course.language].name}</Badge>
                <span className={`badge ${levelNames[course.level].color}`}>{levelNames[course.level].name}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students.toLocaleString()}人</span>
                </div>
                <Link to={`/courses/${course.id}`} className="btn-primary !py-2 !px-4 !text-sm">
                  开始学习
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
