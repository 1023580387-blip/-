import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User, LearningProgress, WordProgress, DailyStudyRecord,
  UserAchievement, Post, Language, LanguageLevel
} from '../types';
import {
  demoUser, mockWords, mockCourses, mockGrammarQuestions,
  mockSpeakingLessons, mockListeningLessons, mockAchievements,
  mockPosts, mockLeaderboard, mockLearningPaths, generateDailyRecords
} from '../data/mockData';

interface StoreState {
  // Auth
  user: User | null;
  allUsers: User[];
  isAuthenticated: boolean;
  
  // Learning Data
  learningProgresses: LearningProgress[];
  wordProgresses: WordProgress[];
  dailyRecords: DailyStudyRecord[];
  userAchievements: UserAchievement[];
  
  // Community
  posts: Post[];
  
  // Actions - Auth
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (username: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  switchLanguage: (lang: Language) => void;
  switchLevel: (level: LanguageLevel) => void;
  
  // Actions - Learning
  startCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, studyMinutes: number) => void;
  markWord: (wordId: string, correct: boolean) => void;
  addPoints: (points: number) => void;
  checkAchievements: () => string[];
  
  // Actions - Community
  addPost: (title: string, content: string, language: Language, tags: string[]) => void;
  toggleLikePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  
  // Derived
  getFilteredWords: (lang: Language, level: LanguageLevel) => typeof mockWords;
  getFilteredGrammar: (lang: Language, level: LanguageLevel) => typeof mockGrammarQuestions;
  getFilteredSpeaking: (lang: Language, level: LanguageLevel) => typeof mockSpeakingLessons;
  getFilteredListening: (lang: Language, level: LanguageLevel) => typeof mockListeningLessons;
  getRecommendedCourses: () => typeof mockCourses;
  getProgressByCourse: (courseId: string) => number;
  getTotalWordsLearned: () => number;
  getTotalLessonsCompleted: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      allUsers: [demoUser],
      isAuthenticated: false,
      learningProgresses: [],
      wordProgresses: [],
      dailyRecords: [],
      userAchievements: [],
      posts: mockPosts,

      login: (email, password) => {
        const foundUser = get().allUsers.find(
          u => u.email === email && u.password === password
        );
        if (foundUser) {
          set({
            user: foundUser,
            isAuthenticated: true,
            dailyRecords: generateDailyRecords(foundUser.id),
          });
          // 给演示用户一些初始进度
          if (foundUser.id === 'demo-user-1') {
            set({
              learningProgresses: [
                { userId: foundUser.id, courseId: 'c-en-beginner', completedLessons: ['l-en-b-1', 'l-en-b-2'], progressPercent: 40, startedAt: '2024-01-10' },
              ],
              wordProgresses: mockWords.slice(0, 6).map(w => ({
                userId: foundUser.id, wordId: w.id, correctCount: 3, wrongCount: 0, mastered: true
              })),
            });
          }
          return { success: true, message: '登录成功！' };
        }
        return { success: false, message: '邮箱或密码错误' };
      },

