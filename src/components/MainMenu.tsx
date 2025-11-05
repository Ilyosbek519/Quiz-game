"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import "./MainMenu.css"

interface MainMenuProps {
  onStart: () => void
}

export default function MainMenu({ onStart }: MainMenuProps) {
  const [showInstructions, setShowInstructions] = useState(false)

  const stars = Array.from({ length: 50 })

  return (
    <div className="main-menu">
      <div className="stars">
        {stars.map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="menu-content">
        <h1 className="game-title">Quiz Master</h1>

        <div className="play-button-container">
          <button className="play-button" onClick={onStart}>
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
