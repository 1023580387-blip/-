import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import Modal from '../components/common/Modal'
import { useToast } from '../components/common/Toast'
import {
  getPosts,
  getHotPosts,
  createPost,
  likePost,
  type Post,
  type CreatePostData,
} from '../api/modules/communityApi'
import { useAuthStore } from '../store/authStore'

const TABS = [
  { key: 'all', label: '综合', color: '#6366f1' },
  { key: 'english', label: '英语', color: '#3b82f6' },
  { key: 'japanese', label: '日语', color: '#ef4444' },
  { key: 'korean', label: '韩语', color: '#8b5cf6' },
  { key: 'tip', label: '经验分享', color: '#10b981' },
  { key: 'question', label: '提问', color: '#f59e0b' },
] as const

const mockPosts: Post[] = [
  {
    id: 'p1', authorId: 'u1', author: { id: 'u1', username: '学霸小明', avatar: '', level: 32 },
    title: '坚持365天学英语，我的经验总结与心得分享',
    content: '从零基础到现在能流畅看英文原著，中间经历了很多挫折...',
    tags: ['经验分享', '英语', '学习方法'], category: 'tip',
    likesCount: 328, commentsCount: 56, viewsCount: 5420, isLiked: false, isPinned: true,
    createdAt: '2026-08-10T09:20:00Z', updatedAt: '2026-08-10T09:20:00Z',
  },
  {
    id: 'p2', authorId: 'u2', author: { id: 'u2', username: '日语入门者', avatar: '', level: 8 },
    title: '请问五十音图要多久才能背完啊？感觉好难记',
    content: '刚开始学日语，平假名总是记混，有什么诀窍吗？求大佬指点！',
    tags: ['提问', '日语', '五十音'], category: 'question',
    likesCount: 42, commentsCount: 23, viewsCount: 580, isLiked: false,
    createdAt: '2026-08-12T14:10:00Z', updatedAt: '2026-08-12T14:10:00Z',
  },
  {
    id: 'p3', authorId: 'u3', author: { id: 'u3', username: '韩语爱好者', avatar: '', level: 15 },
    title: 'TOPIK 6级通过！分享我的备考资料和方法',
    content: '备考三个月终于考过了TOPIK高级，整理了一些笔记和真题资源...',
    tags: ['经验分享', '韩语', 'TOPIK'], category: 'tip',
    likesCount: 186, commentsCount: 41, viewsCount: 2980, isLiked: true,
    createdAt: '2026-08-11T20:30:00Z', updatedAt: '2026-08-11T20:30:00Z',
  },
  {
    id: 'p4', authorId: 'u4', author: { id: 'u4', username: '多语学习家', avatar: '', level: 25 },
    title: '同时学三门语言是种什么体验？',
    content: '最近同时在学英语、日语、韩语，时间管理真的很重要...',
    tags: ['综合', '多语言'], category: 'discussion',
    likesCount: 124, commentsCount: 37, viewsCount: 1520, isLiked: false,
    createdAt: '2026-08-12T08:45:00Z', updatedAt: '2026-08-12T08:45:00Z',
  },
  {
    id: 'p5', authorId: 'u5', author: { id: 'u5', username: 'Mochi甜', avatar: '', level: 19 },
    title: '打卡Day100！终于完成日语初级课程了😭',
    content: '从4月开始学习日语，今天终于学完了初级的所有内容...',
    tags: ['学习进度', '日语', '打卡'], category: 'progress',
    likesCount: 256, commentsCount: 68, viewsCount: 3100, isLiked: false,
    createdAt: '2026-08-13T07:00:00Z', updatedAt: '2026-08-13T07:00:00Z',
  },
  {
    id: 'p6', authorId: 'u6', author: { id: 'u6', username: 'Lina学英语', avatar: '', level: 28 },
    title: '雅思8.5备考经验：听力如何从6分提升到8.5',
    content: '分四个部分详细讲了我是怎么练习听力的，附资源链接...',
    tags: ['经验分享', '英语', '雅思'], category: 'tip',
    likesCount: 410, commentsCount: 89, viewsCount: 7820, isLiked: false,
    createdAt: '2026-08-09T16:20:00Z', updatedAt: '2026-08-09T16:20:00Z',
  },
]

