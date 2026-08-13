import api from '../index';
import type { AxiosResponse } from 'axios';

export interface SubmitWordResultData {
  wordId: string;
  isCorrect: boolean;
  timeSpent: number;
  attempts: number;
}

export interface SubmitExerciseResultData {
  exerciseId: string;
  isCorrect: boolean;
  userAnswer: string;
  timeSpent: number;
  attempts: number;
}

export interface WordResultResponse {
  id: string;
  wordId: string;
  userId: string;
  isCorrect: boolean;
  timeSpent: number;
  attempts: number;
  masteryLevel: number;
  createdAt: string;
}

export interface ExerciseResultResponse {
  id: string;
  exerciseId: string;
  userId: string;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  timeSpent: number;
  attempts: number;
  createdAt: string;
}

export interface CompleteUnitResponse {
  unitId: string;
  completed: boolean;
  experienceGained: number;
  levelUp: boolean;
  newLevel?: number;
  achievementsUnlocked?: string[];
}

export interface LearningStats {
  userId: string;
  totalWordsLearned: number;
  totalExercisesCompleted: number;
  totalUnitsCompleted: number;
  totalCoursesCompleted: number;
  totalExperience: number;
  currentLevel: number;
  experienceToNextLevel: number;
  streakDays: number;
  longestStreak: number;
  lastActiveAt: string;
  weeklyActivity: {
    day: string;
    minutes: number;
  }[];
  accuracy: {
    words: number;
    exercises: number;
    overall: number;
  };
  timeSpentTotal: number;
  timeSpentToday: number;
  timeSpentThisWeek: number;
}

export const submitWordResult = (
  data: SubmitWordResultData
): Promise<AxiosResponse<WordResultResponse>> => {
  return api.post<WordResultResponse>('/learning/words/result', data);
};

export const submitExerciseResult = (
  data: SubmitExerciseResultData
): Promise<AxiosResponse<ExerciseResultResponse>> => {
  return api.post<ExerciseResultResponse>('/learning/exercises/result', data);
};

export const completeUnit = (
  unitId: string
): Promise<AxiosResponse<CompleteUnitResponse>> => {
  return api.post<CompleteUnitResponse>(`/learning/units/${unitId}/complete`);
};

export const getStats = (params?: {
  period?: 'today' | 'week' | 'month' | 'all';
}): Promise<AxiosResponse<LearningStats>> => {
  return api.get<LearningStats>('/learning/stats', { params });
};