      register: (username, email, password) => {
        if (get().allUsers.some(u => u.email === email)) {
          return { success: false, message: '该邮箱已被注册' };
        }
        const newUser: User = {
          id: `u-${Date.now()}`,
          username,
          email,
          password,
          currentLanguage: 'en',
          currentLevel: 'beginner',
          points: 0,
          streak: 0,
          totalStudyMinutes: 0,
          registeredAt: new Date().toISOString().split('T')[0],
        };
        set(state => ({
          allUsers: [...state.allUsers, newUser],
          user: newUser,
          isAuthenticated: true,
          dailyRecords: [],
        }));
        return { success: true, message: '注册成功！' };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      switchLanguage: (lang) => {
        set(state => state.user ? { user: { ...state.user, currentLanguage: lang } } : {});
      },

      switchLevel: (level) => {
        set(state => state.user ? { user: { ...state.user, currentLevel: level } } : {});
      },

      startCourse: (courseId) => {
        const { user, learningProgresses } = get();
        if (!user) return;
        if (!learningProgresses.find(p => p.courseId === courseId && p.userId === user.id)) {
          set(state => ({
            learningProgresses: [...state.learningProgresses, {
              userId: user.id,
              courseId,
              completedLessons: [],
              progressPercent: 0,
              startedAt: new Date().toISOString().split('T')[0],
            }]
          }));
        }
      },

      completeLesson: (courseId, lessonId, studyMinutes) => {
        const { user } = get();
        if (!user) return;
        
        set(state => {
          const course = mockCourses.find(c => c.id === courseId);
          const totalLessons = course?.totalLessons || 1;
          
          const updatedProgresses = state.learningProgresses.map(p => {
            if (p.courseId === courseId && p.userId === user.id) {
              const completed = p.completedLessons.includes(lessonId)
                ? p.completedLessons
                : [...p.completedLessons, lessonId];
              return {
                ...p,
                completedLessons: completed,
                progressPercent: Math.round((completed.length / totalLessons) * 100),
              };
            }
            return p;
          });
          
          // 添加每日记录
          const today = new Date().toISOString().split('T')[0];
          const todayRecord = state.dailyRecords.find(r => r.date === today);
          let updatedRecords = [...state.dailyRecords];
          if (todayRecord) {
            updatedRecords = updatedRecords.map(r =>
              r.date === today ? {
                ...r,
                studyMinutes: r.studyMinutes + studyMinutes,
                lessonsCompleted: r.lessonsCompleted + 1,
                pointsEarned: r.pointsEarned + 20,
              } : r
            );
          } else {
            updatedRecords.push({
              userId: user.id,
              date: today,
              studyMinutes,
              wordsLearned: 0,
              lessonsCompleted: 1,
              pointsEarned: 20,
            });
          }
          
          // 检查连续学习天数
          const sortedDates = [...new Set(updatedRecords.map(r => r.date))].sort();
          let streak = 0;
          for (let i = sortedDates.length - 1; i >= 0; i--) {
            const d = new Date(sortedDates[i]);
            const expected = new Date();
            expected.setDate(expected.getDate() - (sortedDates.length - 1 - i));
            if (d.toISOString().split('T')[0] === expected.toISOString().split('T')[0]) {
              streak++;
            } else {
              break;
            }
          }
          
          const pointsGain = 20;
          
          return {
            learningProgresses: updatedProgresses,
            dailyRecords: updatedRecords,
            user: state.user ? {
              ...state.user,
              points: state.user.points + pointsGain,
              totalStudyMinutes: state.user.totalStudyMinutes + studyMinutes,
              streak,
              lastStudyDate: today,
            } : null,
          };
        });
        
        get().checkAchievements();
      },

      markWord: (wordId, correct) => {
        const { user } = get();
        if (!user) return;
        
        set(state => {
          const existing = state.wordProgresses.find(
            wp => wp.wordId === wordId && wp.userId === user.id
          );
          let updatedWordProgress;
          if (existing) {
            updatedWordProgress = state.wordProgresses.map(wp =>
              wp.wordId === wordId && wp.userId === user.id ? {
                ...wp,
                correctCount: wp.correctCount + (correct ? 1 : 0),
                wrongCount: wp.wrongCount + (correct ? 0 : 1),
                lastReviewedAt: new Date().toISOString(),
                mastered: wp.correctCount + (correct ? 1 : 0) >= 5,
              } : wp
            );
          } else {
            updatedWordProgress = [...state.wordProgresses, {
              userId: user.id,
              wordId,
              correctCount: correct ? 1 : 0,
              wrongCount: correct ? 0 : 1,
              lastReviewedAt: new Date().toISOString(),
              mastered: false,
            }];
          }
          
          // 每日记录
          const today = new Date().toISOString().split('T')[0];
          const todayRecord = state.dailyRecords.find(r => r.date === today);
          let updatedRecords = [...state.dailyRecords];
          if (todayRecord) {
            updatedRecords = updatedRecords.map(r =>
              r.date === today ? {
                ...r,
                wordsLearned: r.wordsLearned + 1,
                pointsEarned: r.pointsEarned + (correct ? 5 : 2),
              } : r
            );
          }
          
          return {
            wordProgresses: updatedWordProgress,
            dailyRecords: updatedRecords,
            user: state.user ? {
              ...state.user,
              points: state.user.points + (correct ? 5 : 2),
            } : null,
          };
        });
        
        get().checkAchievements();
      },

      addPoints: (points) => {
        set(state => state.user ? { user: { ...state.user, points: state.user.points + points } } : {});
      },

      checkAchievements: () => {
        const { user, userAchievements, getTotalWordsLearned, getTotalLessonsCompleted } = get();
        if (!user) return [];
        
        const unlockedIds: string[] = [];
        const newAchievements: UserAchievement[] = [...userAchievements];
        
        const stats = {
          streak: user.streak,
          points: user.points,
          words: getTotalWordsLearned(),
          lessons: getTotalLessonsCompleted(),
        };
        
        mockAchievements.forEach(ach => {
          const alreadyHas = userAchievements.some(ua => ua.achievementId === ach.id);
          if (!alreadyHas) {
            const userVal = stats[ach.requirement.type as keyof typeof stats] || 0;
            if (userVal >= ach.requirement.value) {
              newAchievements.push({
                achievementId: ach.id,
                userId: user.id,
                unlockedAt: new Date().toISOString(),
              });
              unlockedIds.push(ach.id);
              // 直接加分
              set(state => state.user ? {
                user: { ...state.user, points: state.user.points + ach.pointsReward }
              } : {});
            }
          }
        });
        
        if (newAchievements.length !== userAchievements.length) {
          set({ userAchievements: newAchievements });
        }
        
        return unlockedIds;
      },

      addPost: (title, content, language, tags) => {
        const { user } = get();
        if (!user) return;
        const newPost: Post = {
          id: `p-${Date.now()}`,
          userId: user.id,
          username: user.username,
          userAvatar: user.avatar,
          title,
          content,
          language,
          tags,
          likes: 0,
          comments: [],
          createdAt: new Date().toISOString(),
          liked: false,
        };
        set(state => ({ posts: [newPost, ...state.posts] }));
      },

      toggleLikePost: (postId) => {
        set(state => ({
          posts: state.posts.map(p =>
            p.id === postId ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            } : p
          )
        }));
      },

