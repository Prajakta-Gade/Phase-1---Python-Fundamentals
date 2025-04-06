"use client"

import { motion } from "framer-motion"
import { GitBranch } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConditionalAnimation from "@/components/conditional-animation"

export default function ConditionalSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border border-amber-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-50">
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <GitBranch className="h-5 w-5" />
            Conditional Statements in Python
          </CardTitle>
          <CardDescription>Conditional statements help your program make decisions</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-amber-700">Types of Conditionals</h3>

              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-amber-700">1. If-Else Statements</h4>
                  <p className="mb-2">
                    Execute a block of code if a condition is true, otherwise execute another block.
                  </p>
                  <div className="bg-amber-100 p-3 rounded-md font-mono text-sm shadow-inner">
                    <pre>
                      {`# If-else example
age = 18
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# If-elif-else example
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"`}
                    </pre>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-amber-700">2. Switch-Case Equivalent (Python 3.10+)</h4>
                  <p className="mb-2">
                    Python 3.10 introduced match-case statements, similar to switch-case in other languages:
                  </p>
                  <div className="bg-amber-100 p-3 rounded-md font-mono text-sm shadow-inner">
                    <pre>
                      {`# Match-case example (Python 3.10+)
day = "Monday"
match day:
    case "Monday":
        print("Start of work week")
    case "Friday":
        print("End of work week")
    case "Saturday" | "Sunday":
        print("Weekend")
    case _:
        print("Midweek")`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2 text-amber-700">3. Ternary Operator</h4>
                <p className="mb-2">A one-line conditional expression:</p>
                <div className="bg-amber-100 p-3 rounded-md font-mono text-sm shadow-inner overflow-auto">
                  <pre className="whitespace-pre-wrap">
                    {`# Ternary operator
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # Output: adult`}
                  </pre>
                </div>
              </div>
              <div className="flex items-start justify-center bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg shadow-inner flex-grow">
                <ConditionalAnimation />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

