"use client"

import { motion } from "framer-motion"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface InfoSectionProps {
  onClose: () => void
}

export function InfoSection({ onClose }: InfoSectionProps) {
  // Matplotlib example code
  const matplotlibCode = `import matplotlib.pyplot as plt
import numpy as np

# Create data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(8, 4))
plt.plot(x, y, 'b-', linewidth=2)
plt.title('Sine Wave')
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.grid(True)
plt.show()`

  // Seaborn example code
  const seabornCode = `import seaborn as sns
import matplotlib.pyplot as plt

# Load a built-in dataset
tips = sns.load_dataset("tips")

# Create a visualization
plt.figure(figsize=(10, 6))
sns.scatterplot(
  data=tips,
  x="total_bill",
  y="tip",
  hue="time",
  size="size",
  palette="viridis"
)
plt.title("Tips based on Total Bill")
plt.show()`

  // Function to download code as a Python file
  const downloadCode = (code: string, filename: string) => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="overflow-hidden flex flex-col max-h-full">
          <CardHeader className="relative sticky top-0 z-10 bg-white border-b">
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Python Data Visualization Libraries</CardTitle>
            <CardDescription>Learn about the powerful libraries used for data visualization in Python</CardDescription>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-grow">
            <Tabs defaultValue="matplotlib">
              <div className="relative">
                <TabsList className="grid w-full grid-cols-2 sticky top-0 z-10 bg-white">
                  <TabsTrigger value="matplotlib" className="relative">
                    Matplotlib
                  </TabsTrigger>
                  <TabsTrigger value="seaborn" className="relative">
                    Seaborn
                  </TabsTrigger>
                </TabsList>
                <Separator
                  className="absolute top-1/2 left-1/2 h-[60%] -translate-y-1/2 bg-gray-300"
                  orientation="vertical"
                />
              </div>
              <TabsContent value="matplotlib" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Matplotlib</h3>
                    <p className="text-gray-600">
                      Matplotlib is a comprehensive library for creating static, animated, and interactive
                      visualizations in Python. It provides an object-oriented API for embedding plots into
                      applications.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Create publication-quality plots</li>
                      <li>Fine-grained control over every element</li>
                      <li>Supports various plot types</li>
                      <li>Customizable styling and themes</li>
                      <li>Export to many file formats</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Common Plot Types</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Line plots</li>
                      <li>Scatter plots</li>
                      <li>Bar charts and histograms</li>
                      <li>Pie charts</li>
                      <li>3D plots</li>
                      <li>Contour plots</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Basic Example</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => downloadCode(matplotlibCode, "matplotlib_example.py")}
                    >
                      <Download className="h-4 w-4" />
                      Download Code
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{matplotlibCode}</pre>
                </div>
              </TabsContent>

              <TabsContent value="seaborn" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-600"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Seaborn</h3>
                    <p className="text-gray-600">
                      Seaborn is a statistical data visualization library based on matplotlib. It provides a high-level
                      interface for drawing attractive and informative statistical graphics.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Built-in themes for attractive plots</li>
                      <li>High-level functions for common visualizations</li>
                      <li>Works with pandas DataFrames</li>
                      <li>Automatic statistical estimation</li>
                      <li>Beautiful color palettes</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Common Plot Types</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Relational plots (scatterplot, lineplot)</li>
                      <li>Categorical plots (barplot, boxplot)</li>
                      <li>Distribution plots (histplot, kdeplot)</li>
                      <li>Regression plots (regplot, lmplot)</li>
                      <li>Matrix plots (heatmap, clustermap)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Basic Example</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => downloadCode(seabornCode, "seaborn_example.py")}
                    >
                      <Download className="h-4 w-4" />
                      Download Code
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{seabornCode}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 sticky bottom-0 bg-white z-10">
            <p className="text-sm text-gray-500">Learn more about data visualization in Python</p>
            <Button onClick={onClose}>Close</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

