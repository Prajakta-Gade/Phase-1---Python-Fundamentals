"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Trophy, ArrowRight, Brain } from "lucide-react"
import confetti from "canvas-confetti"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which of the following is NOT a valid way to create a variable in Python?",
    options: ["x = 5", "x: int = 5", "var x = 5", "x, y = 5, 10"],
    correctAnswer: 2,
  },
  {
    id: 2,
    text: "What will be the output of the following code?\n\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[1, 2, 3, [4]]", "Error"],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "Which data type is mutable in Python?",
    options: ["int", "tuple", "str", "list"],
    correctAnswer: 3,
  },
  {
    id: 4,
    text: "What is the correct way to define a function that takes two parameters and returns their sum?",
    options: [
      "function add(a, b) { return a + b }",
      "def add(a, b): return a + b",
      "def add(a, b) { return a + b }",
      "function add(a, b): return a + b",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    text: "How many times will the following loop execute?\n\nfor i in range(5):\n    print(i)",
    options: ["4 times", "5 times", "6 times", "Infinite loop"],
    correctAnswer: 1,
  },
  {
    id: 6,
    text: "Which statement is used to exit a loop prematurely in Python?",
    options: ["exit", "return", "break", "continue"],
    correctAnswer: 2,
  },
  {
    id: 7,
    text: "What is the equivalent of a switch-case statement in Python 3.10+?",
    options: ["if-elif-else", "match-case", "switch-when", "Python doesn't have switch-case"],
    correctAnswer: 1,
  },
]

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index)
    }
  }

  const handleCheckAnswer = () => {
    if (selectedOption === null) return

    setIsAnswered(true)
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setQuizCompleted(true)
      // Trigger confetti if score is good
      if ((score / questions.length) * 100 >= 70) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Excellent! You've mastered Python fundamentals!"
    if (percentage >= 60) return "Good job! You have a solid understanding of Python."
    if (percentage >= 40) return "Not bad! Keep practicing to improve your Python skills."
    return "Keep learning! Review the Python fundamentals and try again."
  }

  const getScoreEmoji = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "🏆"
    if (percentage >= 60) return "🎉"
    if (percentage >= 40) return "👍"
    return "📚"
  }

  if (quizCompleted) {
    return (
      <Card className="overflow-hidden border-2 border-indigo-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
          <CardTitle className="flex items-center justify-center gap-2 text-indigo-700">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Quiz Results
          </CardTitle>
          <CardDescription className="text-center">You've completed the Python Fundamentals Quiz!</CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              {getScoreEmoji()} {score} / {questions.length}
            </div>
            <div className="text-lg mb-6 text-indigo-700">{getScoreMessage()}</div>

            <div className="w-full bg-gray-100 rounded-full h-4 mb-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(score / questions.length) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
              />
            </div>

            <div className="grid grid-cols-7 gap-1 mb-6">
              {Array.from({ length: questions.length }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`h-2 rounded-full ${
                    idx < score ? "bg-gradient-to-r from-green-400 to-green-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
          <Button
            onClick={handleRestartQuiz}
            className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600"
          >
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card className="overflow-hidden border-2 border-indigo-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
        <CardTitle className="flex items-center gap-2 text-indigo-700">
          <Brain className="h-5 w-5" />
          Python Fundamentals Quiz
        </CardTitle>
        <CardDescription>Test your knowledge with these multiple-choice questions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-indigo-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="font-medium text-indigo-700">Score: {score}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-400 to-purple-500 h-2"
              style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-lg mb-4 bg-indigo-50 p-3 rounded-lg text-indigo-700 border border-indigo-100">
            {question.text}
          </h3>

          <RadioGroup value={selectedOption?.toString()}>
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`flex items-center space-x-2 p-3 rounded-md mb-2 cursor-pointer transition-all ${
                    isAnswered
                      ? index === question.correctAnswer
                        ? "bg-green-50 border border-green-300 shadow-md"
                        : selectedOption === index
                          ? "bg-red-50 border border-red-300 shadow-md"
                          : "bg-gray-50 border border-gray-200"
                      : selectedOption === index
                        ? "bg-indigo-50 border border-indigo-300 shadow-md"
                        : "bg-gray-50 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200"
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    disabled={isAnswered}
                    className={isAnswered && index === question.correctAnswer ? "text-green-500" : ""}
                  />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>

                  {isAnswered && index === question.correctAnswer && <CheckCircle className="h-5 w-5 text-green-500" />}

                  {isAnswered && selectedOption === index && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
        {!isAnswered ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600"
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 flex items-center justify-center gap-1"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Next Question <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                See Results <Trophy className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

