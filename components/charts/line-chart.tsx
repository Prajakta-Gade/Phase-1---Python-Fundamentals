"use client"

import { useEffect, useState } from "react"
import { Line, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { getDataForDataset } from "@/lib/data-utils"

interface LineChartProps {
  dataset: string
  xColumn?: string
  yColumn?: string
}

export function LineChart({ dataset, xColumn, yColumn }: LineChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setLoading(true)
    setTimeout(() => {
      const fetchedData = getDataForDataset(dataset, "line", xColumn, yColumn)
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
            trend: {
              label: "Trend",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 120 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
                  dx: -30,
                }}
                tick={{ fontSize: 10 }}
                tickMargin={10}
              />
              <Tooltip content={<ChartTooltipContent />} animationDuration={300} />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                verticalAlign="bottom"
                height={60}
                layout="horizontal"
                align="center"
                margin={{ top: 40 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                fill="url(#colorValue)"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                activeDot={{ r: 8, strokeWidth: 0 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Line
                type="monotone"
                dataKey="trend"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 0 }}
                activeDot={{ r: 8, strokeWidth: 0 }}
                animationDuration={1500}
                animationDelay={300}
                animationEasing="ease-in-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
    </div>
  )
}

