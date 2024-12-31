import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';

const TexturedPlane = () => {
  const planeRef = useRef();
  useEffect(() => {
    // Load the texture and apply it to the plane
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/shader-img/bg2.png', (texture) => {
      if (planeRef.current) {
        // Scale down the texture
        texture.repeat.set(1, 1); // Scale to half size (adjust as needed)
        texture.wrapS = THREE.RepeatWrapping; // Repeat horizontally
        texture.wrapT = THREE.RepeatWrapping; // Repeat vertically
  
        planeRef.current.material.map = texture;
        planeRef.current.material.needsUpdate = true;
      }
    });
  }, []);
  return (
    <mesh ref={planeRef} position={[0, 0, -5]}>
      <planeGeometry args={[75, 35]} />
      <meshStandardMaterial />
    </mesh>
  )
};

const CameraControls = () => {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 1.3,
        y: (event.clientY / window.innerHeight - 0.5) * 1.3,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    // Smooth camera movement based on mouse position
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0); // Keep the camera focused on the origin
  });

  return null;
};

const MyCanvas = () => {
  return (
    <div className="canvas-main w-screen h-screen fixed bg-transparent top-0">
      <Canvas>
        <ambientLight intensity={2} color={"pink"}/>
        {/* Add the textured plane */}
        <TexturedPlane />

        {/* Add camera controls */}
        <CameraControls />
<EffectComposer>
<Fluid showBackground={true} fluidColor={"pink"} />

</EffectComposer>
     
      </Canvas>
    </div>
  );
};

export default MyCanvas;
