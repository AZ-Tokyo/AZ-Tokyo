import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '../components/buttons/BackButton'
import { UserForm, type UserFormData } from '../components/UserForm'
import { getUser } from '../services/api'

export const UpdateUser = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState<UserFormData | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return
      try {
        const data = await getUser(id)
        setInitialData(data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        alert('データの取得に失敗しました')
        navigate('/')
      }
    }

    fetchUser()
  }, [id, navigate])

  const handleSubmit = async (data: UserFormData) => {
    setLoading(true)
    try {
      // TODO: Update API call will be implemented here
      navigate('/')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('更新に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  if (!initialData) {
    return <div className="page-main text-center">Loading...</div>
  }

  return (
    <div className="page-main max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">編集</h2>
        <BackButton onClick={() => navigate('/')}>戻る</BackButton>
      </div>

      <UserForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="更新する"
        loading={loading}
      />
    </div>
  )
}
