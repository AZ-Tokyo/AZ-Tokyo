import { useForm } from 'react-hook-form'
import {
  Input,
  Label,
  RequirementBadge,
  Textarea,
} from './digital-go-jp'
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      Name: initialData?.Name || '',
      BirthDate: initialData?.BirthDate?.split('T')[0] || '',
      DeathDate: initialData?.DeathDate?.split('T')[0] || '',
      LegalDomicile: initialData?.LegalDomicile || '',
      LastAddress: initialData?.LastAddress || '',
      Remarks: initialData?.Remarks || '',
    },
  })

  const onFormSubmit = (data: UserFormData) => {
    const payload: UserFormData = {
      Name: data.Name,
      BirthDate: data.BirthDate ? `${data.BirthDate}T00:00:00Z` : undefined,
      DeathDate: data.DeathDate ? `${data.DeathDate}T00:00:00Z` : undefined,
      LegalDomicile: data.LegalDomicile || undefined,
      LastAddress: data.LastAddress || undefined,
      Remarks: data.Remarks || undefined,
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="form-card">
      <div className="form-group">
        <Label htmlFor="Name">
          氏名
          <RequirementBadge>*</RequirementBadge>
        </Label>
        <Input
          id="Name"
          placeholder="例: 山田 太郎"
          isError={!!errors.Name}
          {...register('Name', { required: '氏名は必須です' })}
        />
        {errors.Name && (
          <p className="text-red-600 text-sm">{errors.Name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <Label htmlFor="BirthDate">生年月日</Label>
          <Input
            id="BirthDate"
            type="date"
            {...register('BirthDate')}
          />
        </div>

        <div className="form-group">
          <Label htmlFor="DeathDate">死亡年月日</Label>
          <Input
            id="DeathDate"
            type="date"
            {...register('DeathDate')}
          />
        </div>
      </div>

      <div className="form-group">
        <Label htmlFor="LegalDomicile">本籍</Label>
        <Input
          id="LegalDomicile"
          placeholder="例: 東京都千代田区..."
          {...register('LegalDomicile')}
        />
      </div>

      <div className="form-group">
        <Label htmlFor="LastAddress">最後の住所</Label>
        <Input
          id="LastAddress"
          placeholder="例: 東京都新宿区..."
          {...register('LastAddress')}
        />
      </div>

      <div className="form-group">
        <Label htmlFor="Remarks">備考</Label>
        <Textarea
          id="Remarks"
          rows={4}
          {...register('Remarks')}
        />
      </div>

      <div className="flex justify-end pt-4">
        <SubmitButton loading={loading}>{submitLabel}</SubmitButton>
      </div>
    </form>
  )
}
