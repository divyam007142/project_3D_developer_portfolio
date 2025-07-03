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
  const spacingY = 3.5; // vertical gap
  const leftX = -4; // left column X
  const rightX = 4; // right column X

  return (
    <div className="w-full h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          <OrbitControls enableZoom={false} enableRotate={false} />

          {technologies.map((tech, index) => {
            // Column & row position
            const isLeft = index < 7; // first 7 balls left
            const posX = isLeft ? leftX : rightX;
            const order = isLeft ? index : index - 7;
            const posY = 10 - order * spacingY;

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
