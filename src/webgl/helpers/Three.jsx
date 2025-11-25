"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

export function Three({ children }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 60], // back for less zoom
        fov: 7,
        near: 0.01,
        far: 200000,
      }}
      eventPrefix="client"
      dpr={[1, 2]}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        {children}
        <OrbitControls
          enableZoom // Toggle Zoom
          enableRotate={false} // Toggle Move
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.4}
          zoomSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          minDistance={40} // Zoom In Distance
          maxDistance={160} // Zoom Out Distance
          makeDefault
        />
      </Suspense>
    </Canvas>
  );
}
