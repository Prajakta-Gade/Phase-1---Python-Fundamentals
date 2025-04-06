"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FunctionAnimation() {
  const [param1, setParam1] = useState("5")
  const [param2, setParam2] = useState("3")
  const [operation, setOperation] = useState("add")
  const [result, setResult] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const calculateResult = () => {
    const num1 = Number.parseFloat(param1)
    const num2 = Number.parseFloat(param2)

    if (isNaN(num1) || isNaN(num2)) {
      return null
    }

    switch (operation) {
      case "add":
        return num1 + num2
      case "subtract":
        return num1 - num2
      case "multiply":
        return num1 * num2
      case "divide":
        return num2 !== 0 ? num1 / num2 : null
      default:
        return null
    }
  }

  const handleExecute = () => {
    setIsAnimating(true)
    setResult(null)

    // Simulate function execution with animation
    setTimeout(() => {
      setResult(calculateResult())
      setIsAnimating(false)
    }, 1500)
  }

  const getOperationSymbol = () => {
    switch (operation) {
      case "add":
        return "+"
      case "subtract":
        return "-"
      case "multiply":
        return "×"
      case "divide":
        return "÷"
      default:
        return ""
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block text-sm font-medium mb-1 text-purple-700">First Number:</label>
            <Input
              value={param1}
              onChange={(e) => setParam1(e.target.value)}
              type="number"
              placeholder="Enter first number"
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-purple-700">Second Number:</label>
            <Input
              value={param2}
              onChange={(e) => setParam2(e.target.value)}
              type="number"
              placeholder="Enter second number"
              className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
        </div>

        <label className="block text-sm font-medium mb-1 text-purple-700">Operation:</label>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Button
            variant={operation === "add" ? "default" : "outline"}
            onClick={() => setOperation("add")}
            size="sm"
            className={
              operation === "add"
                ? "bg-gradient-to-r from-purple-400 to-purple-500"
                : "border-purple-300 text-purple-700 hover:bg-purple-50"
            }
          >
            Add
          </Button>
          <Button
            variant={operation === "subtract" ? "default" : "outline"}
            onClick={() => setOperation("subtract")}
            size="sm"
            className={
              operation === "subtract"
                ? "bg-gradient-to-r from-purple-400 to-purple-500"
                : "border-purple-300 text-purple-700 hover:bg-purple-50"
            }
          >
            Subtract
          </Button>
          <Button
            variant={operation === "multiply" ? "default" : "outline"}
            onClick={() => setOperation("multiply")}
            size="sm"
            className={
              operation === "multiply"
                ? "bg-gradient-to-r from-purple-400 to-purple-500"
                : "border-purple-300 text-purple-700 hover:bg-purple-50"
            }
          >
            Multiply
          </Button>
          <Button
            variant={operation === "divide" ? "default" : "outline"}
            onClick={() => setOperation("divide")}
            size="sm"
            className={
              operation === "divide"
                ? "bg-gradient-to-r from-purple-400 to-purple-500"
                : "border-purple-300 text-purple-700 hover:bg-purple-50"
            }
          >
            Divide
          </Button>
        </div>

        <Button
          onClick={handleExecute}
          disabled={isAnimating}
          className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600"
        >
          Execute Function
        </Button>
      </div>

      <div className="bg-white rounded-md p-6 h-48 flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-purple-100">
        <div className="font-mono text-sm mb-4 bg-purple-50 p-3 rounded-md w-full text-center text-purple-700 border border-purple-100">
          {`def calculate(a, b):
    return a ${getOperationSymbol()} b`}
        </div>

        {isAnimating ? (
          <div className="relative w-full h-16">
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 100 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 bg-gradient-to-r from-purple-400 to-purple-500 text-white px-3 py-1 rounded-md shadow-md"
            >
              {param1}
            </motion.div>

            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 100 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-8 left-0 bg-gradient-to-r from-purple-400 to-purple-500 text-white px-3 py-1 rounded-md shadow-md"
            >
              {param2}
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-purple-200 text-purple-700 px-3 py-1 rounded-full shadow-md"
            >
              {getOperationSymbol()}
            </motion.div>
          </div>
        ) : result !== null ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-md font-mono shadow-md"
          >
            Result: {result}
          </motion.div>
        ) : (
          <div className="text-center text-purple-400">
            Enter numbers and select an operation, then click "Execute Function"
          </div>
        )}
      </div>
    </div>
  )
}

