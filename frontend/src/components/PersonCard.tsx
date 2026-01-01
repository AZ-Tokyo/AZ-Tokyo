import type { User } from "../types/model";

interface PersonCardProps {
  person: User;
  onClick?: () => void;
}

export function PersonCard({ person, onClick }: PersonCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white p-6 border border-gray-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-400 flex justify-between items-center"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
          {person.name}{" "}
          <span className="text-sm font-normal text-gray-400 ml-1">様</span>
        </h3>
      </div>

      <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
        詳細
      </div>
    </button>
  );
}
