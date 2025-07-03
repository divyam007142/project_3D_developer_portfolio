import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import CanvasLoader from "./Loader";

const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float
      speed={2}
      rotationIntensity={2}
      floatIntensity={3}
    >
      <mesh position={position} scale={1.5} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const Tech = () => {
  const spacingX = 4; // horizontal gap
  const spacingY = 4; // vertical gap
  const perRow = 4;   // how many balls per row

  return (
    <div className="w-full h-[500px]"> {/* Fix height to contain canvas */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />
          <OrbitControls enableZoom={false} />

          {technologies.map((tech, index) => {
            const row = Math.floor(index / perRow);
            const col = index % perRow;

            // Spread out balls nicely
            const posX = (col - (perRow - 1) / 2) * spacingX;
            const posY = -row * spacingY + 3;

            return (
              <Ball
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
