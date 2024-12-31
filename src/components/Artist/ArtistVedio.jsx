import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { lerp } from "three/src/math/MathUtils";

const ArtistBackgroundVedio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleCanvasLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play();
      videoRef.current.playbackRate = 1.5; 
    }
  }, [isLoaded]);
  

  return (
    <div className="w-screen h-screen relative">
    <div className="absolute top-1/2 left-10 transform -translate-y-2/3 text-black z-50 fontfamily-sargie">
    <p className="text-6xl font-bold text-center" style={{ color: '#ab3a1c' }}>Artist</p>
      <p className="text-4xl">
        DORE is an artist who has learned among masters…
      </p>
    </div>


      {/* Background video */}
      <div className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none">
        <video
        //   ref={videoRef}
          muted
          src="/videos/is/output.webm"
          className="w-full h-full object-fill bg-transparent"
          onCanPlayThrough={handleCanvasLoaded}
        />
      </div>

      {/* Canvas */}
      <Canvas
        className="w-screen h-screen overflow-hidden bg-[#181818]"
        onCreated={handleCanvasLoaded}
      >
        <Background />
        <Environment preset="sunset" />
        <EffectComposer>
          <Fluid
            rainbow={false}
            fluidColor="hotpink"
            showBackground
            blend={1.0}
            velocityDissipation={1.0}
            radius={0.3}
            curl={15.0}
            pressure={0.7}
            intensity={1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

const Background = () => {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/ArtistBg.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    vid.playsInline = true;
    return vid;
  });

  const ref = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scale.set(viewport.width, viewport.height, 1.0);
  }, [viewport]);

  useFrame(({ pointer }) => {
    ref.current.rotation.z = lerp(
      ref.current.rotation.z,
      pointer.x * 0.03,
      0.3
    );
  });

  return (
    <mesh ref={ref} position={[0, 0, 0.3]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture args={[video]} attach="map" />
      </meshBasicMaterial>
    </mesh>
  );
};

export default ArtistBackgroundVedio;
