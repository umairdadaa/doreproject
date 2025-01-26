'use client';

import { useRef, useState, useEffect, Suspense, forwardRef } from 'react';
import { useGLTF, Float, MeshRefractionMaterial, useEnvironment, Gltf, } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Ring({ frame, diamonds, ...props }) {
  const env = useEnvironment({
    files:
      'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr',
  });
  const [currentState, setCurrentState] = useState(0);

  const ringRef = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const { camera, scene } = useThree();
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2());

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setMousePosition(new THREE.Vector2(x, y));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (ringRef.current) {
      // Set initial position
      ringRef.current.position.y = -10;

      // Animate from bottom to top
      gsap.to(ringRef.current.position, {
        y: 0.6,
        delay: 0,
        duration: 4,
        ease: 'power2.out',
      });
    }
  }, []);

  useEffect(() => {
    const rightButton = document.querySelector('.right');
    const leftButton = document.querySelector('.left');
    const bottomText = document.querySelector('#bottom-text');

    const handleRightClick = () => {
      setCurrentState((prevState) => {
        return (prevState + 1) % 3;
      });
    };

    const handleLeftClick = () => {
      setCurrentState((prevState) => {
        return (prevState - 1 + 3) % 3;
      });
    };

    if (rightButton) rightButton.addEventListener('click', handleRightClick);
    if (leftButton) leftButton.addEventListener('click', handleLeftClick);

    return () => {
      if (rightButton)
        rightButton.removeEventListener('click', handleRightClick);
      if (leftButton) leftButton.removeEventListener('click', handleLeftClick);
    };
  }, []);

  useEffect(() => {
    console.log('Current state:', currentState);

    if (currentState == 0) {
      document.querySelector('#bottom-text').innerText =
        'White Label Collection';

      gsap.to(ring3.current.position, {
        y: 0.2,
        delay: 1,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(ring2.current.position, {
        y: -6,
        delay: 0,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(ringRef.current.position, {
        y: -4,
        delay: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    }

    if (currentState == 1) {
      document.querySelector('#bottom-text').innerText = 'Memorable Art';

      gsap.to(ring2.current.position, {
        y: 0.6,
        delay: 1,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(ring3.current.position, {
        y: -4,
        delay: 0,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(ringRef.current.position, {
        y: -5,
        delay: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    }

    if (currentState == 2) {
      document.querySelector('#bottom-text').innerText = 'Signature Collection';
      gsap.to(ringRef.current.position, {
        y: 0.6,
        delay: 1,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(ring3.current.position, {
        y: -4,
        delay: 0,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(ring2.current.position, {
        y: -4,
        delay: 0,
        duration: 1.5,
        ease: 'power2.out',
      });
    }
  }, [currentState, ring2.current, ringRef.current, ring3.current ]);

  return (
    <Float
      speed={5}
      rotationIntensity={0.3}
      floatIntensity={1}
      floatingRange={[0, 0.4]}
    >
      {/* <ModelTwo ref={ringRef} rotation={[Math.PI / 2, 0, 0]} /> */}
      <ModelOne ref={ringRef} rotation={[0, Math.PI , 0]} />
      <Gltf ref={ring2} src='doji_diamond_ring.glb' scale={10.0} rotation={[Math.PI /2, Math.PI, 0]}/>
      <Bug ref={ring3} />
    </Float>
  );
}

const ModelOne = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/modelOne.glb')
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  )
});

const Bug = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/bug 2-transformed.glb')
  return (
    <group dispose={null} ref={ref} scale={0.2} rotation={[Math.PI / 2, Math.PI, 0]}>
      <mesh geometry={nodes.Box002.geometry} material={nodes.Box002.material} />
      <mesh geometry={nodes.Gem.geometry} material={materials.Ring_Crystal} />
      <mesh geometry={nodes.Line001.geometry} material={nodes.Line001.material} />
      <mesh geometry={nodes.Line049.geometry} material={nodes.Line049.material} />
    </group>
  )
});

const ModelTwo = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models/modelTwo.gltf')
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} position={[-0.204, 0, 0.636]} scale={[0.095, 0.02, 0.095]} />
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[0.277, 0.001, 0.234]} />
      <mesh geometry={nodes.Plane001.geometry} material={nodes.Plane001.material} position={[-0.381, 0, 0.193]} scale={0.218} />
      <mesh geometry={nodes.Circle.geometry} material={nodes.Circle.material} position={[-0.142, 0.016, -0.228]} rotation={[0, 0.739, 0]} scale={[-0.124, -0.095, -0.095]} />
      <mesh geometry={nodes.Circle001.geometry} material={nodes.Circle001.material} position={[-0.025, 0.01, 0.42]} scale={0.052} />
      <mesh geometry={nodes.Circle002.geometry} material={nodes.Circle002.material} position={[0.059, 0.01, 0.393]} scale={0.052} />
      <mesh geometry={nodes.Circle003.geometry} material={nodes.Circle003.material} position={[0.006, 0.01, 0.358]} scale={0.043} />
      <mesh geometry={nodes.Circle004.geometry} material={nodes.Circle004.material} position={[0.011, 0.01, 0.303]} scale={0.04} />
      <mesh geometry={nodes.Circle005.geometry} material={nodes.Circle005.material} position={[0.067, 0.01, 0.314]} scale={0.047} />
      <mesh geometry={nodes.Circle006.geometry} material={nodes.Circle006.material} position={[0.109, 0.01, 0.337]} scale={0.031} />
      <mesh geometry={nodes.Circle007.geometry} material={nodes.Circle007.material} position={[0.134, 0.01, 0.381]} scale={0.041} />
      <mesh geometry={nodes.Circle008.geometry} material={nodes.Circle008.material} position={[0.06, 0.01, 0.254]} scale={0.065} />
      <mesh geometry={nodes.Circle009.geometry} material={nodes.Circle009.material} position={[0.121, 0.01, 0.274]} scale={0.052} />
      <mesh geometry={nodes.Circle010.geometry} material={nodes.Circle010.material} position={[0.163, 0.01, 0.293]} scale={0.049} />
      <mesh geometry={nodes.Circle011.geometry} material={nodes.Circle011.material} position={[0.185, 0.01, 0.363]} scale={0.04} />
      <mesh geometry={nodes.Circle012.geometry} material={nodes.Circle012.material} position={[0.216, 0.01, 0.314]} scale={0.054} />
      <mesh geometry={nodes.Circle013.geometry} material={nodes.Circle013.material} position={[0.239, 0.01, 0.259]} scale={0.047} />
      <mesh geometry={nodes.Circle014.geometry} material={nodes.Circle014.material} position={[0.171, 0.01, 0.246]} scale={0.034} />
      <mesh geometry={nodes.Circle015.geometry} material={nodes.Circle015.material} position={[0.174, 0.01, 0.24]} scale={0.053} />
      <mesh geometry={nodes.Circle016.geometry} material={nodes.Circle016.material} position={[0.114, 0.01, 0.205]} scale={0.05} />
      <mesh geometry={nodes.Circle017.geometry} material={nodes.Circle017.material} position={[0.174, 0.01, 0.165]} scale={0.065} />
      <mesh geometry={nodes.Circle018.geometry} material={nodes.Circle018.material} position={[0.234, 0.01, 0.185]} scale={0.052} />
      <mesh geometry={nodes.Circle019.geometry} material={nodes.Circle019.material} position={[0.279, 0.01, 0.227]} scale={0.049} />
      <mesh geometry={nodes.Circle020.geometry} material={nodes.Circle020.material} position={[0.3, 0.01, 0.279]} scale={0.04} />
      <mesh geometry={nodes.Circle021.geometry} material={nodes.Circle021.material} position={[0.354, 0.01, 0.256]} scale={0.054} />
      <mesh geometry={nodes.Circle022.geometry} material={nodes.Circle022.material} position={[0.349, 0.01, 0.197]} scale={0.047} />
      <mesh geometry={nodes.Circle023.geometry} material={nodes.Circle023.material} position={[0.286, 0.01, 0.158]} scale={0.034} />
      <mesh geometry={nodes.Circle024.geometry} material={nodes.Circle024.material} position={[0.242, 0.01, 0.113]} scale={0.053} />
      <mesh geometry={nodes.Circle025.geometry} material={nodes.Circle025.material} position={[0.195, 0.01, 0.096]} scale={0.05} />
      <mesh geometry={nodes.Circle026.geometry} material={nodes.Circle026.material} position={[0.304, 0.01, 0.134]} scale={0.065} />
      <mesh geometry={nodes.Circle027.geometry} material={nodes.Circle027.material} position={[0.364, 0.01, 0.154]} scale={0.052} />
      <mesh geometry={nodes.Circle028.geometry} material={nodes.Circle028.material} position={[0.418, 0.01, 0.121]} scale={0.053} />
      <mesh geometry={nodes.Circle029.geometry} material={nodes.Circle029.material} position={[0.357, 0.01, 0.085]} scale={0.05} />
      <mesh geometry={nodes.Circle030.geometry} material={nodes.Circle030.material} position={[0.417, 0.01, 0.046]} scale={0.039} />
      <mesh geometry={nodes.Circle031.geometry} material={nodes.Circle031.material} position={[0.477, 0.01, 0.066]} scale={0.052} />
      <mesh geometry={nodes.Circle032.geometry} material={nodes.Circle032.material} position={[0.485, 0.01, -0.006]} scale={0.053} />
      <mesh geometry={nodes.Circle033.geometry} material={nodes.Circle033.material} position={[0.407, 0.01, 0.207]} scale={0.054} />
      <mesh geometry={nodes.Circle034.geometry} material={nodes.Circle034.material} position={[0.466, 0.01, 0.154]} scale={0.054} />
      <mesh geometry={nodes.Circle035.geometry} material={nodes.Circle035.material} position={[0.555, 0.01, 0.051]} scale={0.055} />
      <mesh geometry={nodes.Circle036.geometry} material={nodes.Circle036.material} position={[0.368, 0.01, 0.026]} scale={0.05} />
    </group>
  )
});
