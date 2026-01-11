import { useEffect, useState } from 'react'
import { Input, Label, RequirementBadge, Textarea } from './digital-go-jp'
import type { GormModel, User } from '../types/model'
import { SubmitButton } from './buttons/SubmitButton'

export type UserFormData = Omit<User, keyof GormModel>

interface UserFormProps {
  initialData?: UserFormData
  onSubmit: (data: UserFormData) => Promise<void>
  submitLabel: string
  loading?: boolean
}

export const UserForm = ({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
}: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    Name: '',
    BirthDate: '',
    DeathDate: '',
    LegalDomicile: '',
    LastAddress: '',
    Remarks: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name || '',
        BirthDate: initialData.BirthDate?.split('T')[0] || '',
        DeathDate: initialData.DeathDate?.split('T')[0] || '',
        LegalDomicile: initialData.LegalDomicile || '',
        LastAddress: initialData.LastAddress || '',
        Remarks: initialData.Remarks || '',
      })
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 送信時に空文字を undefined に変換して backend の型定義に合わせる
    const payload: UserFormData = {
      Name: formData.Name,
      BirthDate: formData.BirthDate
        ? `${formData.BirthDate}T00:00:00Z`
        : undefined,
      DeathDate: formData.DeathDate
        ? `${formData.DeathDate}T00:00:00Z`
        : undefined,
      LegalDomicile: formData.LegalDomicile || undefined,
      LastAddress: formData.LastAddress || undefined,
      Remarks: formData.Remarks || undefined,
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-group">
        <Label htmlFor="Name">
          氏名
          <RequirementBadge>*</RequirementBadge>
        </Label>
        <Input
          id="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
          placeholder="例: 山田 太郎"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <Label htmlFor="BirthDate">生年月日</Label>
          <Input
            id="BirthDate"
            name="BirthDate"
            type="date"
            value={formData.BirthDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <Label htmlFor="DeathDate">死亡年月日</Label>
          <Input
            id="DeathDate"
            name="DeathDate"
            type="date"
            value={formData.DeathDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="LegalDomicile">本籍</Label>
        <Input
          id="LegalDomicile"
          name="LegalDomicile"
          value={formData.LegalDomicile}
          onChange={handleChange}
          placeholder="例: 東京都千代田区..."
        />
      </div>

      <div className="form-group">
        <Label htmlFor="LastAddress">最後の住所</Label>
        <Input
          id="LastAddress"
          name="LastAddress"
          value={formData.LastAddress}
          onChange={handleChange}
          placeholder="例: 東京都新宿区..."
        />
      </div>

      <div className="form-group">
        <Label htmlFor="Remarks">備考</Label>
        <Textarea
          id="Remarks"
          name="Remarks"
          value={formData.Remarks}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="flex justify-end pt-4">
        <SubmitButton loading={loading}>{submitLabel}</SubmitButton>
      </div>
    </form>
  )
}
