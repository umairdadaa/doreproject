'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FamilyHeritage from "@/components/Artist/FamilyHeritage";
import Heritage from "@/components/Artist/Heritage";
import InnovativeCraftsmanship from "@/components/Artist/InnovativeCraftsmanship";
import Philosophy from "@/components/Artist/Philosophy";
import SixGenerations from "@/components/Artist/SixGenerations";
import DialogueOfCultures from '@/components/Artist/DialogueOfCultures';
import Header from '@/components/Header';

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
        x: (event.clientX / window.innerWidth) - 0.5, // Normalize to range -0.5 to 0.5
        y: (event.clientY / window.innerHeight) - 0.5, // Normalize to range -0.5 to 0.5
      });
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction === 'left' ? '-120%' : direction === 'right' ? '120%' : '0%',
      y: direction === 'bottom' ? '120%' : '0%',
      scale: 0.9,
      rotate: direction === 'bottom' ? -15 : 0,
      opacity: 0,
      filter: 'blur(12px)',
      boxShadow: '0px 15px 45px rgba(0, 0, 0, 0.4)',
      transition: { duration: 0.9, ease: 'easeOut', delay: 0.1 },
    }),
    center: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
    exit: (direction) => ({
      x: direction === 'left' ? '120%' : direction === 'right' ? '-120%' : '0%',
      y: direction === 'bottom' ? '-120%' : '0%',
      scale: 0.9,
      rotate: direction === 'bottom' ? 15 : 0,
      opacity: 0,
      filter: 'blur(8px)',
      boxShadow: '0px -15px 30px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 },
    }),
  };

  const currentDirection = directions[directionIndex];
  const { Component } = components[currentIndex];

  // Apply parallax effect: adjust the transform property based on mouse position
  const parallaxStyle = {
    transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`, // Scale the movement
    transition: 'transform 0.1s ease-out', // Smooth transition
  };

  return (<>
    <Header />
    <div style={{ overflow: 'hidden', height: '100vh', position: 'relative', background: '#111' }}>
      <motion.div
        key={currentIndex}
        custom={currentDirection}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'transparent',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.3)',
          ...parallaxStyle, // Apply the parallax effect here
        }}
      >
        <Component />
      </motion.div>
    </div>
  </>
  );
};

export default ArtistPage;
