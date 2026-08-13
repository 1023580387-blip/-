import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { useToast } from '../components/common/Toast'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const { toast, ToastComponent } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.warning('请输入邮箱和密码')
      return
    }
    try {
      await login({ email, password })
      toast.success('登录成功')
      navigate('/home')
    } catch (error) {
      toast.error('登录失败，请检查邮箱和密码')
    }
  }

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider)
    setTimeout(() => {
      toast.info(`${provider} 登录功能正在开发中`)
      setSocialLoading(null)
    }, 1000)
  }

  return (
    <div className="auth-page">
      <ToastComponent />
      <Card className="auth-card" padding="lg">
        <div className="auth-header">
          <h1>欢迎回来</h1>
          <p>登录以继续你的语言学习之旅</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          >
            登录
          </Button>
        </form>

        <div className="auth-divider">
          <span>或使用以下方式登录</span>
        </div>

        <div className="social-buttons">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            loading={socialLoading === 'Google'}
            onClick={() => handleSocialLogin('Google')}
          >
            Google 登录
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            loading={socialLoading === 'GitHub'}
            onClick={() => handleSocialLogin('GitHub')}
          >
            GitHub 登录
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            loading={socialLoading === '微信'}
            onClick={() => handleSocialLogin('微信')}
          >
            微信登录
          </Button>
        </div>

        <div className="auth-footer">
          <span>还没有账号？</span>
          <Link to="/register" className="auth-link">
            立即注册
          </Link>
        </div>
      </Card>
    </div>
  )
}
