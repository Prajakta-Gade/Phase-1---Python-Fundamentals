"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, ScatterChart, Grid3X3, Layers, Upload, FileText, AlertCircle, FileUp } from "lucide-react"
import { BarChart as BarChartComponent } from "./charts/bar-chart"
import { LineChart as LineChartComponent } from "./charts/line-chart"
import { ScatterPlot } from "./charts/scatter-plot"
import { HeatmapChart } from "./charts/heatmap-chart"
import { ThreeDVisualization } from "./three-d-visualization"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock function to parse CSV data
const parseCSV = (content: string) => {
  const lines = content.trim().split("\n")
  const headers = lines[0].split(",").map((header) => header.trim())

  const rows = lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim())
    return headers.reduce(
      (obj, header, index) => {
        obj[header] = values[index]
        return obj
      },
      {} as Record<string, string>,
    )
  })

  return { headers, rows }
}

// Function to determine if a column is numeric
const isNumericColumn = (rows: Record<string, string>[], columnName: string): boolean => {
  // Check if at least 80% of values can be converted to numbers
  const totalRows = rows.length
  if (totalRows === 0) return false

  const numericCount = rows.filter((row) => {
    const value = row[columnName]
    return value !== undefined && !isNaN(Number(value))
  }).length

  return numericCount / totalRows >= 0.8
}

interface CustomVisualizationsProps {
  existingFile?: File | null
  existingData?: any
  onDataUploaded?: (file: File, data: any) => void
}

