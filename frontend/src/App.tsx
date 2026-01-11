import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateUser } from './pages/CreateUser'
import { Home } from './pages/Home'
import { UpdateUser } from './pages/UpdateUser'

export default function App() {
  return (
    <BrowserRouter>
      <h1 className="app-header shadow-1 text-std-45B-140">
        デジタル資産相続ツール
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  )
}
