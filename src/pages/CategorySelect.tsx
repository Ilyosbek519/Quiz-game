"use client"

import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import "../components/CategorySelect.css"

interface Category {
  id: string
  label: string
  icon: string
}

const categories: Category[] = [
  { id: "movie", label: "MOVIES", icon: "🎬" },
  { id: "cartoon", label: "CARTOONS", icon: "🎨" },
  { id: "brand", label: "BRANDS", icon: "🏢" },
]

export default function CategorySelect() {
  const navigate = useNavigate()

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/game/${categoryId}`)
  }

  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="category-select">
      <div className="stars"></div>

      <button className="back-button" onClick={handleBack}>
        <ChevronLeft size={30} />
      </button>

      <div className="category-content">
        <h1 className="category-title">Pick a Category</h1>

        <div className="categories-grid">
          {categories.map((cat) => (
            <button key={cat.id} className="category-button" onClick={() => handleSelectCategory(cat.id)}>
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
