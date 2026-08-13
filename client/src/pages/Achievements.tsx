import { useState, useEffect } from 'react'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import Button from '../components/common/Button'
import {
  getAchievements,
  getMyAchievements,
  getLeaderboard,
  type Achievement,
  type UserAchievement,
  type LeaderboardEntry,
} from '../api/modules/achievementApi'
import { useAuthStore } from '../store/authStore'

const rarityStyle: Record<Achievement['rarity'], { bg: string; border: string; text: string; label: string }> = {
  common: { bg: '#e5e7eb', border: '#9ca3af', text: '#4b5563', label: '普通' },
  rare: { bg: '#dbeafe', border: '#3b82f6', text: '#1d4ed8', label: '稀有' },
  epic: { bg: '#f3e8ff', border: '#8b5cf6', text: '#6d28d9', label: '史诗' },
  legendary: { bg: '#fef3c7', border: '#f59e0b', text: '#b45309', label: '传说' },
}

const categoryLabel: Record<Achievement['category'], string> = {
  learning: '学习',
  streak: '连续',
  social: '社交',
  milestone: '里程碑',
  special: '特殊',
}

const mockAchievements: Achievement[] = [
  { id: 'a1', title: '初来乍到', description: '完成第一次练习', icon: '🌱', category: 'milestone', rarity: 'common', requirement: { type: 'first_practice', value: 1 }, reward: { experience: 50 } },
  { id: 'a2', title: '词汇新星', description: '累计学习50个单词', icon: '📖', category: 'learning', rarity: 'common', requirement: { type: 'words_learned', value: 50 }, reward: { experience: 100 } },
  { id: 'a3', title: '坚持不懈', description: '连续学习7天', icon: '🔥', category: 'streak', rarity: 'rare', requirement: { type: 'streak_days', value: 7 }, reward: { experience: 200 } },
  { id: 'a4', title: '语法达人', description: '完成100道语法题', icon: '📚', category: 'learning', rarity: 'rare', requirement: { type: 'grammar_done', value: 100 }, reward: { experience: 250 } },
  { id: 'a5', title: '社区之星', description: '发帖获得50个赞', icon: '⭐', category: 'social', rarity: 'rare', requirement: { type: 'post_likes', value: 50 }, reward: { experience: 200 } },
  { id: 'a6', title: '月度冠军', description: '月排行榜进入前三', icon: '🏆', category: 'milestone', rarity: 'epic', requirement: { type: 'leaderboard_top3', value: 1 }, reward: { experience: 500, coins: 100 } },
  { id: 'a7', title: '百日坚持', description: '连续学习100天', icon: '💯', category: 'streak', rarity: 'epic', requirement: { type: 'streak_days', value: 100 }, reward: { experience: 1000 } },
  { id: 'a8', title: '词汇大师', description: '累计学习500个单词', icon: '🎓', category: 'learning', rarity: 'epic', requirement: { type: 'words_learned', value: 500 }, reward: { experience: 800 } },
  { id: 'a9', title: '多语精通', description: '学习3门及以上语言', icon: '🌍', category: 'milestone', rarity: 'epic', requirement: { type: 'languages', value: 3 }, reward: { experience: 600 } },
  { id: 'a10', title: '传奇学者', description: '累计XP达到100000', icon: '👑', category: 'special', rarity: 'legendary', requirement: { type: 'total_xp', value: 100000 }, reward: { experience: 2000, coins: 500 } },
  { id: 'a11', title: '听力王者', description: '完成500次听力练习', icon: '🎧', category: 'learning', rarity: 'epic', requirement: { type: 'listening_done', value: 500 }, reward: { experience: 800 } },
  { id: 'a12', title: '口语达人', description: '完成300次口语练习', icon: '🎙️', category: 'learning', rarity: 'epic', requirement: { type: 'speaking_done', value: 300 }, reward: { experience: 700 } },
]

