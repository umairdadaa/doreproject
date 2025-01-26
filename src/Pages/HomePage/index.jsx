import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SRGBColorSpace } from "three";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { useNavigate } from "react-router-dom";
import CollectionPage from "../CollectionPage"; // Import the CollectionPage component

const HomePage = () => {
    const [enter, setEnter] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showCollection, setShowCollection] = useState(false); // State to toggle CollectionPage

    useEffect(() => {
        const video1 = document.getElementById('home-video');
        const video2 = document.getElementById('videoTransition');

        function updateCombinedProgress() {
            const progress1 = video1.readyState >= 4 ? 50 : 0; // 50% if video1 is ready
            const progress2 = video2.readyState >= 4 ? 50 : 0; // 50% if video2 is ready
            setProgress(progress1 + progress2); // Combined progress
            if(progress1 + progress2 >= 100 ) {
                const pt = document.getElementById('pt');
                pt.style.display = 'none';
            }
        }

        function handleCanPlayThrough() {
            updateCombinedProgress();
        }

        // Add event listeners for `canplaythrough`
        video1.addEventListener('canplaythrough', handleCanPlayThrough);
        video2.addEventListener('canplaythrough', handleCanPlayThrough);

        // Trigger video loading
        video1.load();
        video2.load();

        // Check if videos are already ready
        if (video1.readyState >= 4) handleCanPlayThrough();
        if (video2.readyState >= 4) handleCanPlayThrough();

        // Cleanup event listeners on unmount
        return () => {
            video1.removeEventListener('canplaythrough', handleCanPlayThrough);
            video2.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, []);

    useEffect(() => {
        if (enter) {
            const logo = document.getElementById('logo')
            const progress = document.getElementById("progress-button");
            logo.classList.add("slide-up");
            progress.classList.add("slide-down");
            const top = document.getElementById('top');
            const bottom = document.getElementById('bottom');
            const c = document.getElementById("main");
            setTimeout(() => {
                top.classList.add("slide-up");
                bottom.classList.add("slide-down");
                vid.current.play();
                setTimeout(() => {
                    c.style.zIndex = 999;
                }, 1000);
            }, 1000);
        }
    }, [enter]);
    const vid = useRef();

    const handleShowCollection = () => {
        setShowCollection(true); // Show the CollectionPage
    };

    if (showCollection) {
        return <CollectionPage />; // Render the CollectionPage component
    }

    return (
        <mesh>
        <div className="w-screen h-screen overflow-hidden  relative">
                <div id="top" className="bg-[#ab3a1c] w-screen h-1/2 absolute top-0 left-0"></div>
                <div id="bottom" className="bg-[#ab3a1c] w-screen h-1/2 absolute top-1/2 left-0"></div>
                <div className="w-screen h-screen absolute top-0 left-0 -z-10 isolate" id="main">
                    <video
                        src="/Final Website Look/Transition A.mp4"
                        id="videoTransition"
                        className="hidden"
                        preload="auto"
                        muted
                    />
                    <video
                        src="/Final Website Look/Scene 1 Birds.mp4"
                        id="home-video"
                        className="hidden"
                        preload="auto"
                        muted
                        ref={vid}
                    />
                    <Canvas className="absolute top-0 left-0 w-screen h-screen z-10 pointer-events-auto">
                        {progress >= 100 && <Video onShowCollection={handleShowCollection} />}
                        <EffectComposer>
                            <Fluid
                                rainbow={false}
                                fluidColor="hotpink"
                                showBackground
                                blend={1.0}
                                velocityDissipation={0.9}
                                radius={0.2}
                                curl={1.0}
                                pressure={0.9}
                                intensity={1}
                            />
                        </EffectComposer>
                    </Canvas>
                    <button
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/20 font-sans font-bold p-4 rounded-full border-2 hover:bg-white/40 pointer-events-auto z-20"
                        id="c"
                    >
                        Collections
                    </button>
                </div>
                <div id="logo">
                <img id="bug" src="bug.png" width={100} height={100} />
                <img id="r" src="logo/r.png" width={100} height={100} />
                <img id="e" src="logo/e.png" width={100} height={100} />
                <img id="e-bar" src="logo/e-bar.png" width={100} height={100} />
                <img id="o" src="logo/o.png" width={100} height={100} />
                <div id="d" className="w-screen h-screen absolute top-0 left-0 relative">
                    <img id="d-up" src="logo/d-up.png" width={100} height={100} />
                    <img id="d-down" src="logo/d-down.png" width={100} height={100} />
                </div>
                </div>
                <div id="progress-button" className="w-screen h-screen absolute top-0 left-0">
                    <div id="progress-bar" onClick={() => setEnter(true)}>
                        <div id="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div id="pt" className="absolute bottom-64 left-1/2 -translate-x-1/2 font-bold text-4xl font-sans text-white">
                        {progress.toFixed(0)}%
                    </div>
                    <div id="enter" className="pointer-events-none">Enter World</div>
                </div>
            </div>
        </mesh>
    );
};

const Video = ({ onShowCollection }) => {
    const [video, setVideo] = useState(() => {
        const vid = document.getElementById("home-video");
        vid.crossOrigin = "Anonymous";
        vid.muted = true;
        vid.playsInline;
        return vid;
    });

    const [videoTransition, setVideoTransition] = useState(() => {
        const vid = document.getElementById("videoTransition");
        vid.crossOrigin = "Anonymous";
        vid.muted = true;
        vid.playsInline;
        return vid;
    });

    useEffect(() => {
        const c = document.getElementById("c");
        c.addEventListener("click", () => {
            setTimeout(() => {
                ref.current.position.z = 10;
            }, 500);
            videoTransition.play();
            videoTransition.addEventListener("ended", () => {
                onShowCollection(); // Show the CollectionPage
            });
        });
    }, [onShowCollection]);

    const refTransition = useRef();
    const ref = useRef();
    const { viewport } = useThree();
    const navigate = useNavigate();

    useEffect(() => {
        if (ref.current) {
            ref.current.scale.set(viewport.width, viewport.height, 1.0);
        }

        if (refTransition.current) {
            refTransition.current.scale.set(viewport.width, viewport.height, 1.0);
        }
    }, [ref.current, refTransition.current]);

    // useFrame(({ pointer }) => {
    //     if(!ref.current || !refTransition.current) return;
        // ref.current.position.x = pointer.x;
        // ref.current.position.y = pointer.y;
    // });

    return (
        <group>
            <mesh ref={ref} position={[0, 0, 0.1]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial>
                    <videoTexture args={[video]} attach="map" colorSpace={SRGBColorSpace} />
                </meshBasicMaterial>
            </mesh>
            <mesh ref={refTransition} position={[0, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial>
                    <videoTexture args={[videoTransition]} attach="map" colorSpace={SRGBColorSpace} />
                </meshBasicMaterial>
            </mesh>
        </group>
    );
};

export default HomePage;
