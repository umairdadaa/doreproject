'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { useGLTF, Center, OrbitControls, Float, Sphere, MeshRefractionMaterial, useEnvironment, Gltf, useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from "gsap"

export default function Ring({ frame, diamonds, ...props }) {
  const { nodes, materials } = useGLTF('/3-stone-transformed.glb')
  const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })
  const [currentState, setCurrentState] = useState(0)
  
  const ringRef = useRef()
  const ring2 = useRef()
  const ring3 = useRef()
  const { camera, scene } = useThree()
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2())

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      const x = (clientX / window.innerWidth) * 2 - 1
      const y = -(clientY / window.innerHeight) * 2 + 1
      setMousePosition(new THREE.Vector2(x, y))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (ringRef.current) {
      // Set initial position
      ringRef.current.position.y = -10

      // Animate from bottom to top
      gsap.to(ringRef.current.position, {
        y: 0.6,
        delay: 0,
        duration: 4,
        ease: "power2.out"
      })
    }
  }, [])

  useEffect(() => {
    const rightButton = document.querySelector('.right')
    const leftButton = document.querySelector('.left')
    const bottomText = document.querySelector('#bottom-text')

    const handleRightClick = () => {
      setCurrentState((prevState) => {
        if (prevState < 1) {
          return prevState + 1
        }
        return prevState
      })


   
    }

    const handleLeftClick = () => {
      setCurrentState((prevState) => {
        if (prevState > -1) {
          return prevState - 1
        }
        return prevState
      })


     
    }

    if (rightButton) rightButton.addEventListener('click', handleRightClick)
    if (leftButton) leftButton.addEventListener('click', handleLeftClick)

    return () => {
      if (rightButton) rightButton.removeEventListener('click', handleRightClick)
      if (leftButton) leftButton.removeEventListener('click', handleLeftClick)
    }
  }, [])

  useEffect(() => {
    console.log('Current state:', currentState)

    if(currentState == -1){

      document.querySelector('#bottom-text').innerText = 'White Label Collection'

      gsap.to(ring3.current.position, {
        y: 0.2,
        delay: 1,
        duration: 2,
        ease: "power2.out"
      })

      gsap.to(ring2.current.position, {
        y: -6,
        delay: 0,
        duration: 2,
        ease: "power2.out"
      })

      gsap.to(ringRef.current.position, {
        y: -4,
        delay: 0,
        duration: 1.5,
        ease: "power2.out"
      })
    }

    if(currentState == 1){

      document.querySelector('#bottom-text').innerText = 'Memorable Art'

      gsap.to(ring2.current.position, {
        y: 0.6,
        delay: 1,
        duration: 2,
        ease: "power2.out"
      })

      gsap.to(ring3.current.position, {
        y: -4,
        delay: 0,
        duration: 2,
        ease: "power2.out"
      })

      gsap.to(ringRef.current.position, {
        y: -5,
        delay: 0,
        duration: 1.5,
        ease: "power2.out"
      })
    }

    if(currentState == 0){
      document.querySelector('#bottom-text').innerText = 'Signature Collection'
      gsap.to(ringRef.current.position, {
        y: 0.6,
        delay: 1,
        duration: 2,
        ease: "power2.out"
      })

      gsap.to(ring3.current.position, {
        y: -4,
        delay: 0,
        duration: 2,
        ease: "power2.out"
      })

      gsap.to(ring2.current.position, {
        y: -4,
        delay: 0,
        duration: 1.5,
        ease: "power2.out"
      })

    }


  }, [currentState])

  useFrame(() => {
    // Uncomment this section if you want to re-enable mouse-based rotation
    // if (ringRef.current) {
    //   const targetRotationX = mousePosition.y * Math.PI / 4
    //   const targetRotationY = mousePosition.x * Math.PI / 4
    //   ringRef.current.rotation.x += (targetRotationX - ringRef.current.rotation.x) * 0.07
    //   ringRef.current.rotation.z += (targetRotationY - ringRef.current.rotation.y) * 0.08
    // }
  })

  return (
    <>
      <group ref={ringRef} {...props} rotation={[-1.6, 0, 0.085]}>
        <Float
          speed={5}
          rotationIntensity={0.3}
          floatIntensity={1}
          floatingRange={[0, 0.4]}
        >
          <Suspense fallback={null}>
            <mesh castShadow geometry={nodes.mesh_0.geometry}>
              <meshStandardMaterial color={frame} roughness={0.15} metalness={1} envMapIntensity={1.5} />
            </mesh>
            <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />
            <instancedMesh castShadow args={[nodes.mesh_4.geometry, null, 65]} instanceMatrix={nodes.mesh_4.instanceMatrix}>
              <MeshRefractionMaterial color={diamonds} side={THREE.DoubleSide} envMap={env} aberrationStrength={0.02} toneMapped={false} />
            </instancedMesh>
          </Suspense>
        </Float>
      </group>

      <Float
        speed={5}
        rotationIntensity={0.3}
        floatIntensity={1}
        floatingRange={[0, 0.4]}
      >
        <Gltf ref={ring2} position={[0,-6,0]} rotation={[Math.PI * 0.5, Math.PI, 0]} scale={8.8} src='doji_diamond_ring.glb'/>
        <Gltf ref={ring3} position={[0,-4,0]} rotation={[-Math.PI * 1.85, Math.PI, 0]} scale={0.0012} src='nenya_galadriels_ring.glb'/>
      </Float>
    </>
  )
}

