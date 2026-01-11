import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import { UpdateUser } from './UpdateUser'

describe('UpdateUser Page', () => {
  const mockFetch = vi.fn()
  const mockUser = {
    Name: '既存 ユーザー',
    BirthDate: '1980-01-01T00:00:00Z',
    DeathDate: '2023-12-31T00:00:00Z',
    LegalDomicile: '東京都',
    LastAddress: '大阪府',
    Remarks: '特記事項',
  }

  beforeEach(() => {
    mockFetch.mockReset()
    vi.stubGlobal('fetch', mockFetch)
    // getUser のモック
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the update user form', async () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={<UpdateUser />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/users/1')
    })

    expect(
      screen.getByRole('heading', { level: 2, name: /編集/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/氏名/i)).toBeInTheDocument()
    expect((screen.getByLabelText(/氏名/i) as HTMLInputElement).value).toBe(
      '既存 ユーザー',
    )
    expect(screen.getByRole('button', { name: '更新する' })).toBeInTheDocument()
  })

  it('submits the form and navigates', async () => {
    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={<UpdateUser />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/氏名/i)).toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText(/氏名/i), {
      target: { value: '更新 太郎' },
    })

    fireEvent.click(screen.getByRole('button', { name: '更新する' }))

    await waitFor(() => {
      // TODO: Backend API 実装後、fetch が正しい引数で呼ばれたことを確認する
      expect(screen.getByText('Home Page')).toBeInTheDocument()
    })
  })
})
