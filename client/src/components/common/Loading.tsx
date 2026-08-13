type LoadingSize = 'sm' | 'md' | 'lg'
type LoadingType = 'spinner' | 'dots' | 'pulse'

interface LoadingProps {
  size?: LoadingSize
  type?: LoadingType
  text?: string
  fullScreen?: boolean
  overlay?: boolean
}

export default function Loading({
  size = 'md',
  type = 'spinner',
  text,
  fullScreen = false,
  overlay = false,
}: LoadingProps) {
  const renderSpinner = () => (
    <div className={`loading-spinner loading-${size}`}>
      <svg viewBox="0 0 50 50">
        <circle
          className="spinner-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )

  const renderDots = () => (
    <div className={`loading-dots loading-${size}`}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  )

  const renderPulse = () => (
    <div className={`loading-pulse loading-${size}`}>
      <div className="pulse-ring"></div>
      <div className="pulse-ring pulse-ring-delay"></div>
      <div className="pulse-core"></div>
    </div>
  )

  const renderContent = () => {
    switch (type) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      default:
        return renderSpinner()
    }
  }

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          {renderContent()}
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    )
  }

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          {renderContent()}
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="loading-inline">
      {renderContent()}
      {text && <span className="loading-text">{text}</span>}
    </div>
  )
}
