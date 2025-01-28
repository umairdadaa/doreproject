import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { Canvas,
        //  useFrame,
         useThree } 
from "@react-three/fiber";
import { SRGBColorSpace } from "three";
// import { EffectComposer } from "@react-three/postprocessing";
// import { Fluid } from "@whatisjery/react-fluid-distortion";
import CollectionPage from "../CollectionPage";
import Lottie from "lottie-react";
import animationData from '../../../public/main file.json';

const HomePage = () => {
    const [enter, setEnter] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showCollection, setShowCollection] = useState(false);
    const [showTransitionGif, setShowTransitionGif] = useState(false);
    const [gifShown, setGifShown] = useState(false); // New state to track GIF display

    useEffect(() => {
        const video1 = document.getElementById('home-video');
        const video2 = document.getElementById('videoTransition');

        function updateCombinedProgress() {
            const progress1 = video1.readyState >= 4 ? 50 : 0;
            const progress2 = video2.readyState >= 4 ? 50 : 0;
            setProgress(progress1 + progress2);
            if (progress1 + progress2 >= 100) {
                const pp = document.getElementById('pt');
                const pb = document.getElementById('progress-bar');
                const pt = document.getElementById('enter');
                pp.style.display = 'none';
                pb.classList.add('show-enter');
                pt.classList.add('show-enter-keyword')
            }
        }

        function handleCanPlayThrough() {
            updateCombinedProgress();
        }

        // Add event listeners for `canplaythrough`
        video1?.addEventListener('canplaythrough', handleCanPlayThrough);
        video2?.addEventListener('canplaythrough', handleCanPlayThrough);

        // Trigger video loading
        if (window.innerWidth > 768) {
            video1?.load();
            video2?.load();
        }

        // Check if videos are already ready
        if (video1?.readyState >= 4) handleCanPlayThrough();
        if (video2?.readyState >= 4) handleCanPlayThrough();

        if(window.innerWidth < 768) {
            const pp = document.getElementById('pt');
            const pb = document.getElementById('progress-bar');
            const pt = document.getElementById('enter');
            pp.style.display = 'none';
            pb.classList.add('show-enter');
            pt.classList.add('show-enter-keyword')
        }

        // Cleanup event listeners on unmount
        return () => {
            video1?.removeEventListener('canplaythrough', handleCanPlayThrough);
            video2?.removeEventListener('canplaythrough', handleCanPlayThrough);
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
                vid?.current?.play();
                setTimeout(() => {
                    c.style.zIndex = 999;
                }, 1000);
            }, 1000);
        }
        // vidRef.current.PlaybackRate = 0.5;
        // vidRef.current.play();
    }, [enter]);
    const vid = useRef();
    const vidRef = useRef();

    return (
        <div className="w-screen h-screen overflow-hidden  relative">
            <div id="top" className="bg-[#ab3a1c] w-screen h-1/2 absolute top-0 left-0"></div>
            <div id="bottom" className="bg-[#ab3a1c] w-screen h-1/2 absolute top-1/2 left-0"></div>
            <div className="w-screen h-screen absolute top-0 left-0 -z-10 isolate" id="main">
            {window.innerWidth < 768 ? (
                showTransitionGif && !gifShown && (
                    <img 
                        src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/TransitionA.gif" // Replace with the actual path to your GIF
                        alt="Mobile GIF"
                        className="gif-animation"
                        crossOrigin="anonymous" // Adjust styles as needed
                        id="videoTransition"
                    />
                )
            ) : (
                <>
                    <video
                        id="videoTransition"
                        className="hidden"
                        crossOrigin="anonymous"
                        autoPlay
                        muted
                        preload="auto"
                    >
                        <source src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Transition%20A.mp4" type="video/mp4" />
                    </video>
                </>
            )}

            {window.innerWidth < 768 ? (
                !showTransitionGif && (
                    <img 
                        src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene1Birds-ezgif.com-video-to-gif-converter.gif"
                        alt="Mobile GIF"
                        className="gif-animation"
                        crossOrigin="anonymous" // Adjust styles as needed
                        id="home-video"
                    />
                )
            ) : (
                <>
                    <video
                        src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene%201%20Birds.mp4"
                        id="home-video"
                        className="hidden"
                        crossOrigin="anonymous"
                        autoPlay
                        muted
                        ref={vid}
                        preload="auto"
                    >
                        <source src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene%201%20Birds.mp4" type="video/mp4" />
                    </video>
                </>
            )}

                <Canvas className={`absolute top-0 left-0 w-screen h-screen z-10 pointer-events-auto ${showCollection ? "invisible" : "visible"}`}>
                    {progress >= 100 && <Video setShowCollection={setShowCollection} />}
                    {/* <EffectComposer>
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
                    </EffectComposer> */}
                </Canvas>

                <CollectionPage show={showCollection} />
                
                {window.innerWidth > 768 ? (
                    <button
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/20  font-bold p-4 rounded-full border-2 hover:bg-white/40 pointer-events-auto z-20"
                        id="c"
                    >
                        Collections
                    </button>
                ) : (
                    <button
                        className="absolute bottom-[90px] left-1/2 -translate-x-1/2 bg-white/20  font-bold p-4 rounded-full border-2 hover:bg-white/40 pointer-events-auto z-20"
                        id="mobile-collection"
                        onClick={() => {
                            setShowTransitionGif(true)
                            setTimeout(() => {
                                setShowCollection(true); // Set showCollection after 5 seconds
                            }, 6000);              
                        }
                        }
                    >
                        Collections
                    </button>
                )}
            </div>
            {/* <div id="logo" className="relative w-screen h-screen"> */}
            {/*     <img id="bug" src="bug.png" width={100} height={100} /> */}
            {/*     <img id="r" src="logo/r.png" width={100} height={100} /> */}
            {/*     <img id="e" src="logo/e.png" width={100} height={100} /> */}
            {/*     <img id="e-bar" src="logo/e-bar.png" width={100} height={100} /> */}
            {/*     <img id="o" src="logo/o.png" width={100} height={100} /> */}
            {/*     <div id="d" className="w-full h-full absolute top-0 left-0"> */}
            {/*         <img id="d-up" src="logo/d-up.png" width={100} height={100} /> */}
            {/*         <img id="d-down" src="logo/d-down.png" width={100} height={100} /> */}
            {/*     </div> */}
            {/* </div> */}
            <div className="w-screen h-screen absolute top-0 left-0" id="logo">
                {/* <video controls={false} muted autoPlay src="/intro.mp4" className="w-full h-full object-cover scale-105" ref={vidRef}/> */}
                <Lottie 
                    animationData={animationData} 
                    loop={false}
                    style={{ width: '100%', height: '100%' }} // Customize size
                    speed={2}
                />
            </div>
            <div id="progress-button" className="w-screen h-screen absolute top-0 left-0">
                <div id="progress-bar" onClick={() => setEnter(true)}>
                    <div id="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div id="pt" className="absolute bottom-24 left-1/2 -translate-x-1/2 font-bold text-4xl  text-white">{progress.toFixed(0)}%</div>
                <div id="enter" className="pointer-events-none">Enter World</div>
            </div>
        </div>
    )
};
const Video = ({ setShowCollection }) => {

    const [video] = useState(() => {
        const vid = document.getElementById("home-video");
        vid.crossOrigin = "Anonymous";
        vid.muted = true;
        vid.playsInline;
        return vid;
    });

    const [videoTransition] = useState(() => {
        const vid = document.getElementById("videoTransition");
        vid.crossOrigin = "Anonymous";
        vid.muted = true;
        vid.playsInline;
        return vid;
    });

    useEffect(() => {
        const c = document.getElementById("c");
        c.addEventListener('click', () => {
            setTimeout(() => {
                ref.current.position.z = 10;
            }, 500);
            videoTransition.play();
            videoTransition.addEventListener('ended', () => {
                setShowCollection(true);
            });
        });
    }, []);

    const refTransition = useRef();
    const ref = useRef();
    const { viewport } = useThree();

    useEffect(() => {

        // const aspectRatio = 16 / 9;
        // const planeHeight = viewport.height;
        // const planeWidth = planeHeight / aspectRatio;

        if (ref.current) {
            ref.current.scale.set(viewport.width, viewport.height, 1.0);
        }

        if (refTransition.current) {

            refTransition.current.scale.set(viewport.width, viewport.height, 1.0);
        }
    }, [ref.current, refTransition.current]);

    return (
        <>
            <group>
                <mesh ref={ref} position={[0, 0, 0.1]}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial  >
                        <videoTexture args={[video]} attach="map" colorSpace={SRGBColorSpace} />
                    </meshBasicMaterial>
                </mesh>

                <mesh ref={refTransition} position={[0, 0, 0]}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial >
                        <videoTexture args={[videoTransition]} attach="map" colorSpace={SRGBColorSpace} />
                    </meshBasicMaterial>
                </mesh>
            </group>
        </>
    )
}

export default HomePage;
