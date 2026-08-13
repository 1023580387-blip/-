import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import Loading from '../components/common/Loading'
import { useToast } from '../components/common/Toast'
import { getCourseDetail, type Course, type Exercise } from '../api/modules/courseApi'

type ExerciseCategory = 'word' | 'grammar' | 'listen' | 'speak'

const EXERCISE_CATEGORY_LABELS: Record<ExerciseCategory, { label: string; icon: string }> = {
  word: { label: '单词', icon: '🔤' },
  grammar: { label: '语法', icon: '📝' },
  listen: { label: '听力', icon: '🎧' },
  speak: { label: '口语', icon: '🗣️' },
}

function categorizeExercises(exercises: Exercise[]): Record<ExerciseCategory, number> {
  const counts: Record<ExerciseCategory, number> = { word: 0, grammar: 0, listen: 0, speak: 0 }
  exercises.forEach((ex) => {
    if (ex.type === 'choice' || ex.type === 'fill' || ex.type === 'match') {
      const typeLower = ex.type
      if (typeLower === 'choice') {
        counts.grammar += 1
      } else if (typeLower === 'fill') {
        counts.word += 1
      } else {
        counts.grammar += 1
      }
    } else if (ex.type === 'listen') {
      counts.listen += 1
    } else if (ex.type === 'speak') {
      counts.speak += 1
    }
  })
  return counts
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!courseId) {
      toast.error('无效的课程ID')
      navigate('/courses')
      return
    }
    const fetchCourse = async () => {
      setLoading(true)
      try {
        const res = await getCourseDetail(courseId)
        setCourse(res.data)
      } catch (error) {
        toast.error('加载课程详情失败')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [courseId, navigate, toast])

  const unitSummaries = useMemo(() => {
    if (!course) return []
    return (course.units ?? []).map((unit) => {
      const wordCount = unit.words?.length ?? 0
      const exerciseCounts = categorizeExercises(unit.exercises ?? [])
      return {
        unit,
        wordCount,
        grammarCount: exerciseCounts.grammar,
        listenCount: exerciseCounts.listen,
        speakCount: exerciseCounts.speak,
      }
    })
  }, [course])

  const totalProgress = useMemo(() => {
    if (!course) return 0
    return course.progress ?? 0
  }, [course])

  if (loading) {
    return <Loading fullScreen text="加载课程详情中..." />
  }

  if (!course) {
    return (
      <div className="course-detail-page">
        <ToastComponent />
        <Card padding="lg">
          <div className="empty-state-large">
            <span className="empty-icon">❌</span>
            <h3>课程不存在</h3>
            <Button variant="primary" onClick={() => navigate('/courses')}>
              返回课程列表
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="course-detail-page">
      <ToastComponent />

      <div className="course-detail-header">
        <Button variant="ghost" size="sm" onClick={() => navigate('/courses')}>
          ← 返回课程列表
        </Button>
      </div>

      <Card variant="primary" padding="lg" className="course-info-card">
        <div className="course-info-main">
          <div className="course-info-text">
            <h1 className="course-title">{course.title}</h1>
            <p className="course-desc">{course.description}</p>
            <div className="course-info-tags">
              <span className="course-info-tag">等级 {course.level}</span>
              <span className="course-info-tag">
                {course.languageFrom} → {course.languageTo}
              </span>
              <span className="course-info-tag">{course.units?.length ?? 0} 个单元</span>
            </div>
          </div>
          <div className="course-progress-wrap">
            <div className="course-progress-header">
              <span className="progress-label">课程进度</span>
              <span className="progress-value">{Math.round(totalProgress)}%</span>
            </div>
            <ProgressBar
              value={totalProgress}
              variant="primary"
              size="lg"
              showLabel
              labelInside
              animated
            />
            <Button
              variant="success"
              size="lg"
              fullWidth
              className="continue-btn"
              onClick={() => {
                const units = course.units ?? []
                const nextUnit = units.find((u) => !u.isCompleted && u.isUnlocked) ?? units[0]
                if (nextUnit) {
                  navigate(`/units/${nextUnit.id}`)
                } else {
                  toast.info('暂无可用单元')
                }
              }}
            >
              {totalProgress > 0 ? '继续学习' : '开始学习'}
            </Button>
          </div>
        </div>
      </Card>

      <Card
        header={
          <div className="card-header-flex">
            <h2>📚 单元列表</h2>
            <span className="unit-count">{unitSummaries.length} 个单元</span>
          </div>
        }
        padding="md"
      >
        <div className="unit-list">
          {unitSummaries.length === 0 ? (
            <p className="empty-state">该课程暂无单元</p>
          ) : (
            unitSummaries.map(({ unit, wordCount, grammarCount, listenCount, speakCount }, idx) => (
              <div
                key={unit.id}
                className={`unit-list-item ${unit.isCompleted ? 'is-completed' : ''} ${unit.isUnlocked === false ? 'is-locked' : ''}`}
                onClick={() => {
                  if (unit.isUnlocked === false) {
                    toast.warning('该单元尚未解锁')
                    return
                  }
                  navigate(`/units/${unit.id}`)
                }}
              >
                <div className="unit-order">{idx + 1}</div>
                <div className="unit-content">
                  <div className="unit-header-row">
                    <h3 className="unit-title">
                      {unit.isUnlocked === false && <span className="lock-icon">🔒</span>}
                      {unit.isCompleted && <span className="check-icon">✅</span>}
                      {unit.title}
                    </h3>
                    {unit.progress !== undefined && unit.progress > 0 && (
                      <span className="unit-progress-tag">{Math.round(unit.progress)}%</span>
                    )}
                  </div>
                  <p className="unit-desc">{unit.description}</p>
                  <div className="unit-stats">
                    <div className="unit-stat">
                      <span>{EXERCISE_CATEGORY_LABELS.word.icon}</span>
                      <span className="stat-num">{wordCount}</span>
                      <span>{EXERCISE_CATEGORY_LABELS.word.label}</span>
                    </div>
                    <div className="unit-stat">
                      <span>{EXERCISE_CATEGORY_LABELS.grammar.icon}</span>
                      <span className="stat-num">{grammarCount}</span>
                      <span>{EXERCISE_CATEGORY_LABELS.grammar.label}</span>
                    </div>
                    <div className="unit-stat">
                      <span>{EXERCISE_CATEGORY_LABELS.listen.icon}</span>
                      <span className="stat-num">{listenCount}</span>
                      <span>{EXERCISE_CATEGORY_LABELS.listen.label}</span>
                    </div>
                    <div className="unit-stat">
                      <span>{EXERCISE_CATEGORY_LABELS.speak.icon}</span>
                      <span className="stat-num">{speakCount}</span>
                      <span>{EXERCISE_CATEGORY_LABELS.speak.label}</span>
                    </div>
                  </div>
                  {unit.progress !== undefined && unit.progress > 0 && unit.progress < 100 && (
                    <div className="unit-progress-bar">
                      <ProgressBar value={unit.progress} variant="success" size="sm" />
                    </div>
                  )}
                  <div className="unit-status">
                    {unit.isCompleted && <span className="status-tag status-completed">已完成</span>}
                    {!unit.isCompleted && unit.isUnlocked !== false && <span className="status-tag status-available">可学习</span>}
                    {unit.isUnlocked === false && <span className="status-tag status-locked">未解锁</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