      addComment: (postId, content) => {
        const { user } = get();
        if (!user) return;
        set(state => ({
          posts: state.posts.map(p =>
            p.id === postId ? {
              ...p,
              comments: [...p.comments, {
                id: `c-${Date.now()}`,
                userId: user.id,
                username: user.username,
                userAvatar: user.avatar,
                content,
                createdAt: new Date().toISOString(),
                likes: 0,
              }]
            } : p
          )
        }));
      },

      getFilteredWords: (lang, level) =>
        mockWords.filter(w => w.language === lang && w.level === level),

      getFilteredGrammar: (lang, level) =>
        mockGrammarQuestions.filter(q => q.language === lang && q.level === level),

      getFilteredSpeaking: (lang, level) =>
        mockSpeakingLessons.filter(s => s.language === lang && s.level === level),

      getFilteredListening: (lang, level) =>
        mockListeningLessons.filter(l => l.language === lang && l.level === level),

      getRecommendedCourses: () => {
        const { user, learningProgresses } = get();
        if (!user) return mockCourses.slice(0, 3);
        const enrolledCourseIds = learningProgresses
          .filter(p => p.userId === user.id)
          .map(p => p.courseId);
        
        // 优先推荐当前语言和级别的未报名课程
        const recommended = mockCourses.filter(c =>
          c.language === user.currentLanguage &&
          c.level === user.currentLevel &&
          !enrolledCourseIds.includes(c.id)
        );
        
        if (recommended.length >= 3) return recommended.slice(0, 3);
        
        // 补充同语言其他课程
        const sameLang = mockCourses.filter(c =>
          c.language === user.currentLanguage &&
          !recommended.includes(c) &&
          !enrolledCourseIds.includes(c.id)
        );
        
        return [...recommended, ...sameLang, ...mockCourses].slice(0, 3);
      },

      getProgressByCourse: (courseId) => {
        const { user, learningProgresses } = get();
        if (!user) return 0;
        const progress = learningProgresses.find(
          p => p.courseId === courseId && p.userId === user.id
        );
        return progress?.progressPercent || 0;
      },

      getTotalWordsLearned: () => {
        const { user, wordProgresses } = get();
        if (!user) return 0;
        return wordProgresses.filter(wp => wp.userId === user.id && wp.mastered).length;
      },

      getTotalLessonsCompleted: () => {
        const { user, learningProgresses } = get();
        if (!user) return 0;
        return learningProgresses
          .filter(p => p.userId === user.id)
          .reduce((sum, p) => sum + p.completedLessons.length, 0);
      },
    }),
    {
      name: 'linguaverse-storage',
      partialize: (state) => ({
        user: state.user,
        allUsers: state.allUsers,
        isAuthenticated: state.isAuthenticated,
        learningProgresses: state.learningProgresses,
        wordProgresses: state.wordProgresses,
        dailyRecords: state.dailyRecords,
        userAchievements: state.userAchievements,
        posts: state.posts,
      }),
    }
  )
);

// 导出常量数据供组件使用
export { mockWords, mockCourses, mockGrammarQuestions, mockSpeakingLessons, mockListeningLessons, mockAchievements, mockLeaderboard, mockLearningPaths };
