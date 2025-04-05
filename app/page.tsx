"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Code, Database, ActivityIcon as Function, RotateCw, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VariableSection from "@/components/variable-section"
import DatatypeSection from "@/components/datatype-section"
import FunctionSection from "@/components/function-section"
import LoopSection from "@/components/loop-section"
import ConditionalSection from "@/components/conditional-section"
import QuizSection from "@/components/quiz-section"

export default function PythonTutorial() {
  const [showExplanation, setShowExplanation] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleSectionClick = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null) // Toggle off if already active
    } else {
      setActiveSection(section)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-2 border-primary/20 rounded-xl p-8 max-w-4xl mx-auto text-center shadow-lg bg-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0%, rgba(255, 255, 255, 0.1) 90%)",
        }}
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg blur opacity-75"></div>
              <h1 className="relative bg-white px-6 py-3 rounded-lg text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Python Fundamentals
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Python Introduction */}
        <Card className="mb-8 overflow-hidden border border-purple-200 shadow-md">
          <div className="absolute right-0 top-0 h-16 w-16 opacity-10">
            <svg viewBox="0 0 128 128" className="h-full w-full">
              <path
                fill="#FFD845"
                d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191C37.145 6.659 35 12.449 35 19.183v12.392h29v4.364H35c-8.086 0-15.168 4.863-17.379 14.118-2.539 10.643-2.649 17.277 0 28.395C19.7 86.804 23.961 94 32.046 94h7.02V81.075c0-8.707 7.548-16.379 16.264-16.379zm-1.17-39.664c-2.985 0-5.41-2.442-5.41-5.457 0-3.038 2.425-5.51 5.41-5.51 2.963 0 5.41 2.472 5.41 5.51 0 3.015-2.447 5.457-5.41 5.457zM106 45.664v-12.392c0-8.65-7.3-15.92-15.879-17.469-5.464-.986-11.812-1.512-18.607-1.512-6.79 0-12.498.526-16.396 1.512C45.65 18.056 42 25.14 42 33.272v12.392h29v4.364H42c-8.087 0-13.199 4.863-15.402 14.118-2.845 11.965-2.968 18.977 0 28.395C28.608 101.002 34 108 42.085 108h13.972V95.801c0-8.707 7.548-15.801 16.264-15.801h28.398C108.214 80 113 74.068 113 65.942V49.368H84v-3.704h22zm-15.985 20.149c2.958 0 5.358 2.472 5.358 5.509 0 3.015-2.4 5.458-5.358 5.458-2.962 0-5.409-2.443-5.409-5.458 0-3.037 2.447-5.509 5.409-5.509z"
              ></path>
            </svg>
          </div>
          <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
            <CardTitle className="flex items-center justify-center gap-2 text-indigo-700">
              <Code className="h-6 w-6" />
              What is Python?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Button
              onClick={() => setShowExplanation(!showExplanation)}
              variant="outline"
              className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-indigo-200"
            >
              {showExplanation ? (
                <span className="flex items-center">
                  Hide Explanation <ChevronUp className="ml-2 h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center">
                  Show Explanation <ChevronDown className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-left bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-inner"
              >
                <h3 className="font-semibold mb-3 text-indigo-700">
                  Python is a high-level, interpreted programming language known for:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-5">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Readability:</strong> Clean syntax that emphasizes readability
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Versatility:</strong> Used in web, data science, AI, and more
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Extensive Libraries:</strong> Rich standard and third-party
                      packages
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Interpreted:</strong> No compilation needed, faster
                      development
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Object-Oriented:</strong> Supports multiple programming
                      paradigms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Beginner-Friendly:</strong> Easy to learn with gentle learning
                      curve
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Cross-Platform:</strong> Runs on Windows, macOS, Linux, and
                      more
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      <strong className="text-indigo-600">Dynamic Typing:</strong> No need to declare variable types
                    </span>
                  </li>
                </ul>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Python Concepts Navigation */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-2">
          <Button
            variant="outline"
            onClick={() => handleSectionClick("variables")}
            className={`bg-gradient-to-r ${
              activeSection === "variables"
                ? "from-pink-100 to-pink-200 border-pink-300 text-pink-800"
                : "from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 border-pink-200 text-pink-700"
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            Variables
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSectionClick("datatypes")}
            className={`bg-gradient-to-r ${
              activeSection === "datatypes"
                ? "from-blue-100 to-blue-200 border-blue-300 text-blue-800"
                : "from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700"
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            Data Types
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSectionClick("functions")}
            className={`bg-gradient-to-r ${
              activeSection === "functions"
                ? "from-purple-100 to-purple-200 border-purple-300 text-purple-800"
                : "from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200 text-purple-700"
            }`}
          >
            <Function className="h-4 w-4 mr-2" />
            Functions
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSectionClick("loops")}
            className={`bg-gradient-to-r ${
              activeSection === "loops"
                ? "from-green-100 to-green-200 border-green-300 text-green-800"
                : "from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700"
            }`}
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Loops
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSectionClick("conditionals")}
            className={`bg-gradient-to-r ${
              activeSection === "conditionals"
                ? "from-amber-100 to-amber-200 border-amber-300 text-amber-800"
                : "from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-amber-200 text-amber-700"
            }`}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Conditionals
          </Button>
        </div>

        {/* Conditional Rendering of Sections */}
        {activeSection === "variables" && <VariableSection />}
        {activeSection === "datatypes" && <DatatypeSection />}
        {activeSection === "functions" && <FunctionSection />}
        {activeSection === "loops" && <LoopSection />}
        {activeSection === "conditionals" && <ConditionalSection />}

        {/* Quiz Button */}
        {!activeSection && (
          <Button
            onClick={() => handleSectionClick("quiz")}
            className="mt-8 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white"
          >
            Take the Quiz
          </Button>
        )}

        {/* Quiz Section */}
        {activeSection === "quiz" && <QuizSection />}
      </motion.div>
    </div>
  )
}

