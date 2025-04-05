"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function VariableAnimation() {
  const [variableName, setVariableName] = useState("my_var")
  const [variableValue, setVariableValue] = useState("42")
  const [isAssigned, setIsAssigned] = useState(false)

  const handleAssign = () => {
    setIsAssigned(true)
  }

  const handleReset = () => {
    setIsAssigned(false)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-pink-700">Variable Name:</label>
        <Input
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
          placeholder="Enter variable name"
          disabled={isAssigned}
          className="mb-2 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
        />

        <label className="block text-sm font-medium mb-1 text-pink-700">Value:</label>
        <Input
          value={variableValue}
          onChange={(e) => setVariableValue(e.target.value)}
          placeholder="Enter value"
          disabled={isAssigned}
          className="mb-4 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
        />

        <div className="flex space-x-2">
          <Button
            onClick={handleAssign}
            disabled={isAssigned || !variableName.trim() || !variableValue.trim()}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600"
          >
            Assign Value
          </Button>

          <Button
            onClick={handleReset}
            variant="outline"
            disabled={!isAssigned}
            className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md p-6 h-48 flex items-center justify-center relative overflow-hidden shadow-inner border border-pink-100">
        {isAssigned ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-4 left-4 bg-pink-100 px-3 py-1 rounded-md text-sm font-mono text-pink-700"
            >
              {variableName}
            </motion.div>

            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-md font-mono shadow-md"
            >
              {variableValue}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute bottom-4 text-xs text-center w-full text-pink-700"
            >
              The variable <span className="font-mono font-bold">{variableName}</span> now points to the value{" "}
              <span className="font-mono font-bold">{variableValue}</span>
            </motion.div>
          </>
        ) : (
          <div className="text-center text-pink-400">Enter a variable name and value, then click "Assign Value"</div>
        )}
      </div>
    </div>
  )
}

