// Mock data generation for different datasets and chart types
export function getDataForDataset(dataset: string, chartType: string, xColumn?: string, yColumn?: string) {
  if (!dataset || !chartType) {
    return [] // Return empty array if dataset or chartType is undefined
  }

  switch (chartType) {
    case "bar":
      return generateBarData(dataset, xColumn, yColumn)
    case "line":
      return generateLineData(dataset, xColumn, yColumn)
    case "scatter":
      return generateScatterData(dataset, xColumn, yColumn)
    case "heatmap":
      return generateHeatmapData(dataset, xColumn, yColumn)
    case "3d":
      return generate3DData(dataset, xColumn, yColumn)
    default:
      return [] // Return empty array for unknown chart types
  }
}

function generateBarData(dataset: string, xColumn?: string, yColumn?: string) {
  if (!dataset) return [] // Safety check

  if (dataset === "iris") {
    return [
      { name: "Setosa", value: 50 },
      { name: "Versicolor", value: 50 },
      { name: "Virginica", value: 50 },
    ]
  } else if (dataset === "titanic") {
    return [
      { name: "Survived", value: 342 },
      { name: "Did not survive", value: 549 },
    ]
  } else if (dataset === "diamonds") {
    return [
      { name: "Fair", value: 1610 },
      { name: "Good", value: 4906 },
      { name: "Very Good", value: 12082 },
      { name: "Premium", value: 13791 },
      { name: "Ideal", value: 21551 },
    ]
  } else if (dataset === "planets") {
    return [
      { name: "Mercury", value: 0.055 },
      { name: "Venus", value: 0.815 },
      { name: "Earth", value: 1.0 },
      { name: "Mars", value: 0.107 },
      { name: "Jupiter", value: 318 },
      { name: "Saturn", value: 95 },
      { name: "Uranus", value: 14 },
      { name: "Neptune", value: 17 },
    ]
  } else if (dataset === "tips") {
    return [
      { name: "Lunch", value: 17.5 },
      { name: "Dinner", value: 19.8 },
    ]
  } else if (dataset === "flights") {
    return [
      { name: "Jan", value: 340 },
      { name: "Feb", value: 318 },
      { name: "Mar", value: 362 },
      { name: "Apr", value: 348 },
      { name: "May", value: 356 },
      { name: "Jun", value: 380 },
      { name: "Jul", value: 412 },
      { name: "Aug", value: 405 },
      { name: "Sep", value: 376 },
      { name: "Oct", value: 359 },
      { name: "Nov", value: 336 },
      { name: "Dec", value: 348 },
    ]
  } else if (dataset === "cifar10") {
    return [
      { name: "Airplane", value: 1000 },
      { name: "Automobile", value: 1000 },
      { name: "Bird", value: 1000 },
      { name: "Cat", value: 1000 },
      { name: "Deer", value: 1000 },
      { name: "Dog", value: 1000 },
      { name: "Frog", value: 1000 },
      { name: "Horse", value: 1000 },
      { name: "Ship", value: 1000 },
      { name: "Truck", value: 1000 },
    ]
  } else {
    // Custom dataset (mock data)
    // If we have column names, use them in the mock data
    if (xColumn && yColumn) {
      return [
        { name: `${xColumn} A`, value: Math.floor(Math.random() * 100) + 20 },
        { name: `${xColumn} B`, value: Math.floor(Math.random() * 100) + 20 },
        { name: `${xColumn} C`, value: Math.floor(Math.random() * 100) + 20 },
        { name: `${xColumn} D`, value: Math.floor(Math.random() * 100) + 20 },
        { name: `${xColumn} E`, value: Math.floor(Math.random() * 100) + 20 },
      ]
    } else {
      return [
        { name: "Category A", value: Math.floor(Math.random() * 100) + 20 },
        { name: "Category B", value: Math.floor(Math.random() * 100) + 20 },
        { name: "Category C", value: Math.floor(Math.random() * 100) + 20 },
        { name: "Category D", value: Math.floor(Math.random() * 100) + 20 },
        { name: "Category E", value: Math.floor(Math.random() * 100) + 20 },
      ]
    }
  }
}

