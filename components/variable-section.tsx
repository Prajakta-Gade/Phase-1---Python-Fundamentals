"use client"

import { motion } from "framer-motion"
import { Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VariableAnimation from "@/components/variable-animation"

export default function VariableSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border border-pink-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-pink-700">
            <Database className="h-5 w-5" />
            Variables in Python
          </CardTitle>
          <CardDescription>Variables are containers for storing data values</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-pink-700">What is a Variable?</h3>
              <p className="mb-4">
                In Python, a variable is a named location in memory that stores a value. Unlike other languages, Python
                has no command for declaring a variable. A variable is created the moment you first assign a value to
                it.
              </p>
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg font-mono text-sm mb-4 shadow-inner">
                <pre>
                  {`# Variable assignment
name = "John"
age = 25
is_student = True`}
                </pre>
              </div>
              <p>Variables in Python:</p>
              <ul className="list-disc pl-5 space-y-1 text-pink-800">
                <li>Don't need explicit declaration</li>
                <li>Can change type after they are set</li>
                <li>Are case-sensitive (age and Age are different)</li>
                <li>Must start with a letter or underscore</li>
              </ul>
            </div>
            <div className="flex items-start justify-center bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg shadow-inner">
              <VariableAnimation />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

