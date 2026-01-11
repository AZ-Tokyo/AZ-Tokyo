import type { ComponentProps } from 'react'
import { Button } from '../digital-go-jp'

interface SubmitButtonProps extends ComponentProps<'button'> {
  loading?: boolean
}

export const SubmitButton = ({
  loading = false,
  children,
  className = '',
  disabled = false,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button
      {...rest}
      type="submit"
      size="lg"
      variant="solid-fill"
      disabled={disabled || loading}
      className={`rounded-full hover:shadow-lg transition-all ${className}`}
    >
      {loading ? '処理中...' : children}
    </Button>
  )
}
