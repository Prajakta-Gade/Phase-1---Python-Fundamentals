"use client"

import { motion } from "framer-motion"
import { ActivityIcon as Function } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FunctionAnimation from "@/components/function-animation"

export default function FunctionSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border border-purple-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Function className="h-5 w-5" />
            Functions in Python
          </CardTitle>
          <CardDescription>Functions are reusable blocks of code that perform specific tasks</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-purple-700">What are Functions?</h3>
              <p className="mb-4">
                A function is a block of code that runs only when it is called. You can pass data (parameters) into a
                function, and it can return data as a result.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg font-mono text-sm mb-4 shadow-inner">
                <pre>
                  {`# Function definition
def greet(name):
    return f"Hello, {name}!"

# Function call
message = greet("Alice")
print(message)  # Output: Hello, Alice!`}
                </pre>
              </div>
              <p>Key concepts about functions:</p>
              <ul className="list-disc pl-5 space-y-1 text-purple-800">
                <li>
                  Defined using the <code className="bg-purple-100 px-1 rounded">def</code> keyword
                </li>
                <li>Can accept parameters/arguments</li>
                <li>
                  Can return values using <code className="bg-purple-100 px-1 rounded">return</code>
                </li>
                <li>Help organize and reuse code</li>
                <li>Can have default parameter values</li>
              </ul>
            </div>
            <div className="flex items-start justify-center bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg shadow-inner">
              <FunctionAnimation />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

