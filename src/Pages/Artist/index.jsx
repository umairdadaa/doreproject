'use client';

import FamilyHeritage from "@/components/Artist/FamilyHeritage";
import Heritage from "@/components/Artist/Heritage";
import InnovativeCraftsmanship from "@/components/Artist/InnovativeCraftsmanship";
import Philosophy from "@/components/Artist/Philosophy";
import SixGenerations from "@/components/Artist/SixGenerations";
import DialogueOfCultures from '@/components/Artist/DialogueOfCultures';
import MouseCanvas from "@/components/MouseCanvas";
import MyCanvas from "@/Scene/MyCanvas";
import ArtistBackgroundVedio from "@/components/Artist/ArtistVedio";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils";

const components = [
  { id: 1, Component: ArtistBackgroundVedio },
  { id: 2, Component: Heritage },
  { id: 3, Component: Philosophy },
  { id: 4, Component: FamilyHeritage },
  { id: 5, Component: SixGenerations },
  { id: 6, Component: InnovativeCraftsmanship },
  { id: 7, Component: DialogueOfCultures },
];

const directions = ['left', 'bottom', 'left', 'bottom', 'right'];

const Artist = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [directionIndex, setDirectionIndex] = useState(0); // Track animation direction (0: left, 1: bottom, 2: right)

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        // Scroll down
        setDirectionIndex((prev) => (prev + 1) % directions.length); // Cycle directions: left -> bottom -> right
        setCurrentIndex((prev) => (prev + 1) % components.length); // Cycle components
      } else {
        // Scroll up
        setDirectionIndex((prev) => (prev - 1 + directions.length) % directions.length); // Reverse directions
        setCurrentIndex((prev) => (prev - 1 + components.length) % components.length); // Reverse components
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction === 'left' ? '-120%' : direction === 'right' ? '120%' : '0%',
      y: direction === 'bottom' ? '120%' : '0%',
      scale: 0.9,
      rotate: direction === 'bottom' ? -15 : 0, 
      opacity: 0,
      filter: 'blur(12px)',
      boxShadow: '0px 15px 45px rgba(0, 0, 0, 0.4)', // Soft shadow
      transition: { duration: 0.9, ease: 'easeOut', delay: 0.1 }, // Smooth and delayed entry
    }),
    center: {
      x: 0,
      y: 0,
      scale: 1, 
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)', // Soft floating effect
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
    exit: (direction) => ({
      x: direction === 'left' ? '120%' : direction === 'right' ? '-120%' : '0%',
      y: direction === 'bottom' ? '-120%' : '0%',
      scale: 0.9,
      rotate: direction === 'bottom' ? 15 : 0, 
      opacity: 0,
      filter: 'blur(8px)',
      boxShadow: '0px -15px 30px rgba(0, 0, 0, 0.2)', // Light shadow
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 }, // Smooth exit with delay
    }),
  };

  const currentDirection = directions[directionIndex];
  const { Component } = components[currentIndex];

  return (
    <>
    <div style={{ overflow: 'hidden', height: '100vh', position: 'relative', background: '#111' }}>
      <MyCanvas/>
      <MouseCanvas/>
      <div
        key={currentIndex}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'transparent',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <Component />
      </div>
    </div>
    </>
  );
};

export default Artist;
