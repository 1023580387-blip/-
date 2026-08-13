import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import ProgressBar from '../components/common/ProgressBar'
import Loading from '../components/common/Loading'
import { useToast } from '../components/common/Toast'
import { getCourses, type Course } from '../api/modules/courseApi'

interface LanguageTab {
  code: string
  name: string
  nativeName: string
  flag: string
}

const LANGUAGE_TABS: LanguageTab[] = [
  { code: 'en', name: '英语', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日语', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '韩语', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: '法语', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: '德语', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: '西班牙语', nativeName: 'Español', flag: '🇪🇸' },
]

const LEVEL_NAMES: Record<number, { name: string; color: string }> = {
  1: { name: '入门 A1', color: 'primary' },
  2: { name: '初级 A2', color: 'primary' },
  3: { name: '中级 B1', color: 'success' },
  4: { name: '中高级 B2', color: 'success' },
  5: { name: '高级 C1', color: 'warning' },
  6: { name: '精通 C2', color: 'danger' },
}

export default function Courses() {
  const navigate = useNavigate()
  const { toast, ToastComponent } = useToast()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const res = await getCourses({ languageTo: selectedLanguage })
        setCourses(res.data)
      } catch (error) {
        toast.error('加载课程失败')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [selectedLanguage, toast])

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  if (loading) {
    return <Loading fullScreen text="加载课程中..." />
  }

  return (
    <div className="courses-page">
      <ToastComponent />

      <div className="courses-header">
        <h1>选择语言课程</h1>
        <p>选择你想学习的语言，开始学习之旅</p>
      </div>

      <div className="language-tabs">
        {LANGUAGE_TABS.map((lang) => (
          <button
            key={lang.code}
            className={`lang-tab ${selectedLanguage === lang.code ? 'lang-tab-active' : ''}`}
            onClick={() => setSelectedLanguage(lang.code)}
          >
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-info">
              <span className="lang-name">{lang.name}</span>
              <span className="lang-native">{lang.nativeName}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="courses-grid">
        {courses.length === 0 ? (
          <Card padding="lg" className="empty-courses">
            <div className="empty-state-large">
              <span className="empty-icon">📚</span>
              <h3>暂无课程</h3>
              <p>该语言的课程正在准备中，请稍后再来查看</p>
            </div>
          </Card>
        ) : (
          courses.map((course) => {
            const levelInfo = LEVEL_NAMES[course.level] ?? { name: `等级 ${course.level}`, color: 'primary' }
            const progress = course.progress ?? 0
            const unitCount = course.units?.length ?? 0
            return (
              <Card
                key={course.id}
                variant="default"
                hoverable
                padding="md"
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-card-header">
                  <span className={`course-level course-level-${levelInfo.color}`}>
                    {levelInfo.name}
                  </span>
                  {progress > 0 && (
                    <span className="course-progress-tag">
                      {Math.round(progress)}%
                    </span>
                  )}
                </div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="course-meta">
                  <span className="course-units">📖 {unitCount} 个单元</span>
                </div>
                {progress > 0 && (
                  <div className="course-progress">
                    <ProgressBar
                      value={progress}
                      variant={levelInfo.color as 'primary' | 'success' | 'warning' | 'danger'}
                      size="sm"
                    />
                  </div>
                )}
                <Button variant="primary" size="md" fullWidth className="course-enter-btn">
                  {progress > 0 ? '继续学习' : '开始学习'}
                </Button>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
