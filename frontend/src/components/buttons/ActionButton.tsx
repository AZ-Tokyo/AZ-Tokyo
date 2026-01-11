import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button, type ButtonVariant } from '../digital-go-jp'

type ActionVariant = Extract<ButtonVariant, 'solid-fill' | 'outline'>

interface ActionButtonProps extends ComponentProps<'button'> {
  variant?: ActionVariant
  loading?: boolean
}

export const ActionButton = ({
  variant = 'solid-fill',
  loading = false,
  children,
  className = '',
  disabled = false,
  ...rest
}: ActionButtonProps) => {
  const styles = {
    'solid-fill': {
      type: 'submit' as const,
      extraClass: 'hover:shadow-lg',
    },
    outline: {
      type: 'button' as const,
      extraClass: 'hover:bg-gray-50',
    },
  }

  const currentStyle = styles[variant]

  return (
    <Button
      {...rest}
      type={rest.type || currentStyle.type}
      size="lg"
      variant={variant}
      disabled={disabled || loading}
      className={`rounded-full transition-all ${currentStyle.extraClass} ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader2 className="animate-spin" size={20} />}
        {children}
      </div>
    </Button>
  )
}
