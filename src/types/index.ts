export type Language = 'en' | 'ja' | 'ko';

export type LanguageLevel = 'beginner' | 'intermediate' | 'advanced';

export type CourseType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  password: string;
  currentLanguage: Language;
  currentLevel: LanguageLevel;
  points: number;
  streak: number;
  totalStudyMinutes: number;
  registeredAt: string;
  lastStudyDate?: string;
}

export interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  level: LanguageLevel;
  language: Language;
  category: string;
}

export interface GrammarQuestion {
  id: string;
  type: 'choice' | 'fill';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  level: LanguageLevel;
  language: Language;
  grammarPoint: string;
}

export interface SpeakingLesson {
  id: string;
  title: string;
  sentences: {
    original: string;
    translation: string;
    pronunciation: string;
  }[];
  level: LanguageLevel;
  language: Language;
  topic: string;
}

export interface ListeningLesson {
  id: string;
  title: string;
  audioText: string;
  questions: {
    question: string;
    options: string[];
    answer: number;
  }[];
  level: LanguageLevel;
  language: Language;
  topic: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: CourseType;
  level: LanguageLevel;
  language: Language;
  duration: number;
  wordIds?: string[];
  grammarIds?: string[];
  speakingId?: string;
  listeningId?: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: Language;
  level: LanguageLevel;
  thumbnail: string;
  category: string;
  totalLessons: number;
  lessons: Lesson[];
  rating: number;
  students: number;
}

export interface LearningProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLessonId?: string;
  progressPercent: number;
  startedAt: string;
  completedAt?: string;
}

export interface WordProgress {
  userId: string;
  wordId: string;
  correctCount: number;
  wrongCount: number;
  lastReviewedAt?: string;
  mastered: boolean;
}

export interface DailyStudyRecord {
  userId: string;
  date: string;
  studyMinutes: number;
  wordsLearned: number;
  lessonsCompleted: number;
  pointsEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: 'streak' | 'points' | 'words' | 'lessons' | 'languages';
    value: number;
  };
  pointsReward: number;
}

export interface UserAchievement {
  achievementId: string;
  userId: string;
  unlockedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  title: string;
  content: string;
  language: Language;
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  liked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  avatar?: string;
  points: number;
  rank: number;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  courses: string[];
  estimatedDays: number;
  language: Language;
  level: LanguageLevel;
  goal: string;
}
