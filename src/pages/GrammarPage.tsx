import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { languageNames, levelNames, shuffleArray } from '../utils';
import type { Language, LanguageLevel, GrammarQuestion } from '../types';
import { Badge, ProgressBar } from '../components/UI';
import {
  ArrowLeft, RotateCcw, CheckCircle2, XCircle, Lightbulb,
  ChevronRight, Sparkles, Target
} from 'lucide-react';

export function GrammarPage() {
  const { user, getFilteredGrammar, addPoints } = useStore();
  const lang = user?.currentLanguage || 'en' as Language;
  const level = user?.currentLevel || 'beginner' as LanguageLevel;

  const questions = useMemo(() => {
    const qs = getFilteredGrammar(lang, level);
    return shuffleArray(qs);
  }, [lang, level, getFilteredGrammar]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [fillAnswer, setFillAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [finished, setFinished] = useState(false);

  const current = questions[currentIdx];

  useEffect(() => {
    setSelectedChoice('');
    setFillAnswer('');
    setShowResult(false);
  }, [currentIdx]);

  const handleSubmitChoice = () => {
    if (!selectedChoice || showResult) return;
    const correct = selectedChoice === current.answer;
    setIsCorrect(correct);
    setShowResult(true);
    setStats(s => ({
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));
    addPoints(correct ? 5 : 2);
  };

  const handleSubmitFill = () => {
    if (!fillAnswer.trim() || showResult) return;
    const correct = fillAnswer.trim().toLowerCase() === current.answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    setStats(s => ({
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));
    addPoints(correct ? 5 : 2);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setStats({ correct: 0, wrong: 0 });
    setFinished(false);
  };

  if (questions.length === 0) {
    return (
      <div className="animate-fade-in">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 w-fit">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="card text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">暂无语法题目</h3>
          <p className="text-gray-500 mb-6">当前语言和级别下暂无语法练习题。</p>
        </div>
      </div>
    );
  }

  if (finished) {
    const rate = Math.round((stats.correct / questions.length) * 100);
    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 w-fit">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="card text-center py-16 animate-slide-up">
          <div className="text-7xl mb-4">{rate >= 80 ? '🏆' : rate >= 60 ? '🎉' : '💪'}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {rate >= 80 ? '太棒了！' : rate >= 60 ? '不错哦！' : '继续努力！'}
          </h2>
          <p className="text-gray-500 mb-8">语法练习已完成，以下是你的成绩</p>
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
            <div className="p-5 rounded-2xl bg-gray-50">
              <div className="text-3xl font-bold text-gray-900 mb-1">{questions.length}</div>
              <div className="text-sm text-gray-500">总题数</div>
            </div>
            <div className="p-5 rounded-2xl bg-accent-50">
              <div className="text-3xl font-bold text-accent-600 mb-1">{stats.correct}</div>
              <div className="text-sm text-accent-700">答对</div>
            </div>
            <div className="p-5 rounded-2xl bg-red-50">
              <div className="text-3xl font-bold text-red-500 mb-1">{stats.wrong}</div>
              <div className="text-sm text-red-600">答错</div>
            </div>
          </div>
          <div className="mb-8">
            <div className="text-lg text-gray-500 mb-2">正确率</div>
            <div className="text-5xl font-bold text-gradient mb-2">{rate}%</div>
            <ProgressBar value={rate} height="lg" showLabel={false} />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button onClick={handleReset} className="btn-primary flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> 再来一次
            </button>
            <Link to="/practice" className="btn-secondary">
              返回学习中心
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/practice" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" /> 返回学习中心
        </Link>
        <div className="flex items-center gap-3">
          <Badge variant="info">{languageNames[lang].flag} {languageNames[lang].name}</Badge>
          <span className={`badge ${levelNames[level].color}`}>{levelNames[level].name}</span>
          <span className="badge bg-gray-100 text-gray-600">共 {questions.length} 题</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">当前进度</span>
              <span className="badge bg-accent-100 text-accent-700">✓ {stats.correct}</span>
              <span className="badge bg-red-100 text-red-600">✗ {stats.wrong}</span>
            </div>
            <span className="text-sm font-medium text-primary-600">
              第 {currentIdx + 1} / {questions.length} 题
            </span>
          </div>
          <ProgressBar value={currentIdx + 1} max={questions.length} showLabel={false} height="sm" />
        </div>

        {/* Question Card */}
        <div className="card p-8 animate-fade-in" key={currentIdx}>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className={`badge ${current.type === 'choice' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'}`}>
                {current.type === 'choice' ? '📋 选择题' : '✏️ 填空题'}
              </span>
              <Badge variant="info">语法点：{current.grammarPoint}</Badge>
            </div>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Target className="w-4 h-4" /> 5积分/题
            </span>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-8 border border-gray-100">
            <p className="text-sm text-gray-500 mb-4">请选择/填写正确答案：</p>
            <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
              {current.type === 'fill'
                ? current.question.replace('___', '______')
                : current.question
              }
            </h2>
          </div>

          {current.type === 'choice' && current.options ? (
            /* Choice Options */
            <div className="space-y-3">
              {current.options.map((opt, i) => {
                const isSelected = selectedChoice === opt;
                const isAnswer = opt === current.answer;
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
                    onClick={() => !showResult && setSelectedChoice(opt)}
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
          ) : (
            /* Fill blank */
            <div className="space-y-4">
              <input
                type="text"
                className="input text-xl !py-4"
                placeholder="请在上方输入答案..."
                value={fillAnswer}
                onChange={e => setFillAnswer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmitFill()}
                disabled={showResult}
              />
              {showResult && (
                <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                  <p className="text-sm text-primary-600">
                    正确答案：<strong className="text-lg">{current.answer}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Submit / Next Btn */}
          <div className="mt-8 flex items-center justify-end gap-3">
            {!showResult ? (
              current.type === 'choice' ? (
                <button
                  onClick={handleSubmitChoice}
                  disabled={!selectedChoice}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleSubmitFill}
                  disabled={!fillAnswer.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  提交答案
                </button>
              )
            ) : (
              <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                {currentIdx < questions.length - 1 ? '下一题' : '完成练习'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`mt-6 p-5 rounded-2xl animate-fade-in ${
              isCorrect ? 'bg-accent-50 border border-accent-200' : 'bg-warn-50 border border-warn-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className={`w-5 h-5 ${isCorrect ? 'text-accent-600' : 'text-warn-600'}`} />
                <span className={`font-bold text-lg ${isCorrect ? 'text-accent-700' : 'text-warn-600'}`}>
                  {isCorrect ? '回答正确！+5 积分' : '回答错误 +2 积分'}
                </span>
              </div>
              <p className={`${isCorrect ? 'text-accent-700' : 'text-warn-700'}`}>
                <strong>💡 语法解析：</strong>{current.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
