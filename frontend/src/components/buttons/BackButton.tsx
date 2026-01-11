import { Button } from '../digital-go-jp'

interface BackButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

export const BackButton = ({ onClick, className, children }: BackButtonProps) => {
  return (
    <Button
      size="md"
      variant="outline"
      className={`rounded-full hover:bg-gray-50 transition-colors ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
