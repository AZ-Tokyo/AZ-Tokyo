import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { Home } from './Home'

const mockUsers = [
  {
    ID: 1,
    Name: '山田 太郎',
    CreatedAt: '2023-01-01T00:00:00Z',
    UpdatedAt: '2023-01-01T00:00:00Z',
    DeletedAt: null,
  },
  {
    ID: 2,
    Name: '佐藤 花子',
    CreatedAt: '2023-01-01T00:00:00Z',
    UpdatedAt: '2023-01-01T00:00:00Z',
    DeletedAt: null,
  },
]

describe('Home Page', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        }),
      ),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the person list heading', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('山田 太郎')).toBeInTheDocument()
    })

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /故人一覧/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders person cards from fetched data', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('山田 太郎')).toBeInTheDocument()
      expect(screen.getByText('佐藤 花子')).toBeInTheDocument()
    })
  })
})
