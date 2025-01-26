import { useMemo, useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Gltf, useTexture } from "@react-three/drei";
import { SRGBColorSpace, Vector3, Euler, Quaternion } from "three";
import { Bug, Flower } from "./Models";
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
                    console.log(data);
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

    const handlePreBooking = product => {
        const url = `https://worldofdore.com/cart/?product_name=${encodeURIComponent(product.name)}&price=${1}&quantity=${product.price}`;
        window.location.href = url;
    };

    return (
        <div className={`text-white w-screen h-screen absolute top-0 left-0 overflow-hidden ${show ? "visible" : "invisible"} z-50`} >

            <img src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene 2 A.jpg" crossOrigin="anonymous" width={'1080'} height={1080} className="w-screen h-screen object-cover absolute top-0 left-0 z-20" ref={imgRef} />

            <img onClick={handlePrev} src='https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/img/left-arrow.png' alt='prev' className="absolute left-10 top-1/2 -translate-y-1/2 w-28 cursor-pointer z-50" />
            <img onClick={handleNext} src='https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/img/right-arrow.png' alt='next' className="absolute right-10 top-1/2 -translate-y-1/2 w-28 cursor-pointer z-50" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 font-sans font-bold text-3xl z-50">{products.length > 0 && products[activeItem].name}</div>
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 font-sans font-bold text-3xl z-50">{products.length > 0 && products[activeItem].price} AED</div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 font-sans font-bold text-3xl z-50">{products.length > 0 && products[activeItem].uagb_excerpt}</div>
            <button
                onClick={() => handlePreBooking(products[activeItem])}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans font-bold text-xl hover:bg-white/40 border-2 border-white rounded-full px-10 py-2 z-50"
            >
                Pre Booking
            </button>

            <Canvas className="w-screen h-screen z-30" camera={{ fov: 22 }}>
                <ambientLight />
                <Environment preset="city" />
                <CameraController active={activeItem} items={items} />
                <Models items={items} active={activeItem} />
                {/* <Background items={items} active={activeItem} /> */}
            </Canvas>
        </div>
    )
};

CollectionPage.propTypes = {
    show: PropTypes.bool.isRequired,
};


const Models = ({ items, active, handlePreBooking }) => {
    const ref = useRef([]);
    useFrame(({ pointer }) => {
        if (!ref.current) return;
        ref.current[active].rotation.y = lerp(ref.current[active].rotation.y, items[active].rotation.y - pointer.x * 0.5, 0.05);
    });

    return (
        <Float speed={5} rotationIntensity={0.3} floatIntensity={1} floatingRange={[0, 0.4]} >
            {
                items.map((item, idx) => {
                const modelIndex = idx % 3;
                    switch (modelIndex) {
                        case 0:
                            return <Bug ref={el => ref.current[idx] = el} {...item} />;
                        case 1:
                            return <Flower ref={el => ref.current[idx] = el} {...item} scale={3.0} />;
                        case 2:
                            return <Gltf ref={el => ref.current[idx] = el} {...item} src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/nenya_galadriels_ring.glb" scale={0.008} />;
                        default:
                            return null;
                    }
                })
            }
        </Float>
    );
};

Models.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.instanceOf(Vector3).isRequired,
        rotation: PropTypes.instanceOf(Euler).isRequired,
    })).isRequired,
    active: PropTypes.number.isRequired,
};

const CameraController = ({ active, items }) => {
    const temp = useRef(new Vector3());
    const { scene } = useThree();
    const bgMap = useTexture("https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene 2 A.jpg");
    bgMap.colorSpace = SRGBColorSpace;
    scene.background = bgMap;

    useFrame(({ camera }) => {
        if (items.length <= 0) return;
        temp.current.lerp(items[active].position, 0.1);
        camera.lookAt(temp.current);
        camera.position.set(0, 0, 0);
        camera.updateProjectionMatrix();
    });
    return null;
};

CameraController.propTypes = {
    active: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.instanceOf(Vector3).isRequired,
        rotation: PropTypes.instanceOf(Euler).isRequired,
    })).isRequired,
};

export default CollectionPage;
