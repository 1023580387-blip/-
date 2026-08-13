import type { Language, LanguageLevel, CourseType } from '../types';

export const languageNames: Record<Language, { name: string; flag: string; nativeName: string }> = {
  en: { name: '英语', flag: '🇺🇸', nativeName: 'English' },
  ja: { name: '日语', flag: '🇯🇵', nativeName: '日本語' },
  ko: { name: '韩语', flag: '🇰🇷', nativeName: '한국어' },
};

export const levelNames: Record<LanguageLevel, { name: string; color: string }> = {
  beginner: { name: '初级', color: 'bg-green-100 text-green-700' },
  intermediate: { name: '中级', color: 'bg-blue-100 text-blue-700' },
  advanced: { name: '高级', color: 'bg-purple-100 text-purple-700' },
};

export const courseTypeNames: Record<CourseType, { name: string; icon: string; color: string }> = {
  vocabulary: { name: '单词记忆', icon: '📖', color: 'bg-primary-50 text-primary-600' },
  grammar: { name: '语法练习', icon: '📝', color: 'bg-secondary-50 text-secondary-600' },
  speaking: { name: '口语跟读', icon: '🎙️', color: 'bg-accent-50 text-accent-600' },
  listening: { name: '听力训练', icon: '🎧', color: 'bg-warn-50 text-warn-600' },
};

export const formatMinutes = (minutes: number): string => {
  if (minutes < 60) return `${minutes}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return date.toLocaleDateString('zh-CN');
};

export const getRandomId = (): string => Math.random().toString(36).substring(2, 11);

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
