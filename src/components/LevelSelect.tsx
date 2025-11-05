"use client"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import "./LevelSelect.css"

export default function LevelSelect() {
  const navigate = useNavigate()
  const { category } = useParams()

  const levels = [
    { id: "easy", label: "Easy 🟢" },
    { id: "normal", label: "Normal 🟡" },
    { id: "hard", label: "Hard 🔴" },
  ]

  return (
    <div className="level-select">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={30} />
      </button>
      <h1 className="level-title">Select Level</h1>
      <div className="levels-grid">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            className="level-button"
            onClick={() => navigate(`/game/${category}/${lvl.id}`)}
          >
            {lvl.label}
          </button>
        ))}
      </div>
    </div>
  )
}
