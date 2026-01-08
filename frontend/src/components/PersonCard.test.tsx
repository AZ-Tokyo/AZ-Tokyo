import { render, screen, fireEvent } from '@testing-library/react'
import { PersonCard } from './PersonCard'
import type { User } from '../types/model'
import { vi } from 'vitest'

const mockUser: User = {
  ID: 1,
  Name: '山田 太郎',
  CreatedAt: '2023-01-01T00:00:00Z',
  UpdatedAt: '2023-01-01T00:00:00Z',
  DeletedAt: null,
}

describe('PersonCard', () => {
  it('名前が正しく表示されること', () => {
    render(<PersonCard person={mockUser} />)
    expect(screen.getByText('山田 太郎')).toBeInTheDocument()
  })

  it('削除ボタンが表示されること', () => {
    render(<PersonCard person={mockUser} />)
    const deleteButton = screen.getByRole('button', { name: '削除' })
    expect(deleteButton).toBeInTheDocument()
  })

  it('カードをクリックしたときに onClick が呼ばれること', () => {
    const handleClick = vi.fn()
    render(<PersonCard person={mockUser} onClick={handleClick} />)

    fireEvent.click(screen.getByText('山田 太郎'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('削除ボタンをクリックしたときに onDelete が呼ばれ、onClick が呼ばれないこと', () => {
    const handleClick = vi.fn()
    const handleDelete = vi.fn()
    render(
      <PersonCard
        person={mockUser}
        onClick={handleClick}
        onDelete={handleDelete}
      />,
    )

    const deleteButton = screen.getByRole('button', { name: '削除' })
    fireEvent.click(deleteButton)

    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
