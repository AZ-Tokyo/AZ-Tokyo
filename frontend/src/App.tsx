import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  NotificationBanner,
} from "./components/digital-go-jp";
import { PersonCard } from "./components/PersonCard";
import { AppBreadcrumbs } from "./components/AppBreadcrumbs";
import type { User } from "./types/model";

// Go backend returns a flat structure because gorm.Model is embedded.
interface RawUser {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string | null;
  name: string;
  birth_date?: string;
  death_date?: string;
  legal_domicile?: string;
  last_address?: string;
  remarks?: string;
}

export default function App() {
  const [deceasedPersons, setDeceasedPersons] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: RawUser[] = await response.json();

        const formattedData: User[] = data.map((item) => ({
          Model: {
            ID: item.ID,
            CreatedAt: item.CreatedAt,
            UpdatedAt: item.UpdatedAt,
            DeletedAt: item.DeletedAt,
          },
          name: item.name,
          birth_date: item.birth_date,
          death_date: item.death_date,
          legal_domicile: item.legal_domicile,
          last_address: item.last_address,
          remarks: item.remarks,
        }));
        setDeceasedPersons(formattedData);
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
              <span className="text-sm font-medium bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full">
                {deceasedPersons.length}
              </span>
            </h2>
            <Button
              size="md"
              variant="solid-fill"
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              新規登録
            </Button>
          </div>

          <div className="grid gap-6">
            {deceasedPersons.map((person) => (
              <PersonCard key={person.Model.ID} person={person} />
            ))}

            {deceasedPersons.length === 0 && (
              <NotificationBanner
                type="info1"
                bannerStyle="standard"
                title="データがありません"
                headingLevel="h3"
              >
                登録されている故人のデータはありません。「新規登録」ボタンから追加してください。
              </NotificationBanner>
            )}
          </div>
        </main>

        <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          &copy; 2024 デジタル資産相続ツール
        </footer>
      </div>
    </div>
  );
}
