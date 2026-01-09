import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateUser } from './pages/CreateUser'
import { Home } from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <h1 className="sticky font-sans top-0 px-8 py-4 z-10 shadow-1 text-std-45B-140 bg-white">
        デジタル資産相続ツール
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}
