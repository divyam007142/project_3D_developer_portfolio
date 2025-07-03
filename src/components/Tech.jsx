import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import CanvasLoader from "./Loader";

const FlatBall = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <mesh position={position} scale={1.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color='#fff8eb'
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading
      />
      <Decal
        position={[0, 0, 1]}
        rotation={[0, 0, 0]}
        scale={1}
        map={decal}
        flatShading
      />
    </mesh>
  );
};

const Tech = () => {
  const spacingX = 3.5; // horizontal gap between balls
  const spacingY = 3.5; // vertical gap between rows

  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          <OrbitControls enableZoom={false} enableRotate={false} />

          {technologies.map((tech, index) => {
            // Row position
            const isTopRow = index < 7;
            const posY = isTopRow ? spacingY / 2 : -spacingY / 2;
            const posX = isTopRow
              ? (index - 3) * spacingX // 7 balls: index 0-6
              : (index - 7 - 2.5) * spacingX; // 6 balls: index 7-12

            return (
              <FlatBall
                key={tech.name}
                imgUrl={tech.icon}
                position={[posX, posY, 0]}
              />
            );
          })}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default SectionWrapper(Tech, "");
