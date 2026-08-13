import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  title?: string
  children?: ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  showFooter?: boolean
  width?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = '确认',
  cancelText = '取消',
  showFooter = true,
  width = 'md',
  closable = true,
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closable) {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content modal-${width}`}>
        {(title || closable) && (
          <div className="modal-header">
            {title && <h3 className="modal-title">{title}</h3>}
            {closable && (
              <button className="modal-close-btn" onClick={onClose} aria-label="关闭">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>

        {showFooter && (
          <div className="modal-footer">
            <Button variant="ghost" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant="primary" onClick={onConfirm || onClose}>
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
