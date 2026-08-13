import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { languageNames, levelNames, courseTypeNames } from '../utils';
import {
  BookOpen, Volume2, Mic, Headphones, ArrowRight, Sparkles, Clock
} from 'lucide-react';

const modules = [
  {
    to: '/practice/vocabulary',
    type: 'vocabulary' as const,
    title: '单词记忆',
    desc: '卡片翻转式学习，图文结合高效记忆单词',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'from-primary-50 to-white',
    borderColor: 'border-primary-200',
    countText: '海量词库',
  },
  {
    to: '/practice/grammar',
    type: 'grammar' as const,
    title: '语法练习',
    desc: '选择题、填空题，强化语法理解与应用',
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'from-secondary-50 to-white',
    borderColor: 'border-secondary-200',
    countText: '精选题库',
  },
  {
    to: '/practice/speaking',
    type: 'speaking' as const,
    title: '口语跟读',
    desc: '情景对话跟读训练，提升口语表达能力',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'from-accent-50 to-white',
    borderColor: 'border-accent-200',
    countText: '真实场景',
  },
  {
    to: '/practice/listening',
    type: 'listening' as const,
    title: '听力训练',
    desc: '场景化听力素材，配合习题提升听力水平',
    color: 'from-warn-500 to-warn-600',
    bgColor: 'from-warn-50 to-white',
    borderColor: 'border-warn-200',
    countText: '地道素材',
  },
];

export function PracticeHubPage() {
  const { user, getFilteredWords, getFilteredGrammar, getFilteredSpeaking, getFilteredListening } = useStore();
  const lang = user?.currentLanguage || 'en';
  const level = user?.currentLevel || 'beginner';

  const counts = {
    vocabulary: getFilteredWords(lang, level).length,
    grammar: getFilteredGrammar(lang, level).length,
    speaking: getFilteredSpeaking(lang, level).length,
    listening: getFilteredListening(lang, level).length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              互动学习中心
            </h1>
            <p className="text-white/80 max-w-xl">
              通过多样化的互动练习模块，全面提升你的{languageNames[lang].name}水平。
              选择适合你的模块开始今天的学习！
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/15 backdrop-blur rounded-xl px-5 py-3">
              <p className="text-xs text-white/70 mb-1">当前语言</p>
              <p className="font-bold text-lg">{languageNames[lang].flag} {languageNames[lang].name}</p>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-5 py-3">
              <p className="text-xs text-white/70 mb-1">当前级别</p>
              <p className="font-bold text-lg">{levelNames[level].name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map(mod => (
          <Link
            key={mod.to}
            to={mod.to}
            className={`card-hover bg-gradient-to-br ${mod.bgColor} border-2 ${mod.borderColor} group`}
          >
            <div className="flex items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mod.color} shadow-lg flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform`}>
                {courseTypeNames[mod.type].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">{mod.title}</h2>
                  <div className={`badge bg-gradient-to-r ${mod.color} text-white shadow`}>
                    {mod.countText}: {counts[mod.type]}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{mod.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 建议每天练习 15-20 分钟
                  </span>
                  <span className={`inline-flex items-center gap-1 font-semibold bg-gradient-to-r ${mod.color} bg-clip-text text-transparent`}>
                    开始练习 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card bg-gradient-to-br from-primary-50 to-white">
          <div className="text-4xl mb-3">⏰</div>
          <h3 className="font-bold text-gray-900 mb-2">坚持每日学习</h3>
          <p className="text-sm text-gray-500">每天坚持学习比一次性长时间学习更有效，培养学习习惯，保持连续学习天数。</p>
        </div>
        <div className="card bg-gradient-to-br from-secondary-50 to-white">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold text-gray-900 mb-2">均衡学习</h3>
          <p className="text-sm text-gray-500">听说读写全面发展，合理安排各模块学习时间，避免偏科，打造完整语言能力。</p>
        </div>
        <div className="card bg-gradient-to-br from-accent-50 to-white">
          <div className="text-4xl mb-3">🔁</div>
          <h3 className="font-bold text-gray-900 mb-2">及时复习</h3>
          <p className="text-sm text-gray-500">根据艾宾浩斯遗忘曲线及时复习，巩固已学内容，让记忆更加牢固。</p>
        </div>
      </div>
    </div>
  );
}
