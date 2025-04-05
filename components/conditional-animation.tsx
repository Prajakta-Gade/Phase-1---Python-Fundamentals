"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ConditionalAnimation() {
  const [conditionalType, setConditionalType] = useState("if")
  const [inputValue, setInputValue] = useState("75")
  const [result, setResult] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [dayValue, setDayValue] = useState("Monday")

  const evaluateIfElse = () => {
    const num = Number.parseInt(inputValue)
    if (isNaN(num)) return "Invalid input"

    if (num >= 90) return "A - Excellent!"
    else if (num >= 80) return "B - Good job!"
    else if (num >= 70) return "C - Satisfactory"
    else if (num >= 60) return "D - Needs improvement"
    else return "F - Failed"
  }

  const evaluateSwitch = () => {
    switch (dayValue) {
      case "Monday":
        return "Start of work week"
      case "Tuesday":
      case "Wednesday":
      case "Thursday":
        return "Midweek"
      case "Friday":
        return "End of work week"
      case "Saturday":
      case "Sunday":
        return "Weekend"
      default:
        return "Invalid day"
    }
  }

  const handleEvaluate = () => {
    setIsAnimating(true)
    setResult(null)

    // Simulate evaluation with animation
    setTimeout(() => {
      if (conditionalType === "if") {
        setResult(evaluateIfElse())
      } else {
        setResult(evaluateSwitch())
      }
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div className="w-full max-w-md">
      <Tabs value={conditionalType} onValueChange={setConditionalType} className="mb-4">
        <TabsList className="grid grid-cols-2 bg-amber-100">
          <TabsTrigger value="if" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            If-Else
          </TabsTrigger>
          <TabsTrigger value="switch" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Switch-Case
          </TabsTrigger>
        </TabsList>

        <TabsContent value="if" className="pt-2">
          <div className="font-mono text-sm bg-amber-50 p-3 rounded-md mb-2 border border-amber-100 text-amber-700">
            {`# Grade calculator
score = ${inputValue}
if score >= 90:
    grade = "A - Excellent!"
elif score >= 80:
    grade = "B - Good job!"
elif score >= 70:
    grade = "C - Satisfactory"
elif score >= 60:
    grade = "D - Needs improvement"
else:
    grade = "F - Failed"`}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-amber-700">Enter Score (0-100):</label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="number"
              min="0"
              max="100"
              placeholder="Enter score"
              className="mb-4 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
        </TabsContent>

        <TabsContent value="switch" className="pt-2">
          <div className="font-mono text-sm bg-amber-50 p-3 rounded-md mb-2 border border-amber-100 text-amber-700">
            {`# Day type checker (Python 3.10+)
day = "${dayValue}"
match day:
    case "Monday":
        result = "Start of work week"
    case "Tuesday" | "Wednesday" | "Thursday":
        result = "Midweek"
    case "Friday":
        result = "End of work week"
    case "Saturday" | "Sunday":
        result = "Weekend"
    case _:
        result = "Invalid day"`}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-amber-700">Select Day:</label>
            <Select value={dayValue} onValueChange={setDayValue}>
              <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-400">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
                <SelectItem value="Saturday">Saturday</SelectItem>
                <SelectItem value="Sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        onClick={handleEvaluate}
        disabled={isAnimating}
        className="w-full mb-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
      >
        Evaluate Condition
      </Button>

      <div className="bg-white rounded-md p-6 h-48 flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-amber-100">
        {isAnimating ? (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="w-16 h-16 bg-amber-100 rounded-md flex items-center justify-center text-amber-700 font-bold"
            >
              ?
            </motion.div>
            <div className="mt-4 text-amber-500">Evaluating condition...</div>
          </div>
        ) : result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-3 rounded-md shadow-md mb-2">
              {result}
            </div>
            <div className="text-xs text-amber-700">
              {conditionalType === "if"
                ? `Score ${inputValue} evaluates to grade: ${result}`
                : `Day "${dayValue}" is classified as: ${result}`}
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-amber-400">
            {conditionalType === "if"
              ? 'Enter a score and click "Evaluate Condition"'
              : 'Select a day and click "Evaluate Condition"'}
          </div>
        )}
      </div>
    </div>
  )
}

