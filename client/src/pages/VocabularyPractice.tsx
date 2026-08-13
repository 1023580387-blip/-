import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Loading from '../components/common/Loading'
import ProgressBar from '../components/common/ProgressBar'
import { useToast } from '../components/common/Toast'
import { getUnitDetail, type Word } from '../api/modules/courseApi'
import { submitWordResult } from '../api/modules/learningApi'

const mockWords: Word[] = [
  { id: '1', unitId: 'u1', word: 'apple', translation: '苹果', pronunciation: '/ˈæpəl/', example: 'I eat an apple every day.', partOfSpeech: 'n.' },
  { id: '2', unitId: 'u1', word: 'book', translation: '书', pronunciation: '/bʊk/', example: 'This book is very interesting.', partOfSpeech: 'n.' },
  { id: '3', unitId: 'u1', word: 'beautiful', translation: '美丽的', pronunciation: '/ˈbjuːtɪfl/', example: 'The sunset is beautiful.', partOfSpeech: 'adj.' },
  { id: '4', unitId: 'u1', word: 'run', translation: '跑', pronunciation: '/rʌn/', example: 'I run in the morning.', partOfSpeech: 'v.' },
  { id: '5', unitId: 'u1', word: 'happy', translation: '快乐的', pronunciation: '/ˈhæpi/', example: 'She looks very happy today.', partOfSpeech: 'adj.' },
]

export default function VocabularyPractice() {
  const { unitId } = useParams<{ unitId: string }>()
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()

  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [xpGained, setXpGained] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const loadWords = async () => {
      setIsLoading(true)
      try {
        if (unitId) {
          try {
            const response = await getUnitDetail(unitId)
            if (response.data.words && response.data.words.length > 0) {
              setWords(response.data.words)
            } else {
              setWords(mockWords)
            }
          } catch {
            setWords(mockWords)
          }
        } else {
          setWords(mockWords)
        }
      } finally {
        setIsLoading(false)
        startTimeRef.current = Date.now()
      }
    }
    loadWords()
  }, [unitId])

  const currentWord = words[currentIndex]
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKnow = async () => {
    if (!currentWord) return
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
    try {
      await submitWordResult({
        wordId: currentWord.id,
        isCorrect: true,
        timeSpent,
        attempts: 1,
      })
    } catch {}
    setCorrectCount((c) => c + 1)
    setXpGained((x) => x + 10)
    setFeedback('correct')
    setTimeout(() => {
      setFeedback(null)
      nextWord()
    }, 800)
  }

  const handleDontKnow = async () => {
    if (!currentWord) return
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
    try {
      await submitWordResult({
        wordId: currentWord.id,
        isCorrect: false,
        timeSpent,
        attempts: 1,
      })
    } catch {}
    setFeedback('wrong')
    setTimeout(() => {
      setFeedback(null)
      nextWord()
    }, 800)
  }

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
      startTimeRef.current = Date.now()
    } else {
      toast.success(`练习完成！获得 ${xpGained + 10} XP，正确 ${correctCount + 1}/${words.length}`)
      setTimeout(() => navigate('/progress'), 1500)
    }
  }

  if (isLoading) {
    return <Loading fullScreen text="加载单词中..." />
  }

  if (words.length === 0) {
    return (
      <div className="page-container">
        <Card className="text-center">
          <p>暂无单词可练习</p>
          <Button onClick={() => navigate(-1)} className="mt-4">返回</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="page-container vocab-practice">
      <ToastComponent />
      <div className="practice-header">
        <h2>{unitId ? '单元单词练习' : '待复习单词'}</h2>
        <div className="practice-stats">
          <span className="xp-badge">+{xpGained} XP</span>
          <span className="correct-badge">✓ {correctCount}/{words.length}</span>
        </div>
      </div>

      <ProgressBar value={progress} showLabel labelInside className="mb-8" />

      <div className="card-counter">
        {currentIndex + 1} / {words.length}
      </div>

      <div className="flip-card-wrapper">
        <div
          className={`flip-card ${isFlipped ? 'flipped' : ''} ${feedback === 'correct' ? 'feedback-correct' : ''} ${feedback === 'wrong' ? 'feedback-wrong' : ''}`}
          onClick={handleFlip}
        >
          <div className="flip-card-face flip-card-front">
            <div className="word-pronunciation">{currentWord?.pronunciation}</div>
            <div className="word-text">{currentWord?.word}</div>
            <div className="word-pos">{currentWord?.partOfSpeech}</div>
            <div className="flip-hint">点击卡片查看翻译</div>
          </div>
          <div className="flip-card-face flip-card-back">
            <div className="word-translation">{currentWord?.translation}</div>
            {currentWord?.example && (
              <div className="word-example">
                <span className="example-label">例句：</span>
                {currentWord.example}
              </div>
            )}
          </div>
        </div>

        {feedback && (
          <div className={`feedback-overlay ${feedback}`}>
            <span className="feedback-emoji">{feedback === 'correct' ? '认识了🎯' : '下次加油💪'}</span>
          </div>
        )}
      </div>

      <div className="practice-actions">
        <Button variant="danger" size="lg" onClick={handleDontKnow}>
          不认识
        </Button>
        <Button variant="success" size="lg" onClick={handleKnow}>
          认识
        </Button>
      </div>
    </div>
  )
}