const mockHotPosts: Post[] = [mockPosts[5], mockPosts[0], mockPosts[4], mockPosts[2]]

export default function Community() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { toast, ToastComponent } = useToast()

  const [posts, setPosts] = useState<Post[]>([])
  const [hotPosts, setHotPosts] = useState<Post[]>([])
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['key']>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPost, setNewPost] = useState<CreatePostData>({
    title: '',
    content: '',
    category: 'discussion',
    tags: [],
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [p, h] = await Promise.all([
          getPosts({ pageSize: 20 }).catch(() => ({ data: { posts: mockPosts, total: mockPosts.length, page: 1, pageSize: 20 } })),
          getHotPosts({ limit: 4 }).catch(() => ({ data: mockHotPosts })),
        ])
        setPosts((p.data.posts || []).map((post) => ({
          ...post,
          author: { ...post.author, avatar: post.author.avatar ?? '' },
        })))
        setHotPosts((h.data || []).map((post) => ({
          ...post,
          author: { ...post.author, avatar: post.author.avatar ?? '' },
        })))
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'all') return true
    if (activeTab === 'tip') return p.category === 'tip'
    if (activeTab === 'question') return p.category === 'question'
    if (activeTab === 'english') return p.tags.some((t) => t.includes('英语') || t.includes('雅思') || t.includes('托福'))
    if (activeTab === 'japanese') return p.tags.some((t) => t.includes('日语') || t.includes('五十音') || t.includes('TOPIK') === false)
    if (activeTab === 'korean') return p.tags.some((t) => t.includes('韩语') || t.includes('TOPIK'))
    return true
  })

  const handleLike = async (postId: string) => {
    try {
      const res = await likePost(postId)
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, isLiked: res.data.liked, likesCount: res.data.likesCount } : p)))
    } catch {
      setPosts((prev) => prev.map((p) => {
        if (p.id === postId) {
          return { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
        }
        return p
      }))
    }
  }

  const handleTagAdd = () => {
    const t = tagInput.trim()
    if (!t) return
    if (newPost.tags && newPost.tags.length >= 5) {
      toast.warning('最多添加5个标签')
      return
    }
    if (newPost.tags?.includes(t)) return
    setNewPost({ ...newPost, tags: [...(newPost.tags || []), t] })
    setTagInput('')
  }

  const handleTagRemove = (t: string) => {
    setNewPost({ ...newPost, tags: (newPost.tags || []).filter((x) => x !== t) })
  }

  const handleCreateSubmit = async () => {
    if (!newPost.title.trim()) return toast.warning('请输入标题')
    if (!newPost.content.trim()) return toast.warning('请输入内容')
    try {
      const res = await createPost(newPost)
      setPosts([res.data, ...posts])
      setShowCreateModal(false)
      setNewPost({ title: '', content: '', category: 'discussion', tags: [] })
      toast.success('发帖成功！')
    } catch {
      const mock: Post = {
        id: 'new-' + Date.now(),
        authorId: user?.id || 'me',
        author: { id: user?.id || 'me', username: user?.username || '我', avatar: user?.avatar ?? '', level: 12 },
        title: newPost.title,
        content: newPost.content,
        tags: newPost.tags || [],
        category: newPost.category,
        likesCount: 0,
        commentsCount: 0,
        viewsCount: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setPosts([mock, ...posts])
      setShowCreateModal(false)
      setNewPost({ title: '', content: '', category: 'discussion', tags: [] })
      toast.success('发帖成功！')
    }
  }

  const goDetail = (postId: string) => {
    navigate(`/community/posts/${postId}`)
  }

  const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000
    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
    return `${Math.floor(diff / 86400)}天前`
  }

  if (isLoading) {
    return <Loading fullScreen text="加载社区中..." />
  }

  return (
    <div className="page-container community-page">
      <ToastComponent />
      <h1 className="page-title">社区</h1>

      <div className="community-layout">
        <div className="community-main">
          <div className="community-bar">
            <div className="filter-tabs">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`filter-tab ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                  style={activeTab === t.key ? { borderColor: t.color, color: t.color } : {}}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <Button
              variant="primary"
              onClick={() => setShowCreateModal(true)}
              leftIcon={
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                </svg>
              }
            >
              发帖
            </Button>
          </div>

          <div className="post-list">
            {filteredPosts.length === 0 && (
              <Card className="text-center py-12">
                <p>暂无相关帖子</p>
              </Card>
            )}
            {filteredPosts.map((p) => (
              <Card
                key={p.id}
                className={`post-card ${p.isPinned ? 'pinned' : ''}`}
                onClick={() => goDetail(p.id)}
                hoverable
              >
                <div className="post-header">
                  <div className="post-author">
                    <span className="author-avatar">{p.author.username.charAt(0)}</span>
                    <div className="author-info">
                      <span className="author-name">{p.author.username}</span>
                      <span className="author-level">Lv.{p.author.level}</span>
                      <span className="post-time">· {timeAgo(p.createdAt)}</span>
                      {p.isPinned && <span className="pinned-tag">📌 置顶</span>}
                    </div>
                  </div>
                </div>
                <h3 className="post-title">{p.title}</h3>
                <p className="post-excerpt">{p.content.length > 120 ? p.content.slice(0, 120) + '...' : p.content}</p>
                <div className="post-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="post-tag">#{t}</span>
                  ))}
                </div>
                <div className="post-footer">
                  <button
                    className={`post-action ${p.isLiked ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(p.id)
                    }}
                  >
                    {p.isLiked ? '❤️' : '🤍'} {p.likesCount}
                  </button>
                  <span className="post-action">💬 {p.commentsCount}</span>
                  <span className="post-action">👁️ {p.viewsCount}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <aside className="community-sidebar">
          <Card header={<h4>🔥 热门帖子</h4>} className="hot-posts-card">
            <div className="hot-list">
              {hotPosts.map((p, i) => (
                <div
                  key={p.id}
                  className="hot-item"
                  onClick={() => goDetail(p.id)}
                >
                  <span className={`hot-rank ${i < 3 ? 'top' : ''}`}>{i + 1}</span>
                  <div className="hot-content">
                    <div className="hot-title">{p.title}</div>
                    <div className="hot-meta">❤ {p.likesCount} · 💬 {p.commentsCount}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="side-stats mt-6">
            <h4>📊 社区数据</h4>
            <div className="side-stat-row"><span>今日新帖</span><strong>128</strong></div>
            <div className="side-stat-row"><span>累计用户</span><strong>23,456</strong></div>
            <div className="side-stat-row"><span>在线人数</span><strong>892</strong></div>
          </Card>
        </aside>
      </div>

      <Modal
        open={showCreateModal}
        title="✍️ 发布新帖子"
        width="lg"
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateSubmit}
        confirmText="发布"
      >
        <div className="create-post-form">
          <div className="form-group">
            <label>标题</label>
            <input
              type="text"
              className="form-input"
              placeholder="请输入标题，建议10-50字"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label>分类</label>
            <select
              className="form-input"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value as Post['category'] })}
            >
              <option value="discussion">综合讨论</option>
              <option value="tip">经验分享</option>
              <option value="question">求助提问</option>
              <option value="progress">学习打卡</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div className="form-group">
            <label>标签（最多5个，回车添加）</label>
            <div className="tags-input">
              <div className="tags-chips">
                {(newPost.tags || []).map((t) => (
                  <span key={t} className="tag-chip">
                    #{t}
                    <button type="button" onClick={() => handleTagRemove(t)}>×</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="form-input"
                placeholder="输入标签名后回车"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleTagAdd()
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label>内容</label>
            <textarea
              className="form-textarea"
              placeholder="分享你的想法..."
              rows={6}
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
