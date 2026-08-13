import api from '../index';
import type { AxiosResponse } from 'axios';

export interface PostAuthor {
  id: string;
  username: string;
  avatar?: string;
  level: number;
}

export interface Post {
  id: string;
  authorId: string;
  author: PostAuthor;
  title: string;
  content: string;
  tags: string[];
  category: 'discussion' | 'question' | 'tip' | 'progress' | 'other';
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isLiked: boolean;
  isPinned?: boolean;
  hotScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: PostAuthor;
  content: string;
  likesCount: number;
  isLiked: boolean;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  tags?: string[];
  category: Post['category'];
}

export interface CreateCommentData {
  postId: string;
  content: string;
  parentId?: string;
}

export interface PaginatedPosts {
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
}

export const getPosts = (params?: {
  page?: number;
  pageSize?: number;
  category?: Post['category'];
  tag?: string;
  authorId?: string;
}): Promise<AxiosResponse<PaginatedPosts>> => {
  return api.get<PaginatedPosts>('/community/posts', { params });
};

export const getHotPosts = (params?: {
  limit?: number;
  category?: Post['category'];
}): Promise<AxiosResponse<Post[]>> => {
  return api.get<Post[]>('/community/posts/hot', { params });
};

export const getPostDetail = (
  postId: string
): Promise<AxiosResponse<Post & { comments: Comment[] }>> => {
  return api.get<Post & { comments: Comment[] }>(`/community/posts/${postId}`);
};

export const createPost = (
  data: CreatePostData
): Promise<AxiosResponse<Post>> => {
  return api.post<Post>('/community/posts', data);
};

export const likePost = (
  postId: string
): Promise<AxiosResponse<{ liked: boolean; likesCount: number }>> => {
  return api.post<{ liked: boolean; likesCount: number }>(
    `/community/posts/${postId}/like`
  );
};

export const createComment = (
  data: CreateCommentData
): Promise<AxiosResponse<Comment>> => {
  return api.post<Comment>('/community/comments', data);
};

export const likeComment = (
  commentId: string
): Promise<AxiosResponse<{ liked: boolean; likesCount: number }>> => {
  return api.post<{ liked: boolean; likesCount: number }>(
    `/community/comments/${commentId}/like`
  );
};
