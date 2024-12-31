import { Environment, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { lerp } from "three/src/math/MathUtils";


const VideoBackgroundPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);
    const handleCanvasLoaded = () => { setIsLoaded(true); };

    useEffect(() => {
        if (isLoaded && videoRef.current) {
            videoRef.current.play();
        }
    }, [isLoaded]);

    return (
        <div className="w-screen h-screen">
            <div className="absolute top-0 left-0 w-screen h-screen z-50 pointer-events-none">
                <video
                    ref={videoRef}
                    muted
                    src="/videos/is/output.webm"
                    className="w-full h-full object-fill bg-transparent"
                    onCanPlayThrough={handleCanvasLoaded}
                />
            </div>


            <Canvas className="w-screen h-screen overflow-hidden bg-[#181818]" onCreated={handleCanvasLoaded}>
                <Background />
                <DoreModel position={[0, 0.5, 2]} scale={0.15} />
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
        vid.src = "/bg.mp4";
        vid.crossOrigin = "Anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.play();
        vid.playsInline;
        vid.id = "video";
        return vid;
    });

    const ref = useRef();

    const { viewport } = useThree();

    useEffect(() => {
        if (!ref.current) return;
        ref.current.scale.set(viewport.width, viewport.height, 1.0);
    }, [viewport]);

    useFrame(({ pointer }) => {
        ref.current.rotation.z = lerp(ref.current.rotation.z, pointer.x * 0.03, 0.3);
    })

    return (
        <mesh ref={ref} position={[0, 0, 0.3]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial>
                <videoTexture args={[video]} attach="map" />
            </meshBasicMaterial>
        </mesh>
    );
};


function DoreModel(props) {
    const { nodes, materials } = useGLTF('/models/dore.glb')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Shape1.geometry} material={materials['Material #27']} position={[-10.005, -3.696, -0.035]} rotation={[Math.PI / 2, 0, 0]} scale={32.392} />
        </group>
    )
}

export default VideoBackgroundPage;

useGLTF.preload('/models/dore.glb')
