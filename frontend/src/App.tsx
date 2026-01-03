import { useEffect, useState } from "react";
import {
  Button,
  Divider
} from "./components/digital-go-jp";
import { PersonCard } from "./components/PersonCard";
import type { User } from "./types/model";

export default function App() {
  const [deceasedPersons, setDeceasedPersons] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: User[] = await response.json();
        setDeceasedPersons(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                デジタル資産相続ツール
              </h1>
            </div>
          </div>
          <Divider />
        </header>

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
              <PersonCard key={person.ID} person={person} />
            ))}
          </div>
        </main>

        <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          &copy; 2026 AZ-Tokyo
      </footer>
      </div>
    </div>
  );
}
