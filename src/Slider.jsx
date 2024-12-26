import { Canvas } from "@react-three/fiber";
import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { Suspense, useState } from "react";
import CodropsOverlay from "./components/CodropsOverlay";
import RevealImage from "./components/RevealImage";
import { Gltf, Center, OrbitControls, Float, Sphere, MeshRefractionMaterial, useEnvironment, Environment,Text, useTexture, Loader } from '@react-three/drei'
import Ring from "./Ring";
import * as THREE from 'three'

export default function Slider() {


  // FULLSCREEN MODE
  const [isFullScreen, setIsFullScreen] = useState(true);
  const handleFullScreen = () => setIsFullScreen(!isFullScreen);
  const images = ['./img/image.jpeg', './img/image2.jpeg','./img/image3.jpeg,'];

  const [currentimage,setcurrentimage] = useState('./img/image.jpeg')
  const [movestate,setmovestate] = useState(0)

  // DARK/LIGHT MODE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDarkMode = () => setIsDarkMode(!isDarkMode);

  // REVEAL PROGRESS ANIMATION
  const [isRevealed, setIsRevealed] = useState(false);
  const revealProgress = useMotionValue(0);

  const handleReveal = () => {
    animate(revealProgress, isRevealed ? 0 : 1, {
      duration: 1.5,
      ease: "easeInOut",
    });
    setIsRevealed(!isRevealed);
  };

  setTimeout(() =>{
    animate(revealProgress, 1, {
      duration: 2,
      ease: "easeInOut",
    });
    setIsRevealed(true)
  },6000)

  function Left(){
    animate(revealProgress, 0, {
      duration: 2,
      ease: "easeInOut",
    });
    setIsRevealed(false)

    setTimeout(() =>{

      setcurrentimage('./img/image2.jpeg')
      animate(revealProgress, 1, {
        duration: 2,
        ease: "easeInOut",
      });
      setIsRevealed(true)

    },2500)
  }

  
  function Right(){
    animate(revealProgress, 0, {
      duration: 2,
      ease: "easeInOut",
    });
    setIsRevealed(false)

    setTimeout(() =>{

      setcurrentimage('./img/image3.jpeg')
      animate(revealProgress, 1, {
        duration: 2,
        ease: "easeInOut",
      });
      setIsRevealed(true)

    },2500)
  }

  return (
    <>
    <Loader/>
    <img onClick={() => Left()} className="left" src="img/left-arrow.png"/>
    <img onClick={() => Right()}  className="right" src="img/right-arrow.png"/>

    <h1 id="bottom-text">Signature Collection</h1>

      <Canvas
        className="z-10"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: isDarkMode ? "#000" : "#F9FAF7",
        }}
      >
        <RevealImage
          imageTexture={currentimage}
          revealProgress={revealProgress}
          isFullScreen={isFullScreen}
        />

<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <group position={[0, -0.25, 2]}>
       {/* <Text scale={1.1} position={[0,-0.2,-0.5]}>
        DORE
        <meshBasicMaterial toneMapped={false} color={'#ff8afd'}/>
       </Text> */}
       <Gltf position={[0,2.45,-1.04]} scale={0.15} src="model.glb"/>

          <Ring frame={'#fff0f0'} diamonds={'#ffffff'}  scale={0.055} />

       
      </group>
      
      <OrbitControls  enableRotate={false} enableZoom={false} enablePan={false} minPolarAngle={0} maxDistance={17} />
    
      <Environment preset="sunset" />

      </Canvas>


    </>
  );
}

