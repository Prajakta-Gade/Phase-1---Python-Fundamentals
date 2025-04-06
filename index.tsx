"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Info, Upload, BarChart, Trash2 } from "lucide-react"
import { ExampleVisualizations } from "./components/example-visualizations"
import { CustomVisualizations } from "./components/custom-visualizations"
import { InfoSection } from "./components/info-section"
import { ExplanationSection } from "./components/explanation-section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DataVisualizationDashboard() {
  const [activeTab, setActiveTab] = useState("examples")
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadedData, setUploadedData] = useState<any>(null)
  const [showClearDataAlert, setShowClearDataAlert] = useState(false)

  // Function to handle file upload from CustomVisualizations
  const handleDataUploaded = (file: File, data: any) => {
    setUploadedFile(file)
    setUploadedData(data)
  }

  // Function to clear uploaded data
  const clearUploadedData = () => {
    setUploadedFile(null)
    setUploadedData(null)
    setShowClearDataAlert(false)
  }

  // Enhanced tab transition animation
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 1.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  }

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  }

  // Header animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  }

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl w-full border border-gray-200 rounded-xl bg-white p-6 shadow-md"
      >
        <motion.header variants={headerVariants} className="text-center mb-8">
          <motion.h1
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Interactive Data Visualization
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-600 mt-2 text-lg"
          >
            Explore, analyze, and visualize data with Python visualization libraries
          </motion.p>
        </motion.header>

        <ExplanationSection />

        <Tabs defaultValue="examples" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="examples" className="text-sm md:text-base transition-all duration-300">
                <BarChart className="w-4 h-4 mr-2" />
                Example Visualizations
              </TabsTrigger>
              <TabsTrigger value="custom" className="text-sm md:text-base transition-all duration-300">
                <Upload className="w-4 h-4 mr-2" />
                Your Data
                {uploadedFile && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="ml-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full"
                  >
                    1 File
                  </motion.span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Show clear data button if data is uploaded */}
          <AnimatePresence>
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-end mb-4"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                  onClick={() => setShowClearDataAlert(true)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear Uploaded Data
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clear data confirmation alert */}
          <AnimatePresence>
            {showClearDataAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Alert variant="destructive">
                  <AlertTitle>Are you sure you want to clear your uploaded data?</AlertTitle>
                  <AlertDescription>
                    This will remove the file "{uploadedFile?.name}" and all associated visualizations.
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={clearUploadedData}
                        className="transition-all duration-300 hover:bg-red-700"
                      >
                        Yes, Clear Data
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowClearDataAlert(false)}
                        className="transition-all duration-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial="hidden" animate="visible" exit="exit" variants={tabVariants}>
              <TabsContent value="examples" className="mt-0">
                <ExampleVisualizations onContinue={() => setActiveTab("custom")} />
              </TabsContent>

              <TabsContent value="custom" className="mt-0">
                <CustomVisualizations
                  existingFile={uploadedFile}
                  existingData={uploadedData}
                  onDataUploaded={handleDataUploaded}
                />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Button
            variant="outline"
            onClick={() => setShowInfoModal(true)}
            className="group transition-all duration-300 hover:bg-blue-50 hover:shadow-md"
          >
            <Info className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
            <span>Learn about Python Visualization Libraries</span>
          </Button>
        </motion.div>

        {showInfoModal && <InfoSection onClose={() => setShowInfoModal(false)} />}
      </motion.div>
    </div>
  )
}

