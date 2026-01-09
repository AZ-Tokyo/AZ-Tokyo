import { Trash2 } from 'lucide-react'
import type { User } from '../types/model'

interface PersonCardProps {
  person: User
  onClick?: () => void
  onDelete?: () => void
}

export function PersonCard({ person, onClick, onDelete }: PersonCardProps) {
  return (
    <div
      onClick={onClick}
      className="group w-full text-left bg-white p-6 border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-400 flex justify-between items-center cursor-pointer"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
          {person.Name}{' '}
          <span className="text-sm font-normal text-gray-400 ml-1">様</span>
        </h3>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete?.()
        }}
        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
        aria-label="削除"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}
