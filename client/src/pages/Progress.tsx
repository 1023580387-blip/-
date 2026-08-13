import { useState, useEffect } from 'react'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import ProgressBar from '../components/common/ProgressBar'
import Button from '../components/common/Button'
import { getStats, type LearningStats } from '../api/modules/learningApi'
import { useAuthStore } from '../store/authStore'

interface TodayRecord {
  id: string
  type: 'word' | 'grammar' | 'listening' | 'speaking'
  title: string
  correct: number
  total: number
  xp: number
  duration: number
  time: string
}

const mockTodayRecords: TodayRecord[] = [
  { id: '1', type: 'word', title: 'Unit 1 基础词汇', correct: 18, total: 20, xp: 200, duration: 15, time: '09:20' },
  { id: '2', type: 'grammar', title: '一般现在时语法', correct: 9, total: 10, xp: 120, duration: 12, time: '10:05' },
  { id: '3', type: 'listening', title: '日常对话听力', correct: 7, total: 10, xp: 90, duration: 18, time: '14:30' },
  { id: '4', type: 'speaking', title: '情景口语练习', correct: 0, total: 5, xp: 80, duration: 10, time: '19:15' },
]

const typeIconMap: Record<TodayRecord['type'], string> = {
  word: '📖',
  grammar: '📚',
  listening: '🎧',
  speaking: '🎙️',
}
const typeNameMap: Record<TodayRecord['type'], string> = {
  word: '单词',
  grammar: '语法',
  listening: '听力',
  speaking: '口语',
}

