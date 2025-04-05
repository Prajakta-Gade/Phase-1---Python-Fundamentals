"use client"

import { motion } from "framer-motion"
import { RotateCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoopAnimation from "@/components/loop-animation"

export default function LoopSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border border-green-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-100 to-green-50">
          <CardTitle className="flex items-center gap-2 text-green-700">
            <RotateCw className="h-5 w-5" />
            Loops in Python
          </CardTitle>
          <CardDescription>Loops allow you to execute a block of code multiple times</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-green-700">Types of Loops</h3>
              <p className="mb-2">Python has three main types of loops:</p>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-700">1. For Loops</h4>
                  <p className="mb-2">
                    Used to iterate over a sequence (like a list, tuple, string) or other iterable objects.
                  </p>
                  <div className="bg-green-100 p-3 rounded-md font-mono text-sm shadow-inner">
                    <pre>
                      {`# For loop example
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Range-based for loop
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4`}
                    </pre>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-700">2. While Loops</h4>
                  <p className="mb-2">Executes a set of statements as long as a condition is true.</p>
                  <div className="bg-green-100 p-3 rounded-md font-mono text-sm shadow-inner">
                    <pre>
                      {`# While loop example
count = 0
while count < 5:
    print(count)
    count += 1  # Increment counter`}
                    </pre>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-green-700">Loop control statements:</p>
              <ul className="list-disc pl-5 space-y-1 text-green-800">
                <li>
                  <code className="bg-green-100 px-1 rounded">break</code> - Exit the loop
                </li>
                <li>
                  <code className="bg-green-100 px-1 rounded">continue</code> - Skip to the next iteration
                </li>
                <li>
                  <code className="bg-green-100 px-1 rounded">else</code> - Execute when loop completes normally
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2 text-green-700">3. Do-While Loop Equivalent</h4>
                <p className="mb-2">Python doesn't have a do-while loop, but you can simulate it:</p>
                <div className="bg-green-100 p-3 rounded-md font-mono text-sm shadow-inner">
                  <pre>
                    {`# Do-while equivalent
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break  # Exit condition`}
                  </pre>
                </div>
              </div>
              <div className="flex items-start justify-center bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg shadow-inner flex-grow">
                <LoopAnimation />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

