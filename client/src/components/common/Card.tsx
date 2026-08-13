import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  header,
  footer,
  children,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    hoverable ? 'card-hoverable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {header && <div className="card-header">{header}</div>}
      {children && <div className="card-body">{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