const mockMyAchievements: UserAchievement[] = [
  { id: 'ua1', achievementId: 'a1', userId: 'me', achievement: mockAchievements[0], progress: 1, isUnlocked: true, unlockedAt: '2026-07-15T09:20:00Z', createdAt: '2026-07-15T09:20:00Z', updatedAt: '2026-07-15T09:20:00Z' },
  { id: 'ua2', achievementId: 'a2', userId: 'me', achievement: mockAchievements[1], progress: 50, isUnlocked: true, unlockedAt: '2026-07-20T14:10:00Z', createdAt: '2026-07-15T09:20:00Z', updatedAt: '2026-07-20T14:10:00Z' },
  { id: 'ua3', achievementId: 'a3', userId: 'me', achievement: mockAchievements[2], progress: 7, isUnlocked: true, unlockedAt: '2026-08-05T21:00:00Z', createdAt: '2026-07-15T09:20:00Z', updatedAt: '2026-08-05T21:00:00Z' },
  { id: 'ua4', achievementId: 'a4', userId: 'me', achievement: mockAchievements[3], progress: 68, isUnlocked: false, createdAt: '2026-07-15T09:20:00Z', updatedAt: '2026-08-10T10:00:00Z' },
  { id: 'ua5', achievementId: 'a8', userId: 'me', achievement: mockAchievements[7], progress: 342, isUnlocked: false, createdAt: '2026-07-15T09:20:00Z', updatedAt: '2026-08-12T18:30:00Z' },
  { id: 'ua6', achievementId: 'a7', userId: 'me', achievement: mockAchievements[6], progress: 15, isUnlocked: false, createdAt: '2026-07-15T09:20:00Z', updatedAt: '2026-08-12T18:30:00Z' },
]

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', username: '学霸小明', level: 32, experience: 52800, streak: 128, achievementsCount: 34 },
  { rank: 2, userId: 'u2', username: 'Lina学英语', level: 28, experience: 45600, streak: 95, achievementsCount: 28 },
  { rank: 3, userId: 'u3', username: '日语达人Ken', level: 26, experience: 41200, streak: 88, achievementsCount: 25 },
  { rank: 4, userId: 'u4', username: '多语学习者', level: 24, experience: 36700, streak: 56, achievementsCount: 22 },
  { rank: 5, userId: 'u5', username: '勤奋的考拉', level: 22, experience: 31500, streak: 72, achievementsCount: 20 },
  { rank: 6, userId: 'u6', username: 'Traveler_Z', level: 21, experience: 29800, streak: 40, achievementsCount: 18 },
  { rank: 7, userId: 'u7', username: '词汇猎人', level: 20, experience: 27500, streak: 35, achievementsCount: 17 },
  { rank: 8, userId: 'u8', username: 'Mochi甜', level: 19, experience: 25000, streak: 30, achievementsCount: 15 },
  { rank: 9, userId: 'u9', username: '语法小能手', level: 18, experience: 22800, streak: 28, achievementsCount: 14 },
  { rank: 10, userId: 'u10', username: 'MorningLee', level: 17, experience: 20400, streak: 45, achievementsCount: 13 },
  { rank: 11, userId: 'u11', username: '书虫Alice', level: 16, experience: 18900, streak: 22, achievementsCount: 12 },
  { rank: 12, userId: 'u12', username: 'Kanji战士', level: 15, experience: 17200, streak: 18, achievementsCount: 11 },
  { rank: 13, userId: 'u13', username: 'Echo回声', level: 15, experience: 16800, streak: 25, achievementsCount: 10 },
  { rank: 14, userId: 'u14', username: 'Hangul练习生', level: 14, experience: 15400, streak: 20, achievementsCount: 9 },
  { rank: 15, userId: 'u15', username: '星空学习者', level: 14, experience: 14700, streak: 16, achievementsCount: 9 },
  { rank: 16, userId: 'u16', username: 'Alex追梦', level: 13, experience: 13200, streak: 12, achievementsCount: 8 },
  { rank: 17, userId: 'u17', username: 'Latte夜猫', level: 13, experience: 12500, streak: 14, achievementsCount: 8 },
  { rank: 18, userId: 'u18', username: '樱花下的猫', level: 12, experience: 11200, streak: 10, achievementsCount: 7 },
  { rank: 19, userId: 'u19', username: 'Pinyin入门', level: 12, experience: 10800, streak: 11, achievementsCount: 7 },
  { rank: 20, userId: 'u20', username: 'Beginner小七', level: 11, experience: 9400, streak: 8, achievementsCount: 6 },
]

