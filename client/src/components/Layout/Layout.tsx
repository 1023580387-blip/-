import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const titleMap: Record<string, string> = {
  '/': '首页',
  '/courses': '课程中心',
  '/learn': '我的学习',
  '/progress': '学习进度',
  '/achievements': '成就系统',
  '/community': '学习社区',
}

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  const pageTitle = titleMap[location.pathname] || '首页'

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="app-layout">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="main-wrapper">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          title={pageTitle}
        />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
