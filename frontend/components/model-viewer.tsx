"use client"

import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, PresentationControls } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

export default function ModelViewer() {
  const [modelUrl, setModelUrl] = useState("/assets/3d/duck.glb")
  const [loading, setLoading] = useState(false)
  const controlsRef = useRef(null)

  const models = [
    { name: "Duck", url: "/assets/3d/duck.glb" },
    { name: "Chair", url: "/assets/3d/duck.glb" }, // Using duck as placeholder for all models
    { name: "Table", url: "/assets/3d/duck.glb" },
    { name: "Lamp", url: "/assets/3d/duck.glb" },
  ]

  const changeModel = (url: string) => {
    setLoading(true)
    setModelUrl(url)
    // Simulate loading time
    setTimeout(() => setLoading(false), 800)
  }

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Model url={modelUrl} />
          </PresentationControls>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls ref={controlsRef} enableZoom={true} enablePan={true} />
      </Canvas>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-background p-3 rounded-md shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading model...</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
        {models.map((model) => (
          <Button
            key={model.name}
            variant={modelUrl === model.url ? "default" : "outline"}
            size="sm"
            onClick={() => changeModel(model.url)}
            disabled={loading}
            className={modelUrl === model.url ? "bg-gradient-to-r from-teal-600 to-cyan-600" : ""}
          >
            {model.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
