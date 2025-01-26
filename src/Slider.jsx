import { Canvas } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { Gltf, OrbitControls, Environment, Loader } from '@react-three/drei';
import Ring from './Ring';
import useMouseFollow from './utils/useMouseFollow';
import config from './assets/config.js';
import TransitioningPlanes from './components/TransitioningPlanes';
import CircularSlider from './components/TransitioningPlanes';

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isDarkMode] = useState(false);
  const animationRef = useRef(null);

  const ringRef = useRef();
  const activePlaneRef = useRef();
  const activeRingRef = useRef();

  useMouseFollow(ringRef, activePlaneRef);

  const handleTransition = (direction) => {
    if (transitioning) return;

    const newNextIndex =
      direction === 'next'
        ? (currentIndex + 1) % config.length
        : (currentIndex - 1 + config.length) % config.length;

    setNextIndex(newNextIndex);
    setTransitioning(true);

    let startTime = null;
    const duration = 50; // Adjusted duration for smoother transition

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);
      setTransitionProgress(easedProgress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentIndex(newNextIndex);
        setTransitioning(false);
        setTransitionProgress(0);
        animationRef.current = null;
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <>
      <img
        onClick={() => handleTransition('prev')}
        className='left'
        src='img/left-arrow.png'
        alt='Left arrow'
      />
      <img
        onClick={() => handleTransition('next')}
        className='right'
        src='img/right-arrow.png'
        alt='Right arrow'
      />
      <button className='absolute bottom-44 left-1/2 -translate-x-1/2 px-10 py-4 font-sans border-4 rounded-full z-50 text-white font-bold hover:bg-white/40 hover:text-black transition-colors'>Pre Booking</button>

      <h1 id='bottom-text'>Signature Collection</h1>
      <Loader/>
      <Canvas
        className='z-10 Poppins'
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: isDarkMode ? '#000' : '#F9FAF7',
        }}
      >
        {/* <TransitioningPlanes
          texturePaths={config.map((item) => item.texturePath)}
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          transitioning={transitioning}
          transitionProgress={transitionProgress}
          activePlaneRef={activePlaneRef}
        /> */}

        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />

        <group position={[0, -1.25, 1]}>
          <Gltf position={[0, 3.45, -0.04]} scale={0.15} src='model.glb' />
        </group>

        <group ref={ringRef} position={[0, -0.8, 1]}>
          <Ring frame={'#fff0f0'} diamonds={'#ffffff'} scale={0.055} />
        </group>

        <TransitioningPlanes
          texturePaths={config.map((item) => item.texturePath)} // Extract texture paths
          modelPaths={config.map((item) => item.modelPath)} // Extract model paths
          modelTransforms={config.map((item) => item.modelTransform)} // Extract model transforms
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          transitioning={transitioning}
          transitionDuration={1}
          activePlaneRef={activePlaneRef}
          activeRingRef={activeRingRef}
        />

        <OrbitControls
          enableRotate={false}
          // enableZoom={false}
          enablePan={false}
          minPolarAngle={0}
          maxDistance={17}
        />

        <Environment preset='sunset' />
      </Canvas>
    </>
  );
}
