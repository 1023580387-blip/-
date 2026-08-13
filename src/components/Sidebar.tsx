import { NavLink } from 'react-router-dom';
import {
  Home, BookOpen, GraduationCap, BarChart3,
  MessageSquare, Trophy, Settings, LogOut, Languages
} from 'lucide-react';
import { useStore } from '../store';
import { languageNames, formatMinutes } from '../utils';
import { useState } from 'react';
import type { Language } from '../types';

const menuItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/courses', icon: BookOpen, label: '课程中心' },
  { to: '/practice', icon: GraduationCap, label: '互动学习' },
  { to: '/progress', icon: BarChart3, label: '学习进度' },
  { to: '/community', icon: MessageSquare, label: '社区交流' },
  { to: '/achievements', icon: Trophy, label: '成就中心' },
];

export function Sidebar() {
  const { user, logout, switchLanguage } = useStore();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <div>
            <h1 className="font-bold text-lg text-gradient">LinguaVerse</h1>
            <p className="text-xs text-gray-500">多语种学习平台</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-lg">
              {user.username.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user.username}</p>
              <p className="text-xs text-gray-500">积分: {user.points.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-primary-600">{user.streak}</p>
              <p className="text-[10px] text-primary-500">连续天数🔥</p>
            </div>
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-secondary-600">{formatMinutes(user.totalStudyMinutes).split('小')[0]}</p>
              <p className="text-[10px] text-secondary-500">总学时📚</p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-gray-600" />
                <span className="text-sm">
                  {languageNames[user.currentLanguage as Language].flag}
                  {' '}
                  {languageNames[user.currentLanguage as Language].name}
                </span>
              </div>
            </button>
            {showLangMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50 animate-fade-in">
                {(Object.keys(languageNames) as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { switchLanguage(lang); setShowLangMenu(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-primary-50 text-sm ${
                      user.currentLanguage === lang ? 'bg-primary-50 text-primary-600' : ''
                    }`}
                  >
                    <span>{languageNames[lang].flag}</span>
                    <span>{languageNames[lang].name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{languageNames[lang].nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">设置</span>
        </NavLink>
        {user && (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">退出登录</span>
          </button>
        )}
      </div>
    </aside>
  );
}
