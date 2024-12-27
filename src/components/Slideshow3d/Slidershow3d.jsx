import { Canvas, useLoader } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./Experience";
import { Overlay } from "./Overlay";
import * as THREE from "three";

function PinkFloralBackground() {
  const texture = useLoader(THREE.TextureLoader, "images/texture-bg.jpg"); // Replace with your floral image path
  return (
    <mesh>
      <sphereGeometry args={[40, 25, 25]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function Slideshow3d() {
  return (
    <>
      <Leva hidden />
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }} style={{ height: "100vh" }}>
        <PinkFloralBackground />
        <Experience />
      </Canvas>
    </>
  );
}

export default Slideshow3d;
