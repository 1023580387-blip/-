import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout/Layout';
import Loading from './components/common/Loading';
import { useEffect, useState } from 'react';
import './App.css';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// Main pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import UnitDetail from './pages/UnitDetail';
import VocabularyPractice from './pages/VocabularyPractice';
import GrammarPractice from './pages/GrammarPractice';
import ListeningPractice from './pages/ListeningPractice';
import SpeakingPractice from './pages/SpeakingPractice';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';

// 受保护路由组件
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading type="spinner" size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// 仅访客路由（已登录跳转到首页）
function GuestRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 访客路由 */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 受保护路由 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            
            {/* 课程 */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/units/:unitId" element={<UnitDetail />} />
            
            {/* 学习模块 */}
            <Route path="/practice/vocabulary" element={<VocabularyPractice />} />
            <Route path="/practice/vocabulary/:unitId" element={<VocabularyPractice />} />
            <Route path="/practice/grammar/:unitId" element={<GrammarPractice />} />
            <Route path="/practice/listening/:unitId" element={<ListeningPractice />} />
            <Route path="/practice/speaking/:unitId" element={<SpeakingPractice />} />
            
            {/* 学习进度 */}
            <Route path="/progress" element={<Progress />} />
            
            {/* 成就 */}
            <Route path="/achievements" element={<Achievements />} />
            
            {/* 社区 */}
            <Route path="/community" element={<Community />} />
            <Route path="/community/:postId" element={<PostDetail />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