function generateLineData(dataset: string, xColumn?: string, yColumn?: string) {
  if (!dataset) return [] // Safety check

  if (dataset === "iris") {
    return Array.from({ length: 10 }, (_, i) => ({
      name: `Sample ${i + 1}`,
      value: 4 + Math.random() * 3,
      trend: 4.5 + i * 0.2,
    }))
  } else if (dataset === "titanic") {
    return Array.from({ length: 8 }, (_, i) => ({
      name: `Class ${i + 1}`,
      value: 20 + Math.random() * 60,
      trend: 50 - i * 5,
    }))
  } else if (dataset === "flights") {
    return [
      { name: "Jan", value: 340, trend: 340 },
      { name: "Feb", value: 318, trend: 330 },
      { name: "Mar", value: 362, trend: 350 },
      { name: "Apr", value: 348, trend: 360 },
      { name: "May", value: 356, trend: 370 },
      { name: "Jun", value: 380, trend: 380 },
      { name: "Jul", value: 412, trend: 390 },
      { name: "Aug", value: 405, trend: 400 },
      { name: "Sep", value: 376, trend: 385 },
      { name: "Oct", value: 359, trend: 370 },
      { name: "Nov", value: 336, trend: 355 },
      { name: "Dec", value: 348, trend: 350 },
    ]
  } else {
    // Custom or other datasets
    // If we have column names, use them in the mock data
    if (xColumn && yColumn) {
      return Array.from({ length: 12 }, (_, i) => ({
        name: `${xColumn} ${i + 1}`,
        value: 20 + Math.random() * 80,
        trend: 30 + i * 5,
      }))
    } else {
      return Array.from({ length: 12 }, (_, i) => ({
        name: `Point ${i + 1}`,
        value: 20 + Math.random() * 80,
        trend: 30 + i * 5,
      }))
    }
  }
}

function generateScatterData(dataset: string, xColumn?: string, yColumn?: string) {
  if (!dataset) return [] // Safety check

  const groups = ["group1", "group2", "group3"]

  if (dataset === "iris") {
    return Array.from({ length: 50 }, (_, i) => ({
      x: 4 + Math.random() * 3,
      y: 2 + Math.random() * 2,
      z: Math.random() * 100 + 50,
      group: groups[Math.floor(i / 17)],
    }))
  } else if (dataset === "diamonds") {
    return Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 5,
      y: 1000 + Math.random() * 10000,
      z: Math.random() * 100 + 50,
      group: groups[Math.floor(i / 17)],
    }))
  } else {
    // Custom or other datasets
    // If we have column names, use them in the mock data
    if (xColumn && yColumn) {
      return Array.from({ length: 50 }, (_, i) => ({
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 100 + 50,
        group: groups[Math.floor(i / 17)],
        xLabel: xColumn,
        yLabel: yColumn,
      }))
    } else {
      return Array.from({ length: 50 }, (_, i) => ({
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 100 + 50,
        group: groups[Math.floor(i / 17)],
      }))
    }
  }
}

function generateHeatmapData(dataset: string, xColumn?: string, yColumn?: string) {
  if (!dataset) return [] // Safety check

  // Generate a 10x8 heatmap grid
  const data = []
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 10; x++) {
      let value

      if (dataset === "iris") {
        // Create a pattern for iris dataset
        value = 0.2 + 0.6 * Math.sin(x * 0.5) * Math.cos(y * 0.5)
      } else if (dataset === "titanic") {
        // Create a different pattern for titanic dataset
        value = 0.1 + 0.8 * (x / 10) * (1 - y / 8)
      } else {
        // Random values for other datasets
        value = Math.random()
      }

      data.push({
        x,
        y,
        value,
        xLabel: xColumn ? `${xColumn} ${x + 1}` : `X${x + 1}`,
        yLabel: yColumn ? `${yColumn} ${y + 1}` : `Y${y + 1}`,
      })
    }
  }

  return data
}

function generate3DData(dataset: string, xColumn?: string, yColumn?: string) {
  if (!dataset) return [] // Safety check

  const groups = ["group1", "group2", "group3"]

  if (dataset === "iris") {
    // Create clusters for iris dataset
    return Array.from({ length: 30 }, (_, i) => {
      const group = groups[Math.floor(i / 10)]
      let x, y, z

      if (group === "group1") {
        x = -2 + Math.random()
        y = -2 + Math.random()
        z = -2 + Math.random()
      } else if (group === "group2") {
        x = 1 + Math.random()
        y = 1 + Math.random()
        z = 1 + Math.random()
      } else {
        x = -1 + Math.random()
        y = 2 + Math.random()
        z = -1 + Math.random()
      }

      return { x, y, z, group }
    })
  } else if (dataset === "cifar10") {
    // Create a spiral pattern for CIFAR-10
    return Array.from({ length: 30 }, (_, i) => {
      const t = i / 3
      const group = groups[i % 3]

      return {
        x: Math.sin(t) * (t / 5),
        y: Math.cos(t) * (t / 5),
        z: t / 5,
        group,
      }
    })
  } else {
    // Random 3D points for other datasets
    // If we have column names, use them in the mock data
    if (xColumn && yColumn) {
      return Array.from({ length: 30 }, (_, i) => ({
        x: -2 + Math.random() * 4,
        y: -2 + Math.random() * 4,
        z: -2 + Math.random() * 4,
        group: groups[i % 3],
        xLabel: xColumn,
        yLabel: yColumn,
        zLabel: "Z Value",
      }))
    } else {
      return Array.from({ length: 30 }, (_, i) => ({
        x: -2 + Math.random() * 4,
        y: -2 + Math.random() * 4,
        z: -2 + Math.random() * 4,
        group: groups[i % 3],
      }))
    }
  }
}

