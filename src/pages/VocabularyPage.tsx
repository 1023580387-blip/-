import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { languageNames, levelNames, shuffleArray } from '../utils';
import type { Language, LanguageLevel, Word } from '../types';
import { Badge, ProgressBar } from '../components/UI';
import {
  ArrowLeft, RotateCcw, CheckCircle2, XCircle, Eye, Volume2,
  ChevronLeft, ChevronRight, Sparkles, Target
} from 'lucide-react';

type Mode = 'card' | 'quiz';

export function VocabularyPage() {
  const { user, getFilteredWords, markWord, wordProgresses } = useStore();
  const lang = user?.currentLanguage || 'en' as Language;
  const level = user?.currentLevel || 'beginner' as LanguageLevel;

  const [mode, setMode] = useState<Mode>('card');
  const [flipped, setFlipped] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Quiz 状态
  const [quizWords, setQuizWords] = useState<Word[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizStats, setQuizStats] = useState({ correct: 0, wrong: 0 });

  const words = useMemo(() => getFilteredWords(lang, level), [lang, level, getFilteredWords]);
  const currentWord = words[currentIdx];

  // 开始测验时生成题目
  const startQuiz = () => {
    const shuffled = shuffleArray(words).slice(0, Math.min(10, words.length));
    setQuizWords(shuffled);
    setQuizIdx(0);
    setQuizStats({ correct: 0, wrong: 0 });
    setShowResult(false);
    setUserAnswer('');
    setMode('quiz');
    generateQuizOptions(shuffled[0], shuffled);
  };

  const generateQuizOptions = (word: Word, pool: Word[]) => {
    const wrongOptions = pool
      .filter(w => w.id !== word.id)
      .slice(0, 3)
      .map(w => w.translation);
    const options = shuffleArray([word.translation, ...wrongOptions]);
    setQuizOptions(options);
  };

  useEffect(() => {
    if (mode === 'quiz' && quizWords[quizIdx]) {
      generateQuizOptions(quizWords[quizIdx], quizWords);
      setShowResult(false);
      setUserAnswer('');
      setQuizResult(null);
    }
  }, [quizIdx, mode, quizWords]);

  const handleCardKnow = () => {
    if (currentWord) {
      markWord(currentWord.id, true);
    }
    nextCard();
  };

  const handleCardDontKnow = () => {
    if (currentWord) {
      markWord(currentWord.id, false);
    }
    nextCard();
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx(i => (i + 1) % words.length);
    }, 200);
  };

  const handleQuizSubmit = (answer: string) => {
    if (showResult) return;
    const correct = quizWords[quizIdx].translation === answer;
    setUserAnswer(answer);
    setShowResult(true);
    setQuizResult(correct ? 'correct' : 'wrong');
    markWord(quizWords[quizIdx].id, correct);
    setQuizStats(s => ({
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));
  };

  const handleQuizNext = () => {
    if (quizIdx < quizWords.length - 1) {
      setQuizIdx(i => i + 1);
    }
  };

  const getWordMastery = (wordId: string) => {
    if (!user) return 0;
    const wp = wordProgresses.find(p => p.wordId === wordId && p.userId === user.id);
    return wp ? Math.min(100, Math.round((wp.correctCount / 5) * 100)) : 0;
  };

  if (words.length === 0) {
    return (
      <div className="animate-fade-in">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 w-fit">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">暂无词汇</h3>
          <p className="text-gray-500 mb-6">当前语言和级别下暂无单词，请切换语言或级别。</p>
        </div>
      </div>
    );
  }

  const isWordMastered = currentWord ? getWordMastery(currentWord.id) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode('card')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              mode === 'card' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🎴 卡片学习
          </button>
          <button
            onClick={startQuiz}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              mode === 'quiz' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🎯 记忆测验
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info">{languageNames[lang].flag} {languageNames[lang].name}</Badge>
          <span className={`badge ${levelNames[level].color}`}>{levelNames[level].name}</span>
          <span className="badge bg-gray-100 text-gray-600">共 {words.length} 词</span>
        </div>
      </div>

      {mode === 'card' ? (
        /* ============= 卡片模式 ============= */
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">当前进度</span>
              <span className="text-sm font-medium text-primary-600">
                {currentIdx + 1} / {words.length}
              </span>
            </div>
            <ProgressBar value={currentIdx + 1} max={words.length} showLabel={false} height="sm" />
          </div>

          {/* Flashcard */}
          <div
            className="perspective-1000 h-[400px] cursor-pointer select-none"
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden">
                <div className="card h-full bg-gradient-to-br from-white to-primary-50 border-primary-100 flex flex-col items-center justify-center text-center p-8 shadow-lg">
                  {isWordMastered >= 100 && (
                    <div className="absolute top-5 left-5">
                      <Badge variant="success">🏆 已掌握</Badge>
                    </div>
                  )}
                  <span className="absolute top-5 right-5 text-xs text-gray-400">👆 点击翻转查看释义</span>
                  <span className="text-sm text-gray-500 mb-2">{currentWord?.category}</span>
                  <h2 className="text-5xl font-bold text-gray-900 mb-4">{currentWord?.word}</h2>
                  <div className="flex items-center gap-2 text-xl text-gray-500 mb-6">
                    <Volume2 className="w-5 h-5 text-primary-500 cursor-pointer hover:text-primary-600" />
                    <span>{currentWord?.pronunciation}</span>
                  </div>
                  <div className="w-full max-w-sm">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>掌握度</span>
                      <span>{isWordMastered}%</span>
                    </div>
                    <ProgressBar value={isWordMastered} showLabel={false} height="sm" />
                  </div>
                </div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className="card h-full bg-gradient-to-br from-secondary-50 to-white border-secondary-100 flex flex-col items-center justify-center text-center p-8 shadow-lg">
                  <span className="absolute top-5 right-5 text-xs text-gray-400">👆 点击翻转返回</span>
                  <Eye className="w-8 h-8 text-secondary-500 mb-4" />
                  <h3 className="text-sm text-gray-500 mb-2">中文释义</h3>
                  <h2 className="text-4xl font-bold text-secondary-600 mb-6">{currentWord?.translation}</h2>
                  <div className="w-full border-t border-gray-100 pt-6 text-left space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">📖 例句</p>
                      <p className="text-gray-800 italic">"{currentWord?.example}"</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">💡 翻译</p>
                      <p className="text-primary-600">{currentWord?.exampleTranslation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-3 gap-4">
            <button onClick={handleCardDontKnow} className="btn-secondary flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              还没记住
            </button>
            <button onClick={() => setFlipped(!flipped)} className="btn-secondary flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" />
              翻面
            </button>
            <button onClick={handleCardKnow} className="btn-success flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              记住了
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setFlipped(false); setCurrentIdx(i => Math.max(0, i - 1)); }}
              className="p-3 rounded-xl hover:bg-gray-100 text-gray-500"
              disabled={currentIdx === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={startQuiz} className="btn-primary !py-2.5 text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              进入测验模式
            </button>
            <button
              onClick={nextCard}
              className="p-3 rounded-xl hover:bg-gray-100 text-gray-500"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        /* ============= 测验模式 ============= */
        <div className="max-w-2xl mx-auto space-y-8">
          {quizIdx >= quizWords.length ? (
            /* 测验完成 */
            <div className="card text-center py-16 animate-slide-up">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">测验完成！</h2>
              <p className="text-gray-500 mb-8">以下是本次测验的结果总结</p>
              <div className="grid grid-cols-2 gap-5 max-w-md mx-auto mb-8">
                <div className="p-6 rounded-2xl bg-accent-50 border border-accent-100">
                  <div className="text-4xl font-bold text-accent-600 mb-1">{quizStats.correct}</div>
                  <div className="text-sm text-accent-700">答对题数</div>
                </div>
                <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
                  <div className="text-4xl font-bold text-red-500 mb-1">{quizStats.wrong}</div>
                  <div className="text-sm text-red-600">答错题数</div>
                </div>
              </div>
              <div className="text-2xl font-bold mb-8">
                正确率：
                <span className={quizStats.correct / quizWords.length >= 0.8 ? 'text-accent-600' : 'text-primary-600'}>
                  {Math.round((quizStats.correct / quizWords.length) * 100)}%
                </span>
                {quizStats.correct / quizWords.length >= 0.8 && <span className="ml-2">✨</span>}
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button onClick={startQuiz} className="btn-primary flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> 再来一次
                </button>
                <button onClick={() => setMode('card')} className="btn-secondary">
                  返回卡片模式
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Quiz Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">进度</span>
                    <span className="badge bg-accent-100 text-accent-700">✓ {quizStats.correct}</span>
                    <span className="badge bg-red-100 text-red-600">✗ {quizStats.wrong}</span>
                  </div>
                  <span className="text-sm font-medium text-primary-600">
                    {quizIdx + 1} / {quizWords.length}
                  </span>
                </div>
                <ProgressBar value={quizIdx + 1} max={quizWords.length} showLabel={false} height="sm" />
              </div>

              {/* Question */}
              <div className="card p-8 animate-fade-in" key={quizIdx}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> 请选择正确的中文释义
                  </span>
                  <span className="badge bg-gray-100 text-gray-600">{quizWords[quizIdx]?.category}</span>
                </div>
                <div className="text-center py-8 mb-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                  <h2 className="text-5xl font-bold text-gray-900 mb-3">{quizWords[quizIdx]?.word}</h2>
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Volume2 className="w-5 h-5 text-primary-500" />
                    <span>{quizWords[quizIdx]?.pronunciation}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {quizOptions.map((opt, i) => {
                    const isSelected = userAnswer === opt;
                    const isCorrect = opt === quizWords[quizIdx]?.translation;
                    let btnClass = 'w-full p-4 rounded-xl text-left font-medium transition-all flex items-center gap-3 border-2 ';
                    if (showResult) {
                      if (isCorrect) btnClass += 'bg-accent-50 border-accent-400 text-accent-700';
                      else if (isSelected) btnClass += 'bg-red-50 border-red-400 text-red-600';
                      else btnClass += 'bg-gray-50 border-gray-200 text-gray-500';
                    } else {
                      btnClass += isSelected
                        ? 'bg-primary-50 border-primary-400 text-primary-700'
                        : 'bg-gray-50 border-gray-200 hover:border-primary-300 hover:bg-white text-gray-700';
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizSubmit(opt)}
                        disabled={showResult}
                        className={btnClass}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                          showResult
                            ? isCorrect ? 'bg-accent-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                            : isSelected ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {showResult && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                           showResult && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                           String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showResult && (
                  <div className={`mt-6 p-5 rounded-2xl animate-fade-in ${
                    quizResult === 'correct' ? 'bg-accent-50 border border-accent-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      {quizResult === 'correct' ? (
                        <><CheckCircle2 className="w-6 h-6 text-accent-600" />
                        <span className="font-bold text-accent-700 text-lg">答对了！+5 积分</span></>
                      ) : (
                        <><XCircle className="w-6 h-6 text-red-500" />
                        <span className="font-bold text-red-600 text-lg">答错了，继续加油！+2 积分</span></>
                      )}
                    </div>
                    <div className="text-sm space-y-1">
                      <p className={`${quizResult === 'correct' ? 'text-accent-700' : 'text-red-700'}`}>
                        💡 例句：{quizWords[quizIdx]?.example}
                      </p>
                      <p className="text-gray-600">
                        翻译：{quizWords[quizIdx]?.exampleTranslation}
                      </p>
                    </div>
                    <button onClick={handleQuizNext} className="btn-primary mt-4 w-full !py-2.5">
                      {quizIdx < quizWords.length - 1 ? '下一题 →' : '查看结果 🎉'}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
