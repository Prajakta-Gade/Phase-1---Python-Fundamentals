"use client"

import { useEffect, useState } from "react"
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { getDataForDataset } from "@/lib/data-utils"

interface ScatterPlotProps {
  dataset: string
  xColumn?: string
  yColumn?: string
}

export function ScatterPlot({ dataset, xColumn, yColumn }: ScatterPlotProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setLoading(true)
    setTimeout(() => {
      const fetchedData = getDataForDataset(dataset, "scatter", xColumn, yColumn)
      setData(Array.isArray(fetchedData) ? fetchedData : [])
      setLoading(false)
    }, 800)
  }, [dataset, xColumn, yColumn])

  // Create filtered datasets safely
  const group1Data = data.filter((item) => item && item.group === "group1")
  const group2Data = data.filter((item) => item && item.group === "group2")
  const group3Data = data.filter((item) => item && item.group === "group3")

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ChartContainer
          config={{
            group1: {
              label: "Group 1",
              color: "hsl(var(--chart-1))",
            },
            group2: {
              label: "Group 2",
              color: "hsl(var(--chart-2))",
            },
            group3: {
              label: "Group 3",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatterChart margin={{ top: 20, right: 30, left: 50, bottom: 120 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="x"
                type="number"
                name="x"
                label={{
                  value: xColumn || "X Value",
                  position: "insideBottom",
                  offset: -5,
                  dy: 10,
                }}
                tick={{ fontSize: 10 }}
                tickMargin={10}
              />
              <YAxis
                dataKey="y"
                type="number"
                name="y"
                label={{
                  value: yColumn || "Y Value",
                  angle: -90,
                  position: "left",
                  dx: -30,
                }}
                tick={{ fontSize: 10 }}
                tickMargin={10}
              />
              <ZAxis dataKey="z" range={[60, 400]} name="z" />
              <Tooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} animationDuration={300} />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                height={80}
                margin={{ top: 40 }}
              />
              <Scatter
                name="Group 1"
                data={group1Data}
                fill="var(--color-group1)"
                fillOpacity={0.8}
                stroke="var(--color-group1)"
                strokeWidth={1}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Scatter
                name="Group 2"
                data={group2Data}
                fill="var(--color-group2)"
                fillOpacity={0.8}
                stroke="var(--color-group2)"
                strokeWidth={1}
                animationDuration={1500}
                animationDelay={300}
                animationEasing="ease-in-out"
              />
              <Scatter
                name="Group 3"
                data={group3Data}
                fill="var(--color-group3)"
                fillOpacity={0.8}
                stroke="var(--color-group3)"
                strokeWidth={1}
                animationDuration={1500}
                animationDelay={600}
                animationEasing="ease-in-out"
              />
            </RechartsScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  )
}

