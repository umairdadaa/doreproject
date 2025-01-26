'use client';
import { useEffect, useState } from 'react';

const DialogueOfCultures = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", alignItems:"center"}} className='bg-transparent z-50' >
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
        <h2
          style={{
            color: "#ab3a1c",
            fontFamily: '"Sargie", Sans-serif',
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: "400",
          }}
        >
          A Dialogue of Cultures
        </h2>
        <p
          style={{
            color: "#4a4c56",
            fontFamily: '"Sargie", Sans-serif',
            fontSize: "1.2rem",
            lineHeight: "1.6",
            marginBottom: "1rem",
          }}
        >
       Jewellery is inspired by a blend of Eastern and Western influences, rooted in half a century of innovative Swiss craftsmanship, intertwined with the intoxicating artistry of the Silk Route.
        </p>
      </div>
      <div
      style={{
        height: "90vh",
        width: "40vw",
        transform: animate ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 1s ease-in-out",
      }}
    >
        <img
          src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/images/DialogueOfCultures.png" 
          alt="A Dialogue of Cultures"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>

      
    </div>
  );
};

export default DialogueOfCultures;
