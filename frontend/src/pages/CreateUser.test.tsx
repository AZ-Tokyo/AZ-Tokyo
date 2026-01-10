import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { CreateUser } from './CreateUser'

describe('CreateUser Page', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    mockFetch.mockReset()
    vi.stubGlobal('fetch', mockFetch)
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the create user form', () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { level: 2, name: /新規登録/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/氏名/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登録する' })).toBeInTheDocument()
  })

  it('submits the form with correct data', async () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/氏名/i), {
      target: { value: 'テスト 太郎' },
    })
    fireEvent.change(screen.getByLabelText(/生年月日/i), {
      target: { value: '1990-01-01' },
    })

    fireEvent.click(screen.getByRole('button', { name: '登録する' }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/users',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Name: 'テスト 太郎',
            BirthDate: '1990-01-01T00:00:00Z',
            DeathDate: undefined,
            LegalDomicile: undefined,
            LastAddress: undefined,
            Remarks: undefined,
          }),
        }),
      )
    })
  })
})
