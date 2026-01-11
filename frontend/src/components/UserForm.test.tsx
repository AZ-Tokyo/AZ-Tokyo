import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { UserForm, type UserFormData } from './UserForm'

describe('UserForm', () => {
  const mockSubmit = vi.fn()

  beforeEach(() => {
    mockSubmit.mockReset()
  })

  it('renders all form fields', () => {
    render(<UserForm onSubmit={mockSubmit} submitLabel="登録" />)

    expect(screen.getByLabelText(/氏名/)).toBeInTheDocument()
    expect(screen.getByLabelText(/生年月日/)).toBeInTheDocument()
    expect(screen.getByLabelText(/死亡年月日/)).toBeInTheDocument()
    expect(screen.getByLabelText(/本籍/)).toBeInTheDocument()
    expect(screen.getByLabelText(/最後の住所/)).toBeInTheDocument()
    expect(screen.getByLabelText(/備考/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument()
  })

  it('updates input values on change', () => {
    render(<UserForm onSubmit={mockSubmit} submitLabel="登録" />)

    const nameInput = screen.getByLabelText(/氏名/) as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'テスト 太郎' } })
    expect(nameInput.value).toBe('テスト 太郎')
  })

  it('calls onSubmit with form data when submitted', async () => {
    render(<UserForm onSubmit={mockSubmit} submitLabel="登録" />)

    fireEvent.change(screen.getByLabelText(/氏名/), {
      target: { value: 'テスト 太郎' },
    })
    fireEvent.change(screen.getByLabelText(/生年月日/), {
      target: { value: '1990-01-01' },
    })

    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1)
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          Name: 'テスト 太郎',
          BirthDate: '1990-01-01T00:00:00Z',
        }),
      )
    })
  })

  it('populates form with initialData', () => {
    const initialData: UserFormData = {
      Name: '既存 ユーザー',
      BirthDate: '1980-01-01T00:00:00Z',
      DeathDate: '2023-12-31T00:00:00Z',
      LegalDomicile: '東京都',
      LastAddress: '大阪府',
      Remarks: '特記事項',
    }

    render(
      <UserForm
        onSubmit={mockSubmit}
        submitLabel="更新"
        initialData={initialData}
      />,
    )

    expect((screen.getByLabelText(/氏名/) as HTMLInputElement).value).toBe(
      '既存 ユーザー',
    )
    // Date inputs usually require YYYY-MM-DD format
    expect((screen.getByLabelText(/生年月日/) as HTMLInputElement).value).toBe(
      '1980-01-01',
    )
    expect(
      (screen.getByLabelText(/死亡年月日/) as HTMLInputElement).value,
    ).toBe('2023-12-31')
    expect((screen.getByLabelText(/本籍/) as HTMLInputElement).value).toBe(
      '東京都',
    )
    expect(
      (screen.getByLabelText(/最後の住所/) as HTMLInputElement).value,
    ).toBe('大阪府')
    expect((screen.getByLabelText(/備考/) as HTMLTextAreaElement).value).toBe(
      '特記事項',
    )
  })

  it('disables submit button when loading', () => {
    render(<UserForm onSubmit={mockSubmit} submitLabel="登録" loading={true} />)
    expect(screen.getByRole('button', { name: '登録' })).toBeDisabled()
  })
})
