"use client"

import { useEffect, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Environment, Float, Sparkles } from "@react-three/drei"
import { getDataForDataset } from "@/lib/data-utils"
import * as THREE from "three"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThreeDVisualizationProps {
  dataset: string
  xColumn?: string
  yColumn?: string
}

export function ThreeDVisualization({ dataset, xColumn, yColumn }: ThreeDVisualizationProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setLoading(true)
    setTimeout(() => {
      const fetchedData = getDataForDataset(dataset, "3d", xColumn, yColumn)
      setData(Array.isArray(fetchedData) ? fetchedData : [])
      setLoading(false)
    }, 800)
  }, [dataset, xColumn, yColumn])

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <div className="w-full h-full relative">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-opacity-80 backdrop-blur-sm"
            onClick={toggleTheme}
          >
            {isDarkTheme ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
            <color attach="background" args={[isDarkTheme ? "#050816" : "#f5f5f5"]} />
            <ambientLight intensity={isDarkTheme ? 0.5 : 0.8} />
            <pointLight position={[10, 10, 10]} intensity={isDarkTheme ? 1 : 0.8} />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={isDarkTheme ? 1 : 0.8} castShadow />
            <DataPoints data={data} xLabel={xColumn} yLabel={yColumn} isDarkTheme={isDarkTheme} />
            <Axes xLabel={xColumn} yLabel={yColumn} isDarkTheme={isDarkTheme} />
            <OrbitControls
              enableZoom={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              enablePan={true}
              enableDamping={true}
              dampingFactor={0.05}
            />
            <Environment preset={isDarkTheme ? "city" : "sunset"} />
            <Legend isDarkTheme={isDarkTheme} />
            {isDarkTheme && <Sparkles count={100} scale={10} size={1} speed={0.3} opacity={0.2} color="#ffffff" />}
          </Canvas>
        </>
      )}
    </div>
  )
}

function DataPoints({
  data,
  xLabel,
  yLabel,
  isDarkTheme,
}: { data: any[]; xLabel?: string; yLabel?: string; isDarkTheme: boolean }) {
  if (!Array.isArray(data)) {
    return null
  }

  return (
    <group>
      {data.map((point, index) => {
        if (!point || typeof point.x !== "number" || typeof point.y !== "number" || typeof point.z !== "number") {
          return null
        }

        const color = point.group === "group1" ? "#4285F4" : point.group === "group2" ? "#EA4335" : "#FBBC05"
        const emissive = isDarkTheme
          ? point.group === "group1"
            ? "#1a73e8"
            : point.group === "group2"
              ? "#d62516"
              : "#f2a600"
          : point.group === "group1"
            ? "#0052cc"
            : point.group === "group2"
              ? "#b31412"
              : "#d18700"

        return (
          <Float
            key={index}
            position={[point.x, point.y, point.z]}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial
                color={color}
                emissive={emissive}
                emissiveIntensity={isDarkTheme ? 0.5 : 0.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            {index % 5 === 0 && (
              <Text
                position={[0, 0.2, 0]}
                fontSize={0.08}
                color={isDarkTheme ? "#ffffff" : "#000000"}
                anchorX="center"
                anchorY="middle"
                renderOrder={1}
                depthTest={false}
              >
                {`P${index + 1}`}
              </Text>
            )}
          </Float>
        )
      })}
    </group>
  )
}

function Axes({ xLabel, yLabel, isDarkTheme }: { xLabel?: string; yLabel?: string; isDarkTheme: boolean }) {
  const xAxisRef = useRef<THREE.Mesh>(null)
  const yAxisRef = useRef<THREE.Mesh>(null)
  const zAxisRef = useRef<THREE.Mesh>(null)

  useFrame(({ camera }) => {
    if (xAxisRef.current) xAxisRef.current.lookAt(camera.position)
    if (yAxisRef.current) yAxisRef.current.lookAt(camera.position)
    if (zAxisRef.current) zAxisRef.current.lookAt(camera.position)
  })

  const textColor = isDarkTheme ? "#ffffff" : "#000000"
  const outlineColor = isDarkTheme ? "#000000" : "#ffffff"

  return (
    <group>
      {/* X Axis */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(self) => {
            if (!self) return
            const vertices = new Float32Array([0, 0, 0, 3, 0, 0])
            self.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
          }}
        />
        <lineBasicMaterial attach="material" color="red" linewidth={2} />
      </line>
      <mesh ref={xAxisRef} position={[3.8, 0, 0]}>
        <Text fontSize={0.2} color="red" depthTest={false} outlineWidth={0.01} outlineColor={outlineColor}>
          {xLabel || "X"}
        </Text>
      </mesh>

      {/* Y Axis */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(self) => {
            if (!self) return
            const vertices = new Float32Array([0, 0, 0, 0, 3, 0])
            self.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
          }}
        />
        <lineBasicMaterial attach="material" color="green" linewidth={2} />
      </line>
      <mesh ref={yAxisRef} position={[0, 3.8, 0]}>
        <Text fontSize={0.2} color="green" depthTest={false} outlineWidth={0.01} outlineColor={outlineColor}>
          {yLabel || "Y"}
        </Text>
      </mesh>

      {/* Z Axis */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(self) => {
            if (!self) return
            const vertices = new Float32Array([0, 0, 0, 0, 0, 3])
            self.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
          }}
        />
        <lineBasicMaterial attach="material" color="blue" linewidth={2} />
      </line>
      <mesh ref={zAxisRef} position={[0, 0, 3.8]}>
        <Text fontSize={0.2} color="blue" depthTest={false} outlineWidth={0.01} outlineColor={outlineColor}>
          Z
        </Text>
      </mesh>

      {/* Grid */}
      <gridHelper args={[6, 10]} position={[0, 0, 0]} />
    </group>
  )
}

// Add a legend for the 3D visualization
function Legend({ isDarkTheme }: { isDarkTheme: boolean }) {
  const textColor = isDarkTheme ? "#ffffff" : "#000000"
  const outlineColor = isDarkTheme ? "#000000" : "#ffffff"

  return (
    <group position={[0, -2.5, 0]}>
      <mesh position={[-2.5, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#4285F4"
          emissive={isDarkTheme ? "#1a73e8" : "#0052cc"}
          emissiveIntensity={isDarkTheme ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[-2.2, 0, 0]}
        fontSize={0.15}
        color={textColor}
        anchorX="left"
        depthTest={false}
        outlineWidth={0.01}
        outlineColor={outlineColor}
      >
        Group 1
      </Text>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#EA4335"
          emissive={isDarkTheme ? "#d62516" : "#b31412"}
          emissiveIntensity={isDarkTheme ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0.3, 0, 0]}
        fontSize={0.15}
        color={textColor}
        anchorX="left"
        depthTest={false}
        outlineWidth={0.01}
        outlineColor={outlineColor}
      >
        Group 2
      </Text>

      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#FBBC05"
          emissive={isDarkTheme ? "#f2a600" : "#d18700"}
          emissiveIntensity={isDarkTheme ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[2.8, 0, 0]}
        fontSize={0.15}
        color={textColor}
        anchorX="left"
        depthTest={false}
        outlineWidth={0.01}
        outlineColor={outlineColor}
      >
        Group 3
      </Text>
    </group>
  )
}

