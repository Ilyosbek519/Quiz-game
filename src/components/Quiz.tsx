"use client"

import React, { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import "./Quiz.css"

interface Question {
  id: string
  category: string
  clue: string
  choices: string[]
  itemId: string
}

interface QuizProps {
  category: string
}

export default function Quiz({ category }: QuizProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Savollarni kategoriya bo'yicha ajratish
  const questions: Record<string, Question[]> = {
    movie: [
      {
        id: "m1",
        category: "movie",
        clue: "Who directed 'Titanic'?",
        choices: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"],
        itemId: "m1",
      },
      {
        id: "m2",
        category: "movie",
        clue: "Which movie features a wizard school called Hogwarts?",
        choices: ["Harry Potter", "Lord of the Rings", "Narnia", "Percy Jackson"],
        itemId: "m2",
      },
      {
        id: "m3",
        category: "movie",
        clue: "Who played the Joker in 'The Dark Knight'?",
        choices: ["Heath Ledger", "Joaquin Phoenix", "Jack Nicholson", "Jared Leto"],
        itemId: "m3",
      },
      {
        id: "m4",
        category: "movie",
        clue: "Which movie features dinosaurs in a theme park?",
        choices: ["Jurassic Park", "King Kong", "Avatar", "Godzilla"],
        itemId: "m4",
      },
      {
        id: "m5",
        category: "movie",
        clue: "Who directed 'Inception'?",
        choices: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Ridley Scott"],
        itemId: "m5",
      },
      {
        id: "m6",
        category: "movie",
        clue: "Which movie won Best Picture in 1994?",
        choices: ["Forrest Gump", "Pulp Fiction", "The Shawshank Redemption", "Lion King"],
        itemId: "m6",
      },
      {
        id: "m7",
        category: "movie",
        clue: "Which actor played Iron Man?",
        choices: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
        itemId: "m7",
      },
      {
        id: "m8",
        category: "movie",
        clue: "Which movie is famous for the quote 'I'll be back'?",
        choices: ["Terminator", "RoboCop", "Predator", "Die Hard"],
        itemId: "m8",
      },
      {
        id: "m9",
        category: "movie",
        clue: "Which movie features a character named Jack Sparrow?",
        choices: ["Pirates of the Caribbean", "Aladdin", "Robin Hood", "The Mask"],
        itemId: "m9",
      },
      {
        id: "m10",
        category: "movie",
        clue: "Which movie tells the story of a boxing underdog named Rocky?",
        choices: ["Rocky", "Creed", "Raging Bull", "Million Dollar Baby"],
        itemId: "m10",
      },
    ],
  
    cartoon: [
      {
        id: "c1",
        category: "cartoon",
        clue: "Which cartoon features a sponge living in a pineapple?",
        choices: ["SpongeBob", "Tom & Jerry", "Scooby-Doo", "The Simpsons"],
        itemId: "c1",
      },
      {
        id: "c2",
        category: "cartoon",
        clue: "Who is Mickey Mouse's girlfriend?",
        choices: ["Daisy", "Minnie", "Clarabelle", "Pluto"],
        itemId: "c2",
      },
      {
        id: "c3",
        category: "cartoon",
        clue: "Which cartoon features a cat chasing a mouse endlessly?",
        choices: ["Tom & Jerry", "SpongeBob", "Looney Tunes", "The Simpsons"],
        itemId: "c3",
      },
      {
        id: "c4",
        category: "cartoon",
        clue: "Which cartoon has characters named Bugs Bunny and Daffy Duck?",
        choices: ["Looney Tunes", "Tom & Jerry", "Scooby-Doo", "The Simpsons"],
        itemId: "c4",
      },
      {
        id: "c5",
        category: "cartoon",
        clue: "Which cartoon features ninja turtles?",
        choices: ["Teenage Mutant Ninja Turtles", "Power Rangers", "Dragon Ball", "Pokémon"],
        itemId: "c5",
      },
      {
        id: "c6",
        category: "cartoon",
        clue: "Which cartoon is about a yellow, stretchy superhero?",
        choices: ["Futurama", "The Simpsons", "Adventure Time", "SpongeBob"],
        itemId: "c6",
      },
      {
        id: "c7",
        category: "cartoon",
        clue: "Which cartoon features a talking dog and a mystery-solving gang?",
        choices: ["Scooby-Doo", "Tom & Jerry", "Paw Patrol", "Adventure Time"],
        itemId: "c7",
      },
      {
        id: "c8",
        category: "cartoon",
        clue: "Which cartoon features Finn and Jake?",
        choices: ["Adventure Time", "Teen Titans", "Dexter's Lab", "Steven Universe"],
        itemId: "c8",
      },
      {
        id: "c9",
        category: "cartoon",
        clue: "Which cartoon character is a duck who wears a sailor shirt?",
        choices: ["Donald Duck", "Daffy Duck", "Scrooge McDuck", "Huey Duck"],
        itemId: "c9",
      },
      {
        id: "c10",
        category: "cartoon",
        clue: "Which cartoon features a girl genius named Dexter?",
        choices: ["Dexter's Laboratory", "Jimmy Neutron", "Kim Possible", "Powerpuff Girls"],
        itemId: "c10",
      },
    ],
  
    brand: [
      {
        id: "b1",
        category: "brand",
        clue: "Which company produces the iPhone?",
        choices: ["Samsung", "Apple", "Huawei", "Sony"],
        itemId: "b1",
      },
      {
        id: "b2",
        category: "brand",
        clue: "Which car brand has a logo with four rings?",
        choices: ["BMW", "Audi", "Mercedes", "Volkswagen"],
        itemId: "b2",
      },
      {
        id: "b3",
        category: "brand",
        clue: "Which company makes the PlayStation?",
        choices: ["Sony", "Microsoft", "Nintendo", "Sega"],
        itemId: "b3",
      },
      {
        id: "b4",
        category: "brand",
        clue: "Which fast-food chain uses a golden arch logo?",
        choices: ["McDonald's", "Burger King", "KFC", "Subway"],
        itemId: "b4",
      },
      {
        id: "b5",
        category: "brand",
        clue: "Which company makes the Mustang car?",
        choices: ["Ford", "Chevrolet", "Dodge", "Toyota"],
        itemId: "b5",
      },
      {
        id: "b6",
        category: "brand",
        clue: "Which brand is known for the swoosh logo?",
        choices: ["Nike", "Adidas", "Puma", "Reebok"],
        itemId: "b6",
      },
      {
        id: "b7",
        category: "brand",
        clue: "Which company owns the social media platform Facebook?",
        choices: ["Meta", "Google", "Microsoft", "Apple"],
        itemId: "b7",
      },
      {
        id: "b8",
        category: "brand",
        clue: "Which brand produces the Galaxy smartphones?",
        choices: ["Samsung", "Apple", "Huawei", "Sony"],
        itemId: "b8",
      },
      {
        id: "b9",
        category: "brand",
        clue: "Which brand is famous for its luxury watches, Rolex or Casio?",
        choices: ["Rolex", "Casio", "Seiko", "Omega"],
        itemId: "b9",
      },
      {
        id: "b10",
        category: "brand",
        clue: "Which company owns the Windows operating system?",
        choices: ["Microsoft", "Apple", "Google", "IBM"],
        itemId: "b10",
      },
    ],
  }

  useEffect(() => {
    setSampleQuestion()
  }, [category])

  const setSampleQuestion = () => {
    const categoryQuestions = questions[category] || []
    if (categoryQuestions.length === 0) {
      setQuestion(null)
      setLoading(false)
      return
    }

    const random = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)]
    setQuestion(random)
    setLoading(false)
    setSelectedAnswer(null)
    setAnswered(false)
    setIsCorrect(null)
  }

  const handleSelectAnswer = (answer: string) => {
    if (answered) return
    setSelectedAnswer(answer)
    checkAnswer(answer)
  }

  const checkAnswer = (answer: string) => {
    if (!question) return

    const correctAnswer = question.choices[1] // Har savol uchun to‘g‘ri javob
    const isCorrectAnswer = answer === correctAnswer

    setIsCorrect(isCorrectAnswer)
    setAnswered(true)

    if (isCorrectAnswer) {
      setScore(score + 1)
    }
    setQuestionCount(questionCount + 1)
  }

  const handleNextQuestion = () => {
    setSampleQuestion()
  }

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="stars"></div>
        <div className="loading">Loading question...</div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="quiz-container">
        <div className="stars"></div>
        <div className="error">No questions available for this category 😢</div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="stars"></div>

      <div className="quiz-content">
        <div className="score-board">
          <span className="score-label">Score:</span>
          <span className="score-value">
            {score}/{questionCount}
          </span>
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.clue}</h2>

          <div className="choices-grid">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                className={`choice-button ${selectedAnswer === choice ? "selected" : ""} ${
                  answered && choice === selectedAnswer ? (isCorrect ? "correct" : "incorrect") : ""
                }`}
                onClick={() => handleSelectAnswer(choice)}
                disabled={answered}
              >
                <span className="choice-text">{choice}</span>
                {answered && choice === selectedAnswer && (
                  <span className="choice-icon">{isCorrect ? <Check size={20} /> : <X size={20} />}</span>
                )}
              </button>
            ))}
          </div>

          {answered && (
            <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
              {isCorrect ? "Correct!" : "Try Again!"}
            </div>
          )}

          {answered && (
            <button className="next-button" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
