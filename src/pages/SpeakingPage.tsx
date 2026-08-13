import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { languageNames, levelNames } from '../utils';
import type { Language, LanguageLevel } from '../types';
import { Badge, ProgressBar } from '../components/UI';
import {
  ArrowLeft, Volume2, Mic, Play, Pause, SkipBack, SkipForward,
  RotateCcw, CheckCircle2, Sparkles, Award
} from 'lucide-react';

export function SpeakingPage() {
  const { user, getFilteredSpeaking, addPoints } = useStore();
  const lang = user?.currentLanguage || 'en' as Language;
  const level = user?.currentLevel || 'beginner' as LanguageLevel;
  const lessons = useMemo(() => getFilteredSpeaking(lang, level), [lang, level, getFilteredSpeaking]);

  const [lessonIdx, setLessonIdx] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSentences, setRecordedSentences] = useState<number[]>([]);
  const [scoreMap, setScoreMap] = useState<Record<number, number>>({});

  const lesson = lessons[lessonIdx];
  const sentence = lesson?.sentences[currentSentence];
  const isCompleted = recordedSentences.length === lesson?.sentences.length;

  if (lessons.length === 0) {
    return (
      <div className="animate-fade-in">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 w-fit">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">🎙️</div>
          <h3 className="text-xl font-bold mb-2">暂无口语课程</h3>
          <p className="text-gray-500 mb-6">当前语言和级别下暂无口语跟读素材。</p>
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        // 模拟评分
        const score = Math.floor(Math.random() * 30) + 70;
        setScoreMap(prev => ({ ...prev, [currentSentence]: score }));
        if (!recordedSentences.includes(currentSentence)) {
          setRecordedSentences(prev => [...prev, currentSentence]);
          addPoints(Math.floor(score / 10));
        }
      }, 2500);
    }
  };

  const handleNext = () => {
    if (currentSentence < (lesson?.sentences.length || 0) - 1) {
      setCurrentSentence(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentSentence > 0) setCurrentSentence(i => i - 1);
  };

  const handleNextLesson = () => {
    if (lessonIdx < lessons.length - 1) {
      setLessonIdx(i => i + 1);
      setCurrentSentence(0);
      setRecordedSentences([]);
      setScoreMap({});
    }
  };

  const handleRestart = () => {
    setCurrentSentence(0);
    setRecordedSentences([]);
    setScoreMap({});
  };

  const avgScore = recordedSentences.length
    ? Math.round(recordedSentences.reduce((s, i) => s + (scoreMap[i] || 0), 0) / recordedSentences.length)
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
          <span className="badge bg-gray-100 text-gray-600">{lessons.length} 个话题</span>
        </div>
      </div>

      {/* Lesson Switcher */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => { setLessonIdx(i); setCurrentSentence(0); setRecordedSentences([]); setScoreMap({}); }}
            className={`shrink-0 px-5 py-3 rounded-xl font-medium transition-all ${
              i === lessonIdx
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-accent-200 hover:text-accent-600'
            }`}
          >
            {i + 1}. {l.title}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {isCompleted ? (
          /* 完成总结 */
          <div className="card text-center py-16 animate-slide-up">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">太棒了！话题完成</h2>
            <p className="text-gray-500 mb-8">{lesson?.title} - 所有句子跟读完成</p>
            <div className="grid grid-cols-2 gap-5 max-w-md mx-auto mb-8">
              <div className="p-6 rounded-2xl bg-accent-50 border border-accent-100">
                <div className="text-4xl font-bold text-accent-600 mb-1">{recordedSentences.length}</div>
                <div className="text-sm text-accent-700">已读句子</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200">
                <div className="text-4xl font-bold text-gradient mb-1">{avgScore}</div>
                <div className="text-sm text-gray-600">平均得分</div>
              </div>
            </div>
            <div className="w-full max-w-md mx-auto mb-8">
              <ProgressBar value={avgScore} height="lg" />
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={handleRestart} className="btn-secondary flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> 再练一次
              </button>
              {lessonIdx < lessons.length - 1 ? (
                <button onClick={handleNextLesson} className="btn-primary flex items-center gap-2">
                  下一话题 <SkipForward className="w-4 h-4" />
                </button>
              ) : (
                <Link to="/practice" className="btn-primary flex items-center gap-2">
                  <Award className="w-4 h-4" /> 返回领取积分
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
                  <Sparkles className="w-5 h-5 text-accent-500" />
                  话题：{lesson?.topic}
                </h3>
                <span className="text-sm font-medium text-accent-600">
                  句子 {currentSentence + 1} / {lesson?.sentences.length || 0}
                </span>
              </div>
              <ProgressBar
                value={currentSentence + (Object.keys(scoreMap).includes(currentSentence.toString()) ? 1 : 0)}
                max={lesson?.sentences.length || 1}
                showLabel={false}
                height="sm"
              />
            </div>

            {/* Main Card */}
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Volume2 className="w-4 h-4 text-primary-500" />
                  <span>先听标准发音，再跟读录音</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">进度</span>
                  <span className="badge bg-accent-100 text-accent-700">{recordedSentences.length}/{lesson?.sentences.length}</span>
                </div>
              </div>

              {/* Sentence Display */}
              <div className="rounded-2xl overflow-hidden mb-8 shadow-inner">
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-8 text-white text-center">
                  <p className="text-xs text-white/70 mb-3">标准发音</p>
                  <h2 className="text-3xl font-bold mb-4 leading-relaxed">{sentence?.original}</h2>
                  <p className="text-white/80 text-lg italic">{sentence?.pronunciation}</p>
                </div>
                <div className="bg-white p-6 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 mb-2">中文释义</p>
                  <p className="text-xl text-gray-800 font-medium">{sentence?.translation}</p>
                </div>
              </div>

              {/* Score Display */}
              {Object.keys(scoreMap).includes(currentSentence.toString()) && (
                <div className="mb-6 p-5 bg-gradient-to-r from-accent-50 to-white rounded-2xl border border-accent-200 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-accent-500" />
                      <span className="font-semibold text-accent-700">本次跟读得分</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl font-bold ${
                        scoreMap[currentSentence] >= 90 ? 'text-accent-600' :
                        scoreMap[currentSentence] >= 75 ? 'text-primary-600' : 'text-warn-600'
                      }`}>
                        {scoreMap[currentSentence]}
                      </span>
                      <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                  </div>
                  <ProgressBar value={scoreMap[currentSentence]} height="sm" showLabel={false} className="mt-3" />
                  <p className="text-xs text-gray-500 mt-3">
                    {scoreMap[currentSentence] >= 90 ? '🌟 发音非常棒！继续保持！' :
                     scoreMap[currentSentence] >= 75 ? '👍 发音不错，多练习会更好！' :
                     '💪 继续加油，注意每个音节的发音'}
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentSentence === 0}
                  className="w-14 h-14 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <SkipBack className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center gap-3">
                  {/* Play */}
                  <button
                    onClick={handlePlay}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                      isPlaying
                        ? 'bg-primary-500 text-white shadow-xl shadow-primary-500/40 scale-95'
                        : 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:scale-105'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>

                  {/* Record */}
                  <button
                    onClick={handleRecord}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                      isRecording
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                        : 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    {isRecording ? '录音中...' : '点击跟读'}
                  </button>
                  {isRecording && (
                    <div className="flex items-center gap-1 text-xs text-red-500">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      正在录音，请开口朗读
                    </div>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentSentence >= (lesson?.sentences.length || 0) - 1}
                  className="w-14 h-14 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* All Sentences List */}
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4">📝 对话全文</h3>
              <div className="space-y-2">
                {lesson?.sentences.map((s, i) => {
                  const practiced = Object.keys(scoreMap).includes(i.toString());
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentSentence(i)}
                      className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-4 ${
                        i === currentSentence
                          ? 'bg-primary-50 border-2 border-primary-300 shadow-sm'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-white hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        practiced ? 'bg-accent-500 text-white' :
                        i === currentSentence ? 'bg-primary-500 text-white' :
                        'bg-white border border-gray-200 text-gray-500'
                      }`}>
                        {practiced ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{s.original}</p>
                        <p className="text-sm text-gray-500 mt-1">{s.translation}</p>
                      </div>
                      {practiced && (
                        <span className={`shrink-0 text-sm font-bold ${
                          scoreMap[i] >= 90 ? 'text-accent-600' :
                          scoreMap[i] >= 75 ? 'text-primary-600' : 'text-warn-600'
                        }`}>
                          {scoreMap[i]}分
                        </span>
                      )}
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
