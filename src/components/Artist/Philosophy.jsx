"use client";
import { useEffect, useState } from "react";

const Philosophy = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
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
          Philosophy
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
          Dore, the granddaughter of an architect and the daughter of a
          sculptor, had an upbringing that was immersed in an extraordinary and
          vibrant creative environment. Her grandfather was a distinguished
          architect who designed
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
          “Regardless of the subject, the final piece must be as vibrant as it
          is in real life. Observe the object. Pay attention to the tiniest
          details,”
        </blockquote>
      </div>
      <div
        style={{
          height: "100vh",
          width: "50vw",
          transform: animate ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1s ease-in-out",
        }}
      >
        <img
          src="/public/images/Philosophy.png"
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

export default Philosophy;
