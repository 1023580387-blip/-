import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore, mockCourses, mockLearningPaths } from '../store';
import { languageNames, levelNames } from '../utils';
import { Badge, ProgressBar } from '../components/UI';
import type { Language, LanguageLevel } from '../types';
import {
  Search, Filter, Clock, Star, Users, BookOpen, Target, Calendar, ChevronRight
} from 'lucide-react';

export function CoursesPage() {
  const { user, getProgressByCourse, startCourse, switchLanguage, switchLevel, learningProgresses } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLang, setSelectedLang] = useState<Language | 'all'>(user?.currentLanguage || 'all');
  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel | 'all'>(user?.currentLevel || 'all');
  const [showPaths, setShowPaths] = useState(true);

  const filteredCourses = useMemo(() => {
    return mockCourses.filter(c => {
      if (selectedLang !== 'all' && c.language !== selectedLang) return false;
      if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;
      if (searchTerm && !c.title.includes(searchTerm) && !c.description.includes(searchTerm)) return false;
      return true;
    });
  }, [searchTerm, selectedLang, selectedLevel]);

  const filteredPaths = useMemo(() => {
    return mockLearningPaths.filter(p => {
      if (selectedLang !== 'all' && p.language !== selectedLang) return false;
      if (selectedLevel !== 'all' && p.level !== selectedLevel) return false;
      return true;
    });
  }, [selectedLang, selectedLevel]);

  const isEnrolled = (courseId: string) => {
    if (!user) return false;
    return learningProgresses.some(p => p.courseId === courseId && p.userId === user.id);
  };

  const handleStartCourse = (courseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startCourse(courseId);
  };

  const tabs = [
    { id: 'courses', label: '所有课程', icon: BookOpen },
    { id: 'paths', label: '学习路径', icon: Target },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 课程中心</h1>
        <p className="text-gray-500">探索适合你的语言课程，开启高效学习之旅</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setShowPaths(tab.id === 'paths')}
            className={`flex items-center gap-2 px-5 py-3 font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
              (tab.id === 'paths') === showPaths
                ? 'border-primary-500 text-primary-600 bg-primary-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程名称、描述..."
              className="input pl-12"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">语言:</span>
            </div>
            <button
              onClick={() => { setSelectedLang('all'); if (user) switchLanguage('en'); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLang === 'all'
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {(Object.keys(languageNames) as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => { setSelectedLang(lang); if (user) switchLanguage(lang); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedLang === lang
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {languageNames[lang].flag} {languageNames[lang].name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600 font-medium">级别:</span>
          <button
            onClick={() => { setSelectedLevel('all'); if (user) switchLevel('beginner'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedLevel === 'all'
                ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/25'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部级别
          </button>
          {(Object.keys(levelNames) as LanguageLevel[]).map(level => (
            <button
              key={level}
              onClick={() => { setSelectedLevel(level); if (user) switchLevel(level); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === level
                  ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {levelNames[level].name}
            </button>
          ))}
        </div>
      </div>

      {showPaths ? (
        /* Learning Paths */
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-500" />
            个性化学习路径
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPaths.map(path => (
              <div key={path.id} className="card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="info">{languageNames[path.language].flag} {languageNames[path.language].name}</Badge>
                        <span className={`badge ${levelNames[path.level].color}`}>{levelNames[path.level].name}</span>
                        <Badge variant="success">🎯 {path.goal}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{path.name}</h3>
                      <p className="text-gray-500 mb-4">{path.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      包含 {path.courses.length} 门课程
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      预计 {path.estimatedDays} 天完成
                    </div>
                  </div>
                  <div className="space-y-2 mb-5">
                    {path.courses.map((courseId, i) => {
                      const course = mockCourses.find(c => c.id === courseId);
                      return course ? (
                        <div key={courseId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{course.title}</p>
                            <p className="text-xs text-gray-500">{course.totalLessons} 节课</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ) : null;
                    })}
                  </div>
                  <Link to={`/courses/${path.courses[0]}`} className="btn-primary w-full flex items-center justify-center gap-2">
                    从第一门课开始 <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Courses */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full">
              <div className="card text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">没有找到匹配的课程</h3>
                <p className="text-gray-500 mb-4">试试调整筛选条件或搜索关键词</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedLang('all'); setSelectedLevel('all'); }}
                  className="btn-secondary"
                >
                  重置筛选
                </button>
              </div>
            </div>
          ) : (
            filteredCourses.map(course => {
              const progress = getProgressByCourse(course.id);
              const enrolled = isEnrolled(course.id);
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="card-hover group"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {enrolled && (
                      <div className="absolute top-3 left-3">
                        <span className="badge bg-accent-500 text-white shadow-lg">✓ 已报名</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="info">{languageNames[course.language].flag} {languageNames[course.language].name}</Badge>
                    <span className={`badge ${levelNames[course.level].color}`}>{levelNames[course.level].name}</span>
                    <span className="badge bg-gray-100 text-gray-600">{course.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.totalLessons}节课</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students.toLocaleString()}</span>
                  </div>
                  {enrolled ? (
                    <ProgressBar value={progress} height="sm" />
                  ) : (
                    <button
                      onClick={(e) => handleStartCourse(course.id, e)}
                      className="btn-primary w-full !py-2.5 text-sm"
                    >
                      免费开始学习
                    </button>
                  )}
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
