import type { ComponentProps } from 'react'
import { Button } from '../digital-go-jp'

type BackButtonProps = ComponentProps<'button'>

export const BackButton = ({
  children,
  className = '',
  ...rest
}: BackButtonProps) => {
  return (
    <Button
      {...rest}
      type="button"
      size="md"
      variant="outline"
      className={`rounded-full hover:bg-gray-50 transition-colors ${className}`}
    >
      {children}
    </Button>
  )
}