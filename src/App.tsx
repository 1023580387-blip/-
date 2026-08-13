import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './components/ProtectedLayout';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { PracticeHubPage } from './pages/PracticeHubPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { GrammarPage } from './pages/GrammarPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { ListeningPage } from './pages/ListeningPage';
import { ProgressPage } from './pages/ProgressPage';
import { CommunityPage } from './pages/CommunityPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      {/* 公开路由 */}
      <Route path="/login" element={<AuthPage />} />

      {/* 受保护路由 */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        
        {/* 课程 */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        
        {/* 互动学习模块 */}
        <Route path="/practice" element={<PracticeHubPage />} />
        <Route path="/practice/vocabulary" element={<VocabularyPage />} />
        <Route path="/practice/grammar" element={<GrammarPage />} />
        <Route path="/practice/speaking" element={<SpeakingPage />} />
        <Route path="/practice/listening" element={<ListeningPage />} />
        
        {/* 其他模块 */}
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="text-center">
            <div className="text-8xl mb-6">🌍</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">页面不存在</h1>
            <p className="text-gray-500 mb-8">请检查网址是否正确，或返回首页继续学习</p>
            <a href="/" className="btn-primary inline-flex items-center">返回首页</a>
          </div>
        </div>
      } />
    </Routes>
  );
}
