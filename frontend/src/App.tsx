import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateUser } from './pages/CreateUser'
import { Home } from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <h1 className="app-header shadow-1 text-std-45B-140">
        デジタル資産相続ツール
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}
