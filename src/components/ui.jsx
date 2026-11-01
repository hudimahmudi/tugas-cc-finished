const buttonVariants = {
  default: 'ui-button-default',
  outline: 'ui-button-outline',
  secondary: 'ui-button-secondary',
  ghost: 'ui-button-ghost',
}

export function Button({ children, className = '', variant = 'default', size = 'default', ...props }) {
  return (
    <button
      className={`ui-button ${buttonVariants[variant] || buttonVariants.default} ui-button-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({ children, className = '', ...props }) {
  return <section className={`ui-card ${className}`} {...props}>{children}</section>
}

export function CardHeader({ children, className = '', ...props }) {
  return <div className={`ui-card-header ${className}`} {...props}>{children}</div>
}

export function CardTitle({ children, className = '', ...props }) {
  return <h2 className={`ui-card-title ${className}`} {...props}>{children}</h2>
}

export function CardDescription({ children, className = '', ...props }) {
  return <p className={`ui-card-description ${className}`} {...props}>{children}</p>
}

export function CardContent({ children, className = '', ...props }) {
  return <div className={`ui-card-content ${className}`} {...props}>{children}</div>
}

export function Badge({ children, className = '', variant = 'secondary', ...props }) {
  return <span className={`ui-badge ui-badge-${variant} ${className}`} {...props}>{children}</span>
}

export function Progress({ value, className = '', ...props }) {
  const boundedValue = Math.min(100, Math.max(0, value))
  return (
    <div
      className={`ui-progress ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={boundedValue}
      {...props}
    >
      <span style={{ width: `${boundedValue}%` }} />
    </div>
  )
}

export function Separator({ className = '', ...props }) {
  return <div className={`ui-separator ${className}`} role="separator" {...props} />
}
