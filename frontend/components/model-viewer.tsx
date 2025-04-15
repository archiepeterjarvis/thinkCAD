"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, PresentationControls } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, RotateCcw } from "lucide-react"

// Create a component that will keep the camera focused on the model
function CameraController({ target = [0, 0, 0] }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef(null);

  useEffect(() => {
    if (controlsRef.current) {
      // Set the target to keep focus on the model
      controlsRef.current.target.set(...target);
    }
  }, [target]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={true}
      enablePan={true}
      minDistance={20}
      dampingFactor={0.1}
      enableDamping={true}
    />
  );
}

// Preload the model to avoid issues
useGLTF.preload("http://localhost:8002/static/models/0d52d6a7ccd54d9788040257d6a0de2c.glb")

function Model({ url, onLoaded }) {
  const { scene } = useGLTF(url)

  useEffect(() => {
    if (scene) {
      // Ensure proper materials for visibility
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.roughness = 0.7
          child.material.metalness = 0.3
        }
      })
      onLoaded()
    }
  }, [scene, onLoaded])

  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />
}

export default function ModelViewer({url}: {url?: string}) {
  const [modelUrl, setModelUrl] = useState(url || "http://localhost:8002/static/models/0d52d6a7ccd54d9788040257d6a0de2c.glb")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const canvasRef = useRef(null)

  const changeModel = (url: string) => {
    setLoading(true)
    setError(false)
    setModelUrl(url)
  }

  useEffect(() => {
    changeModel(url);
  }, [url]);

  const handleLoaded = () => {
    setLoading(false)
  }

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  // Function to reset the camera view
  const resetView = () => {
    if (canvasRef.current) {
      // This will trigger a re-render of the canvas
      const canvas = canvasRef.current;
      const tempStyle = canvas.style.display;
      canvas.style.display = 'none';
      setTimeout(() => {
        canvas.style.display = tempStyle;
      }, 1);
    }
  }

  return (
    <div className="relative h-full w-full">
      <div ref={canvasRef} className="h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 1000 }}
          onError={handleError}
          shadows
        >
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow={true} />
          <Suspense fallback={null}>
            <Model url={modelUrl} onLoaded={handleLoaded} />
            <Environment preset="studio" />
          </Suspense>
          <CameraController target={[0, 0, 0]} />
        </Canvas>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-white p-4 rounded-md shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="text-lg">Loading model...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-md shadow-lg">
            <p className="text-red-500 font-medium">Error loading model</p>
            <p className="text-sm text-gray-600">Check that your model URL is correct and the server is running</p>
            <Button onClick={() => window.location.reload()} className="mt-2">
              Retry
            </Button>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={resetView}
          className="bg-gradient-to-r from-blue-600 to-cyan-600"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}