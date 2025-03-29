"use client"

import { motion } from "framer-motion"
import { Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DatatypeAnimation from "@/components/datatype-animation"

export default function DatatypeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Database className="h-5 w-5" />
            Data Types in Python
          </CardTitle>
          <CardDescription>Python has various built-in data types for different kinds of values</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">Common Data Types</h3>
              <ul className="space-y-3">
                <li className="bg-blue-50 p-3 rounded-lg">
                  <strong className="text-blue-700">Numeric Types:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>
                      <code className="bg-blue-100 px-1 rounded">int</code> - Integer numbers (e.g., 10, -5)
                    </li>
                    <li>
                      <code className="bg-blue-100 px-1 rounded">float</code> - Decimal numbers (e.g., 3.14, -0.001)
                    </li>
                    <li>
                      <code className="bg-blue-100 px-1 rounded">complex</code> - Complex numbers (e.g., 1+2j)
                    </li>
                  </ul>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg">
                  <strong className="text-blue-700">Text Type:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>
                      <code className="bg-blue-100 px-1 rounded">str</code> - Strings (e.g., "Hello", 'Python')
                    </li>
                  </ul>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg">
                  <strong className="text-blue-700">Boolean Type:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>
                      <code className="bg-blue-100 px-1 rounded">bool</code> - True or False
                    </li>
                  </ul>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg">
                  <strong className="text-blue-700">Sequence Types:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>
                      <code className="bg-blue-100 px-1 rounded">list</code> - Ordered, mutable collection (e.g., [1, 2,
                      3])
                    </li>
                    <li>
                      <code className="bg-blue-100 px-1 rounded">tuple</code> - Ordered, immutable collection (e.g., (1,
                      2, 3))
                    </li>
                  </ul>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg">
                  <strong className="text-blue-700">Mapping Type:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>
                      <code className="bg-blue-100 px-1 rounded">dict</code> - Key-value pairs (e.g.,{" "}
                      {"{'name': 'John', 'age': 25}"})
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="flex items-start justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-inner">
              <DatatypeAnimation />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

