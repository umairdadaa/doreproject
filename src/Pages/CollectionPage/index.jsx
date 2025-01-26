import { useMemo, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, Gltf, useTexture } from "@react-three/drei";
import { SRGBColorSpace, Vector3 } from "three";
import { Bug, Flower, Ring } from "./Models";
import { lerp } from "three/src/math/MathUtils";

const CollectionPage = () => {

    const imgRef = useRef();

    const [activeItem, setActiveItem] = useState(0);
    const r = 10;
    const numItems = 4;

    const items = useMemo(() => {
        const initItems = [];
        for (let i = 0; i < numItems; i++) {
            initItems.push({ position: new Vector3(Math.cos((i / numItems) * Math.PI * 2) * r, 0, Math.sin((i / numItems) * Math.PI * 2) * r) });
        }
        return initItems;
    }, [numItems, r]);

    const handleNext = () => { setActiveItem(item => (item + 1) % items.length) };
    const handlePrev = () => { setActiveItem(item => (item - 1 + items.length) % items.length) };

    // // HACK: When the site loads, the background img fades out after 
    // // 500 milliseconds to aid in the transition
    useEffect(() => {
        setTimeout(() => { imgRef.current.style.opacity = 0; }, 500);
    }, []);

    return (
        <div className="text-white w-screen h-screen overflow-hidden relative">

            <img src="Final Website Look/Scene 2 A.jpg" width={'1080'} height={1080} className="w-screen h-screen object-cover absolute top-0 left-0 z-20" ref={imgRef} />

            <img onClick={handlePrev} src='img/left-arrow.png' alt='prev' className="absolute left-10 top-1/2 -translate-y-1/2 w-28 cursor-pointer z-50" />
            <img onClick={handleNext} src='img/right-arrow.png' alt='next' className="absolute right-10 top-1/2 -translate-y-1/2 w-28 cursor-pointer z-50" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 font-sans font-bold text-3xl z-50">Signature Collection</div>
            <button
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans font-bold text-xl hover:bg-white/40 border-2 border-whtie rounded-full px-10 py-2 z-50"
            >
                Pre Booking
            </button>

            <Canvas className="w-screen h-screen z-30" >
                <ambientLight />
                <Environment preset="city" />
                <CameraController active={activeItem} items={items} />
                <Models items={items} active={activeItem} />
                <Background items={items} active={activeItem} />
            </Canvas>
        </div>
    )
};

const Models = ({ items, active }) => {
    const ref = useRef([]);
    useFrame(({ pointer }) => {
        if (!ref.current) return;
        ref.current[active].rotation.y = lerp(ref.current[active].rotation.y, pointer.x * 0.5, 0.05);
    });

    return (
        <Float speed={5} rotationIntensity={0.3} floatIntensity={1} floatingRange={[0, 0.4]} >
            <Ring ref={el => ref.current[0] = el} position={items[0].position} />
            <Bug position={items[1].position} ref={el => ref.current[1] = el} />
            <Flower position={items[2].position} scale={3.0} rotation={[0, 0, 0]} ref={el => ref.current[2] = el} />
            <Gltf position={items[3].position} src="nenya_galadriels_ring.glb" scale={0.003} rotation={[0, 0, 0]} ref={el => ref.current[3] = el} />
        </Float>
    )
};

const Background = () => {

    const bgRef = useRef();
    const bgMap = useTexture("Final Website Look/Scene 2 A.jpg");
    bgMap.colorSpace = SRGBColorSpace;

    const { viewport } = useThree();

    useEffect(() => {
        if (bgRef.current) bgRef.current.scale.set(viewport.width * 4.0, viewport.height * 4.0, 1.0);
    }, [viewport, bgRef.current]);

    // NOTE: Change this to alter the background movement based on mouse position.
    // Lower values results in smoother but slower animations
    const t = 0.09;
    const origin = new Vector3(0, 0, 0);
    useFrame(({ camera }) => {
        const offsetMagnitude = 15;
        const cameraDirection = new Vector3(0, 0, -1).applyMatrix4(camera.matrixWorld);
        bgRef.current.position.lerp(camera.position.clone().add(cameraDirection.normalize().multiplyScalar(offsetMagnitude)), t);
        bgRef.current.lookAt(origin);
    });

    return <>
        <mesh ref={bgRef} >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={bgMap} />
        </mesh>
    </>;
}

const CameraController = ({ active, items }) => {
    const temp = useRef(new Vector3());
    useFrame(({ camera, pointer }) => {
        if (items.length <= 0) return;
        temp.current.lerp(items[active].position, 0.01);
        camera.lookAt(temp.current.add({x: pointer.x * 0.04, y: pointer.y * 0.04, z: 0}));
        camera.position.set(0, 0, 0);
    });
    return null;
};

export default CollectionPage;
