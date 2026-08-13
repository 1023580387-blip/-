import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { useToast } from '../components/common/Toast'
import { useAuthStore } from '../store/authStore'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const { register, isLoading } = useAuthStore()
  const { toast, ToastComponent } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !email || !password || !confirmPassword) {
      toast.warning('请填写所有必填字段')
      return
    }
    if (password !== confirmPassword) {
      toast.error('两次输入的密码不一致')
      return
    }
    if (password.length < 6) {
      toast.warning('密码长度至少为6位')
      return
    }
    try {
      await register({ username, email, password })
      toast.success('注册成功')
      navigate('/home')
    } catch (error) {
      toast.error('注册失败，请稍后重试')
    }
  }

  return (
    <div className="auth-page">
      <ToastComponent />
      <Card className="auth-card" padding="lg">
        <div className="auth-header">
          <h1>创建账号</h1>
          <p>开始你的语言学习冒险</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              autoComplete="username"
            />
          </div>

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
              placeholder="至少6位字符"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">确认密码</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请再次输入密码"
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          >
            注册
          </Button>
        </form>

        <div className="auth-footer">
          <span>已有账号？</span>
          <Link to="/login" className="auth-link">
            立即登录
          </Link>
        </div>
      </Card>
    </div>
  )
}