const TABS = ['全部', '学习', '连续', '社交', '里程碑', '特殊'] as const

export default function Achievements() {
  const { user } = useAuthStore()
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([])
  const [myAchievements, setMyAchievements] = useState<UserAchievement[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('全部')
  const [activeSection, setActiveSection] = useState<'wall' | 'timeline' | 'ranking'>('wall')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [a, m, l] = await Promise.all([
          getAchievements().catch(() => ({ data: mockAchievements })),
          getMyAchievements().catch(() => ({ data: mockMyAchievements })),
          getLeaderboard({ limit: 20 }).catch(() => ({ data: mockLeaderboard })),
        ])
        setAllAchievements(a.data)
        setMyAchievements(m.data)
        const myEntry: LeaderboardEntry = {
          rank: 23,
          userId: user?.id || 'me',
          username: user?.username || '我',
          level: 12,
          experience: 8560,
          streak: 7,
          achievementsCount: 3,
          isCurrentUser: true,
        }
        setLeaderboard([...l.data, myEntry])
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [user?.id, user?.username])

  if (isLoading) {
    return <Loading fullScreen text="加载成就数据中..." />
  }

  const unlockedIds = new Set(myAchievements.filter((m) => m.isUnlocked).map((m) => m.achievementId))
  const progressMap = new Map(myAchievements.map((m) => [m.achievementId, m]))

  const filteredAchievements = allAchievements.filter((a) => {
    if (activeTab === '全部') return true
    return categoryLabel[a.category] === activeTab
  })

  const unlockedCount = myAchievements.filter((m) => m.isUnlocked).length
  const totalCount = allAchievements.length

  const timelineItems = [...myAchievements]
    .filter((m) => m.isUnlocked)
    .sort((a, b) => new Date(b.unlockedAt || 0).getTime() - new Date(a.unlockedAt || 0).getTime())

  const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank)

  return (
    <div className="page-container achievements-page">
      <h1 className="page-title">成就中心</h1>

      <div className="achievement-tabs">
        {(['wall', 'timeline', 'ranking'] as const).map((s) => (
          <button
            key={s}
            className={`achievement-tab ${activeSection === s ? 'active' : ''}`}
            onClick={() => setActiveSection(s)}
          >
            {s === 'wall' ? '🏆 成就墙' : s === 'timeline' ? '⏳ 我的成就' : '🏅 排行榜'}
          </button>
        ))}
      </div>

      {activeSection === 'wall' && (
        <>
          <Card className="achievement-summary">
            <div className="summary-item">
              <div className="summary-num" style={{ color: '#10b981' }}>{unlockedCount}</div>
              <div className="summary-label">已解锁</div>
            </div>
            <div className="summary-item">
              <div className="summary-num" style={{ color: '#6b7280' }}>{totalCount - unlockedCount}</div>
              <div className="summary-label">未解锁</div>
            </div>
            <div className="summary-item">
              <div className="summary-num" style={{ color: '#6366f1' }}>
                {totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0}%
              </div>
              <div className="summary-label">完成度</div>
            </div>
          </Card>

          <div className="category-tabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={`category-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="achievement-grid">
            {filteredAchievements.map((a) => {
              const unlocked = unlockedIds.has(a.id)
              const progress = progressMap.get(a.id)
              const rs = rarityStyle[a.rarity]
              const progressPct = progress
                ? Math.min(100, Math.round((progress.progress / a.requirement.value) * 100))
                : unlocked
                ? 100
                : 0
              return (
                <Card
                  key={a.id}
                  className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
                  style={{
                    borderColor: unlocked ? rs.border : '#d1d5db',
                    opacity: unlocked ? 1 : 0.7,
                  }}
                >
                  <div className="achievement-icon-wrap" style={{ background: unlocked ? rs.bg : '#f3f4f6' }}>
                    <span className="achievement-icon" style={{ filter: unlocked ? 'none' : 'grayscale(100%)' }}>
                      {a.icon}
                    </span>
                    {unlocked && <span className="achievement-check">✓</span>}
                  </div>
                  <div className="achievement-info">
                    <div className="achievement-title">{a.title}</div>
                    <div className="achievement-desc">{a.description}</div>
                    <div className="achievement-meta">
                      <span className="achievement-rarity" style={{ color: rs.text, background: rs.bg }}>
                        {rs.label}
                      </span>
                      <span className="achievement-cat">{categoryLabel[a.category]}</span>
                    </div>
                    {!unlocked && (
                      <div className="achievement-progress-mini">
                        <div className="mini-progress-track">
                          <div className="mini-progress-fill" style={{ width: `${progressPct}%`, background: rs.border }} />
                        </div>
                        <span className="mini-progress-text">
                          {progress?.progress ?? 0} / {a.requirement.value} ({progressPct}%)
                        </span>
                      </div>
                    )}
                    {a.reward.experience && (
                      <div className="achievement-reward">奖励: +{a.reward.experience} XP {a.reward.coins ? `· ${a.reward.coins}金币` : ''}</div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </>
      )}

      {activeSection === 'timeline' && (
        <Card>
          <h3 className="section-subtitle">我的成就解锁时间线</h3>
          {timelineItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <p>暂无解锁的成就，快去学习吧！</p>
              <Button variant="primary" className="mt-4">开始学习</Button>
            </div>
          ) : (
            <div className="timeline">
              {timelineItems.map((m) => {
                const rs = rarityStyle[m.achievement.rarity]
                const date = new Date(m.unlockedAt || 0)
                return (
                  <div key={m.id} className="timeline-item">
                    <div className="timeline-dot" style={{ background: rs.border }} />
                    <div className="timeline-line" />
                    <div className="timeline-icon" style={{ background: rs.bg }}>
                      {m.achievement.icon}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">
                        <strong>{m.achievement.title}</strong>
                        <span className="timeline-rarity" style={{ color: rs.text }}>{rs.label}</span>
                      </div>
                      <div className="timeline-desc">{m.achievement.description}</div>
                      <div className="timeline-date">
                        解锁于 {date.getFullYear()}-{String(date.getMonth() + 1).padStart(2, '0')}-{String(date.getDate()).padStart(2, '0')} {String(date.getHours()).padStart(2, '0')}:{String(date.getMinutes()).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      )}

      {activeSection === 'ranking' && (
        <Card header={
          <div className="ranking-header">
            <h3>🏅 全球排行榜 · TOP 20</h3>
            <div className="ranking-tabs">
              <button className="rank-tab active">总榜</button>
              <button className="rank-tab">周榜</button>
              <button className="rank-tab">月榜</button>
            </div>
          </div>
        }>
          <div className="leaderboard-list">
            <div className="leaderboard-head">
              <span className="col-rank">排名</span>
              <span className="col-user">用户</span>
              <span className="col-level">等级</span>
              <span className="col-xp">XP</span>
              <span className="col-streak">连续</span>
              <span className="col-ach">成就</span>
            </div>
            {sortedLeaderboard.map((u) => {
              const isMe = u.isCurrentUser || u.userId === user?.id
              return (
                <div key={u.userId + u.rank} className={`leaderboard-row ${isMe ? 'is-me' : ''}`}>
                  <span className="col-rank">
                    {u.rank <= 3 ? (
                      <span className={`rank-medal rank-${u.rank}`}>
                        {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    ) : (
                      <span className="rank-num">#{u.rank}</span>
                    )}
                  </span>
                  <span className="col-user">
                    <span className="user-avatar-sm">
                      {u.username.charAt(0)}
                    </span>
                    <span className="user-name">{u.username}</span>
                    {isMe && <span className="me-tag">（我）</span>}
                  </span>
                  <span className="col-level"><span className="level-chip">Lv.{u.level}</span></span>
                  <span className="col-xp">{u.experience.toLocaleString()}</span>
                  <span className="col-streak">🔥 {u.streak}d</span>
                  <span className="col-ach">🏆 {u.achievementsCount}</span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
