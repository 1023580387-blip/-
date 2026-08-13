import { useState } from 'react';
import { useStore } from '../store';
import { mockPosts as defaultPosts } from '../data/mockData';
import { languageNames } from '../utils';
import type { Language, Post } from '../types';
import { Badge, Modal } from '../components/UI';
import {
  MessageSquare, Heart, Send, Plus, Search, Filter,
  ThumbsUp, Clock, ChevronRight, User
} from 'lucide-react';
import { formatDate } from '../utils';

export function CommunityPage() {
  const { user, posts, addPost, toggleLikePost, addComment } = useStore();
  const [filterLang, setFilterLang] = useState<Language | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', language: 'en' as Language, tags: '' });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const filteredPosts = (posts || defaultPosts).filter(p => {
    if (filterLang !== 'all' && p.language !== filterLang) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!p.title.toLowerCase().includes(s) && !p.content.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const tags = newPost.tags.split(/[,，、\s]+/).filter(Boolean);
    addPost(newPost.title.trim(), newPost.content.trim(), newPost.language, tags);
    setNewPost({ title: '', content: '', language: 'en', tags: '' });
    setShowCreateModal(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <MessageSquare className="w-8 h-8" />
              社区交流
            </h1>
            <p className="text-white/80 max-w-xl">
              与全球的语言学习者一起交流学习心得、分享经验、答疑解惑，共同进步！
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            发布新帖
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl mb-1">📝</div>
          <div className="text-2xl font-bold text-gray-900">{(posts || defaultPosts).length}</div>
          <div className="text-xs text-gray-500">累计帖子</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-1">💬</div>
          <div className="text-2xl font-bold text-gray-900">
            {(posts || defaultPosts).reduce((s, p) => s + p.comments.length, 0)}
          </div>
          <div className="text-xs text-gray-500">累计评论</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-1">❤️</div>
          <div className="text-2xl font-bold text-gray-900">
            {(posts || defaultPosts).reduce((s, p) => s + p.likes, 0)}
          </div>
          <div className="text-xs text-gray-500">累计点赞</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-1">👥</div>
          <div className="text-2xl font-bold text-gray-900">50K+</div>
          <div className="text-xs text-gray-500">活跃学员</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索帖子标题或内容..."
            className="input pl-12"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="flex items-center gap-1 text-sm text-gray-500 mr-1">
            <Filter className="w-4 h-4" /> 语言:
          </span>
          <button
            onClick={() => setFilterLang('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterLang === 'all'
                ? 'bg-primary-500 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {(Object.keys(languageNames) as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => setFilterLang(lang)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterLang === lang
                  ? 'bg-primary-500 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {languageNames[lang].flag} {languageNames[lang].name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-5">
        {filteredPosts.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">没有找到相关帖子</h3>
            <p className="text-gray-500 mb-6">试试调整搜索条件或成为第一个发帖的人吧！</p>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" /> 发布第一个帖子
            </button>
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              expanded={expandedPostId === post.id}
              onToggleExpand={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
              onLike={() => toggleLikePost(post.id)}
              commentText={commentInputs[post.id] || ''}
              setCommentText={(v: string) => setCommentInputs(prev => ({ ...prev, [post.id]: v }))}
              onAddComment={() => handleAddComment(post.id)}
            />
          ))
        )}
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="✨ 发布新帖子"
      >
        <div className="space-y-5">
          <div>
            <label className="label">帖子标题</label>
            <input
              type="text"
              className="input"
              placeholder="一个吸引人的标题..."
              value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">帖子语言</label>
              <select
                className="input"
                value={newPost.language}
                onChange={e => setNewPost({ ...newPost, language: e.target.value as Language })}
              >
                {(Object.keys(languageNames) as Language[]).map(lang => (
                  <option key={lang} value={lang}>
                    {languageNames[lang].flag} {languageNames[lang].name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">标签（用逗号/空格分隔）</label>
              <input
                type="text"
                className="input"
                placeholder="例如: 学习方法, 备考"
                value={newPost.tags}
                onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">帖子内容</label>
            <textarea
              className="input min-h-[160px] resize-y"
              placeholder="分享你的学习心得、经验或问题..."
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={() => setShowCreateModal(false)} className="btn-secondary">
              取消
            </button>
            <button
              onClick={handleCreatePost}
              disabled={!newPost.title.trim() || !newPost.content.trim()}
              className="btn-primary disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> 发布
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

interface PostItemProps {
  post: Post;
  expanded: boolean;
  onToggleExpand: () => void;
  onLike: () => void;
  commentText: string;
  setCommentText: (v: string) => void;
  onAddComment: () => void;
}

function PostItem({
  post, expanded, onToggleExpand, onLike,
  commentText, setCommentText, onAddComment
}: PostItemProps) {
  return (
    <div className="card animate-fade-in">
      {/* Author */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold shrink-0">
          {post.userAvatar || post.username.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-gray-900">{post.username}</span>
            <Badge variant="info">{languageNames[post.language].flag} {languageNames[post.language].name}</Badge>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag, i) => (
              <span key={i} className="badge bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer transition-colors"
        onClick={onToggleExpand}>
        {post.title}
      </h2>
      <div className={`text-gray-600 leading-relaxed whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>
        {post.content}
      </div>
      {!expanded && post.content.length > 150 && (
        <button onClick={onToggleExpand} className="mt-3 text-primary-600 font-medium text-sm flex items-center gap-1">
          展开全文 <ChevronRight className="w-4 h-4 -rotate-90" />
        </button>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-100">
        <button
          onClick={onLike}
          className={`flex items-center gap-2 transition-all ${
            post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${post.liked ? 'fill-red-500' : ''}`} />
          <span className="font-medium">{post.likes}</span>
        </button>
        <button
          onClick={onToggleExpand}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">{post.comments.length} 评论</span>
        </button>
      </div>

      {/* Comments */}
      {expanded && (
        <div className="mt-5 pt-5 border-t border-gray-100 animate-fade-in">
          {/* Comment Input */}
          <div className="flex gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                className="input !py-2.5"
                placeholder="写下你的评论..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onAddComment()}
              />
              <button
                onClick={onAddComment}
                disabled={!commentText.trim()}
                className="btn-primary !px-4 !py-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Comments List */}
          {post.comments.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              暂无评论，抢个沙发吧！🛋️
            </div>
          ) : (
            <div className="space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-300 to-primary-300 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {comment.userAvatar || comment.username.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">{comment.username}</span>
                      <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <button className="mt-2 text-xs text-gray-400 hover:text-red-500 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {comment.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
