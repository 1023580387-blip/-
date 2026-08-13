import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import Loading from '../components/common/Loading'
import Modal from '../components/common/Modal'
import { useToast } from '../components/common/Toast'
import { getUnitDetail, type Unit, type Word, type Exercise } from '../api/modules/courseApi'
import { completeUnit, type CompleteUnitResponse } from '../api/modules/learningApi'

type TabKey = 'word' | 'grammar' | 'listen' | 'speak'

interface TabConfig {
  key: TabKey
  label: string
  icon: string
}

const TABS: TabConfig[] = [
  { key: 'word', label: '单词', icon: '🔤' },
  { key: 'grammar', label: '语法', icon: '📝' },
  { key: 'listen', label: '听力', icon: '🎧' },
  { key: 'speak', label: '口语', icon: '🗣️' },
]

function splitExercises(exercises: Exercise[]): Record<TabKey, Exercise[]> {
  const result: Record<TabKey, Exercise[]> = { word: [], grammar: [], listen: [], speak: [] }
  exercises.forEach((ex) => {
    if (ex.type === 'listen') {
      result.listen.push(ex)
    } else if (ex.type === 'speak') {
      result.speak.push(ex)
    } else if (ex.type === 'fill') {
      result.word.push(ex)
    } else {
      result.grammar.push(ex)
    }
  })
  return result
}

