import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { SubmitButton } from './SubmitButton'

describe('SubmitButton', () => {
  it('renders correctly with children text', () => {
    render(<SubmitButton>登録する</SubmitButton>)
    expect(screen.getByRole('button', { name: '登録する' })).toBeInTheDocument()
  })

  it('shows loading text and disables button when loading is true', () => {
    render(<SubmitButton loading={true}>登録する</SubmitButton>)
    const button = screen.getByRole('button', { name: '処理中...' })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('calls onClick handler when clicked (if provided)', () => {
    const handleClick = vi.fn()
    render(<SubmitButton onClick={handleClick}>登録する</SubmitButton>)

    fireEvent.click(screen.getByRole('button', { name: '登録する' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<SubmitButton disabled={true}>登録する</SubmitButton>)
    expect(screen.getByRole('button', { name: '登録する' })).toBeDisabled()
  })
})
