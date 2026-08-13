import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore, mockCourses, mockWords, mockGrammarQuestions, mockSpeakingLessons, mockListeningLessons } from '../store';
import { languageNames, levelNames, courseTypeNames } from '../utils';
import { Badge, ProgressBar } from '../components/UI';
import type { Lesson } from '../types';
import {
  ArrowLeft, Clock, Star, Users, PlayCircle, CheckCircle2, Lock,
  ChevronRight, BookOpen, Info, Award, Sparkles
} from 'lucide-react';

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, getProgressByCourse, startCourse, completeLesson, learningProgresses, wordProgresses } = useStore();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const course = useMemo(() => mockCourses.find(c => c.id === courseId), [courseId]);
  const progress = course ? getProgressByCourse(course.id) : 0;
  const progressData = course ? learningProgresses.find(p => p.courseId === course.id && p.userId === user?.id) : null;
  const enrolled = !!progressData;

  const isLessonCompleted = (lessonId: string) => {
    return progressData?.completedLessons.includes(lessonId) || false;
  };

  const isLessonLocked = (lesson: Lesson, idx: number) => {
    if (!enrolled) return idx > 0;
    if (idx === 0) return false;
    const prevLesson = course?.lessons[idx - 1];
    return prevLesson ? !isLessonCompleted(prevLesson.id) : true;
  };

  const getLessonWords = (lesson: Lesson) => {
    if (!lesson.wordIds) return [];
    return mockWords.filter(w => lesson.wordIds?.includes(w.id));
  };

  const getLessonGrammar = (lesson: Lesson) => {
    if (!lesson.grammarIds) return [];
    return mockGrammarQuestions.filter(q => lesson.grammarIds?.includes(q.id));
  };

  const getLessonSpeaking = (lesson: Lesson) => {
    if (!lesson.speakingId) return null;
    return mockSpeakingLessons.find(s => s.id === lesson.speakingId);
  };

  const getLessonListening = (lesson: Lesson) => {
    if (!lesson.listeningId) return null;
    return mockListeningLessons.find(l => l.id === lesson.listeningId);
  };

  const masteredWordCount = (lesson: Lesson) => {
    if (!lesson.wordIds || !user) return 0;
    return lesson.wordIds.filter(wid =>
      wordProgresses.some(wp => wp.wordId === wid && wp.userId === user.id && wp.mastered)
    ).length;
  };

  const handleStartLesson = (lesson: Lesson, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!enrolled) {
      startCourse(courseId!);
    }
    setActiveLessonId(lesson.id);
  };

  const handleCompleteLesson = (lessonId: string) => {
    completeLesson(courseId!, lessonId, 20);
    setActiveLessonId(null);
  };

  const getLessonPracticeRoute = (type: string) => {
    switch (type) {
      case 'vocabulary': return '/practice/vocabulary';
      case 'grammar': return '/practice/grammar';
      case 'speaking': return '/practice/speaking';
      case 'listening': return '/practice/listening';
      default: return '/practice';
    }
  };

  if (!course) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-5 h-5" />
          返回课程列表
        </button>
        <div className="card text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">课程不存在</h3>
          <p className="text-gray-500 mb-6">该课程可能已被删除或链接无效</p>
          <Link to="/courses" className="btn-primary">返回课程中心</Link>
        </div>
      </div>
    );
  }

  const activeLesson = activeLessonId ? course.lessons.find(l => l.id === activeLessonId) : null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 w-fit">
        <ArrowLeft className="w-5 h-5" />
        返回课程列表
      </button>

      {/* Course Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1">
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="info" size="md">{languageNames[course.language].flag} {languageNames[course.language].name}</Badge>
              <span className={`badge ${levelNames[course.level].color}`}>{levelNames[course.level].name}</span>
              <Badge variant="success" size="md">🎓 免费</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.totalLessons} 节课</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 约 {course.lessons.reduce((s, l) => s + l.duration, 0)} 分钟</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {course.rating} 评分</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {course.students.toLocaleString()} 学员</span>
            </div>
            {enrolled ? (
              <div className="p-5 bg-primary-50 rounded-2xl border border-primary-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-primary-700">学习进度</span>
                  </div>
                  <span className="font-bold text-primary-600">{progress}%</span>
                </div>
                <ProgressBar value={progress} height="lg" showLabel={false} />
                <p className="text-sm text-primary-600 mt-3">
                  已完成 {progressData?.completedLessons.length || 0} / {course.totalLessons} 节课
                </p>
              </div>
            ) : (
              <button onClick={() => startCourse(course.id)} className="btn-primary w-full lg:w-auto lg:px-10">
                立即免费开始学习
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-500" />
          课程章节 ({course.lessons.length})
        </h2>
        <div className="space-y-3">
          {course.lessons.map((lesson, idx) => {
            const completed = isLessonCompleted(lesson.id);
            const locked = isLessonLocked(lesson, idx);
            const isActive = activeLessonId === lesson.id;
            return (
              <div key={lesson.id} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isActive ? 'border-primary-300 shadow-lg shadow-primary-100' : 'border-gray-100 hover:border-primary-100 hover:shadow-md'
              }`}>
                <div
                  className={`p-5 flex items-center gap-4 ${!locked ? 'cursor-pointer' : ''}`}
                  onClick={() => !locked && setActiveLessonId(isActive ? null : lesson.id)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg ${
                    completed ? 'bg-accent-100 text-accent-600' :
                    locked ? 'bg-gray-100 text-gray-400' :
                    isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' :
                    'bg-primary-50 text-primary-600'
                  }`}>
                    {completed ? <CheckCircle2 className="w-6 h-6" /> :
                     locked ? <Lock className="w-5 h-5" /> :
                     idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`badge ${courseTypeNames[lesson.type].color}`}>
                        {courseTypeNames[lesson.type].icon} {courseTypeNames[lesson.type].name}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.duration}分钟
                      </span>
                      {lesson.wordIds && (
                        <span className="text-xs text-gray-400">
                          {masteredWordCount(lesson)}/{lesson.wordIds.length} 单词已掌握
                        </span>
                      )}
                    </div>
                    <h3 className={`font-semibold ${locked ? 'text-gray-400' : 'text-gray-900'}`}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </div>

                {isActive && (
                  <div className="border-t border-gray-100 p-6 bg-gradient-to-br from-gray-50 to-white animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Vocabulary Preview */}
                      {lesson.type === 'vocabulary' && (
                        <div className="md:col-span-2 space-y-3">
                          <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            📝 本课时单词 ({getLessonWords(lesson).length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {getLessonWords(lesson).map(w => (
                              <div key={w.id} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-bold text-lg text-gray-900">{w.word}</p>
                                    <p className="text-sm text-gray-500">{w.pronunciation}</p>
                                  </div>
                                  <p className="text-primary-600 font-semibold">{w.translation}</p>
                                </div>
                                <p className="text-xs text-gray-500 italic">"{w.example}"</p>
                                <p className="text-xs text-gray-400">{w.exampleTranslation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grammar Preview */}
                      {lesson.type === 'grammar' && getLessonGrammar(lesson).length > 0 && (
                        <div className="md:col-span-2 space-y-3">
                          <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            📚 语法知识点
                          </h4>
                          {getLessonGrammar(lesson).slice(0, 2).map(q => (
                            <div key={q.id} className="p-4 bg-white rounded-xl border border-gray-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="info">{q.grammarPoint}</Badge>
                                <span className="text-xs text-gray-400">{q.type === 'choice' ? '选择题' : '填空题'}</span>
                              </div>
                              <p className="font-medium text-gray-800 mb-2">{q.question}</p>
                              <div className="p-3 bg-accent-50 rounded-lg border border-accent-100">
                                <p className="text-sm text-accent-700">💡 {q.explanation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Speaking Preview */}
                      {lesson.type === 'speaking' && getLessonSpeaking(lesson) && (
                        <div className="md:col-span-2 space-y-3">
                          <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            🎙️ 情景对话 - {getLessonSpeaking(lesson)?.topic}
                          </h4>
                          <div className="space-y-2">
                            {getLessonSpeaking(lesson)?.sentences.slice(0, 3).map((s, i) => (
                              <div key={i} className="p-4 bg-white rounded-xl border border-gray-100">
                                <div className="flex items-start justify-between mb-1">
                                  <p className="font-semibold text-lg text-gray-900">{s.original}</p>
                                  <span className="text-xs text-gray-400">{s.pronunciation}</span>
                                </div>
                                <p className="text-primary-600">{s.translation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Listening Preview */}
                      {lesson.type === 'listening' && getLessonListening(lesson) && (
                        <div className="md:col-span-2 space-y-3">
                          <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            🎧 听力场景 - {getLessonListening(lesson)?.topic}
                          </h4>
                          <div className="p-4 bg-white rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <PlayCircle className="w-5 h-5 text-primary-500" />
                              <span className="font-medium">对话预览 ({getLessonListening(lesson)?.questions.length} 题)</span>
                            </div>
                            <p className="text-sm text-gray-500 whitespace-pre-line">
                              {getLessonListening(lesson)?.audioText.slice(0, 200)}...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <Link
                        to={getLessonPracticeRoute(lesson.type)}
                        onClick={e => enrolled && handleStartLesson(lesson, e)}
                        className="btn-secondary text-center"
                      >
                        前往{courseTypeNames[lesson.type].name}模块练习
                      </Link>
                      {!completed && enrolled && !locked && (
                        <button
                          onClick={() => handleCompleteLesson(lesson.id)}
                          className="btn-success flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          标记完成 (+20积分)
                        </button>
                      )}
                      {completed && (
                        <div className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-50 text-accent-600 rounded-xl font-semibold">
                          <Award className="w-5 h-5" /> 已完成
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-500" /> 适合人群
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><span className="text-accent-500">✓</span> {levelNames[course.level].name}水平学习者</li>
            <li className="flex items-center gap-2"><span className="text-accent-500">✓</span> 希望系统学习{languageNames[course.language].name}的同学</li>
            <li className="flex items-center gap-2"><span className="text-accent-500">✓</span> 备考{languageNames[course.language].name}等级考试</li>
            <li className="flex items-center gap-2"><span className="text-accent-500">✓</span> 想提升{languageNames[course.language].name}综合能力</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary-500" /> 你将获得
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><span className="text-primary-500">🎯</span> 完整的分级知识体系</li>
            <li className="flex items-center gap-2"><span className="text-primary-500">📝</span> 丰富的单词和语法积累</li>
            <li className="flex items-center gap-2"><span className="text-primary-500">🎙️</span> 口语和听力能力提升</li>
            <li className="flex items-center gap-2"><span className="text-primary-500">🏆</span> 完成课程获得积分和成就徽章</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
