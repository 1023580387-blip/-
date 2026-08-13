import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { languageNames, levelNames } from '../utils';
import type { Language, LanguageLevel } from '../types';
import { Badge, ProgressBar } from '../components/UI';
import {
  ArrowLeft, Play, Pause, Volume2, SkipForward, Eye, EyeOff,
  RotateCcw, CheckCircle2, XCircle, Sparkles, Award
} from 'lucide-react';

export function ListeningPage() {
  const { user, getFilteredListening, addPoints } = useStore();
  const lang = user?.currentLanguage || 'en' as Language;
  const level = user?.currentLevel || 'beginner' as LanguageLevel;
  const lessons = useMemo(() => getFilteredListening(lang, level), [lang, level, getFilteredListening]);

  const [lessonIdx, setLessonIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [answers, setAnswers] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
  const [answeredQs, setAnsweredQs] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);

  const lesson = lessons[lessonIdx];
  const question = lesson?.questions[qIdx];

  if (lessons.length === 0) {
    return (
      <div className="animate-fade-in">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 w-fit">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">🎧</div>
          <h3 className="text-xl font-bold mb-2">暂无听力课程</h3>
          <p className="text-gray-500 mb-6">当前语言和级别下暂无听力素材。</p>
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    setIsPlaying(true);
    setPlayProgress(0);
    const interval = setInterval(() => {
      setPlayProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return p + 2;
      });
    }, 60);
  };

  const handleSubmit = () => {
    if (selected === null || showResult) return;
    const correct = selected === question?.answer;
    setIsCorrect(correct);
    setShowResult(true);
    if (!answeredQs.has(qIdx)) {
      setAnswers(a => ({
        correct: a.correct + (correct ? 1 : 0),
        wrong: a.wrong + (correct ? 0 : 1),
      }));
      setAnsweredQs(prev => new Set(prev).add(qIdx));
      addPoints(correct ? 5 : 2);
    }
  };

  const handleNext = () => {
    if (qIdx < (lesson?.questions.length || 0) - 1) {
      setQIdx(i => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleResetAll = () => {
    setQIdx(0);
    setSelected(null);
    setShowResult(false);
    setShowText(false);
    setAnswers({ correct: 0, wrong: 0 });
    setAnsweredQs(new Set());
    setFinished(false);
  };

  const handleNextLesson = () => {
    if (lessonIdx < lessons.length - 1) {
      setLessonIdx(i => i + 1);
      handleResetAll();
    }
  };

  const totalQs = lesson?.questions.length || 1;
  const correctRate = answers.correct + answers.wrong > 0
    ? Math.round((answers.correct / (answers.correct + answers.wrong)) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="info">{languageNames[lang].flag} {languageNames[lang].name}</Badge>
          <span className={`badge ${levelNames[level].color}`}>{levelNames[level].name}</span>
          <span className="badge bg-gray-100 text-gray-600">{lessons.length} 个场景</span>
        </div>
      </div>

      {/* Lesson Switcher */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => { setLessonIdx(i); handleResetAll(); }}
            className={`shrink-0 px-5 py-3 rounded-xl font-medium transition-all ${
              i === lessonIdx
                ? 'bg-warn-500 text-white shadow-lg shadow-warn-500/25'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-warn-200 hover:text-warn-600'
            }`}
          >
            {i + 1}. {l.title}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {finished ? (
          /* 完成 */
          <div className="card text-center py-16 animate-slide-up">
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {correctRate >= 80 ? '听力达人！' : correctRate >= 60 ? '不错哦！' : '继续加油！'}
            </h2>
            <p className="text-gray-500 mb-8">{lesson?.title} - 听力练习已完成</p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
              <div className="p-5 rounded-2xl bg-gray-50">
                <div className="text-3xl font-bold text-gray-900">{totalQs}</div>
                <div className="text-sm text-gray-500 mt-1">总题数</div>
              </div>
              <div className="p-5 rounded-2xl bg-accent-50 border border-accent-100">
                <div className="text-3xl font-bold text-accent-600">{answers.correct}</div>
                <div className="text-sm text-accent-700 mt-1">答对</div>
              </div>
              <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
                <div className="text-3xl font-bold text-red-500">{answers.wrong}</div>
                <div className="text-sm text-red-600 mt-1">答错</div>
              </div>
            </div>
            <div className="max-w-sm mx-auto mb-8">
              <div className="text-5xl font-bold text-gradient mb-3">{correctRate}%</div>
              <ProgressBar value={correctRate} height="lg" showLabel={false} />
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={handleResetAll} className="btn-secondary flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> 再练一次
              </button>
              {lessonIdx < lessons.length - 1 ? (
                <button onClick={handleNextLesson} className="btn-primary flex items-center gap-2">
                  下一场景 <SkipForward className="w-4 h-4" />
                </button>
              ) : (
                <Link to="/practice" className="btn-primary flex items-center gap-2">
                  <Award className="w-4 h-4" /> 完成学习
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-warn-500" />
                  场景：{lesson?.topic}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="badge bg-accent-100 text-accent-700">✓ {answers.correct}</span>
                  <span className="badge bg-red-100 text-red-600">✗ {answers.wrong}</span>
                  <span className="text-sm font-medium text-warn-600">
                    {qIdx + 1} / {totalQs}
                  </span>
                </div>
              </div>
              <ProgressBar value={qIdx + (showResult ? 1 : 0)} max={totalQs} showLabel={false} height="sm" />
            </div>

            {/* Audio Player */}
            <div className="card p-6 bg-gradient-to-br from-warn-50 to-white border-warn-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-warn-500" />
                  <h4 className="font-semibold text-gray-900">听力音频</h4>
                </div>
                <button
                  onClick={() => setShowText(!showText)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-white/60 transition-colors"
                >
                  {showText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showText ? '隐藏原文' : '查看原文'}
                </button>
              </div>

              {/* Player */}
              <div className="bg-white rounded-2xl p-5 border border-warn-100 mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlay}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isPlaying
                        ? 'bg-warn-500 text-white shadow-xl scale-95'
                        : 'bg-gradient-to-br from-warn-400 to-warn-600 text-white shadow-lg shadow-warn-500/30 hover:scale-105'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{Math.floor(playProgress * 0.06)}s</span>
                      <span>3:00</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-warn-400 to-warn-600 rounded-full transition-all duration-75"
                        style={{ width: `${playProgress}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handlePlay}
                    className="text-gray-400 hover:text-warn-500 transition-colors p-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Text Script */}
              {showText && (
                <div className="p-5 bg-white rounded-2xl border border-gray-200 animate-fade-in">
                  <p className="text-xs text-gray-400 mb-2">📝 听力原文</p>
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {lesson?.audioText}
                  </p>
                </div>
              )}
            </div>

            {/* Question */}
            <div className="card p-8 animate-fade-in" key={qIdx}>
              <div className="flex items-center gap-2 mb-6">
                <span className="badge bg-primary-100 text-primary-700">第 {qIdx + 1} 题</span>
                {answeredQs.has(qIdx) && (
                  <span className="badge bg-accent-100 text-accent-700">已作答</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                {question?.question}
              </h3>

              <div className="space-y-3">
                {question?.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isAnswer = i === question.answer;
                  let cls = 'w-full p-4 rounded-xl text-left font-medium transition-all flex items-center gap-3 border-2 ';
                  if (showResult) {
                    if (isAnswer) cls += 'bg-accent-50 border-accent-400 text-accent-700';
                    else if (isSelected) cls += 'bg-red-50 border-red-400 text-red-600';
                    else cls += 'bg-gray-50 border-gray-200 text-gray-500';
                  } else {
                    cls += isSelected
                      ? 'bg-primary-50 border-primary-400 text-primary-700 shadow-sm'
                      : 'bg-gray-50 border-gray-200 hover:border-primary-300 hover:bg-white text-gray-700';
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => !showResult && setSelected(i)}
                      disabled={showResult}
                      className={cls}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        showResult
                          ? isAnswer ? 'bg-accent-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                          : isSelected ? 'bg-primary-500 text-white' : 'bg-white text-gray-500 border border-gray-200'
                      }`}>
                        {showResult && isAnswer ? <CheckCircle2 className="w-4 h-4" /> :
                         showResult && isSelected && !isAnswer ? <XCircle className="w-4 h-4" /> :
                         String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selected === null}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    提交答案
                  </button>
                ) : (
                  <div className="flex items-center justify-between w-full flex-wrap gap-4">
                    <div className={`flex items-center gap-2 font-semibold ${
                      isCorrect ? 'text-accent-600' : 'text-red-500'
                    }`}>
                      {isCorrect
                        ? <><CheckCircle2 className="w-5 h-5" /> 回答正确！+5 积分</>
                        : <><XCircle className="w-5 h-5" /> 回答错误 +2 积分</>}
                    </div>
                    <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                      {qIdx < totalQs - 1 ? '下一题' : '完成练习'}
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Questions Overview */}
            <div className="card">
              <h4 className="font-bold text-gray-900 mb-4">📋 题目总览</h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {lesson?.questions.map((_, i) => {
                  const answered = answeredQs.has(i);
                  return (
                    <button
                      key={i}
                      onClick={() => { setQIdx(i); setShowResult(false); setSelected(null); }}
                      className={`aspect-square rounded-xl font-semibold transition-all ${
                        i === qIdx
                          ? 'ring-2 ring-warn-400 ring-offset-2'
                          : ''
                      } ${
                        answered
                          ? 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
