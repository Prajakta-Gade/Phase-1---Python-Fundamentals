"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { getDataForDataset } from "@/lib/data-utils"

interface BarChartProps {
  dataset: string
  xColumn?: string
  yColumn?: string
}

export function BarChart({ dataset, xColumn, yColumn }: BarChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setLoading(true)
    setTimeout(() => {
      const fetchedData = getDataForDataset(dataset, "bar", xColumn, yColumn)
      setData(Array.isArray(fetchedData) ? fetchedData : [])
      setLoading(false)
    }, 800)
  }, [dataset, xColumn, yColumn])

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ChartContainer
          config={{
            value: {
              label: yColumn || "Value",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 120 }} barCategoryGap={10}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 9 }}
                height={90}
                interval={0}
                tickMargin={15}
                label={{
                  value: xColumn || "Category",
                  position: "insideBottom",
                  offset: -5,
                  dy: 10,
                }}
              />
              <YAxis
                label={{
                  value: yColumn || "Value",
                  angle: -90,
                  position: "insideLeft",
                  dx: -15,
                }}
                tick={{ fontSize: 10 }}
                tickMargin={5}
              />
              <Tooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                animationDuration={300}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                verticalAlign="bottom"
                height={60}
                layout="horizontal"
                align="center"
                margin={{ top: 40 }}
              />
              <Bar
                name={yColumn || "Value"}
                dataKey="value"
                fill="hsl(var(--chart-1))"
                animationDuration={1500}
                animationEasing="ease-in-out"
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  )
}

