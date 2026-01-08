import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Button,
  Divider,
} from './components/digital-go-jp'
import { PersonCard } from './components/PersonCard'
import type { User } from './types/model'

export default function App() {
  const [deceasedPersons, setDeceasedPersons] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        if (!response.ok) throw new Error('Network response was not ok')
        const data: User[] = await response.json()
        setDeceasedPersons(data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleClick = () => {
    // TODO: 画面遷移処理を追加する
  }

  const handleDelete = () => {
    // TODO: 削除 API を呼び出し、画面から項目を削除する
  }

  return (
    <>
      <h1 className="sticky font-sans top-0 px-8 py-4 z-10 shadow-1 text-std-45B-140 bg-white">
        デジタル資産相続ツール
      </h1>

      <div className="px-16 py-8 flex flex-col gap-8">
        <main>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              故人一覧
            </h2>
            <Button
              size="md"
              variant="solid-fill"
              className="rounded-full hover:shadow-xl transition-all"
            >
              新規登録
            </Button>
          </div>

          <div className="grid gap-6">
            {deceasedPersons.map((person) => (
              <PersonCard
                key={person.ID}
                person={person}
                onClick={() => handleClick()}
                onDelete={() => handleDelete()}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
