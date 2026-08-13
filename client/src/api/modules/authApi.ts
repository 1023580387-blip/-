import api from '../index';
import type { AxiosResponse } from 'axios';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  level?: number;
  experience?: number;
  streak?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  nativeLanguage?: string;
  targetLanguage?: string;
}

export interface UpdateMeData {
  username?: string;
  avatar?: string;
  nativeLanguage?: string;
  targetLanguage?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const register = (
  data: RegisterData
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post<AuthResponse>('/auth/register', data);
};

export const login = (
  data: LoginData
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post<AuthResponse>('/auth/login', data);
};

export const getMe = (): Promise<AxiosResponse<User>> => {
  return api.get<User>('/auth/me');
};

export const updateMe = (
  data: UpdateMeData
): Promise<AxiosResponse<User>> => {
  return api.patch<User>('/auth/me', data);
};
