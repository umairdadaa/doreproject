'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FamilyHeritage from "@/components/Artist/FamilyHeritage";
import Heritage from "@/components/Artist/Heritage";
import InnovativeCraftsmanship from "@/components/Artist/InnovativeCraftsmanship";
import Philosophy from "@/components/Artist/Philosophy";
import SixGenerations from "@/components/Artist/SixGenerations";
import DialogueOfCultures from '@/components/Artist/DialogueOfCultures';

const components = [
  { id: 1, Component: Heritage },
  { id: 2, Component: Philosophy },
  { id: 3, Component: FamilyHeritage },
  { id: 4, Component: SixGenerations },
  { id: 5, Component: InnovativeCraftsmanship },
  { id: 6, Component: DialogueOfCultures },
];

const directions = ['left',"bottom",'left', 'bottom', 'right']; 
const ArtistPage = () => {
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
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0%',
      y: direction === 'bottom' ? '100%' : '0%',
      scale: 0.8, 
      // rotate: direction === 'bottom' ? -15 : 0, 
      opacity: 0,
      filter: 'blur(10px)', 
    }),
    center: {
      x: 0,
      y: 0,
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      filter: 'blur(0px)', 
    },
    exit: (direction) => ({
      x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : '0%',
      y: direction === 'bottom' ? '-100%' : '0%',
      scale: 0.8, 
      rotate: direction === 'bottom' ? 15 : 0, 
      opacity: 0,
      filter: 'blur(10px)', 
    }),
  };

  const currentDirection = directions[directionIndex];
  const { Component } = components[currentIndex];

  return (
    <div style={{ overflow: 'hidden', height: '100vh', position: 'relative', background: '#111' }}>
      <motion.div
        key={currentIndex}
        custom={currentDirection}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: '#fff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
        }}
      >
        <Component />
      </motion.div>
    </div>
  );
};

export default ArtistPage;
