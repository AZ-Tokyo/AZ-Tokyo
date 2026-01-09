import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { vi } from 'vitest'

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

describe('App Integration', () => {
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

  it('renders the main heading', async () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /デジタル資産相続ツール/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders person cards from fetched data', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('山田 太郎')).toBeInTheDocument()
      expect(screen.getByText('佐藤 花子')).toBeInTheDocument()
    })
  })
})
