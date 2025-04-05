"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function DatatypeAnimation() {
  const [selectedType, setSelectedType] = useState("int")
  const [inputValue, setInputValue] = useState("42")
  const [showAnimation, setShowAnimation] = useState(false)

  const getPlaceholder = () => {
    switch (selectedType) {
      case "int":
        return "Enter an integer (e.g., 42)"
      case "float":
        return "Enter a decimal (e.g., 3.14)"
      case "str":
        return "Enter text (e.g., Hello)"
      case "list":
        return "Enter items separated by commas"
      case "dict":
        return "Enter key:value pairs (e.g., name:John,age:25)"
      case "bool":
        return "Enter True or False"
      default:
        return "Enter a value"
    }
  }

  const formatValue = () => {
    switch (selectedType) {
      case "int":
        return Number.parseInt(inputValue) || 0
      case "float":
        return Number.parseFloat(inputValue) || 0.0
      case "str":
        return `"${inputValue}"`
      case "list":
        return `[${inputValue
          .split(",")
          .map((item) => `"${item.trim()}"`)
          .join(", ")}]`
      case "dict":
        try {
          const pairs = inputValue.split(",")
          const formattedPairs = pairs.map((pair) => {
            const [key, value] = pair.split(":")
            return `"${key.trim()}": "${value.trim()}"`
          })
          return `{${formattedPairs.join(", ")}}`
        } catch (e) {
          return "{}"
        }
      case "bool":
        return inputValue.toLowerCase() === "true" ? "True" : "False"
      default:
        return inputValue
    }
  }

  const getTypeColor = () => {
    switch (selectedType) {
      case "int":
        return "from-blue-400 to-blue-500 text-white"
      case "float":
        return "from-green-400 to-green-500 text-white"
      case "str":
        return "from-red-400 to-red-500 text-white"
      case "list":
        return "from-purple-400 to-purple-500 text-white"
      case "dict":
        return "from-yellow-400 to-yellow-500 text-white"
      case "bool":
        return "from-orange-400 to-orange-500 text-white"
      default:
        return "from-gray-400 to-gray-500 text-white"
    }
  }

  const handleDemoClick = () => {
    setShowAnimation(false)
    setTimeout(() => setShowAnimation(true), 100)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-blue-700">Select Data Type:</label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
            <SelectValue placeholder="Select a data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="int">Integer (int)</SelectItem>
            <SelectItem value="float">Float (float)</SelectItem>
            <SelectItem value="str">String (str)</SelectItem>
            <SelectItem value="list">List (list)</SelectItem>
            <SelectItem value="dict">Dictionary (dict)</SelectItem>
            <SelectItem value="bool">Boolean (bool)</SelectItem>
          </SelectContent>
        </Select>

        <label className="block text-sm font-medium mt-3 mb-1 text-blue-700">Value:</label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={getPlaceholder()}
          className="mb-4 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
        />

        <Button
          onClick={handleDemoClick}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
        >
          Visualize Data Type
        </Button>
      </div>

      <div className="bg-white rounded-md p-6 h-48 flex items-center justify-center relative overflow-hidden shadow-inner border border-blue-100">
        {showAnimation ? (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            <div className={`bg-gradient-to-r ${getTypeColor()} px-4 py-2 rounded-t-md font-mono text-sm shadow-md`}>
              {selectedType}
            </div>
            <div className="bg-white border border-blue-200 px-4 py-2 rounded-b-md font-mono text-sm min-w-[150px] text-center shadow-md">
              {formatValue()}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-xs text-center max-w-[200px] text-blue-700"
            >
              {selectedType === "int" && "Integers are whole numbers without decimals"}
              {selectedType === "float" && "Floats are numbers with decimal points"}
              {selectedType === "str" && "Strings are sequences of characters"}
              {selectedType === "list" && "Lists are ordered, mutable collections"}
              {selectedType === "dict" && "Dictionaries store key-value pairs"}
              {selectedType === "bool" && "Booleans represent True or False values"}
            </motion.div>
          </motion.div>
        ) : (
          <div className="text-center text-blue-400">
            Select a data type and value, then click "Visualize Data Type"
          </div>
        )}
      </div>
    </div>
  )
}

