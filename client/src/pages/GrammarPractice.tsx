import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import ProgressBar from '../components/common/ProgressBar'
import { useToast } from '../components/common/Toast'
import { getUnitDetail, type Exercise } from '../api/modules/courseApi'
import { submitExerciseResult } from '../api/modules/learningApi'

const mockExercises: Exercise[] = [
  {
    id: 'g1',
    unitId: 'u1',
    type: 'choice',
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    answer: 'goes',
    hint: '第三人称单数现在时，动词需加-s',
    order: 1,
  },
  {
    id: 'g2',
    unitId: 'u1',
    type: 'choice',
    question: 'I have been learning English ___ three years.',
    options: ['since', 'for', 'in', 'at'],
    answer: 'for',
    hint: '表示持续一段时间用for，since后接时间点',
    order: 2,
  },
  {
    id: 'g3',
    unitId: 'u1',
    type: 'choice',
    question: 'The book ___ by millions of people last year.',
    options: ['read', 'reads', 'was read', 'is read'],
    answer: 'was read',
    hint: '被动语态，过去时用was/were + 过去分词',
    order: 3,
  },
  {
    id: 'g4',
    unitId: 'u1',
    type: 'choice',
    question: 'If it ___ tomorrow, we will stay at home.',
    options: ['rain', 'rains', 'will rain', 'rained'],
    answer: 'rains',
    hint: '条件状语从句中，主将从现',
    order: 4,
  },
]

const grammarRules: Record<string, string> = {
  g1: '一般现在时：主语为第三人称单数（he/she/it）时，谓语动词需加-s或-es。',
  g2: '现在完成时：for + 时间段（如for three years），since + 时间点（如since 2020）。',
  g3: '被动语态：结构为 be + 过去分词。过去时被动用 was/were + 过去分词。',
  g4: '条件状语从句：if 引导的条件句中，主句用将来时，从句用一般现在时表将来。',
}

export default function GrammarPractice() {
  const { unitId } = useParams<{ unitId: string }>()
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [correctCount, setCorrectCount] = useState(0)
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set())
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true)
      try {
        if (unitId) {
          try {
            const response = await getUnitDetail(unitId)
            const grammarExercises = (response.data.exercises || []).filter((e) => e.type === 'choice')
            if (grammarExercises.length > 0) {
              setExercises(grammarExercises)
            } else {
              setExercises(mockExercises)
            }
          } catch {
            setExercises(mockExercises)
          }
        } else {
          setExercises(mockExercises)
        }
      } finally {
        setIsLoading(false)
        startTimeRef.current = Date.now()
      }
    }
    loadExercises()
  }, [unitId])

  const current = exercises[currentIndex]
  const progress = exercises.length > 0 ? ((currentIndex + 1) / exercises.length) * 100 : 0

  const handleSelect = async (option: string) => {
    if (isAnswered || !current) return
    setSelectedAnswer(option)
    setIsAnswered(true)
    const correct = option === current.answer
    setIsCorrect(correct)
    if (correct) {
      setCorrectCount((c) => c + 1)
    }
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
    if (!submittedIds.has(current.id)) {
      try {
        await submitExerciseResult({
          exerciseId: current.id,
          isCorrect: correct,
          userAnswer: option,
          timeSpent,
          attempts: 1,
        })
        setSubmittedIds((prev) => new Set(prev).add(current.id))
      } catch {}
    }
  }

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
      startTimeRef.current = Date.now()
    } else {
      const rate = Math.round((correctCount / exercises.length) * 100)
      toast.success(`练习完成！正确率 ${rate}%（${correctCount}/${exercises.length}）`)
      setTimeout(() => navigate('/progress'), 1500)
    }
  }

  if (isLoading) {
    return <Loading fullScreen text="加载语法练习中..." />
  }

  if (exercises.length === 0) {
    return (
      <div className="page-container">
        <Card className="text-center">
          <p>暂无语法练习</p>
          <Button onClick={() => navigate(-1)} className="mt-4">返回</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="page-container grammar-practice">
      <ToastComponent />
      <div className="practice-header">
        <h2>语法练习</h2>
        <div className="practice-stats">
          <span className="correct-badge">✓ {correctCount}/{exercises.length}</span>
        </div>
      </div>

      <ProgressBar value={progress} showLabel labelInside className="mb-6" />

      <Card className="question-card mb-6">
        <div className="question-number">第 {currentIndex + 1} 题 / 共 {exercises.length} 题</div>
        <h3 className="question-text">{current?.question}</h3>

        <div className="grammar-rule">
          <span className="rule-label">📚 语法说明：</span>
          <span className="rule-content">
            {grammarRules[current?.id || ''] || '仔细审题，选择最佳答案。'}
          </span>
        </div>

        <div className="options-list">
          {current?.options?.map((option, idx) => {
            let optClass = 'option-item'
            if (isAnswered) {
              if (option === current.answer) {
                optClass += ' option-correct'
              } else if (option === selectedAnswer && option !== current.answer) {
                optClass += ' option-wrong'
              } else {
                optClass += ' option-disabled'
              }
            }
            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
                {isAnswered && option === current.answer && <span className="option-mark">✓</span>}
                {isAnswered && option === selectedAnswer && option !== current.answer && <span className="option-mark">✗</span>}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={`answer-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? (
              <span>✅ 回答正确！</span>
            ) : (
              <span>❌ 回答错误，正确答案是：<strong>{current?.answer}</strong></span>
            )}
            {current?.hint && (
              <div className="hint-text">💡 提示：{current.hint}</div>
            )}
          </div>
        )}
      </Card>

      <div className="practice-actions">
        <Button variant="ghost" onClick={() => navigate(-1)}>退出</Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentIndex < exercises.length - 1 ? '下一题 →' : '完成练习'}
        </Button>
      </div>
    </div>
  )
}
