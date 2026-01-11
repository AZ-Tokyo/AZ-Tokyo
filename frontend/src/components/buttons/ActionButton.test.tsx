import { render, screen, fireEvent } from '@testing-library/react'
import { ActionButton } from './ActionButton'
import { vi } from 'vitest'

describe('ActionButton', () => {
  it('renders children correctly', () => {
    render(<ActionButton>Click Me</ActionButton>)
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<ActionButton onClick={handleClick}>Click Me</ActionButton>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state and disables button', () => {
    render(<ActionButton loading>Loading</ActionButton>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders outline variant with type="button"', () => {
    render(<ActionButton variant="outline">Cancel</ActionButton>)
    const button = screen.getByRole('button', { name: 'Cancel' })
    expect(button).toHaveAttribute('type', 'button')
  })
})
