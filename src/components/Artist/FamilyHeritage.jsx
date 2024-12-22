'use client';
import { useEffect, useState } from 'react';

const FamilyHeritage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          height: "100vh",
          width: "50vw",
          transform: animate ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1s ease-in-out",
        }}
      >
        <img
          src="/public/images/FamilyHeritage.png" 
          alt="Family Heritage"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "2rem",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
          transitionDelay: "0.5s",
        }}
      >
        <h1
          style={{
            color: "#ab3a1c",
            fontFamily: '"Sargie", Sans-serif',
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: "400",
          }}
        >
          Family Heritage
        </h1>
        <p
          style={{
            color: "#4a4c56",
            fontFamily: '"Sargie", Sans-serif',
            fontSize: "1.2rem",
            lineHeight: "1.6",
            marginBottom: "1rem",
          }}
        >
         Six generations of craftsmanship and passion for rare gems.
        </p>
      </div>
    </div>
  );
};

export default FamilyHeritage;
