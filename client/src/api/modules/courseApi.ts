import api from '../index';
import type { AxiosResponse } from 'axios';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  languageFrom: string;
  languageTo: string;
  level: number;
  units: Unit[];
  progress?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  words: Word[];
  exercises: Exercise[];
  isCompleted?: boolean;
  isUnlocked?: boolean;
  progress?: number;
}

export interface Word {
  id: string;
  unitId: string;
  word: string;
  translation: string;
  pronunciation?: string;
  image?: string;
  example?: string;
  partOfSpeech?: string;
}

export interface Exercise {
  id: string;
  unitId: string;
  type: 'choice' | 'fill' | 'match' | 'listen' | 'speak';
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
  audioUrl?: string;
  order: number;
}

export interface Recommendation {
  id: string;
  type: 'course' | 'unit' | 'word';
  targetId: string;
  title: string;
  description: string;
  reason: string;
  relevanceScore: number;
}

export const getLanguages = (): Promise<AxiosResponse<Language[]>> => {
  return api.get<Language[]>('/courses/languages');
};

export const getCourses = (params?: {
  languageFrom?: string;
  languageTo?: string;
  level?: number;
}): Promise<AxiosResponse<Course[]>> => {
  return api.get<Course[]>('/courses', { params });
};

export const getCourseDetail = (
  courseId: string
): Promise<AxiosResponse<Course>> => {
  return api.get<Course>(`/courses/${courseId}`);
};

export const getUnitDetail = (
  unitId: string
): Promise<AxiosResponse<Unit>> => {
  return api.get<Unit>(`/courses/units/${unitId}`);
};

export const getRecommendations = (params?: {
  limit?: number;
  type?: Recommendation['type'];
}): Promise<AxiosResponse<Recommendation[]>> => {
  return api.get<Recommendation[]>('/courses/recommendations', { params });
};
