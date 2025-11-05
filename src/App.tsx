import { Routes, Route } from "react-router-dom"
import MainMenu from "./pages/MainMenu"
import CategorySelect from "./pages/CategorySelect"
import GamePage from "./pages/GamePage"
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/categories" element={<CategorySelect />} />
      <Route path="/game/:category" element={<GamePage />} />
    </Routes>
  )
}
