import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/digital-go-jp'
import { PersonCard } from '../components/PersonCard'
import { getUsers } from '../services/api'
import type { User } from '../types/model'

export const Home = () => {
  const [deceasedPersons, setDeceasedPersons] = useState<User[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setDeceasedPersons(data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleCreate = () => {
    navigate('/create')
  }

  const handleDelete = () => {
    // TODO: 削除 API を呼び出し、画面から項目を削除する
  }

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`)
  }

  const handleCardClick = () => {
    // TODO: 詳細画面などへの遷移
  }

  return (
    <div className="page-main">
      <main>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            故人一覧
          </h2>
          <Button
            size="md"
            variant="solid-fill"
            className="rounded-full hover:shadow-xl transition-all"
            onClick={handleCreate}
          >
            新規登録
          </Button>
        </div>

        <div className="grid gap-6">
          {deceasedPersons.map((person) => (
            <PersonCard
              key={person.ID}
              person={person}
              onClick={handleCardClick}
              onEdit={() => handleEdit(person.ID)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
