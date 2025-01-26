import { Environment, useGLTF, Loader } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useRef, useState } from "react";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { lerp } from "three/src/math/MathUtils";
import * as THREE from "three";

const VideoBackgroundPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const handleCanvasLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play();
    }
  }, [isLoaded]);
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <div className="w-screen h-screen">
      {/* <div className="absolute top-0 left-0 w-screen h-screen -z-50 pointer-events-none"> */}
      {/*   <video */}
      {/*     ref={videoRef} */}
      {/*     muted */}
      {/*     src="/bgVideoNew.mp4" */}
      {/*     className="w-full h-full object-fill bg-transparent" */}
      {/*     onCanPlayThrough={handleCanvasLoaded} */}
      {/*   /> */}
      {/* </div> */}
      <Loader />

      <Canvas
        className="w-screen h-screen overflow-hidden bg-[#181818]"
        onCreated={handleCanvasLoaded}
      >
        {/* <Text /> */}
        {/* <button> Click Me</button> */}
        <Scene startAnimation={buttonPressed} />
        <Environment preset="sunset" />
        <EffectComposer>
          <Fluid
            rainbow={false}
            fluidColor="hotpink"
            showBackground
            blend={1.0}
            velocityDissipation={1.0}
            radius={0.2}
            curl={1.0}
            pressure={0.9}
            intensity={1}
          />
        </EffectComposer>
      </Canvas>
      <button className="absolute bottom-10 right-1/2 translate-x-1/2 bg-transparent border-4 rounded-full px-10  py-4 font-bold text-white font-sans  hover:bg-white/40 transition-colors" onClick={() => setButtonPressed(true)} >
        Enter
      </button>
    </div>
  );
};
const Scene = ({ startAnimation }) => {
  const modelRef = useRef(null);
  const bgRef = useRef(null);

  const { viewport } = useThree();

  useEffect(() => {
    if (!bgRef.current) return;
    bgRef.current.scale.set(viewport.width, viewport.height, 1.0);
  }, [viewport]);
  const [moveUp, setMoveUp] = useState(false);
  useEffect(() => {
    if (startAnimation) {
      setTimeout(() => {
        setMoveUp(true);
      }, 500);
    }
  }, [startAnimation])

  useFrame(({ pointer, camera }) => {
    if (!modelRef.current || !bgRef.current) return;
    bgRef.current.rotation.z = lerp(bgRef.current.rotation.z, pointer.x * 0.03, 0.3);

    if (startAnimation) {
      camera.position.y = lerp(camera.position.y, 0.8, 0.01);
      camera.zoom = lerp(camera.zoom, 2.5, 0.01);
      camera.updateProjectionMatrix();
      bgRef.current.position.y = lerp(bgRef.current.position.y, -1.3, 0.05);
    }

  });

  return (
    <>
      <Background ref={bgRef} />
      <DoreModel position={[0, 0.5, 2]} scale={0.15} ref={modelRef} />
    </>
  )
}

const Background = forwardRef((_props, ref) => {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/bgNew.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.defaultPlaybackRate = 0.4;
    vid.playbackRate = 0.6;
    vid.play();
    vid.playsInline;
    vid.id = "video";
    return vid;
  });


  return (
    <mesh ref={ref} position={[0, 0, 0.3]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture args={[video]} attach="map" colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
    </mesh>
  );
});

const DoreModel = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/dore.glb')
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes.Shape2.geometry}
        material={materials['Material #25.001']}
        position={[-6.0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={20} 
      />
    </group>
  )
});

export default VideoBackgroundPage;

useGLTF.preload("https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/dore.glb");
