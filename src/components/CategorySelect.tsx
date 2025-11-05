"use client"

import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import "./CategorySelect.css"

interface CategorySelectProps {
  onSelect: (category: string, level: string) => void
  onBack: () => void
}

const categories = [
  { id: "movie", label: "MOVIES", icon: "🎬" },
  { id: "cartoon", label: "CARTOONS", icon: "🎨" },
  { id: "brand", label: "BRANDS", icon: "🏢" },
]

const levels = [
  { id: "easy", label: "EASY" },
  { id: "normal", label: "NORMAL" },
  { id: "hard", label: "HARD" },
]

export default function CategorySelect({ onSelect, onBack }: CategorySelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleLevelClick = (levelId: string) => {
    if (selectedCategory) {
      onSelect(selectedCategory, levelId)
    }
  }

  return (
    <div className="category-select">
      <div className="stars"></div>

      <button className="back-button" onClick={onBack}>
        <ChevronLeft size={30} />
      </button>

      <div className="category-content">
        <h1 className="category-title">Pick a Category</h1>

        <div className="categories-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-button ${selectedCategory === cat.id ? "selected" : ""}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <>
            <h2 className="level-title">Select Level</h2>
            <div className="levels-grid">
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  className="level-button"
                  onClick={() => handleLevelClick(lvl.id)}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
