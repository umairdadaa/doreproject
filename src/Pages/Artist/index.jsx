'use client';

import FamilyHeritage from "@/components/Artist/FamilyHeritage";
import Heritage from "@/components/Artist/Heritage";
import InnovativeCraftsmanship from "@/components/Artist/InnovativeCraftsmanship";
import Philosophy from "@/components/Artist/Philosophy";
import SixGenerations from "@/components/Artist/SixGenerations";
import DialogueOfCultures from '@/components/Artist/DialogueOfCultures';

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils";

const components = [
  { id: 1, Component: Heritage },
  { id: 2, Component: Philosophy },
  { id: 3, Component: FamilyHeritage },
  { id: 4, Component: SixGenerations },
  { id: 5, Component: InnovativeCraftsmanship },
  { id: 6, Component: DialogueOfCultures },
];

const directions = ['left', 'bottom', 'left', 'bottom', 'right'];

const ArtistPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [directionIndex, setDirectionIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        setDirectionIndex((prev) => (prev + 1) % directions.length);
        setCurrentIndex((prev) => (prev + 1) % components.length);
      } else {
        setDirectionIndex((prev) => (prev - 1 + directions.length) % directions.length);
        setCurrentIndex((prev) => (prev - 1 + components.length) % components.length);
      }
    };

    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) - 0.5,
        y: (event.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}>
        <div className='absolute top-0 left-0 bg-red-400 w-screen h-screen'>Hello world</div>
      </div>
    </>
  );
};

export default ArtistPage;
