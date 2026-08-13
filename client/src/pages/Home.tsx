import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import Loading from '../components/common/Loading'
import { useToast } from '../components/common/Toast'
import { useAuthStore } from '../store/authStore'
import { getRecommendations, type Recommendation } from '../api/modules/courseApi'
import { getStats, type LearningStats } from '../api/modules/learningApi'
import { getLeaderboard, type LeaderboardEntry } from '../api/modules/achievementApi'

const LEVEL_XP_BASE = 100
const DAILY_GOAL_XP = 50

function xpForNextLevel(level: number): number {
  return Math.round(LEVEL_XP_BASE * Math.pow(1.5, level - 1))
}

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { toast, ToastComponent } = useToast()

  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [stats, setStats] = useState<LearningStats | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [recRes, statsRes, lbRes] = await Promise.all([
          getRecommendations({ limit: 5 }),
          getStats({ period: 'today' }),
          getLeaderboard({ type: 'weekly', limit: 5 }),
        ])
        setRecommendations(recRes.data)
        setStats(statsRes.data)
        setLeaderboard(lbRes.data)
      } catch (error) {
        toast.error('加载数据失败')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [toast])

  const handleRecommendationClick = (rec: Recommendation) => {
    if (rec.type === 'course') {
      navigate(`/courses/${rec.targetId}`)
    } else if (rec.type === 'unit') {
      navigate(`/units/${rec.targetId}`)
    } else {
      toast.info('单词学习功能即将上线')
    }
  }

  const level = user?.level ?? stats?.currentLevel ?? 1
  const experience = user?.experience ?? stats?.totalExperience ?? 0
  const nextLevelXp = xpForNextLevel(level + 1)
  const currentLevelXp = xpForNextLevel(level)
  const levelProgress = ((experience - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
  const safeLevelProgress = Math.max(0, Math.min(100, levelProgress))

  const todayXp = stats?.timeSpentToday ? Math.round(stats.timeSpentToday / 10) : 0
  const dailyGoalProgress = Math.min(100, (todayXp / DAILY_GOAL_XP) * 100)
  const streak = user?.streak ?? stats?.streakDays ?? 0

  if (loading) {
    return <Loading fullScreen text="加载中..." />
  }

  return (
    <div className="home-page">
      <ToastComponent />

      <section className="home-welcome">
        <div className="welcome-text">
          <h1>你好，{user?.username ?? '学习者'} 👋</h1>
          <p>继续你的学习，每天进步一点点！</p>
        </div>
        <div className="welcome-stats">
          <div className="level-section">
            <div className="level-header">
              <span className="level-badge">Lv.{level}</span>
              <span className="level-xp">{experience} XP</span>
            </div>
            <ProgressBar
              value={safeLevelProgress}
              variant="primary"
              size="md"
              showLabel
              labelInside
            />
          </div>
          <div className="goal-section">
            <div className="goal-header">
              <span className="goal-label">今日目标</span>
              <span className="goal-value">{todayXp}/{DAILY_GOAL_XP} XP</span>
            </div>
            <ProgressBar
              value={dailyGoalProgress}
              variant="success"
              size="md"
              striped
              animated
            />
          </div>
        </div>
      </section>

      <div className="home-grid">
        <Card variant="primary" hoverable className="streak-card" padding="md">
          <div className="streak-content">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <h3>连续学习</h3>
              <p className="streak-count">{streak} 天</p>
              <p className="streak-tip">
                {streak >= 7 ? '太棒了！保持势头！' : '坚持下去，解锁7天连续成就！'}
              </p>
            </div>
          </div>
        </Card>

        <Card header={<h3>📊 今日学习数据</h3>} padding="md">
          <div className="today-stats">
            <div className="stat-item">
              <span className="stat-value">{todayXp}</span>
              <span className="stat-label">获得 XP</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats?.totalWordsLearned ?? 0}</span>
              <span className="stat-label">学习单词</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats?.totalExercisesCompleted ?? 0}</span>
              <span className="stat-label">完成练习</span>
            </div>
          </div>
        </Card>
      </div>

      <Card
        header={
          <div className="card-header-flex">
            <h3>🎯 为你推荐</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/courses')}>
              查看全部
            </Button>
          </div>
        }
        padding="md"
      >
        <div className="recommendation-list">
          {recommendations.length === 0 ? (
            <p className="empty-state">暂无推荐内容</p>
          ) : (
            recommendations.map((rec) => (
              <div
                key={rec.id}
                className="recommendation-item"
                onClick={() => handleRecommendationClick(rec)}
              >
                <div className="rec-icon">
                  {rec.type === 'course' && '📚'}
                  {rec.type === 'unit' && '📖'}
                  {rec.type === 'word' && '🔤'}
                </div>
                <div className="rec-content">
                  <h4>{rec.title}</h4>
                  <p>{rec.description}</p>
                  <span className="rec-reason">{rec.reason}</span>
                </div>
                <div className="rec-arrow">→</div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card
        header={
          <div className="card-header-flex">
            <h3>🏆 本周排行榜 TOP 5</h3>
            <Button variant="ghost" size="sm" onClick={() => toast.info('排行榜详情页开发中')}>
              查看全部
            </Button>
          </div>
        }
        padding="md"
      >
        <div className="leaderboard-list">
          {leaderboard.length === 0 ? (
            <p className="empty-state">暂无排行数据</p>
          ) : (
            leaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={`leaderboard-item ${entry.isCurrentUser ? 'is-current-user' : ''}`}
              >
                <span className={`lb-rank lb-rank-${entry.rank}`}>{entry.rank}</span>
                <div className="lb-avatar">
                  {entry.avatar ? (
                    <img src={entry.avatar} alt={entry.username} />
                  ) : (
                    <span>{entry.username.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="lb-info">
                  <span className="lb-name">
                    {entry.username}
                    {entry.isCurrentUser && <span className="lb-me"> (我)</span>}
                  </span>
                  <span className="lb-level">Lv.{entry.level}</span>
                </div>
                <div className="lb-xp">
                  <span className="lb-xp-value">{entry.experience}</span>
                  <span className="lb-xp-label">XP</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
