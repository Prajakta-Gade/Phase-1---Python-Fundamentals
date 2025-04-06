"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, ScatterChart, Grid3X3, Layers, ChevronRight } from "lucide-react"
import { BarChart as BarChartComponent } from "./charts/bar-chart"
import { LineChart as LineChartComponent } from "./charts/line-chart"
import { ScatterPlot } from "./charts/scatter-plot"
import { HeatmapChart } from "./charts/heatmap-chart"
import { ThreeDVisualization } from "./three-d-visualization"

interface ExampleVisualizationsProps {
  onContinue: () => void
}

export function ExampleVisualizations({ onContinue }: ExampleVisualizationsProps) {
  const [dataset, setDataset] = useState("iris")
  const [chartType, setChartType] = useState("bar")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-blue-500" />
            Visualization Controls
          </CardTitle>
          <CardDescription>Select dataset and visualization type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Dataset</label>
            <Select value={dataset} onValueChange={setDataset}>
              <SelectTrigger>
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iris">Iris Dataset</SelectItem>
                <SelectItem value="titanic">Titanic Dataset</SelectItem>
                <SelectItem value="diamonds">Diamonds Dataset</SelectItem>
                <SelectItem value="planets">Planets Dataset</SelectItem>
                <SelectItem value="tips">Tips Dataset</SelectItem>
                <SelectItem value="flights">Flights Dataset</SelectItem>
                <SelectItem value="cifar10">CIFAR-10 Dataset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Visualization Type</label>
            <Tabs defaultValue="bar" value={chartType} onValueChange={setChartType}>
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="bar">
                  <BarChart className="w-4 h-4 mr-1" />
                  Bar
                </TabsTrigger>
                <TabsTrigger value="line">
                  <LineChart className="w-4 h-4 mr-1" />
                  Line
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="scatter">
                  <ScatterChart className="w-4 h-4 mr-1" />
                  Scatter
                </TabsTrigger>
                <TabsTrigger value="heatmap">
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Heatmap
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-1">
                <TabsTrigger value="3d">
                  <Layers className="w-4 h-4 mr-1" />
                  3D Visualization
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="pt-4">
            <Button onClick={onContinue} className="w-full group">
              Continue to Your Data
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl">
            {dataset.charAt(0).toUpperCase() + dataset.slice(1)} Dataset Visualization
          </CardTitle>
          <CardDescription>
            {chartType === "bar" && "Bar chart showing distribution of data"}
            {chartType === "line" && "Line chart showing trends in data"}
            {chartType === "scatter" && "Scatter plot showing relationships between variables"}
            {chartType === "heatmap" && "Heatmap showing correlation between variables"}
            {chartType === "3d" && "3D visualization of multi-dimensional data"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] p-2">
          <div className="w-full h-full border border-gray-100 rounded-md overflow-hidden">
            {chartType === "bar" && <BarChartComponent dataset={dataset} />}
            {chartType === "line" && <LineChartComponent dataset={dataset} />}
            {chartType === "scatter" && <ScatterPlot dataset={dataset} />}
            {chartType === "heatmap" && <HeatmapChart dataset={dataset} />}
            {chartType === "3d" && <ThreeDVisualization dataset={dataset} />}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-gray-500 border-t pt-4">
          <div className="w-full">
            <p className="mb-1">
              <strong>X-Axis:</strong> {getAxisLabel(dataset, chartType, "x")}
            </p>
            <p>
              <strong>Y-Axis:</strong> {getAxisLabel(dataset, chartType, "y")}
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function getAxisLabel(dataset: string, chartType: string, axis: "x" | "y") {
  // Define default labels
  const defaultLabel = "Value"

  // Define all possible labels
  const allLabels = {
    iris: { x: "Sepal Length", y: "Sepal Width" },
    titanic: { x: "Passenger Class", y: "Survival Rate" },
    diamonds: { x: "Carat", y: "Price" },
    planets: { x: "Orbital Period", y: "Mass" },
    tips: { x: "Total Bill", y: "Tip Amount" },
    flights: { x: "Month", y: "Passengers" },
    cifar10: { x: "Category", y: "Count" },
  }

  // Safely access the label
  try {
    // Check if dataset exists in our labels object
    if (dataset && allLabels.hasOwnProperty(dataset)) {
      const datasetLabels = allLabels[dataset as keyof typeof allLabels]
      // Check if the axis exists in our dataset labels
      if (axis && datasetLabels && datasetLabels.hasOwnProperty(axis)) {
        return datasetLabels[axis]
      }
    }
    return defaultLabel
  } catch (error) {
    return defaultLabel
  }
}

