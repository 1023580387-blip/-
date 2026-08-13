type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger'
type ProgressSize = 'sm' | 'md' | 'lg'

interface ProgressBarProps {
  value: number
  max?: number
  variant?: ProgressVariant
  size?: ProgressSize
  showLabel?: boolean
  labelInside?: boolean
  animated?: boolean
  striped?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  labelInside = false,
  animated = false,
  striped = false,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const displayPercent = Math.round(percentage)

  const classes = [
    'progress-bar',
    `progress-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const fillClasses = [
    'progress-fill',
    `progress-fill-${variant}`,
    striped ? 'progress-striped' : '',
    animated ? 'progress-animated' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="progress-wrapper">
      <div className={classes}>
        <div
          className={fillClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {labelInside && showLabel && (
            <span className="progress-label-inside">{displayPercent}%</span>
          )}
        </div>
      </div>
      {showLabel && !labelInside && (
        <span className="progress-label">{displayPercent}%</span>
      )}
    </div>
  )
}
