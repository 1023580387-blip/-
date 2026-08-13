import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import ProgressBar from '../components/common/ProgressBar'
import { useToast } from '../components/common/Toast'
import { getUnitDetail } from '../api/modules/courseApi'
import { submitExerciseResult } from '../api/modules/learningApi'

interface ListeningItem {
  id: string
  script: string
  translation: string
  question: string
  options: string[]
  answer: string
  audioUrl?: string
}

const mockListening: ListeningItem[] = [
  {
    id: 'l1',
    script: 'Good morning! I would like a cup of coffee and a sandwich, please.',
    translation: '早上好！我想要一杯咖啡和一个三明治。',
    question: 'What does the customer want?',
    options: ['Tea and cake', 'Coffee and sandwich', 'Juice and bread', 'Milk and cookies'],
    answer: 'Coffee and sandwich',
  },
  {
    id: 'l2',
    script: 'The meeting will start at 2 o\'clock in the afternoon in Conference Room B.',
    translation: '会议将于下午2点在B会议室开始。',
    question: 'Where is the meeting?',
    options: ['Room A', 'Room B', 'Room C', 'Main Hall'],
    answer: 'Room B',
  },
  {
    id: 'l3',
    script: 'I have been learning Japanese for two years and I really enjoy it.',
    translation: '我学习日语已经两年了，我非常喜欢它。',
    question: 'How long has the speaker learned Japanese?',
    options: ['One year', 'Two years', 'Three years', 'Four years'],
    answer: 'Two years',
  },
]

export default function ListeningPractice() {
  const { unitId } = useParams<{ unitId: string }>()
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()

  const [items, setItems] = useState<ListeningItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showScript, setShowScript] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [playCount, setPlayCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const loadListening = async () => {
      setIsLoading(true)
      try {
        if (unitId) {
          try {
            const response = await getUnitDetail(unitId)
            const listenExercises = (response.data.exercises || []).filter((e) => e.type === 'listen')
            if (listenExercises.length > 0) {
              const mapped: ListeningItem[] = listenExercises.map((e) => ({
                id: e.id,
                script: e.question,
                translation: e.hint || '',
                question: '选择正确答案',
                options: e.options || [],
                answer: e.answer,
                audioUrl: e.audioUrl,
              }))
              setItems(mapped)
            } else {
              setItems(mockListening)
            }
          } catch {
            setItems(mockListening)
          }
        } else {
          setItems(mockListening)
        }
      } finally {
        setIsLoading(false)
        startTimeRef.current = Date.now()
      }
    }
    loadListening()
  }, [unitId])

  const current = items[currentIndex]
  const progress = items.length > 0 ? ((currentIndex + 1) / items.length) * 100 : 0

  const handlePlay = () => {
    if (!current) return
    setPlayCount((c) => c + 1)
    if (current.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(current.audioUrl)
      }
      audioRef.current.src = current.audioUrl
      audioRef.current.onplay = () => setIsPlaying(true)
      audioRef.current.onended = () => setIsPlaying(false)
      audioRef.current.onerror = () => {
        setIsPlaying(false)
        speakFallback(current.script)
      }
      audioRef.current.play().catch(() => {
        speakFallback(current.script)
      })
    } else {
      speakFallback(current.script)
    }
  }

  const speakFallback = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = 0.9
      utter.onstart = () => setIsPlaying(true)
      utter.onend = () => setIsPlaying(false)
      utter.onerror = () => setIsPlaying(false)
      window.speechSynthesis.speak(utter)
    } else {
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleSelect = (option: string) => {
    if (isAnswered || !current) return
    setSelectedAnswer(option)
    setIsAnswered(true)
    const correct = option === current.answer
    setIsCorrect(correct)
    if (correct) setCorrectCount((c) => c + 1)
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
    submitExerciseResult({
      exerciseId: current.id,
      isCorrect: correct,
      userAnswer: option,
      timeSpent,
      attempts: playCount,
    }).catch(() => {})
  }

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
      setShowScript(false)
      setPlayCount(0)
      startTimeRef.current = Date.now()
    } else {
      const rate = Math.round((correctCount / items.length) * 100)
      toast.success(`听力练习完成！正确率 ${rate}%`)
      setTimeout(() => navigate('/progress'), 1500)
    }
  }

  if (isLoading) {
    return <Loading fullScreen text="加载听力练习中..." />
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <Card className="text-center">
          <p>暂无听力练习</p>
          <Button onClick={() => navigate(-1)} className="mt-4">返回</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="page-container listening-practice">
      <ToastComponent />
      <div className="practice-header">
        <h2>听力训练</h2>
        <div className="practice-stats">
          <span className="correct-badge">✓ {correctCount}/{items.length}</span>
        </div>
      </div>

      <ProgressBar value={progress} showLabel labelInside className="mb-6" />

      <Card className="mb-6">
        <div className="question-number">第 {currentIndex + 1} 题 / 共 {items.length} 题</div>

        <div className="audio-player-box">
          <button
            className={`audio-play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={handlePlay}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="audio-info">
            <div className="audio-title">点击播放音频</div>
            <div className="audio-meta">已播放 {playCount} 次</div>
          </div>
          <div className="audio-wave">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className={`wave-bar ${isPlaying ? 'active' : ''}`}
                style={{ height: `${10 + ((i * 37) % 24)}px`, animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="script-toggle">
          <Button variant="ghost" size="sm" onClick={() => setShowScript(!showScript)}>
            {showScript ? '🙈 隐藏原文' : '👁️ 查看原文'}
          </Button>
        </div>

        {showScript && (
          <div className="script-box">
            <p className="script-en">{current?.script}</p>
            <p className="script-zh">{current?.translation}</p>
          </div>
        )}
      </Card>

      <Card className="question-card mb-6">
        <h3 className="question-text">{current?.question}</h3>
        <div className="options-list">
          {current?.options?.map((option, idx) => {
            let optClass = 'option-item'
            if (isAnswered) {
              if (option === current.answer) optClass += ' option-correct'
              else if (option === selectedAnswer) optClass += ' option-wrong'
              else optClass += ' option-disabled'
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
              </button>
            )
          })}
        </div>
        {isAnswered && (
          <div className={`answer-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? <span>✅ 回答正确！</span> : <span>❌ 正确答案是：<strong>{current?.answer}</strong></span>}
          </div>
        )}
      </Card>

      <div className="practice-actions">
        <Button variant="ghost" onClick={() => navigate(-1)}>退出</Button>
        <Button variant="primary" size="lg" onClick={handleNext} disabled={!isAnswered}>
          {currentIndex < items.length - 1 ? '下一题 →' : '完成练习'}
        </Button>
      </div>
    </div>
  )
}
