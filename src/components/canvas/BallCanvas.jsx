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
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 1]} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        {technologies.map((tech, i) => (
          <Ball
            key={tech.name}
            icon={tech.icon}
            position={[
              (i % 4) * 3 - 4.5, // 4 per row
              -Math.floor(i / 4) * 3, // new row every 4
              0
            ]}
          />
        ))}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
