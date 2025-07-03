import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Ball from "./Ball";
import CanvasLoader from "../Loader";
import { technologies } from "../../constants";

const BallCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        {technologies.map((tech, i) => (
          <Ball
            key={tech.name}
            icon={tech.icon}
            position={[i * 2 - 7, 0, 0]} // spread horizontally
          />
        ))}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