export function CustomVisualizations({ existingFile, existingData, onDataUploaded }: CustomVisualizationsProps) {
  const [chartType, setChartType] = useState("bar")
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [numericColumns, setNumericColumns] = useState<string[]>([])
  const [categoricalColumns, setCategoricalColumns] = useState<string[]>([])
  const [xAxis, setXAxis] = useState("")
  const [yAxis, setYAxis] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isVisualized, setIsVisualized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize with existing data if available
  useEffect(() => {
    if (existingFile && existingData) {
      setFile(existingFile)
      setFileContent(existingData.content)
      setColumns(existingData.columns || [])
      setNumericColumns(existingData.numericColumns || [])
      setCategoricalColumns(existingData.categoricalColumns || [])
      setXAxis(existingData.xAxis || "")
      setYAxis(existingData.yAxis || "")
      setIsVisualized(existingData.isVisualized || false)
    }
  }, [existingFile, existingData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setColumns([])
    setNumericColumns([])
    setCategoricalColumns([])
    setXAxis("")
    setYAxis("")
    setIsVisualized(false)

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Read file content
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          if (event.target && typeof event.target.result === "string") {
            const content = event.target.result
            setFileContent(content)

            // Parse CSV to extract columns
            const { headers, rows } = parseCSV(content)
            setColumns(headers)

            // Determine column types
            const numeric: string[] = []
            const categorical: string[] = []

            headers.forEach((column) => {
              if (isNumericColumn(rows, column)) {
                numeric.push(column)
              } else {
                categorical.push(column)
              }
            })

            setNumericColumns(numeric)
            setCategoricalColumns(categorical)

            // Set default axes if possible
            if (categorical.length > 0) {
              setXAxis(categorical[0])
            } else if (numeric.length > 0) {
              setXAxis(numeric[0])
            }

            if (numeric.length > 0) {
              setYAxis(numeric[0])
            }

            // Save the uploaded data to parent component
            if (onDataUploaded) {
              onDataUploaded(selectedFile, {
                content,
                columns: headers,
                numericColumns: numeric,
                categoricalColumns: categorical,
                xAxis: categorical.length > 0 ? categorical[0] : numeric.length > 0 ? numeric[0] : "",
                yAxis: numeric.length > 0 ? numeric[0] : "",
                isVisualized: false,
              })
            }
          }
        } catch (err) {
          setError("Failed to parse file. Please ensure it's a valid CSV format.")
          console.error("File parsing error:", err)
        }
      }

      reader.onerror = () => {
        setError("Failed to read file. Please try again.")
      }

      reader.readAsText(selectedFile)
    }
  }

  const handleVisualize = () => {
    if (!xAxis || !yAxis) {
      setError("Please select both X and Y axes for visualization.")
      return
    }

    setError(null)
    setIsProcessing(true)

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false)
      setIsVisualized(true)

      // Update parent component with visualization state
      if (file && onDataUploaded) {
        onDataUploaded(file, {
          content: fileContent,
          columns,
          numericColumns,
          categoricalColumns,
          xAxis,
          yAxis,
          isVisualized: true,
        })
      }
    }, 1000)
  }

  // Function to handle file selection via dialog
  const openFileSelector = () => {
    // Create a temporary input element
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xls,.xlsx"
    input.multiple = false

    // Add event listener for file selection
    input.onchange = (e) => {
      if (e.target && (e.target as HTMLInputElement).files) {
        const files = (e.target as HTMLInputElement).files
        if (files && files.length > 0) {
          // Convert Excel to CSV if needed
          const selectedFile = files[0]
          if (selectedFile.name.endsWith(".csv")) {
            // Handle CSV directly
            handleFileChange({ target: { files } } as React.ChangeEvent<HTMLInputElement>)
          } else {
            // For demo purposes, we'll just show an error for Excel files
            // In a real app, you would use a library like SheetJS to convert Excel to CSV
            setError("Excel files are supported but conversion is not implemented in this demo. Please use CSV files.")
          }
        }
      }
    }

    // Trigger click event to open file dialog
    input.click()
  }

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants}>
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-500" />
              Your Data
            </CardTitle>
            <CardDescription>Upload your dataset and customize visualization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Dataset</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <div className="flex flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openFileSelector}
                    className="w-full group transition-all duration-300 hover:bg-blue-50"
                  >
                    <FileUp className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
                    Browse for CSV or Excel File
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileChange}
                    className="hidden"
                    onClick={(e) => {
                      // Reset the value to ensure onChange fires even if selecting the same file
                      ;(e.target as HTMLInputElement).value = ""
                    }}
                  />
                  {file ? (
                    <p className="text-sm text-green-600 flex items-center mt-2">
                      <FileText className="w-3 h-3 mr-1" />
                      {file.name} uploaded successfully
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">Supported formats: CSV (.csv), Excel (.xls, .xlsx)</p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {columns.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="x-axis">X-Axis Column</Label>
                  <Select value={xAxis} onValueChange={setXAxis}>
                    <SelectTrigger id="x-axis">
                      <SelectValue placeholder="Select X-Axis column" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoricalColumns.length > 0 && (
                        <>
                          <SelectItem value="__category_header__" disabled className="font-semibold">
                            Categorical Columns
                          </SelectItem>
                          {categoricalColumns.map((column) => (
                            <SelectItem key={`cat-${column}`} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </>
                      )}
                      {numericColumns.length > 0 && (
                        <>
                          <SelectItem value="__numeric_header__" disabled className="font-semibold">
                            Numeric Columns
                          </SelectItem>
                          {numericColumns.map((column) => (
                            <SelectItem key={`num-${column}`} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="y-axis">Y-Axis Column</Label>
                  <Select value={yAxis} onValueChange={setYAxis}>
                    <SelectTrigger id="y-axis">
                      <SelectValue placeholder="Select Y-Axis column" />
                    </SelectTrigger>
                    <SelectContent>
                      {numericColumns.length > 0 && (
                        <>
                          <SelectItem value="__numeric_header__" disabled className="font-semibold">
                            Numeric Columns (Recommended)
                          </SelectItem>
                          {numericColumns.map((column) => (
                            <SelectItem key={`num-${column}`} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </>
                      )}
                      {categoricalColumns.length > 0 && (
                        <>
                          <SelectItem value="__category_header__" disabled className="font-semibold">
                            Categorical Columns
                          </SelectItem>
                          {categoricalColumns.map((column) => (
                            <SelectItem key={`cat-${column}`} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

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
              <Button
                onClick={handleVisualize}
                className="w-full transition-all duration-300 hover:shadow-md"
                disabled={!file || isProcessing || !xAxis || !yAxis}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Visualize Data"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {isVisualized ? "Your Data Visualization" : "Visualization Preview"}
            </CardTitle>
            <CardDescription>
              {!isVisualized && 'Upload your data and click "Visualize Data" to see results'}
              {isVisualized && `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart of your data`}
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[500px] p-2">
            <div className="w-full h-full border border-gray-100 rounded-md overflow-hidden">
              {!isVisualized ? (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-gray-500 flex flex-col items-center justify-center h-full"
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Upload your dataset to visualize</p>
                  <p className="text-sm mt-2">Supported formats: CSV, Excel</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Sample CSV Format:</h3>
                    <pre className="text-xs bg-white p-2 rounded border border-blue-200 overflow-x-auto">
                      {`Name,Age,Height,Weight
John,28,175,70
Sarah,34,162,55
Mike,45,180,85
Lisa,29,168,60`}
                    </pre>
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto mt-2 text-blue-600"
                      onClick={() => {
                        const sampleCsv = `Name,Age,Height,Weight
John,28,175,70
Sarah,34,162,55
Mike,45,180,85
Lisa,29,168,60`

                        const element = document.createElement("a")
                        const file = new Blob([sampleCsv], { type: "text/csv" })
                        element.href = URL.createObjectURL(file)
                        element.download = "sample_data.csv"
                        document.body.appendChild(element)
                        element.click()
                        document.body.removeChild(element)
                      }}
                    >
                      Download Sample CSV
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full"
                >
                  {chartType === "bar" && <BarChartComponent dataset="custom" xColumn={xAxis} yColumn={yAxis} />}
                  {chartType === "line" && <LineChartComponent dataset="custom" xColumn={xAxis} yColumn={yAxis} />}
                  {chartType === "scatter" && <ScatterPlot dataset="custom" xColumn={xAxis} yColumn={yAxis} />}
                  {chartType === "heatmap" && <HeatmapChart dataset="custom" xColumn={xAxis} yColumn={yAxis} />}
                  {chartType === "3d" && <ThreeDVisualization dataset="custom" xColumn={xAxis} yColumn={yAxis} />}
                </motion.div>
              )}
            </div>
          </CardContent>
          {isVisualized && (
            <CardFooter className="text-sm text-gray-500 border-t pt-4">
              <div className="w-full">
                <p className="mb-1">
                  <strong>X-Axis:</strong> {xAxis}
                  {categoricalColumns.includes(xAxis) && " (Categorical)"}
                  {numericColumns.includes(xAxis) && " (Numeric)"}
                </p>
                <p>
                  <strong>Y-Axis:</strong> {yAxis}
                  {categoricalColumns.includes(yAxis) && " (Categorical)"}
                  {numericColumns.includes(yAxis) && " (Numeric)"}
                </p>
              </div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}

