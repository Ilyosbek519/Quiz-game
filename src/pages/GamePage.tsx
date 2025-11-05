"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Quiz from "../components/Quiz"
import "../components/Quiz.css"

export default function GamePage() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleBack = () => {
    navigate("/categories")
  }

  if (!category) {
    return (
      <div className="quiz-container">
        <div className="error">Invalid category</div>
      </div>
    )
  }

  return (
    <div>
      <button className="back-button" onClick={() => setShowMenu(!showMenu)} title="Back to menu">
        <ChevronLeft size={30} />
      </button>

      {showMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #0099ff, #0066cc)",
              padding: "2rem",
              borderRadius: "20px",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <h2 style={{ color: "white", marginBottom: "2rem" }}>Menu</h2>
            <button
              onClick={handleBack}
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #ff006e, #ff4d94)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Back to Categories
            </button>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "1rem",
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #00ff99, #00cc66)",
                color: "#1a0f3a",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      <Quiz category={category} />
    </div>
  )
}
