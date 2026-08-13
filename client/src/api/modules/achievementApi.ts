import api from '../index';
import type { AxiosResponse } from 'axios';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'social' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: {
    type: string;
    value: number;
  };
  reward: {
    experience?: number;
    coins?: number;
    badgeId?: string;
  };
  unlockedCount?: number;
}

export interface UserAchievement {
  id: string;
  achievementId: string;
  userId: string;
  achievement: Achievement;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  level: number;
  experience: number;
  streak: number;
  achievementsCount: number;
  isCurrentUser?: boolean;
}

export const getAchievements = (params?: {
  category?: Achievement['category'];
  rarity?: Achievement['rarity'];
}): Promise<AxiosResponse<Achievement[]>> => {
  return api.get<Achievement[]>('/achievements', { params });
};

export const getMyAchievements = (params?: {
  isUnlocked?: boolean;
  category?: Achievement['category'];
}): Promise<AxiosResponse<UserAchievement[]>> => {
  return api.get<UserAchievement[]>('/achievements/me', { params });
};

export const getLeaderboard = (params?: {
  type?: 'global' | 'friends' | 'weekly' | 'monthly';
  limit?: number;
  offset?: number;
}): Promise<AxiosResponse<LeaderboardEntry[]>> => {
  return api.get<LeaderboardEntry[]>('/achievements/leaderboard', { params });
};
