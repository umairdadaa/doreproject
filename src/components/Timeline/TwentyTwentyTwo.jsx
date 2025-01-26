"use client";
import { useEffect, useState } from "react";

const TwentyTwentyTwo = () => {
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
          2022
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
      CINDY CHAO The Art Jewel Cindy Chao Presents Her Latest Creations at Masterpiece London
        </p>
        <blockquote
          style={{
            color: "#ab3a1c",
            fontFamily: '"Sargie", Sans-serif',
            fontSize: "23px",
            fontWeight: 400,
            lineHeight: "1.6",
            borderLeft: "4px solid #ab3a1c",
            paddingLeft: "1rem",
            marginTop: "1rem",
            transform: animate ? "translateY(0)" : "translateY(30px)",
            opacity: animate ? 1 : 0,
            transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
            transitionDelay: "1s",
          }}
        >
          “Celebrated art jeweller CINDY CHAO The Art Jewel is delighted to be joining a number of artists in presenting her latest designs at Masterpiece London in a movable museum setup.”
        </blockquote>
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
          src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/images/TwentyTwentyTwo.png"
          alt="Philosophy"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default TwentyTwentyTwo;
