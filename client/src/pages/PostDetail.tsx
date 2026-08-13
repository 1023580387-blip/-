import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import { useToast } from '../components/common/Toast'
import {
  getPostDetail,
  likePost,
  createComment,
  likeComment,
  type Comment,
  type Post,
} from '../api/modules/communityApi'
import { useAuthStore } from '../store/authStore'

const mockPost = {
  id: 'p1',
  authorId: 'u1',
  author: { id: 'u1', username: '学霸小明', avatar: '', level: 32 },
  title: '坚持365天学英语，我的经验总结与心得分享',
  content: `从零基础到现在能流畅看英文原著，中间经历了很多挫折，也走了不少弯路。今天想把这一年多的心得分享给大家，希望对正在学习英语的同学有所帮助。

## 一、词汇积累
背单词不要孤立地背，一定要放在语境中理解。我用的是"间隔重复法"，每天花30分钟复习旧词+学习新词，然后把当天学的词造3个句子，这样记忆会深刻很多。

## 二、听力输入
我每天保证至少1小时的可理解性输入（comprehensive input），从简单的儿童动画开始，慢慢过渡到播客、TED演讲，最后是美剧。一开始可以开字幕，但建议尽快去掉字幕，直接听。

## 三、口语输出
很多同学不敢开口，其实语言就是要用的！我找了个语伴每周练习3次，平时自己也会用英语自言自语，或者把每天发生的事用英语讲一遍录下来自己听。

## 四、语法体系
语法不要死记规则，而是结合例句理解。推荐《英语在用》这套书，边学边练，效果很好。

最后想说，坚持比方法更重要。大家一起加油！💪`,
  tags: ['经验分享', '英语', '学习方法'],
  category: 'tip' as const,
  likesCount: 328,
  commentsCount: 56,
  viewsCount: 5420,
  isLiked: false,
  isPinned: true,
  hotScore: 9800,
  createdAt: '2026-08-10T09:20:00Z',
  updatedAt: '2026-08-10T09:20:00Z',
  comments: [
    {
      id: 'c1', postId: 'p1', authorId: 'u2',
      author: { id: 'u2', username: 'Lina学英语', avatar: '', level: 28 },
      content: '写得太好了！间隔重复法真的很有用，我用了3个月词汇量翻倍了。请问语伴是在哪里找的呀？',
      likesCount: 32, isLiked: false,
      createdAt: '2026-08-10T10:15:00Z', updatedAt: '2026-08-10T10:15:00Z',
      replies: [
        {
          id: 'c1-1', postId: 'p1', authorId: 'u1', parentId: 'c1',
          author: { id: 'u1', username: '学霸小明', avatar: '', level: 32 },
          content: '我是在Tandem这个APP上找的，你可以试试~',
          likesCount: 8, isLiked: false,
          createdAt: '2026-08-10T10:30:00Z', updatedAt: '2026-08-10T10:30:00Z',
        },
      ],
    },
    {
      id: 'c2', postId: 'p1', authorId: 'u3',
      author: { id: 'u3', username: '词汇猎人', avatar: '', level: 20 },
      content: '请问每天30分钟的话，新词和旧词的比例是多少呀？我总是复习时间不够用...',
      likesCount: 15, isLiked: true,
      createdAt: '2026-08-10T11:20:00Z', updatedAt: '2026-08-10T11:20:00Z',
    },
    {
      id: 'c3', postId: 'p1', authorId: 'u4',
      author: { id: 'u4', username: '坚持就是胜利', avatar: '', level: 10 },
      content: '感谢分享！已经坚持60天了，看到这篇帖子又有动力了！',
      likesCount: 48, isLiked: false,
      createdAt: '2026-08-11T20:40:00Z', updatedAt: '2026-08-11T20:40:00Z',
    },
    {
      id: 'c4', postId: 'p1', authorId: 'u5',
      author: { id: 'u5', username: 'MorningLee', avatar: '', level: 17 },
      content: '请问《英语在用》是用的中文版还是英文版？感觉两版差别大吗？',
      likesCount: 9, isLiked: false,
      createdAt: '2026-08-12T08:12:00Z', updatedAt: '2026-08-12T08:12:00Z',
    },
  ],
}

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { toast, ToastComponent } = useToast()

  const [post, setPost] = useState<(Post & { comments: Comment[] }) | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null)
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const load = async () => {
      if (!postId) return
      setIsLoading(true)
      try {
        const res = await getPostDetail(postId)
        setPost({
          ...res.data,
          author: { ...res.data.author, avatar: res.data.author.avatar ?? '' },
          comments: [],
        })
        setComments((res.data.comments || []).map((c) => ({
          ...c,
          author: { ...c.author, avatar: c.author.avatar ?? '' },
          replies: c.replies?.map((r) => ({
            ...r,
            author: { ...r.author, avatar: r.author.avatar ?? '' },
          })),
        })))
      } catch {
        setPost(mockPost)
        setComments(mockPost.comments as any)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [postId])

  const handleLikePost = async () => {
    if (!post) return
    try {
      const res = await likePost(post.id)
      setPost({ ...post, isLiked: res.data.liked, likesCount: res.data.likesCount })
    } catch {
      setPost({
        ...post,
        isLiked: !post.isLiked,
        likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
      })
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      const res = await likeComment(commentId)
      const updateLike = (list: Comment[]): Comment[] =>
        list.map((c) => {
          if (c.id === commentId) {
            return { ...c, isLiked: res.data.liked, likesCount: res.data.likesCount }
          }
          if (c.replies) {
            return { ...c, replies: updateLike(c.replies) }
          }
          return c
        })
      setComments(updateLike(comments))
    } catch {
      const updateLike = (list: Comment[]): Comment[] =>
        list.map((c) => {
          if (c.id === commentId) {
            return {
              ...c,
              isLiked: !c.isLiked,
              likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1,
            }
          }
          if (c.replies) {
            return { ...c, replies: updateLike(c.replies) }
          }
          return c
        })
      setComments(updateLike(comments))
    }
  }

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !postId) return
    setIsSubmitting(true)
    try {
      const res = await createComment({
        postId,
        content: commentText.trim(),
        parentId: replyTo?.id,
      })
      if (replyTo) {
        setComments(
          comments.map((c) => {
            if (c.id === replyTo.id) {
              return { ...c, replies: [...(c.replies || []), res.data] }
            }
            return c
          })
        )
      } else {
        setComments([...comments, res.data])
      }
      setCommentText('')
      setReplyTo(null)
      toast.success('评论成功！')
    } catch {
      const newComment: Comment = {
        id: 'c-new-' + Date.now(),
        postId,
        authorId: user?.id || 'me',
        author: { id: user?.id || 'me', username: user?.username || '我', avatar: user?.avatar ?? '', level: 12 },
        content: commentText.trim(),
        likesCount: 0,
        isLiked: false,
        parentId: replyTo?.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      if (replyTo) {
        setComments(
          comments.map((c) => {
            if (c.id === replyTo.id) {
              return { ...c, replies: [...(c.replies || []), newComment] }
            }
            return c
          })
        )
      } else {
        setComments([...comments, newComment])
      }
      if (post) setPost({ ...post, commentsCount: post.commentsCount + 1 })
      setCommentText('')
      setReplyTo(null)
      toast.success('评论成功！')
    } finally {
      setIsSubmitting(false)
    }
  }

  const startReply = (c: Comment) => {
    setReplyTo({ id: c.id, name: c.author.username })
    commentInputRef.current?.focus()
  }

  const cancelReply = () => setReplyTo(null)

  const timeAgo = (iso: string) => {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000
    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
    return `${Math.floor(diff / 86400)}天前`
  }

  const renderContent = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h4 key={i} className="content-h4">{line.slice(3)}</h4>
      }
      return <p key={i} className="content-p">{line}</p>
    })

  const renderComment = (c: Comment, isReply = false) => (
    <div key={c.id} className={`comment-item ${isReply ? 'reply' : ''}`}>
      <div className="comment-avatar">{c.author.username.charAt(0)}</div>
      <div className="comment-body">
        <div className="comment-meta">
          <span className="comment-name">{c.author.username}</span>
          <span className="comment-level">Lv.{c.author.level}</span>
          <span className="comment-time">{timeAgo(c.createdAt)}</span>
        </div>
        <div className="comment-content">{c.content}</div>
        <div className="comment-actions">
          <button
            className={`comment-action ${c.isLiked ? 'liked' : ''}`}
            onClick={() => handleLikeComment(c.id)}
          >
            {c.isLiked ? '❤️' : '🤍'} {c.likesCount}
          </button>
          {!isReply && (
            <button className="comment-action" onClick={() => startReply(c)}>
              💬 回复
            </button>
          )}
        </div>
        {c.replies && c.replies.length > 0 && (
          <div className="comment-replies">
            {c.replies.map((r) => renderComment(r, true))}
          </div>
        )}
      </div>
    </div>
  )

  if (isLoading || !post) {
    return <Loading fullScreen text="加载帖子中..." />
  }

  return (
    <div className="page-container post-detail-page">
      <ToastComponent />
      <div className="detail-back">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← 返回
        </button>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <Card className="post-detail-card">
            <div className="post-detail-header">
              <h1 className="post-detail-title">{post.title}</h1>
              <div className="post-detail-meta">
                <div className="post-author-big">
                  <div className="author-avatar-lg">{post.author.username.charAt(0)}</div>
                  <div>
                    <div className="author-name-lg">{post.author.username}</div>
                    <div className="author-sub">
                      Lv.{post.author.level} · {timeAgo(post.createdAt)} · {post.viewsCount} 阅读
                    </div>
                  </div>
                </div>
                <Button variant={post.isLiked ? 'danger' : 'primary'} size="sm" onClick={handleLikePost}>
                  {post.isLiked ? '❤️' : '🤍'} 点赞 {post.likesCount}
                </Button>
              </div>
            </div>
            <div className="post-tags mb-6">
              {post.tags.map((t) => (
                <span key={t} className="post-tag">#{t}</span>
              ))}
            </div>
            <div className="post-detail-content">{renderContent(post.content)}</div>
          </Card>

          <Card header={<h3>💬 评论区 ({comments.length})</h3>} className="comments-card">
            <div className="comment-input-box">
              {replyTo && (
                <div className="replying-to">
                  回复 <strong>@{replyTo.name}</strong>
                  <button onClick={cancelReply} className="reply-cancel">×</button>
                </div>
              )}
              <textarea
                ref={commentInputRef}
                className="form-textarea"
                rows={3}
                placeholder={replyTo ? `回复 @${replyTo.name}...` : '写下你的评论...'}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="comment-input-actions">
                <span className="char-count">{commentText.length}/500</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitComment}
                  loading={isSubmitting}
                  disabled={!commentText.trim()}
                >
                  {replyTo ? '发送回复' : '发表评论'}
                </Button>
              </div>
            </div>

            <div className="comments-list">
              {comments.length === 0 && (
                <div className="empty-comments">
                  <div className="empty-icon">💭</div>
                  <p>还没有评论，快来抢沙发吧~</p>
                </div>
              )}
              {comments.map((c) => renderComment(c))}
            </div>
          </Card>
        </div>

        <aside className="detail-sidebar">
          <Card className="side-stats">
            <h4>📊 帖子数据</h4>
            <div className="side-stat-row"><span>点赞</span><strong>{post.likesCount}</strong></div>
            <div className="side-stat-row"><span>评论</span><strong>{post.commentsCount}</strong></div>
            <div className="side-stat-row"><span>阅读</span><strong>{post.viewsCount}</strong></div>
            {post.hotScore && <div className="side-stat-row"><span>热度</span><strong>{post.hotScore}</strong></div>}
          </Card>
          <Card className="mt-6" header={<h4>🧑 关于作者</h4>}>
            <div className="author-card-side">
              <div className="author-avatar-lg" style={{ width: 56, height: 56, fontSize: 24 }}>
                {post.author.username.charAt(0)}
              </div>
              <div className="author-side-info">
                <div className="author-name-lg">{post.author.username}</div>
                <div className="author-sub">Lv.{post.author.level}</div>
              </div>
            </div>
            <Button variant="primary" size="sm" fullWidth className="mt-3">关注作者</Button>
          </Card>
        </aside>
      </div>
    </div>
  )
}
