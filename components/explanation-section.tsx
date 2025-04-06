"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, BarChart2, PieChart, TrendingUp, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ExplanationSection() {
  const [isOpen, setIsOpen] = useState(false)

  // Sample CSV data for download
  const sampleCsvData = `Name,Age,Height,Weight,Gender,Department
John,28,175,70,Male,Engineering
Sarah,34,162,55,Female,Marketing
Mike,45,180,85,Male,Finance
Lisa,29,168,60,Female,HR
David,38,182,78,Male,IT
Emma,31,165,58,Female,Sales
Robert,42,178,82,Male,Operations
Jessica,27,170,62,Female,Design`

  const downloadSampleCsv = () => {
    const element = document.createElement("a")
    const file = new Blob([sampleCsvData], { type: "text/csv" })
    element.href = URL.createObjectURL(file)
    element.download = "sample_dataset.csv"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="mb-8">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 mb-4 bg-white"
      >
        {isOpen ? (
          <>
            <ChevronUp className="h-4 w-4" />
            <span>Hide Explanation</span>
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" />
            <span>Show Explanation</span>
          </>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Data Visualization</CardTitle>
                <CardDescription className="text-center">
                  Understanding the importance of visualizing data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="types">Visualization Types</TabsTrigger>
                    <TabsTrigger value="usage">How to Use</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                        <BarChart2 className="h-12 w-12 text-blue-500 mb-2" />
                        <h3 className="text-lg font-medium mb-2">What is Data Visualization?</h3>
                        <p className="text-sm text-gray-600">
                          Data visualization is the graphical representation of information and data. By using visual
                          elements like charts, graphs, and maps, data visualization tools provide an accessible way to
                          see and understand trends, outliers, and patterns in data.
                        </p>
                      </div>

                      <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg">
                        <PieChart className="h-12 w-12 text-purple-500 mb-2" />
                        <h3 className="text-lg font-medium mb-2">Why Visualize Data?</h3>
                        <p className="text-sm text-gray-600">
                          The human brain processes visual information more efficiently than text. Visualizations help
                          us comprehend large amounts of complex data quickly, identify patterns, spot trends, and
                          communicate insights effectively to others.
                        </p>
                      </div>

                      <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="h-12 w-12 text-green-500 mb-2" />
                        <h3 className="text-lg font-medium mb-2">Benefits</h3>
                        <p className="text-sm text-gray-600">
                          Effective data visualization helps in better decision making, simplifies complex data,
                          identifies areas that need attention, clarifies which factors influence behavior, and helps
                          tell stories by curating data into a form easier to understand.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="types" className="mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4 text-center">Types of Data Visualizations</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white p-3 rounded shadow-sm">
                          <strong>Bar Charts:</strong> Compare quantities across categories
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <strong>Line Charts:</strong> Show trends over time
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <strong>Scatter Plots:</strong> Show relationship between variables
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <strong>Pie Charts:</strong> Show composition and proportion
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <strong>Heatmaps:</strong> Show intensity of values with color
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <strong>3D Visualizations:</strong> Represent multi-dimensional data
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="mt-4">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">How to Use This Tool</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>
                            <strong>Explore Example Visualizations:</strong> Start by exploring the example datasets and
                            visualization types to understand the capabilities.
                          </li>
                          <li>
                            <strong>Prepare Your Data:</strong> Create a CSV file with your data. The first row should
                            contain column names.
                          </li>
                          <li>
                            <strong>Upload Your Data:</strong> Click on the "Your Data" tab and upload your CSV file.
                          </li>
                          <li>
                            <strong>Select Columns:</strong> Choose which columns to use for X and Y axes.
                          </li>
                          <li>
                            <strong>Choose Visualization Type:</strong> Select the type of chart that best represents
                            your data.
                          </li>
                          <li>
                            <strong>Visualize:</strong> Click the "Visualize Data" button to generate your chart.
                          </li>
                        </ol>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium">CSV File Format</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={downloadSampleCsv}
                          >
                            <Download className="h-4 w-4" />
                            Download Sample CSV
                          </Button>
                        </div>
                        <div className="mb-3 text-sm">
                          <p>Your CSV file should have:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>A header row with column names</li>
                            <li>Data rows with values separated by commas</li>
                            <li>Numeric columns for quantitative data</li>
                            <li>Text columns for categorical data</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded border text-xs font-mono overflow-x-auto">
                          <pre>{`Name,Age,Height,Weight,Gender,Department
John,28,175,70,Male,Engineering
Sarah,34,162,55,Female,Marketing
...`}</pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

