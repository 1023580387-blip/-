import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Sparkles, Languages, Trophy, Users } from 'lucide-react';
import { useStore } from '../store';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      // 演示账号自动填充
      const email = formData.email || 'demo@linguaverse.com';
      const password = formData.password || '123456';
      const result = login(email, password);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          navigate((location.state as any)?.from?.pathname || '/', { replace: true });
        }, 500);
      } else {
        setError(result.message);
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        setError('请填写完整信息');
        return;
      }
      if (formData.password.length < 6) {
        setError('密码至少6位');
        return;
      }
      const result = register(formData.username, formData.email, formData.password);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);
      } else {
        setError(result.message);
      }
    }
  };

  const features = [
    { icon: Languages, title: '多语种学习', desc: '英语、日语、韩语等主流语言全覆盖' },
    { icon: BookOpen, title: '分级课程体系', desc: '从零基础到高级，循序渐进学习' },
    { icon: Trophy, title: '成就激励系统', desc: '积分、徽章、排行榜，激发学习动力' },
    { icon: Users, title: '社区交流', desc: '与全球学习者分享经验、共同进步' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
              L
            </div>
            <h1 className="text-3xl font-bold">LinguaVerse</h1>
          </div>
          <p className="text-xl text-white/80 mb-2">开启您的多语种学习之旅</p>
          <p className="text-white/60">沉浸式语言学习平台，让语言学习变得有趣高效</p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-6 my-12">
          {features.map((f, i) => (
            <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white/60 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>已有 <strong className="text-white">50,000+</strong> 学员正在使用 LinguaVerse 学习语言</span>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white text-2xl font-bold mb-3">
              L
            </div>
            <h2 className="text-2xl font-bold text-gradient">LinguaVerse</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? '欢迎回来！' : '创建新账号'}
            </h2>
            <p className="text-gray-500">
              {mode === 'login' ? '登录后继续您的语言学习之旅' : '加入我们，开始您的第一堂语言课'}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="bg-gray-100 rounded-xl p-1 mb-8 flex">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                mode === 'login' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                mode === 'register' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div>
                <label className="label">用户名</label>
                <input
                  type="text"
                  className="input"
                  placeholder="请输入用户名"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            )}
            <div>
              <label className="label">邮箱地址</label>
              <input
                type="email"
                className="input"
                placeholder={mode === 'login' ? 'demo@linguaverse.com (演示账号)' : 'your@email.com'}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder={mode === 'login' ? '123456 (演示密码)' : '至少6位字符'}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm animate-fade-in">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-accent-50 border border-accent-200 text-accent-600 rounded-xl px-4 py-3 text-sm animate-fade-in">
                {success}
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                  <span>记住我</span>
                </label>
                <Link className="text-primary-600 hover:text-primary-700 font-medium" to="#">
                  忘记密码？
                </Link>
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              {mode === 'login' ? '立即登录' : '创建账号'}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">快速体验</span>
                </div>
              </div>
              <button
                onClick={() => {
                  login('demo@linguaverse.com', '123456');
                  navigate('/', { replace: true });
                }}
                className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-primary-200 text-primary-600 font-medium hover:bg-primary-50 transition-colors"
              >
                🎯 使用演示账号一键登录
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
