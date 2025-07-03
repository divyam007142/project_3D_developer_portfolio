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
import CanvasLoader from "../components/Loader";

const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float // 🗂️ Each Ball has its own Float!
      speed={1.75}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
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
  const itemsPerRow = 4; // ✅ Adjust for rows
  const spacing = 3; // ✅ Adjust for gaps

  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      camera={{ position: [0, 0, 20], fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        {technologies.map((tech, index) => {
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;
          return (
            <Ball
              key={tech.name}
              imgUrl={tech.icon}
              position={[
                col * spacing - (itemsPerRow / 2) * spacing + spacing / 2,
                -(row * spacing),
                0,
              ]}
            />
          );
        })}
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default SectionWrapper(Tech, "");