export default function Progress() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<LearningStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getStats()
        setStats(res.data)
      } catch {
        setStats({
          userId: user?.id || '1',
          totalWordsLearned: 342,
          totalExercisesCompleted: 128,
          totalUnitsCompleted: 12,
          totalCoursesCompleted: 2,
          totalExperience: 8560,
          currentLevel: 12,
          experienceToNextLevel: 1440,
          streakDays: 7,
          longestStreak: 15,
          lastActiveAt: new Date().toISOString(),
          weeklyActivity: [
            { day: '周一', minutes: 45 },
            { day: '周二', minutes: 60 },
            { day: '周三', minutes: 30 },
            { day: '周四', minutes: 75 },
            { day: '周五', minutes: 50 },
            { day: '周六', minutes: 90 },
            { day: '周日', minutes: 40 },
          ],
          accuracy: { words: 88, exercises: 82, overall: 85 },
          timeSpentTotal: 12600,
          timeSpentToday: 55,
          timeSpentThisWeek: 390,
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadStats()
  }, [user?.id])

  if (isLoading || !stats) {
    return <Loading fullScreen text="加载学习进度中..." />
  }

  const xpThisLevel = 1000 + stats.currentLevel * 200
  const xpProgress = ((xpThisLevel - stats.experienceToNextLevel) / xpThisLevel) * 100

  const maxMinutes = Math.max(...stats.weeklyActivity.map((d) => d.minutes), 60)

  const masteryData = [
    { label: '未掌握', value: 85, color: '#ef4444' },
    { label: '熟悉', value: 178, color: '#f59e0b' },
    { label: '精通', value: 79, color: '#10b981' },
  ]
  const masteryTotal = masteryData.reduce((a, b) => a + b.value, 0)

  const practiceStats = [
    { label: '单词练习', completed: stats.totalWordsLearned, total: 500, color: '#6366f1' },
    { label: '语法练习', completed: 45, total: 100, color: '#8b5cf6' },
    { label: '听力训练', completed: 32, total: 80, color: '#06b6d4' },
    { label: '口语跟读', completed: 28, total: 80, color: '#ec4899' },
  ]

  return (
    <div className="page-container progress-page">
      <h1 className="page-title">学习进度</h1>

      <div className="progress-grid">
        <Card className="level-card">
          <div className="level-header">
            <div className="level-badge">
              <span className="level-num">Lv.{stats.currentLevel}</span>
              <span className="level-name">勤奋学徒</span>
            </div>
            <div className="streak-badge">
              <span className="streak-icon">🔥</span>
              <span className="streak-days">{stats.streakDays}天连续</span>
            </div>
          </div>
          <div className="xp-section">
            <div className="xp-labels">
              <span className="xp-total">总 XP: <strong>{stats.totalExperience.toLocaleString()}</strong></span>
              <span className="xp-next">距下一级还需 {stats.experienceToNextLevel} XP</span>
            </div>
            <ProgressBar value={xpProgress} variant="primary" size="lg" striped animated labelInside />
          </div>
          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-value">{stats.totalWordsLearned}</div>
              <div className="stat-label">单词已学</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.totalUnitsCompleted}</div>
              <div className="stat-label">单元完成</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.longestStreak}</div>
              <div className="stat-label">最长连续</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.accuracy.overall}%</div>
              <div className="stat-label">总正确率</div>
            </div>
          </div>
        </Card>

        <Card header={<h3>📊 最近7天学习时长</h3>}>
          <div className="bar-chart">
            {stats.weeklyActivity.map((d, i) => {
              const h = (d.minutes / maxMinutes) * 100
              const isToday = i === stats.weeklyActivity.length - 1
              return (
                <div key={d.day} className="bar-col">
                  <div className="bar-val">{d.minutes}m</div>
                  <div className="bar-track">
                    <div
                      className={`bar-fill ${isToday ? 'today' : ''}`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <div className={`bar-label ${isToday ? 'today' : ''}`}>{d.day}</div>
                </div>
              )
            })}
          </div>
          <div className="chart-summary">
            <span>本周总计：<strong>{stats.timeSpentThisWeek} 分钟</strong></span>
            <span>今日：<strong>{stats.timeSpentToday} 分钟</strong></span>
          </div>
        </Card>

        <Card header={<h3>🎯 各练习类型完成情况</h3>}>
          <div className="practice-progress-list">
            {practiceStats.map((p) => (
              <div key={p.label} className="practice-progress-item">
                <div className="practice-progress-header">
                  <span className="practice-label" style={{ color: p.color }}>● {p.label}</span>
                  <span className="practice-count">{p.completed}/{p.total}</span>
                </div>
                <ProgressBar
                  value={(p.completed / p.total) * 100}
                  variant="primary"
                  size="md"
                  labelInside
                />
              </div>
            ))}
          </div>
        </Card>

        <Card header={<h3>📈 单词掌握度分布</h3>}>
          <div className="mastery-wrapper">
            <div className="ring-chart">
              <svg viewBox="0 0 100 100" className="ring-svg">
                {(() => {
                  let offset = 0
                  const radius = 38
                  const circumference = 2 * Math.PI * radius
                  return masteryData.map((m) => {
                    const len = (m.value / masteryTotal) * circumference
                    const el = (
                      <circle
                        key={m.label}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={m.color}
                        strokeWidth="14"
                        strokeDasharray={`${len} ${circumference - len}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 50 50)"
                      />
                    )
                    offset += len
                    return el
                  })
                })()}
                <text x="50" y="46" textAnchor="middle" className="ring-num">{masteryTotal}</text>
                <text x="50" y="60" textAnchor="middle" className="ring-label">总单词</text>
              </svg>
            </div>
            <div className="mastery-legend">
              {masteryData.map((m) => (
                <div key={m.label} className="legend-item">
                  <span className="legend-dot" style={{ background: m.color }} />
                  <span className="legend-name">{m.label}</span>
                  <span className="legend-count">{m.value} ({Math.round((m.value / masteryTotal) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="today-records-card" header={<h3>📝 今日学习记录</h3>}>
          <div className="today-summary">
            <span>完成练习：<strong>{mockTodayRecords.length}</strong> 项</span>
            <span>获得 XP：<strong>{mockTodayRecords.reduce((a, b) => a + b.xp, 0)}</strong></span>
            <span>总时长：<strong>{mockTodayRecords.reduce((a, b) => a + b.duration, 0)}</strong> 分钟</span>
          </div>
          <div className="today-list">
            {mockTodayRecords.map((r) => (
              <div key={r.id} className="today-item">
                <div className="today-type-icon">{typeIconMap[r.type]}</div>
                <div className="today-info">
                  <div className="today-title">
                    <span className="today-tag">{typeNameMap[r.type]}</span>
                    {r.title}
                  </div>
                  <div className="today-meta">
                    {r.type !== 'speaking' ? (
                      <span>正确率 {Math.round((r.correct / r.total) * 100)}% ({r.correct}/{r.total})</span>
                    ) : (
                      <span>完成 {r.total} 句</span>
                    )}
                    <span className="today-time">· {r.time}</span>
                  </div>
                </div>
                <div className="today-xp">
                  <span>+{r.xp}</span>
                  <small>XP · {r.duration}分钟</small>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer-actions">
            <Button variant="ghost" size="sm">查看全部记录 →</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
