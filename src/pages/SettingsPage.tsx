import { useState } from 'react';
import { useStore } from '../store';
import { languageNames, levelNames } from '../utils';
import type { Language, LanguageLevel } from '../types';
import { Badge } from '../components/UI';
import {
  User, Globe, BookOpen, Bell, Shield, Mail, Calendar,
  Award, Save, Check, RotateCcw, LogOut
} from 'lucide-react';

export function SettingsPage() {
  const { user, switchLanguage, switchLevel, logout } = useStore();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  const [notifStudy, setNotifStudy] = useState(true);
  const [notifAchieve, setNotifAchieve] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚙️ 设置</h1>
        <p className="text-gray-500">管理你的账户信息和学习偏好</p>
      </div>

      {/* Profile Card */}
      <div className="card p-8 bg-gradient-to-br from-primary-50 to-white border-primary-100">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 flex items-center justify-center text-white text-5xl font-bold shadow-xl shadow-primary-200">
              {user.username.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-white shadow-lg border-2 border-primary-100 flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors">
              📷
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.username}</h2>
            <p className="text-gray-500 mb-4">{user.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="info" size="md">
                {languageNames[user.currentLanguage as Language].flag} {languageNames[user.currentLanguage as Language].name}
              </Badge>
              <span className={`badge ${levelNames[user.currentLevel].color}`}>
                {levelNames[user.currentLevel].name}
              </span>
              <Badge variant="success" size="md">⭐ {user.points.toLocaleString()} 积分</Badge>
              <Badge variant="warning" size="md">🔥 {user.streak} 天连续</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 账号信息 */}
        <div className="card md:col-span-2">
          <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-primary-500" />
            账号信息
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="label flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" /> 用户名
              </label>
              <input
                type="text"
                className="input"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> 邮箱地址
              </label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                注册时间: {user.registeredAt}
              </span>
            </div>
            <button
              onClick={handleSave}
              className="btn-primary !py-2.5 flex items-center gap-2"
            >
              {saved ? (
                <><Check className="w-4 h-4" /> 已保存</>
              ) : (
                <><Save className="w-4 h-4" /> 保存更改</>
              )}
            </button>
          </div>
        </div>

        {/* 语言偏好 */}
        <div className="card">
          <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Globe className="w-5 h-5 text-secondary-500" />
            学习语言
          </h3>
          <div className="space-y-3">
            {(Object.keys(languageNames) as Language[]).map(lang => {
              const active = user.currentLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${
                    active
                      ? 'bg-gradient-to-r from-secondary-50 to-primary-50 border-2 border-secondary-300 shadow-sm'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <span className="text-3xl">{languageNames[lang].flag}</span>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${active ? 'text-secondary-700' : 'text-gray-800'}`}>
                      {languageNames[lang].name}
                    </p>
                    <p className="text-xs text-gray-500">{languageNames[lang].nativeName}</p>
                  </div>
                  {active && (
                    <span className="badge bg-secondary-500 text-white shadow">当前</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 学习级别 */}
        <div className="card">
          <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
            <BookOpen className="w-5 h-5 text-accent-500" />
            学习级别
          </h3>
          <div className="space-y-3">
            {(Object.keys(levelNames) as LanguageLevel[]).map((lv, i) => {
              const active = user.currentLevel === lv;
              const icons = ['🌱', '🌿', '🌳'];
              const desc = ['零基础入门，学习基础词汇语法', '有一定基础，提升综合运用能力', '高级学习者，攻克复杂表达'];
              return (
                <button
                  key={lv}
                  onClick={() => switchLevel(lv)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all text-left ${
                    active
                      ? 'bg-gradient-to-r from-accent-50 to-white border-2 border-accent-300 shadow-sm'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <span className="text-3xl">{icons[i]}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${active ? 'text-accent-700' : 'text-gray-800'}`}>
                      {levelNames[lv].name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{desc[i]}</p>
                  </div>
                  {active && (
                    <span className="badge bg-accent-500 text-white shadow">当前</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 通知设置 */}
        <div className="card">
          <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Bell className="w-5 h-5 text-warn-500" />
            通知偏好
          </h3>
          <div className="space-y-4">
            {[
              { label: '每日学习提醒', desc: '提醒你完成每日学习目标', value: notifStudy, setter: setNotifStudy, icon: '⏰' },
              { label: '成就解锁通知', desc: '获得新成就徽章时通知', value: notifAchieve, setter: setNotifAchieve, icon: '🏆' },
              { label: '社区互动通知', desc: '帖子被评论/点赞时通知', value: notifCommunity, setter: setNotifCommunity, icon: '💬' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <ToggleSwitch value={item.value} onChange={item.setter} />
              </div>
            ))}
          </div>
        </div>

        {/* 账户安全 */}
        <div className="card">
          <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Shield className="w-5 h-5 text-red-500" />
            账户安全
          </h3>
          <div className="space-y-4">
            <button className="w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">修改密码</p>
                <p className="text-xs text-gray-500">上次修改: 30天前</p>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">绑定手机</p>
                <p className="text-xs text-gray-500">已绑定: 138****8888</p>
              </div>
              <Badge variant="success">已绑定</Badge>
            </button>
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={logout}
                className="w-full p-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 学习数据 */}
      <div className="card md:col-span-2">
        <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
          <Award className="w-5 h-5 text-primary-500" />
          学习数据管理
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 text-center">
            <div className="text-3xl font-bold text-primary-600">{user.points.toLocaleString()}</div>
            <div className="text-xs text-primary-500 mt-1">累计积分</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary-50 border border-secondary-100 text-center">
            <div className="text-3xl font-bold text-secondary-600">{user.streak}</div>
            <div className="text-xs text-secondary-500 mt-1">连续天数</div>
          </div>
          <div className="p-4 rounded-xl bg-accent-50 border border-accent-100 text-center">
            <div className="text-3xl font-bold text-accent-600">{Math.floor(user.totalStudyMinutes / 60)}h</div>
            <div className="text-xs text-accent-500 mt-1">学习时长</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Save className="w-4 h-4" />
            导出学习数据
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            重置每日目标
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-7 rounded-full transition-all ${
        value ? 'bg-accent-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
          value ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}
