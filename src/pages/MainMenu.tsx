"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Play } from "lucide-react"
import "../components/MainMenu.css"

export default function MainMenu() {
  const navigate = useNavigate()
  const [showInstructions, setShowInstructions] = useState(false)

  const handleStart = () => {
    navigate("/categories")
  }

  return (
    <div className="main-menu">
      <div className="stars"></div>

      <div className="menu-content">
        <h1 className="game-title">Quiz Master</h1>

        <div className="play-button-container">
          <button className="play-button" onClick={handleStart}>
            <Play size={60} />
          </button>
        </div>

        <button className="instructions-button" onClick={() => setShowInstructions(!showInstructions)}>
          HOW TO PLAY
        </button>

        {showInstructions && (
          <div className="instructions-panel">
            <h2>How to Play</h2>
            <p>1. Select a category (Movies, Cartoons, or Brands)</p>
            <p>2. Read the clues carefully</p>
            <p>3. Choose the correct answer from the options</p>
            <p>4. Earn points for correct answers</p>
            <p>5. Try to get the highest score!</p>
          </div>
        )}
      </div>
    </div>
  )
}
