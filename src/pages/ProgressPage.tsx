import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore, mockCourses, mockWords } from '../store';
import { languageNames, levelNames, formatMinutes } from '../utils';
import { ProgressBar, StatCard, Badge } from '../components/UI';
import type { Course, Word, Language, LanguageLevel } from '../types';
import {
  BookOpen, Target, Clock, Award, TrendingUp, Calendar,
  ChevronRight, Zap
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';

export function ProgressPage() {
  const {
    user, dailyRecords, learningProgresses, getTotalWordsLearned,
    getTotalLessonsCompleted, wordProgresses, getProgressByCourse
  } = useStore();

  const weeklyData = useMemo(() => {
    const days: { day: string; minutes: number; words: number; lessons: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const record = dailyRecords.find(r => r.date === dateStr);
      const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
      days.push({
        day: `周${dayNames[d.getDay()]}`,
        minutes: record?.studyMinutes || 0,
        words: record?.wordsLearned || 0,
        lessons: record?.lessonsCompleted || 0,
      });
    }
    return days;
  }, [dailyRecords]);

  const monthlyData = useMemo(() => {
    const data: { week: string; minutes: number }[] = [];
    const today = new Date();
    for (let i = 3; i >= 0; i--) {
      let totalMin = 0;
      for (let j = 6; j >= 0; j--) {
        const d = new Date(today);
        d.setDate(d.getDate() - (i * 7 + j));
        const record = dailyRecords.find(r => r.date === d.toISOString().split('T')[0]);
        totalMin += record?.studyMinutes || 0;
      }
      data.push({ week: i === 0 ? '本周' : `前${i}周`, minutes: totalMin });
    }
    return data;
  }, [dailyRecords]);

  const myCourses = useMemo(() => {
    if (!user) return [] as { progress: typeof learningProgresses[0]; course: Course }[];
    return learningProgresses
      .filter(p => p.userId === user.id)
      .map(p => ({
        progress: p,
        course: mockCourses.find(c => c.id === p.courseId),
      }))
      .filter((x): x is { progress: typeof learningProgresses[0]; course: Course } => !!x.course);
  }, [user, learningProgresses]);

  // Calendar heatmap
  const calendarDays = useMemo(() => {
    const days: { date: Date; value: number; dateStr: string }[] = [];
    const today = new Date();
    // 显示过去12周
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const record = dailyRecords.find(r => r.date === dateStr);
      days.push({ date: d, value: record?.studyMinutes || 0, dateStr });
    }
    return days;
  }, [dailyRecords]);

  const getHeatColor = (val: number) => {
    if (val === 0) return 'bg-gray-100';
    if (val < 20) return 'bg-primary-100';
    if (val < 40) return 'bg-primary-200';
    if (val < 60) return 'bg-primary-400';
    return 'bg-primary-600';
  };

  // Word category distribution
  const wordCategoryData = useMemo(() => {
    if (!user) return [];
    const masteredIds = wordProgresses.filter(wp => wp.userId === user.id && wp.mastered).map(wp => wp.wordId);
    const categoryCount: Record<string, number> = {};
    mockWords.filter((w: Word) => masteredIds.includes(w.id)).forEach((w: Word) => {
      categoryCount[w.category] = (categoryCount[w.category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  }, [user, wordProgresses]);

  const PIE_COLORS = ['#0ea5e9', '#d946ef', '#22c55e', '#f59e0b', '#f43f5e', '#8b5cf6'];

  const totalDaysStudied = dailyRecords.length;
  const weekMin = weeklyData.reduce((s, d) => s + d.minutes, 0);
  const todayMin = dailyRecords.find(r => r.date === new Date().toISOString().split('T')[0])?.studyMinutes || 0;
  const dailyGoal = 30;
  const goalProgress = Math.min(100, Math.round((todayMin / dailyGoal) * 100));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 学习进度</h1>
        <p className="text-gray-500">全面了解你的学习数据，见证每一步成长</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="今日学习"
          value={`${todayMin}分钟`}
          icon="⏱️"
          trend={goalProgress >= 100 ? '🎯 目标已达成' : `距离目标${dailyGoal}分钟还差${Math.max(0, dailyGoal - todayMin)}分钟`}
          color="primary"
        />
        <StatCard
          title="本周累计"
          value={formatMinutes(weekMin)}
          icon="📅"
          trend={`日均${Math.round(weekMin / 7)}分钟`}
          color="secondary"
        />
        <StatCard
          title="学习天数"
          value={`${totalDaysStudied}天`}
          icon="🔥"
          trend={`连续${user?.streak || 0}天`}
          color="warn"
        />
        <StatCard
          title="累计积分"
          value={user?.points?.toLocaleString() || 0}
          icon="⭐"
          trend="继续加油！"
          color="accent"
        />
      </div>

      {/* Today's Goal */}
      <div className="card bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">今日学习目标</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {todayMin} / {dailyGoal} 分钟
              {goalProgress >= 100 && <span className="ml-3 animate-bounce-slow inline-block">🎉</span>}
            </h2>
            <p className="text-white/70 text-sm">
              {goalProgress >= 100
                ? '太棒了！今日目标已达成，多学多得！'
                : `再加把劲，再学 ${dailyGoal - todayMin} 分钟就能完成目标啦！`}
            </p>
          </div>
          <div className="w-full md:w-64">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>完成进度</span>
              <span className="font-bold text-white">{goalProgress}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-300 to-accent-500 rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              本周学习数据
            </h3>
            <span className="text-xs text-gray-400">分钟 / 个</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="minutes" name="学习时长(分钟)" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="words" name="学习单词" fill="#d946ef" radius={[8, 8, 0, 0]} />
                <Bar dataKey="lessons" name="完成课时" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary-500" />
              近4周学习趋势
            </h3>
            <span className="text-xs text-gray-400">总学习时长(分钟)</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(v: number) => [`${formatMinutes(v)}`, '学习时长']}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  name="学习时长"
                  stroke="#d946ef"
                  strokeWidth={4}
                  dot={{ fill: '#d946ef', r: 6, strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Calendar Heatmap + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent-500" />
              学习日历（过去12周）
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>少</span>
              <div className="flex gap-1">
                <span className="w-3 h-3 rounded bg-gray-100" />
                <span className="w-3 h-3 rounded bg-primary-100" />
                <span className="w-3 h-3 rounded bg-primary-200" />
                <span className="w-3 h-3 rounded bg-primary-400" />
                <span className="w-3 h-3 rounded bg-primary-600" />
              </div>
              <span>多</span>
            </div>
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1.5" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
            {calendarDays.map((d, i) => (
              <div
                key={i}
                title={`${d.dateStr}: ${d.value}分钟`}
                className={`aspect-square rounded ${getHeatColor(d.value)} hover:ring-2 hover:ring-primary-400 cursor-pointer transition-all`}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>每天学习一点，持续进步！</span>
            <span>累计学习 {totalDaysStudied} 天</span>
          </div>
        </div>

        {/* Pie */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-warn-500" />
              已掌握单词分布
            </h3>
          </div>
          <div className="h-56">
            {wordCategoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wordCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {wordCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                暂无数据，快去背单词吧！
              </div>
            )}
          </div>
          <div className="space-y-2 mt-2">
            {wordCategoryData.length > 0 ? wordCategoryData.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{item.value} 个</span>
              </div>
            )) : <div className="text-center text-gray-400 text-xs">学习更多单词后查看分布</div>}
          </div>
        </div>
      </div>

      {/* Course Progress List */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            课程学习进度
          </h2>
          <Link to="/courses" className="text-sm text-primary-600 font-medium hover:text-primary-700">
            浏览更多课程 →
          </Link>
        </div>

        {myCourses.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-bold text-lg mb-2">还没有开始任何课程</h3>
            <p className="text-gray-500 mb-6">去课程中心挑选适合你的语言课程吧！</p>
            <Link to="/courses" className="btn-primary">
              探索课程
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myCourses.map(({ course, progress }) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="card-hover group"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="info">{languageNames[course.language as Language].flag} {languageNames[course.language as Language].name}</Badge>
                      <span className={`badge ${levelNames[course.level as LanguageLevel].color}`}>{levelNames[course.level as LanguageLevel].name}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <ProgressBar value={progress.progressPercent} height="sm" />
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{progress.completedLessons.length} / {course.totalLessons} 节课</span>
                      <span className="inline-flex items-center gap-1 text-primary-600 font-medium">
                        继续学习 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="card bg-gradient-to-br from-accent-50 to-white border-accent-100">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="text-6xl">{user?.streak && user.streak >= 7 ? '🏆' : user?.streak && user.streak >= 3 ? '🔥' : '💪'}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              继续保持，{user?.username}！
            </h3>
            <p className="text-gray-600 leading-relaxed">
              你已经连续学习了 <strong className="text-primary-600">{user?.streak || 0} 天</strong>，
              完成了 <strong className="text-secondary-600">{getTotalLessonsCompleted()} 节课</strong>，
              掌握了 <strong className="text-accent-600">{getTotalWordsLearned()} 个单词</strong>。
              {user?.streak && user.streak >= 7 ? '你是真正的学习达人！' : '坚持下去，你一定可以掌握目标语言！'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent-500" />
            <span className="text-lg font-bold text-accent-600">{user?.points?.toLocaleString()} 积分</span>
          </div>
        </div>
      </div>
    </div>
  );
}
