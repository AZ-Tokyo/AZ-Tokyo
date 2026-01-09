import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Label,
  Textarea,
  RequirementBadge,
} from '../components/digital-go-jp'
import { createUser } from '../services/api'
import type { GormModel, User } from '../types/model'

export const CreateUser = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Partial<User>>({
    Name: '',
    BirthDate: '',
    DeathDate: '',
    LegalDomicile: '',
    LastAddress: '',
    Remarks: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload: Omit<User, keyof GormModel> = {
      Name: formData.Name || '',
      BirthDate: formData.BirthDate
        ? `${formData.BirthDate}T00:00:00Z`
        : undefined,
      DeathDate: formData.DeathDate
        ? `${formData.DeathDate}T00:00:00Z`
        : undefined,
      LegalDomicile: formData.LegalDomicile,
      LastAddress: formData.LastAddress,
      Remarks: formData.Remarks,
    }

    try {
      await createUser(payload)
      navigate('/')
    } catch (error) {
      console.error('Error creating user:', error)
      alert('登録に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-main max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">新規登録</h2>
        <Button
          size="md"
          variant="outline"
          className="rounded-full hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/')}
        >
          戻る
        </Button>
      </div>

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
          <Button
            type="submit"
            size="lg"
            variant="solid-fill"
            disabled={loading}
            className="rounded-full hover:shadow-lg transition-all"
          >
            {loading ? '登録中...' : '登録する'}
          </Button>
        </div>
      </form>
    </div>
  )
}
