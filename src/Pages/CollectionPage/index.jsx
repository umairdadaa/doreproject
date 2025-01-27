import { useMemo, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Float, Gltf, useTexture } from "@react-three/drei";
import { SRGBColorSpace, Vector3, Euler, Quaternion, BackSide, RepeatWrapping } from "three";
import { Bug, Flower, Ring } from "./Models";
import { lerp } from "three/src/math/MathUtils";

const CollectionPage = ({ show }) => {
    const imgRef = useRef();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://worldofdore.com/wp-json/wc/v3/products?consumer_key=ck_c7136f692738319f1a9f79fa3de2973a6b5869c6&consumer_secret=cs_f5d27b93133ac424e9458f54a65e3a216d2ea885"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data && Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    console.log("No products found.");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const [activeItem, setActiveItem] = useState(0);
    const r = products.length * 10;
    const numItems = products.length;

    const items = useMemo(() => {
        const initItems = [];
        for (let i = 0; i < numItems; i++) {
            const angle = (i / numItems) * Math.PI * 2;
            const position = new Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r);
            const directionToOrigin = position.clone().negate().normalize(); // Vector pointing to the origin
            const quaternion = new Quaternion().setFromUnitVectors(
                new Vector3(0, 0, 1), // Default forward vector
                directionToOrigin
            );
            const rotation = new Euler().setFromQuaternion(quaternion);

            initItems.push({ position, rotation });
        }
        return initItems;
    }, [numItems, r]);

    const handleNext = () => { setActiveItem(item => (item + 1) % items.length) };
    const handlePrev = () => { setActiveItem(item => (item - 1 + items.length) % items.length) };

    // HACK: When the site loads, the background img fades out after 
    // 500 milliseconds to aid in the transition
    useEffect(() => {
        setTimeout(() => { imgRef.current.style.opacity = 0; }, 500);
    }, []);

    const [fov, setFov] = useState(22);

    useEffect(() => {
        const updateFov = () => {
            if (window.innerWidth < 768) {
                setFov(39);
            } else {
                setFov(18);
            }
        };

        updateFov();
        window.addEventListener("resize", updateFov);

        return () => {
            window.removeEventListener("resize", updateFov);
        };
    }, []);

    return (
        <div className={`text-white w-screen h-screen absolute top-0 left-0 overflow-hidden ${show ? "visible" : "invisible"} z-50`} >

            <img src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene 2 A.jpg" crossOrigin="anonymous" width={'1080'} height={1080} className="w-screen h-screen object-cover absolute top-0 left-0 z-20" ref={imgRef} />

            <img onClick={handlePrev} src='https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/img/left-arrow.png' alt='prev' className="absolute left-2 lg:left-10 top-1/2 -translate-y-1/2 w-28 cursor-pointer z-50" />
            <img onClick={handleNext} src='https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/img/right-arrow.png' alt='next' className="absolute right-2 lg:right-10 top-1/2 -translate-y-1/2 w-28 cursor-pointer z-50" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 font-sans font-bold text-lg lg:text-3xl z-50">{products.length > 0 && products[activeItem].name}</div>
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 font-sans font-bold text-lg lg:text-3xl z-50">{products.length > 0 && products[activeItem].price} AED</div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 font-sans font-bold text-base lg:text-3xl z-50">{products.length > 0 && products[activeItem].uagb_excerpt}</div>
            <button
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans font-bold text-xl hover:bg-white/40 border-2 border-whtie rounded-full px-10 py-2 z-50"
            >
                Pre Booking
            </button>

            <Canvas className="w-screen h-screen z-30" camera={{ fov: fov }}>
                <ambientLight />
                <Environment preset="city" />
                <CameraController active={activeItem} items={items} />
                <Models items={items} active={activeItem} />
                {/* <Background items={items} active={activeItem} /> */}
            </Canvas>
        </div>
    )
};

const Models = ({ items, active }) => {
    const ref = useRef([]);
    useFrame(({ pointer }) => {
        if (!ref.current || items.length <= 0) return;
        ref.current[active].rotation.y = lerp(ref.current[active].rotation.y, items[active].rotation.y - pointer.x * 0.5, 0.05);
    });

    return (
        <Float speed={5} rotationIntensity={0.3} floatIntensity={1} floatingRange={[0, 0.4]} >
            {
                items.map((item, idx) => {
                    const modelIndex = idx % 3;
                    switch (modelIndex) {
                        case 0:
                            return <Bug ref={el => ref.current[idx] = el} {...item} key={idx} />;
                        case 1:
                            return <Flower ref={el => ref.current[idx] = el} {...item} scale={3.0} key={idx} />;
                        case 2:
                            return <Gltf ref={el => ref.current[idx] = el} {...item} src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/nenya_galadriels_ring.glb" scale={0.008} key={idx} />;
                        default:
                            return null;
                    }
                })
            }
        </Float>
    )
};

const Background = ({ items, active }) => {

    const bgRef = useRef();
    const bgMap = useTexture("https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Final Website Look/Scene 2 A.jpg");
    bgMap.colorSpace = SRGBColorSpace;
    bgMap.wrapS = RepeatWrapping;
    bgMap.wrapT = RepeatWrapping;
    bgMap.repeat.set(10, 5);

    const { viewport } = useThree();

    // NOTE: Change this to alter the background movement based on mouse position.
    // Lower values results in smoother but slower animations
    // const t = 0.1;

    useFrame(({ camera, pointer }) => {
        // bgRef.current.rotation.y = camera.rotation.y;
        // bgRef.current.lookAt(0, 0,0);
        bgRef.current.rotation.y = lerp(bgRef.current.rotation.y, pointer.x * 0.02 + Math.PI / 2, 0.1); 
        bgRef.current.rotation.x = lerp(bgRef.current.rotation.x, pointer.y * 0.1, 0.1);
    });

    return <>
        <mesh ref={bgRef} position={[0, 0, 0]} renderOrder={-100} scale={400} rotation={[0, (Math.PI / 180) * 90, 0]}>
            <sphereGeometry args={[1, 128, 12]} />
            <meshBasicMaterial map={bgMap} side={BackSide}/>
        </mesh>
    </>;
}

const CameraController = ({ active, items }) => {
    const temp = useRef(new Vector3());
    const { scene } = useThree();
    const bgMap = useTexture("https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene 2 A.jpg");
    bgMap.colorSpace = SRGBColorSpace;
    scene.background = bgMap;

    useFrame(({ camera, pointer }) => {
        if (items.length <= 0) return;
        temp.current.lerp(items[active].position, 0.1);
        camera.lookAt(temp.current);
        camera.position.set(0, 0, 0);
        camera.updateProjectionMatrix();
    });
    return null;
};

export default CollectionPage;
