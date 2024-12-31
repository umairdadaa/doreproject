// Butterfly.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register the plugin
gsap.registerPlugin(MotionPathPlugin);

const Butterfly = ({ color1, color2, scale, flip }) => {
  const butterflyRef = useRef(null);

  useEffect(() => {
    const butterfly = butterflyRef.current;
    const random = (min, max) => Math.random() * (max - min) + min;

    const setButterflyStyle = () => {
      if (!butterfly) return;

      // Set random initial values
      gsap.set(butterfly, {
        scale,
        opacity: 0,
        x: flip ? `${random(-10, 20)}vw` : `${random(90, 120)}vw`,
        y: `${random(90, 100)}vh`,
        rotation: random(-10, 10),
      });

      // Set random wing bits color
      gsap.set(butterfly.querySelectorAll('.bit'), {
        backgroundColor: Math.random() > 0.5 ? color1 : color2,
      });
    };

    const animateButterfly = () => {
      if (!butterfly) return;

      const flightDuration = random(1.85, 3.5);

      // Animate butterfly flying along a motion path
      gsap.to(butterfly, {
        duration: 0.5,
        opacity: 1,
      });

      gsap.to(butterfly, {
        duration: flightDuration,
        ease: 'power1.out',
        motionPath: {
          curviness: 1,
          path: [
            { x: `${random(40, 60)}vw`, y: `${random(40, 60)}vh` },
            {
              x: flip ? `${random(110, 100)}vw` : `${random(-20, -10)}vw`,
              y: `${random(10, 80)}vh`,
            },
          ],
        },
      });

      gsap.to(butterfly, {
        duration: 0.5,
        opacity: 0,
        delay: flightDuration - 0.5,
      });
    };

    setButterflyStyle();
    animateButterfly();

    // Re-run the animation every few seconds
    const intervalId = setInterval(() => {
      animateButterfly();
    }, 4000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [color1, color2, scale, flip]);

  return (
    <div className="butterfly" ref={butterflyRef}>
      <div className="wing">
        <div className="bit"></div>
        <div className="bit"></div>
      </div>
      <div className="wing">
        <div className="bit"></div>
        <div className="bit"></div>
      </div>
    </div>
  );
};

export default Butterfly;
