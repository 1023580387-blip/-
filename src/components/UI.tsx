interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value, max = 100, className = '', showLabel = true, height = 'md' }: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

  return (
    <div className={className}>
      <div className={`progress-bar ${heights[height]}`}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>进度</span>
          <span className="font-medium text-primary-600">{percent}%</span>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'warn';
}

export function StatCard({ title, value, icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600 shadow-primary-500/25',
    secondary: 'from-secondary-500 to-secondary-600 shadow-secondary-500/25',
    accent: 'from-accent-500 to-accent-600 shadow-accent-500/25',
    warn: 'from-warn-500 to-warn-600 shadow-warn-500/25',
  };

  return (
    <div className="card flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} shadow-lg flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-xs text-accent-600 mt-1 font-medium">{trend}</p>
        )}
      </div>
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-accent-100 text-accent-700',
    warning: 'bg-warn-100 text-warn-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-primary-100 text-primary-700',
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="card text-center py-16 animate-fade-in">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-md mx-auto mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