export default function UnitDetail() {
  const { unitId } = useParams<{ unitId: string }>()
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()
  const [unit, setUnit] = useState<Unit | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>('word')
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set())
  const [completedExercises, setCompletedExercises] = useState<Record<TabKey, Set<string>>>({
    word: new Set(),
    grammar: new Set(),
    listen: new Set(),
    speak: new Set(),
  })
  const [completeModalOpen, setCompleteModalOpen] = useState(false)
  const [completeResult, setCompleteResult] = useState<CompleteUnitResponse | null>(null)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    if (!unitId) {
      toast.error('无效的单元ID')
      navigate('/courses')
      return
    }
    const fetchUnit = async () => {
      setLoading(true)
      try {
        const res = await getUnitDetail(unitId)
        setUnit(res.data)
      } catch (error) {
        toast.error('加载单元详情失败')
      } finally {
        setLoading(false)
      }
    }
    fetchUnit()
  }, [unitId, navigate, toast])

  const groupedExercises = useMemo(() => {
    if (!unit) return { word: [], grammar: [], listen: [], speak: [] } as Record<TabKey, Exercise[]>
    return splitExercises(unit.exercises ?? [])
  }, [unit])

  const words: Word[] = useMemo(() => unit?.words ?? [], [unit])

  const tabCounts: Record<TabKey, number> = {
    word: words.length + groupedExercises.word.length,
    grammar: groupedExercises.grammar.length,
    listen: groupedExercises.listen.length,
    speak: groupedExercises.speak.length,
  }

  const tabCompleted: Record<TabKey, number> = {
    word: completedWords.size + completedExercises.word.size,
    grammar: completedExercises.grammar.size,
    listen: completedExercises.listen.size,
    speak: completedExercises.speak.size,
  }

  const overallProgress = useMemo(() => {
    const total = Object.values(tabCounts).reduce((a, b) => a + b, 0)
    const done = Object.values(tabCompleted).reduce((a, b) => a + b, 0)
    return total === 0 ? 0 : (done / total) * 100
  }, [tabCounts, tabCompleted])

  const toggleWord = (wordId: string) => {
    setCompletedWords((prev) => {
      const next = new Set(prev)
      if (next.has(wordId)) next.delete(wordId)
      else next.add(wordId)
      return next
    })
  }

  const toggleExercise = (tab: TabKey, exerciseId: string) => {
    setCompletedExercises((prev) => {
      const tabSet = new Set(prev[tab])
      if (tabSet.has(exerciseId)) tabSet.delete(exerciseId)
      else tabSet.add(exerciseId)
      return { ...prev, [tab]: tabSet }
    })
  }

  const handleCompleteUnit = async () => {
    if (!unitId) return
    if (overallProgress < 80) {
      toast.warning('请完成至少80%的内容再提交')
      return
    }
    setCompleting(true)
    try {
      const res = await completeUnit(unitId)
      setCompleteResult(res.data)
      setCompleteModalOpen(true)
      toast.success('单元完成！')
    } catch (error) {
      toast.error('提交失败，请稍后重试')
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return <Loading fullScreen text="加载单元中..." />
  }

  if (!unit) {
    return (
      <div className="unit-detail-page">
        <ToastComponent />
        <Card padding="lg">
          <div className="empty-state-large">
            <span className="empty-icon">❌</span>
            <h3>单元不存在</h3>
            <Button variant="primary" onClick={() => navigate('/courses')}>
              返回课程列表
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const currentWordList = words
  const currentExerciseList = groupedExercises[activeTab]

  return (
    <div className="unit-detail-page">
      <ToastComponent />

      <div className="unit-detail-header">
        <Button variant="ghost" size="sm" onClick={() => navigate(unit.courseId ? `/courses/${unit.courseId}` : '/courses')}>
          ← 返回课程详情
        </Button>
      </div>

      <Card variant="primary" padding="md" className="unit-info-card">
        <div className="unit-info-row">
          <div className="unit-info-text">
            <h1 className="unit-title">{unit.title}</h1>
            <p className="unit-desc">{unit.description}</p>
          </div>
          <div className="unit-progress-wrap">
            <div className="progress-header-row">
              <span className="progress-label">学习进度</span>
              <span className="progress-value">{Math.round(overallProgress)}%</span>
            </div>
            <ProgressBar
              value={overallProgress}
              variant="success"
              size="md"
              animated
            />
            <Button
              variant="success"
              size="md"
              loading={completing}
              disabled={unit.isCompleted}
              onClick={handleCompleteUnit}
              className="complete-unit-btn"
            >
              {unit.isCompleted ? '已完成' : '完成单元'}
            </Button>
          </div>
        </div>
      </Card>

      <div className="unit-tabs">
        {TABS.map((tab) => {
          const total = tabCounts[tab.key]
          const done = tabCompleted[tab.key]
          return (
            <button
              key={tab.key}
              className={`unit-tab ${activeTab === tab.key ? 'unit-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              <span className="tab-count">{done}/{total}</span>
            </button>
          )
        })}
      </div>

      <div className="unit-tab-content">
        {activeTab === 'word' ? (
          <Card
            header={
              <div className="card-header-flex">
                <h2>🔤 单词列表</h2>
                <span className="item-count">{completedWords.size}/{words.length} 已掌握</span>
              </div>
            }
            padding="md"
          >
            <div className="word-list">
              {currentWordList.length === 0 ? (
                <p className="empty-state">该单元暂无单词</p>
              ) : (
                currentWordList.map((word) => {
                  const isDone = completedWords.has(word.id)
                  return (
                    <div
                      key={word.id}
                      className={`word-item ${isDone ? 'is-done' : ''}`}
                      onClick={() => toggleWord(word.id)}
                    >
                      <div className="word-main">
                        <div className="word-top">
                          <span className="word-text">{word.word}</span>
                          {word.partOfSpeech && <span className="word-pos">{word.partOfSpeech}</span>}
                        </div>
                        <span className="word-translation">{word.translation}</span>
                        {word.pronunciation && <span className="word-pronunciation">/{word.pronunciation}/</span>}
                        {word.example && (
                          <div className="word-example">
                            <span className="example-label">例句：</span>
                            <span>{word.example}</span>
                          </div>
                        )}
                      </div>
                      <div className={`word-check ${isDone ? 'checked' : ''}`}>
                        {isDone ? '✓' : ''}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {currentExerciseList.length > 0 && (
              <div className="exercise-section">
                <h3>📝 单词练习</h3>
                <div className="exercise-list">
                  {currentExerciseList.map((ex) => {
                    const isDone = completedExercises.word.has(ex.id)
                    return (
                      <div
                        key={ex.id}
                        className={`exercise-item ${isDone ? 'is-done' : ''}`}
                        onClick={() => toggleExercise('word', ex.id)}
                      >
                        <div className="exercise-main">
                          <div className="exercise-type-tag">
                            {ex.type === 'choice' ? '选择题' : ex.type === 'fill' ? '填空题' : '匹配题'}
                          </div>
                          <p className="exercise-question">{ex.question}</p>
                          {ex.options && (
                            <div className="exercise-options">
                              {ex.options.map((opt, idx) => (
                                <div key={idx} className="exercise-option">
                                  {String.fromCharCode(65 + idx)}. {opt}
                                </div>
                              ))}
                            </div>
                          )}
                          {ex.hint && <p className="exercise-hint">💡 提示：{ex.hint}</p>}
                        </div>
                        <div className={`exercise-check ${isDone ? 'checked' : ''}`}>
                          {isDone ? '✓' : ''}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card
            header={
              <div className="card-header-flex">
                <h2>
                  {TABS.find((t) => t.key === activeTab)?.icon}{' '}
                  {TABS.find((t) => t.key === activeTab)?.label}练习
                </h2>
                <span className="item-count">
                  {completedExercises[activeTab].size}/{currentExerciseList.length} 已完成
                </span>
              </div>
            }
            padding="md"
          >
            <div className="exercise-list">
              {currentExerciseList.length === 0 ? (
                <p className="empty-state">暂无该类型练习</p>
              ) : (
                currentExerciseList.map((ex) => {
                  const isDone = completedExercises[activeTab].has(ex.id)
                  return (
                    <div
                      key={ex.id}
                      className={`exercise-item ${isDone ? 'is-done' : ''}`}
                      onClick={() => toggleExercise(activeTab, ex.id)}
                    >
                      <div className="exercise-main">
                        <div className="exercise-type-tag">
                          {ex.type === 'choice'
                            ? '选择题'
                            : ex.type === 'fill'
                            ? '填空题'
                            : ex.type === 'match'
                            ? '匹配题'
                            : ex.type === 'listen'
                            ? '听力题'
                            : '口语题'}
                        </div>
                        <p className="exercise-question">{ex.question}</p>
                        {ex.options && (
                          <div className="exercise-options">
                            {ex.options.map((opt, idx) => (
                              <div key={idx} className="exercise-option">
                                {String.fromCharCode(65 + idx)}. {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        {ex.audioUrl && (
                          <div className="exercise-audio">
                            <Button variant="ghost" size="sm">🔊 播放音频</Button>
                          </div>
                        )}
                        {ex.hint && <p className="exercise-hint">💡 提示：{ex.hint}</p>}
                      </div>
                      <div className={`exercise-check ${isDone ? 'checked' : ''}`}>
                        {isDone ? '✓' : ''}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </Card>
        )}
      </div>

      <Modal
        open={completeModalOpen}
        title="🎉 单元完成！"
        onClose={() => {
          setCompleteModalOpen(false)
          if (completeResult && unit.courseId) {
            navigate(`/courses/${unit.courseId}`)
          }
        }}
        onConfirm={() => {
          setCompleteModalOpen(false)
          if (completeResult && unit.courseId) {
            navigate(`/courses/${unit.courseId}`)
          }
        }}
        confirmText="返回课程"
        showFooter={true}
      >
        {completeResult && (
          <div className="complete-result">
            <div className="result-item">
              <span className="result-label">获得经验</span>
              <span className="result-value highlight">+{completeResult.experienceGained} XP</span>
            </div>
            {completeResult.levelUp && (
              <div className="result-item level-up">
                <span>🎊 恭喜升级！</span>
                <span className="result-value">达到 Lv.{completeResult.newLevel}</span>
              </div>
            )}
            {completeResult.achievementsUnlocked && completeResult.achievementsUnlocked.length > 0 && (
              <div className="result-item">
                <span className="result-label">解锁成就</span>
                <div className="achievement-tags">
                  {completeResult.achievementsUnlocked.map((a) => (
                    <span key={a} className="achievement-tag">🏆 {a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
