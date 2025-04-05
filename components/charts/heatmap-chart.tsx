"use client"

import { useEffect, useState } from "react"
import { ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { getDataForDataset } from "@/lib/data-utils"
import { motion } from "framer-motion"

interface HeatmapChartProps {
  dataset: string
  xColumn?: string
  yColumn?: string
}

export function HeatmapChart({ dataset, xColumn, yColumn }: HeatmapChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setLoading(true)
    setTimeout(() => {
      try {
        const fetchedData = getDataForDataset(dataset, "heatmap", xColumn, yColumn)
        setData(Array.isArray(fetchedData) ? fetchedData : [])
      } catch (error) {
        console.error("Error fetching heatmap data:", error)
        setData([])
      } finally {
        setLoading(false)
      }
    }, 800)
  }, [dataset, xColumn, yColumn])

  // Create a safe array of cells for rendering
  const safeCells = Array.isArray(data)
    ? data.filter(
        (cell) => cell && typeof cell.x === "number" && typeof cell.y === "number" && typeof cell.value === "number",
      )
    : []

  // Create arrays for X and Y axis labels
  const xLabels = Array.from({ length: 10 }, (_, i) => i)
  const yLabels = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ChartContainer
          config={{
            heatmap: {
              label: "Heatmap",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <div className="w-full h-full flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="heatmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 1)" />
                  </linearGradient>
                </defs>
                <g transform="translate(70, 40)">
                  {/* Render cells */}
                  {safeCells.map((cell, index) => (
                    <motion.g
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.01,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <rect
                        x={cell.x * 36}
                        y={cell.y * 36}
                        width={34}
                        height={34}
                        fill={`rgba(59, 130, 246, ${cell.value})`}
                        rx={4}
                        ry={4}
                        className="transition-all duration-300 hover:stroke-white hover:stroke-2"
                      >
                        <title>{`Value: ${(cell.value * 100).toFixed(0)}%`}</title>
                      </rect>
                      <text
                        x={cell.x * 36 + 17}
                        y={cell.y * 36 + 20}
                        textAnchor="middle"
                        fill={cell.value > 0.5 ? "white" : "black"}
                        fontSize={9}
                        fontWeight={cell.value > 0.7 ? "bold" : "normal"}
                      >
                        {(cell.value * 100).toFixed(0)}%
                      </text>
                    </motion.g>
                  ))}

                  {/* X-axis labels */}
                  {xLabels.map((i) => (
                    <text
                      key={`x-${i}`}
                      x={i * 36 + 17}
                      y={320}
                      textAnchor="middle"
                      fontSize={8}
                      fill="#666"
                      transform={`rotate(-45, ${i * 36 + 17}, 320)`}
                    >
                      {xColumn ? `${xColumn} ${i + 1}` : `X${i + 1}`}
                    </text>
                  ))}

                  {/* Y-axis labels */}
                  {yLabels.map((i) => (
                    <text key={`y-${i}`} x={-10} y={i * 36 + 20} textAnchor="end" fontSize={9} fill="#666">
                      {yColumn ? `${yColumn} ${i + 1}` : `Y${i + 1}`}
                    </text>
                  ))}

                  {/* X-axis title */}
                  <text x={180} y={360} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#666">
                    {xColumn || "X Values"}
                  </text>

                  {/* Y-axis title */}
                  <text
                    x={-40}
                    y={150}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight="bold"
                    fill="#666"
                    transform="rotate(-90, -40, 150)"
                  >
                    {yColumn || "Y Values"}
                  </text>
                </g>
              </svg>
            </div>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  )
}

