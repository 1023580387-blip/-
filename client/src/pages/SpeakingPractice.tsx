import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import ProgressBar from '../components/common/ProgressBar'
import { useToast } from '../components/common/Toast'
import { getUnitDetail } from '../api/modules/courseApi'
import { submitExerciseResult } from '../api/modules/learningApi'

interface SpeakingItem {
  id: string
  sentence: string
  ipa: string
  translation: string
}

const mockSpeaking: SpeakingItem[] = [
  {
    id: 's1',
    sentence: 'Hello, nice to meet you!',
    ipa: '/həˈloʊ, naɪs tuː miːt juː!',
    translation: '你好，很高兴认识你！',
  },
  {
    id: 's2',
    sentence: 'I have been learning English for three years.',
    ipa: '/aɪ hæv bɪn ˈlɜːrnɪŋ ˈɪŋɡlɪʃ fɔːr θriː jɪrz.',
    translation: '我学习英语已经三年了。',
  },
  {
    id: 's3',
    sentence: 'Could you please help me with this problem?',
    ipa: '/kʊd juː pliːz help miː wɪð ðɪs ˈprɒbləm?',
    translation: '你能帮我解决这个问题吗？',
  },
  {
    id: 's4',
    sentence: 'The weather today is absolutely beautiful.',
    ipa: '/ðə ˈweðər təˈdeɪ ɪz ˈæbsəluːtli ˈbjuːtɪfl.',
    translation: '今天的天气真的很美。',
  },
]

