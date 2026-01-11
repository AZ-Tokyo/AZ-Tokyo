import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/buttons/ActionButton'
import { UserForm, type UserFormData } from '../components/UserForm'
import { createUser } from '../services/api'

export const CreateUser = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: UserFormData) => {
    setLoading(true)
    try {
      await createUser(data)
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
        <ActionButton variant="outline" onClick={() => navigate('/')}>
          戻る
        </ActionButton>
      </div>

      <UserForm
        onSubmit={handleSubmit}
        submitLabel="登録する"
        loading={loading}
      />
    </div>
  )
}
