"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoopAnimation() {
  const [loopType, setLoopType] = useState("for")
  const [count, setCount] = useState("5")
  const [isRunning, setIsRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [iterations, setIterations] = useState<number[]>([])

  const handleStart = () => {
    const numCount = Number.parseInt(count)
    if (isNaN(numCount) || numCount <= 0) return

    setIsRunning(true)
    setCurrentIndex(-1)
    setIterations([])

    // Reset and start the animation
    let i = 0
    const interval = setInterval(() => {
      if (i >= numCount) {
        clearInterval(interval)
        setIsRunning(false)
        return
      }

      setCurrentIndex(i)
      setIterations((prev) => [...prev, i])
      i++
    }, 800)
  }

  return (
    <div className="w-full max-w-md">
      <Tabs value={loopType} onValueChange={setLoopType} className="mb-4">
        <TabsList className="grid grid-cols-3 bg-green-100">
          <TabsTrigger value="for" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            For Loop
          </TabsTrigger>
          <TabsTrigger value="while" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            While Loop
          </TabsTrigger>
          <TabsTrigger value="dowhile" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Do-While
          </TabsTrigger>
        </TabsList>

        <TabsContent value="for" className="pt-2">
          <div className="font-mono text-sm bg-green-50 p-3 rounded-md mb-2 border border-green-100 text-green-700">
            {`for i in range(${count}):
    print(i)`}
          </div>
        </TabsContent>

        <TabsContent value="while" className="pt-2">
          <div className="font-mono text-sm bg-green-50 p-3 rounded-md mb-2 border border-green-100 text-green-700">
            {`i = 0
while i < ${count}:
    print(i)
    i += 1`}
          </div>
        </TabsContent>

        <TabsContent value="dowhile" className="pt-2">
          <div className="font-mono text-sm bg-green-50 p-3 rounded-md mb-2 border border-green-100 text-green-700">
            {`# Python's do-while equivalent
i = 0
while True:
    print(i)
    i += 1
    if i >= ${count}:
        break`}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-green-700">Number of Iterations:</label>
        <Input
          value={count}
          onChange={(e) => setCount(e.target.value)}
          type="number"
          min="1"
          max="10"
          disabled={isRunning}
          className="mb-4 border-green-200 focus:border-green-400 focus:ring-green-400"
        />

        <Button
          onClick={handleStart}
          disabled={isRunning}
          className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
        >
          Run Loop
        </Button>
      </div>

      <div className="bg-white rounded-md p-6 h-48 flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-green-100">
        {isRunning || iterations.length > 0 ? (
          <>
            <div className="absolute top-2 left-2 text-xs font-mono text-green-700">
              {loopType === "for"
                ? "for loop execution"
                : loopType === "while"
                  ? "while loop execution"
                  : "do-while loop execution"}
            </div>

            <div className="flex items-center justify-center h-full">
              <AnimatePresence>
                {currentIndex >= 0 && (
                  <motion.div
                    key={currentIndex}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0, x: 50 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-md font-mono text-xl shadow-md"
                  >
                    {currentIndex}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute bottom-2 left-0 right-0 px-4">
              <div className="flex justify-center space-x-2 overflow-x-auto py-2">
                {iterations.map((iter, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm border border-green-200"
                  >
                    {iter}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-green-400">Set the number of iterations and click "Run Loop"</div>
        )}
      </div>
    </div>
  )
}

