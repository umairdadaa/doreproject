import { Canvas } from "@react-three/fiber";
import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { useState } from "react";
import { Gltf, OrbitControls, Environment, Loader } from '@react-three/drei'
import Ring from "./Ring";

export default function Slider() {
  // FULLSCREEN MODE
  const [isFullScreen, setIsFullScreen] = useState(true);

  const [currentimage, setcurrentimage] = useState('./img/image.jpeg')

  // DARK/LIGHT MODE
  const [isDarkMode, setIsDarkMode] = useState(false);

  // REVEAL PROGRESS ANIMATION
  const [isRevealed, setIsRevealed] = useState(false);
  const revealProgress = useMotionValue(0);

  setTimeout(() => {
    animate(revealProgress, 1, {
      duration: 2,
      ease: "easeInOut",
    });
    setIsRevealed(true)
  }, 6000)

  function Left() {
    animate(revealProgress, 0, {
      duration: 2,
      ease: "easeInOut",
    });
    setIsRevealed(false)

    setTimeout(() => {
      setcurrentimage('./img/image2.jpeg')
      animate(revealProgress, 1, {
        duration: 2,
        ease: "easeInOut",
      });
      setIsRevealed(true)
    }, 2500)
  }

  function Right() {
    animate(revealProgress, 0, {
      duration: 2,
      ease: "easeInOut",
    });
    setIsRevealed(false)

    setTimeout(() => {
      setcurrentimage('./img/image3.jpeg')
      animate(revealProgress, 1, {
        duration: 2,
        ease: "easeInOut",
      });
      setIsRevealed(true)
    }, 2500)
  }

  return (
    <>
      <Loader />
      <img onClick={() => Left()} className="left" src="img/left-arrow.png" alt="Left arrow" />
      <img onClick={() => Right()} className="right" src="img/right-arrow.png" alt="Right arrow" />

      <h1 id="bottom-text">Signature Collection</h1>

      <Canvas
        className="z-10"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: isDarkMode ? "#000" : "#F9FAF7",
        }}
      >
        {/* RevealImage component is not defined, you may need to import it or implement it */}
        {/* <RevealImage
          imageTexture={currentimage}
          revealProgress={revealProgress}
          isFullScreen={isFullScreen}
        /> */}

        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <group position={[0, -0.25, 2]}>
          <Gltf position={[0, 2.45, -1.04]} scale={0.15} src="model.glb" />
          <Ring frame={'#fff0f0'} diamonds={'#ffffff'} scale={0.055} />
        </group>

        <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} minPolarAngle={0} maxDistance={17} />

        <Environment preset="sunset" />
      </Canvas>
    </>
  );
}