export default function SpeakingPractice() {
  const { unitId } = useParams<{ unitId: string }>()
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()

  const [items, setItems] = useState<SpeakingItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedScore, setRecordedScore] = useState<number | null>(null)
  const [isDemonstrating, setIsDemonstrating] = useState(false)
  const [scores, setScores] = useState<number[]>([])
  const recordStartRef = useRef<number>(0)
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [recordDuration, setRecordDuration] = useState(0)

  useEffect(() => {
    const loadSpeaking = async () => {
      setIsLoading(true)
      try {
        if (unitId) {
          try {
            const response = await getUnitDetail(unitId)
            const speakExercises = (response.data.exercises || []).filter((e) => e.type === 'speak')
            if (speakExercises.length > 0) {
              const mapped: SpeakingItem[] = speakExercises.map((e, i) => ({
                id: e.id,
                sentence: e.question,
                ipa: '/.../',
                translation: e.hint || mockSpeaking[i % mockSpeaking.length].translation,
              }))
              setItems(mapped)
            } else {
              setItems(mockSpeaking)
            }
          } catch {
            setItems(mockSpeaking)
          }
        } else {
          setItems(mockSpeaking)
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadSpeaking()
  }, [unitId])

  const current = items[currentIndex]
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const progress = items.length > 0 ? ((currentIndex + (recordedScore !== null ? 1 : 0)) / items.length) * 100 : 0

  const handleDemonstrate = () => {
    if (!current || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(current.sentence)
    utter.lang = 'en-US'
    utter.rate = 0.85
    utter.onstart = () => setIsDemonstrating(true)
    utter.onend = () => setIsDemonstrating(false)
    utter.onerror = () => setIsDemonstrating(false)
    window.speechSynthesis.speak(utter)
  }

  const startRecording = () => {
    if (isRecording) return
    setIsRecording(true)
    setRecordedScore(null)
    recordStartRef.current = Date.now()
    setRecordDuration(0)
    recordTimerRef.current = setInterval(() => {
      setRecordDuration(Math.floor((Date.now() - recordStartRef.current) / 1000))
    }, 200)
  }

  const stopRecording = () => {
    if (!isRecording) return
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current)
      recordTimerRef.current = null
    }
    const duration = (Date.now() - recordStartRef.current) / 1000
    setIsRecording(false)

    const sentenceWords = current?.sentence.split(' ').length || 5
    const idealMin = Math.max(sentenceWords * 0.3, 1.0)
    const idealMax = Math.max(sentenceWords * 0.8, 2.0)

    let baseScore: number
    if (duration < 0.5) {
      baseScore = 60 + Math.floor(Math.random() * 10)
    } else if (duration >= idealMin && duration <= idealMax) {
      baseScore = 85 + Math.floor(Math.random() * 15)
    } else if (duration < idealMin) {
      baseScore = 70 + Math.floor(Math.random() * 15)
    } else {
      baseScore = 75 + Math.floor(Math.random() * 15)
    }

    const score = Math.min(100, Math.max(60, baseScore))
    setRecordedScore(score)
    setScores((prev) => [...prev, score])

    if (current) {
      submitExerciseResult({
        exerciseId: current.id,
        isCorrect: score >= 70,
        userAnswer: `score:${score}`,
        timeSpent: Math.floor(duration),
        attempts: 1,
      }).catch(() => {})
    }

    toast.info(`跟读评分：${score} 分`)
  }

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setRecordedScore(null)
      setRecordDuration(0)
    } else {
      toast.success(`口语练习完成！平均分数 ${avgScore} 分`)
      setTimeout(() => navigate('/progress'), 1500)
    }
  }

  useEffect(() => {
    return () => {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current)
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  if (isLoading) {
    return <Loading fullScreen text="加载口语练习中..." />
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <Card className="text-center">
          <p>暂无口语练习</p>
          <Button onClick={() => navigate(-1)} className="mt-4">返回</Button>
        </Card>
      </div>
    )
  }

  const getScoreColor = (s: number) => {
    if (s >= 90) return '#10b981'
    if (s >= 75) return '#3b82f6'
    if (s >= 60) return '#f59e0b'
    return '#ef4444'
  }
  const getScoreLabel = (s: number) => {
    if (s >= 90) return '出色 🌟'
    if (s >= 75) return '良好 👍'
    if (s >= 60) return '及格 💪'
    return '继续加油 📚'
  }

  return (
    <div className="page-container speaking-practice">
      <ToastComponent />
      <div className="practice-header">
        <h2>口语跟读</h2>
        <div className="practice-stats">
          <span className="correct-badge">平均分 {avgScore}</span>
        </div>
      </div>

      <ProgressBar value={progress} showLabel labelInside className="mb-6" />
      <div className="card-counter mb-4">{currentIndex + 1} / {items.length}</div>

      <Card className="sentence-card mb-6">
        <div className="sentence-display">
          <p className="ipa-text">{current?.ipa}</p>
          <h3 className="sentence-text">{current?.sentence}</h3>
          <p className="translation-text">{current?.translation}</p>
        </div>

        <Button
          variant="secondary"
          onClick={handleDemonstrate}
          loading={isDemonstrating}
          leftIcon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          }
          className="demo-btn"
        >
          {isDemonstrating ? '朗读中...' : '🔊 听示范'}
        </Button>
      </Card>

      <Card className="record-card">
        <div className="record-circle-wrapper">
          <div className={`record-circle ${isRecording ? 'recording' : ''} ${recordedScore !== null ? 'has-score' : ''}`}>
            {recordedScore !== null ? (
              <div className="score-display" style={{ color: getScoreColor(recordedScore) }}>
                <div className="score-value">{recordedScore}</div>
                <div className="score-label">{getScoreLabel(recordedScore)}</div>
              </div>
            ) : (
              <button className="record-btn" onClick={isRecording ? stopRecording : startRecording}>
                <span className={`record-icon ${isRecording ? 'stop' : 'start'}`} />
                {isRecording ? (
                  <span className="record-time">{recordDuration.toFixed(1)}s</span>
                ) : (
                  <span className="record-text">{isRecording ? '停止' : '录音'}</span>
                )}
              </button>
            )}
          </div>
          {isRecording && (
            <div className="recording-wave">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="wave-dot"
                  style={{
                    height: `${8 + (Math.sin(Date.now() / 100 + i) * 0.5 + 0.5) * 24}px`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="record-hint">
          {recordedScore !== null
            ? '点击中间重新录音，或进入下一句'
            : isRecording
            ? '正在录音，请朗读句子...'
            : '点击麦克风按钮开始录音跟读'}
        </div>
      </Card>

      <div className="practice-actions mt-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>退出</Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={recordedScore === null}
        >
          {currentIndex < items.length - 1 ? '下一句 →' : '完成练习'}
        </Button>
      </div>
    </div>
  )
}
