import { useMemo } from 'react';
import { useStore, mockAchievements, mockLeaderboard } from '../store';
import { levelNames } from '../utils';
import { Badge, StatCard } from '../components/UI';
import {
  Trophy, Crown, Medal, Star, Zap, Lock, CheckCircle2,
  TrendingUp, Flame, Target, Award, Sparkles, Clock
} from 'lucide-react';

export function AchievementsPage() {
  const { user, userAchievements, getTotalWordsLearned, getTotalLessonsCompleted } = useStore();

  const achievementList = useMemo(() => {
    const unlockedIds = userAchievements
      .filter(a => a.userId === user?.id)
      .map(a => a.achievementId);

    return mockAchievements.map(a => ({
      ...a,
      unlocked: unlockedIds.includes(a.id),
      unlockedAt: userAchievements.find(ua => ua.achievementId === a.id)?.unlockedAt,
      progress: getProgress(a),
    }));
  }, [userAchievements, user]);

  function getProgress(a: typeof mockAchievements[0]): { current: number; total: number; percent: number } {
    const stats: Record<string, number> = {
      streak: user?.streak || 0,
      points: user?.points || 0,
      words: getTotalWordsLearned(),
      lessons: getTotalLessonsCompleted(),
      languages: 1,
    };
    const current = stats[a.requirement.type] || 0;
    const total = a.requirement.value;
    return {
      current: Math.min(current, total),
      total,
      percent: Math.min(100, Math.round((current / total) * 100)),
    };
  }

  const unlockedCount = achievementList.filter(a => a.unlocked).length;
  const totalPointsEarned = achievementList
    .filter(a => a.unlocked)
    .reduce((s, a) => s + a.pointsReward, 0);

  // 找用户在排行榜位置
  const myRank = useMemo(() => {
    const all = [...mockLeaderboard];
    if (user) {
      all.push({
        id: user.id, username: user.username, avatar: '🎯',
        points: user.points, rank: 0,
      });
    }
    all.sort((a, b) => b.points - a.points);
    return all.findIndex(x => x.id === user?.id) + 1;
  }, [user]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-warn-500 via-accent-500 to-primary-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 md:justify-start justify-center">
              <Trophy className="w-8 h-8" />
              成就中心
            </h1>
            <p className="text-white/80 max-w-xl">
              完成挑战解锁成就徽章，赢取积分奖励，冲击排行榜，证明你的学习实力！
            </p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{unlockedCount}/{mockAchievements.length}</div>
              <div className="text-xs text-white/70 mt-1">已解锁成就</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">+{totalPointsEarned}</div>
              <div className="text-xs text-white/70 mt-1">成就积分奖励</div>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">#{myRank}</div>
              <div className="text-xs text-white/70 mt-1">我的排名</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard title="总积分" value={user?.points?.toLocaleString() || 0} icon="⭐" color="warn" />
        <StatCard title="连续天数" value={`${user?.streak || 0}天`} icon="🔥" trend="继续保持！" color="primary" />
        <StatCard title="已解锁徽章" value={`${unlockedCount}个`} icon="🏆" trend={`共${mockAchievements.length}个`} color="accent" />
        <StatCard title="当前等级" value={levelNames[user?.currentLevel || 'beginner'].name} icon="🎖️" color="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Achievement List */}
        <div className="lg:col-span-2 space-y-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-accent-500" />
            成就徽章
            <span className="badge bg-gray-100 text-gray-500 ml-2">{unlockedCount} / {mockAchievements.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementList.map((a, i) => (
              <div
                key={a.id}
                className={`card p-5 relative overflow-hidden transition-all ${
                  a.unlocked
                    ? 'bg-gradient-to-br from-white to-accent-50 border-accent-200 hover:shadow-lg'
                    : 'opacity-75'
                }`}
              >
                {a.unlocked && (
                  <div className="absolute top-3 right-3">
                    <span className="badge bg-accent-500 text-white text-xs">已解锁</span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md ${
                    a.unlocked
                      ? 'bg-gradient-to-br from-accent-400 to-primary-500'
                      : 'bg-gray-100 grayscale'
                  }`}>
                    {a.unlocked ? a.icon : <Lock className="w-7 h-7 text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold mb-1 ${a.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {a.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{a.description}</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">
                          进度 {a.progress.current.toLocaleString()} / {a.progress.total.toLocaleString()}
                        </span>
                        <span className={a.unlocked ? 'text-accent-600 font-semibold' : 'text-gray-400'}>
                          {a.progress.percent}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            a.unlocked
                              ? 'bg-gradient-to-r from-accent-400 to-accent-600'
                              : 'bg-gradient-to-r from-primary-300 to-primary-500'
                          }`}
                          style={{ width: `${a.progress.percent}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`flex items-center gap-1 ${
                        a.unlocked ? 'text-accent-600' : 'text-gray-400'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        +{a.pointsReward} 积分
                      </span>
                      {a.unlockedAt && (
                        <span className="text-gray-400">
                          {new Date(a.unlockedAt).toLocaleDateString('zh-CN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {a.unlocked && i < 3 && (
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-accent-200/30 rounded-full blur-2xl" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Crown className="w-6 h-6 text-warn-500" />
            本周排行榜
          </h2>
          <div className="card p-0 overflow-hidden">
            {/* Top 3 Podium */}
            <div className="bg-gradient-to-b from-warn-50 to-white pt-6 pb-8 px-4">
              <div className="flex items-end justify-center gap-3">
                {/* 2nd */}
                <div className="text-center flex-1">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-2xl mb-2 shadow-lg">
                    {mockLeaderboard[1]?.avatar}
                  </div>
                  <div className="font-semibold text-sm text-gray-900 truncate mb-1">{mockLeaderboard[1]?.username}</div>
                  <div className="text-xs text-gray-500 mb-2">{mockLeaderboard[1]?.points.toLocaleString()} 分</div>
                  <div className="h-16 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center text-white font-bold shadow-md">
                    <Medal className="w-6 h-6" />
                  </div>
                </div>
                {/* 1st */}
                <div className="text-center flex-1 -mt-8">
                  <div className="mb-2">
                    <Crown className="w-8 h-8 text-warn-500 mx-auto drop-shadow" />
                  </div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-warn-400 to-warn-600 flex items-center justify-center text-3xl mb-2 shadow-xl ring-4 ring-warn-200">
                    {mockLeaderboard[0]?.avatar}
                  </div>
                  <div className="font-bold text-gray-900 truncate mb-1">{mockLeaderboard[0]?.username}</div>
                  <div className="text-xs text-warn-600 font-semibold mb-2">{mockLeaderboard[0]?.points.toLocaleString()} 分</div>
                  <div className="h-20 bg-gradient-to-t from-warn-500 to-warn-400 rounded-t-lg flex items-center justify-center text-white font-bold shadow-lg">
                    <Star className="w-7 h-7 fill-white" />
                  </div>
                </div>
                {/* 3rd */}
                <div className="text-center flex-1">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-2xl mb-2 shadow-lg">
                    {mockLeaderboard[2]?.avatar}
                  </div>
                  <div className="font-semibold text-sm text-gray-900 truncate mb-1">{mockLeaderboard[2]?.username}</div>
                  <div className="text-xs text-gray-500 mb-2">{mockLeaderboard[2]?.points.toLocaleString()} 分</div>
                  <div className="h-12 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg flex items-center justify-center text-white font-bold shadow-md">
                    <Medal className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rank List 4-10 + Me */}
            <div className="divide-y divide-gray-100">
              {mockLeaderboard.slice(3).map((u) => (
                <RankItem key={u.id} rank={u.rank} username={u.username} avatar={u.avatar} points={u.points} />
              ))}

              {/* My Rank */}
              {user && (
                <div className="p-4 bg-primary-50 border-t-2 border-primary-200">
                  <div className="flex items-center gap-4">
                    <div className="w-8 font-bold text-primary-600 text-center">#{myRank}</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                      {user.username.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-gray-900">{user.username}</span>
                      <span className="badge bg-primary-100 text-primary-700 ml-2">我</span>
                    </div>
                    <div className="font-bold text-primary-600">{user.points.toLocaleString()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Weekly Goal */}
          <div className="card bg-gradient-to-br from-secondary-50 to-white border-secondary-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary-500" />
              本周学习目标
            </h3>
            <div className="space-y-4">
              {[
                { icon: Clock, label: '学习150分钟', cur: user?.totalStudyMinutes ? (user.totalStudyMinutes % 150) : 0, total: 150, color: 'primary' },
                { icon: Zap, label: '完成20节课程', cur: getTotalLessonsCompleted() % 20, total: 20, color: 'accent' },
                { icon: Flame, label: '保持7天连续', cur: user?.streak || 0, total: 7, color: 'warn' },
              ].map((g, i) => {
                const pct = Math.min(100, Math.round((g.cur / g.total) * 100));
                return (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2">
                      <g.icon className={`w-4 h-4 text-${g.color}-500`} />
                      <span className="text-sm text-gray-700 font-medium">{g.label}</span>
                      <span className="ml-auto text-xs text-gray-400">{g.cur}/{g.total}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${g.color}-500 rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-gradient-to-r from-primary-50 via-white to-secondary-50 border-primary-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-7xl animate-pulse-slow">💎</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">学习小贴士</h3>
            <p className="text-gray-600 leading-relaxed">
              每天坚持学习，完成课程可以获得额外积分奖励。连续学习7天、30天解锁专属成就徽章！
              保持学习热情，你就是下一个登上排行榜榜首的学习达人！<TrendingUp className="w-4 h-4 inline text-accent-500 ml-1" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RankItem({ rank, username, avatar, points }: { rank: number; username: string; avatar?: string; points: number }) {
  return (
    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div className="w-8 text-center text-sm font-bold text-gray-500">#{rank}</div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl">
        {avatar}
      </div>
      <div className="flex-1 font-medium text-gray-800 truncate">{username}</div>
      <div className="font-semibold text-gray-600 flex items-center gap-1">
        <Zap className="w-4 h-4 text-warn-500" />
        {points.toLocaleString()}
      </div>
    </div>
  );
}
