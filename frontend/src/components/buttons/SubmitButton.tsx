import type { ComponentProps } from 'react'
import { Button } from '../digital-go-jp'

type SubmitButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean
}

export const SubmitButton = ({
  loading,
  children,
  className,
  disabled,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      size="lg"
      variant="solid-fill"
      disabled={disabled || loading}
      className={`rounded-full hover:shadow-lg transition-all ${className ?? ''}`}
      {...rest}
    >
      {loading ? '処理中...' : children}
    </Button>
  )
}
