'use client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const TimelineComponent = ({
  year,
  heading,
  paragraph,
  detailedDescription,
  imageSrc,
  headingColor = "#ab3a1c",
  yearColor = "#ab3a1c",
  paragraphColor = "#4a4c56",
  descriptionColor = "#4a4c56",
  fontFamily = '"AsenPro Regular", Sans-serif',
}) => {
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
        background: `linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)`,
      }}
    >
      {/* Left Section */}
      <div
        style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {/* Year */}
        <div
          style={{
            color: yearColor,
            fontFamily,
            fontSize: "5rem",
            fontWeight: "bold",
            lineHeight: "1",
            textShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            transform: animate ? "scale(1)" : "scale(0.8)",
            opacity: animate ? 1 : 0,
            transition: "opacity 1s ease-in-out, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {year}
        </div>

        {/* Heading */}
        <h1
          style={{
            color: headingColor,
            fontFamily,
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: "600",
            lineHeight: "1.2",
            textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
            transform: animate ? "translateX(0) scale(1)" : "translateX(-20px) scale(0.95)",
            opacity: animate ? 1 : 0,
            transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out 0.2s",
          }}
        >
          {heading}
        </h1>

        {/* Paragraph */}
        <p
          style={{
            color: paragraphColor,
            fontFamily,
            fontSize: "1.2rem",
            lineHeight: "1.8",
            marginBottom: "1rem",
            transform: animate ? "translateX(0)" : "translateX(-50px)",
            opacity: animate ? 1 : 0,
            transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out 0.4s",
          }}
        >
          {paragraph}
        </p>

        {/* Detailed Description */}
        {detailedDescription && (
          <p
            style={{
              color: descriptionColor,
              fontFamily,
              fontSize: "1rem",
              lineHeight: "1.6",
              marginTop: "0.5rem",
              transform: animate ? "translateX(0)" : "translateX(-50px)",
              opacity: animate ? 1 : 0,
              transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out 0.6s",
            }}
          >
            {detailedDescription}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "50vw",
          transform: animate ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1s ease-in-out",
        }}
      >
        <img
          src={imageSrc}
          alt={heading}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            background: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

TimelineComponent.propTypes = {
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  detailedDescription: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  headingColor: PropTypes.string,
  yearColor: PropTypes.string,
  paragraphColor: PropTypes.string,
  descriptionColor: PropTypes.string,
  fontFamily: PropTypes.string,
};

export default TimelineComponent;
