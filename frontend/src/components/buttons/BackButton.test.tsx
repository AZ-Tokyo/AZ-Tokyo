import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { BackButton } from './BackButton'

describe('BackButton', () => {
  it('renders correctly with children text', () => {
    render(<BackButton onClick={() => {}}>戻る</BackButton>)
    expect(screen.getByRole('button', { name: '戻る' })).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<BackButton onClick={handleClick}>戻る</BackButton>)

    fireEvent.click(screen.getByRole('button', { name: '戻る' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(
      <BackButton onClick={() => {}} className="custom-class">
        戻る
      </BackButton>,
    )
    const button = screen.getByRole('button', { name: '戻る' })
    expect(button).toHaveClass('custom-class')
  })
})
