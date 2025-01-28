import { useMemo, useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment, Float, useTexture } from "@react-three/drei";
import { Vector3, Euler, Quaternion, TextureLoader, SRGBColorSpace } from "three";
import bugImg from '../../../public/assets/Ziggy.png';  // Local import for bug image
import flowerImg from '../../../public/assets/Zeke.png';  // Local import for flower image
import ringImg from '../../../public/assets/Zeke.png';  // Local import for ring image
import { lerp } from "three/src/math/MathUtils";

import Améthia from '../../../public/assets/Améthia.png';  // Local import for ring image
import Aurélia from '../../../public/assets/Aurélia.png';  // Local import for ring image
import Bella from '../../../public/assets/Bella.png';  // Local import for ring image
import Buzzy from '../../../public/assets/Buzzy.png';  // Local import for ring image
import CallaLilly from '../../../public/assets/Calla Lilly.png';  // Local import for ring image
import Flitzy from '../../../public/assets/Flitzy.png';  // Local import for ring image
import Orabella from '../../../public/assets/Orabella.png';  // Local import for ring image
import Orphée from '../../../public/assets/Orphée.png';  // Local import for ring image
import Rosella from '../../../public/assets/Rosella.png';  // Local import for ring image
import Zeke from '../../../public/assets/Zeke.png';  // Local import for ring image
import Ziggy from '../../../public/assets/Ziggy.png';  // Local import for ring image

const CollectionPage = ({ show }) => {
    const imgRef = useRef();
    const [products, setProducts] = useState([]);
    const [paused, setPaused] = useState(false);  // To control the animation state
    const [scaleFactor] = useState(1);  // To control the size increase of models

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://shop.worldofdore.com/wp-json/wc/v3/products?consumer_key=ck_c7136f692738319f1a9f79fa3de2973a6b5869c6&consumer_secret=cs_f5d27b93133ac424e9458f54a65e3a216d2ea885&per_page=50"
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

    useEffect(() => {
        setTimeout(() => { imgRef.current.style.opacity = 0; }, 500);
    }, []);
    
    const handlePreBooking = (product) => {
        console.log("Pre-booking clicked for product:", product);
        if (!product || !product.id) {
            console.error("Product ID is required for pre-booking.");
            return;
        }
    
        const url = product.permalink;
        window.location.href = url; 
    };

    const toggleAnimation = () => {
        setPaused(prev => !prev);  // Toggle the paused state
    };

    return (
        <div className={`text-white w-screen h-screen absolute top-0 left-0 overflow-hidden ${show ? "visible" : "invisible"} z-50`} >
            <img src={`https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene 2 A.jpg?cacheBust=${Math.floor(Date.now() / 10000)}`} crossOrigin="anonymous" width={'1080'} height={1080} className="w-screen h-screen object-cover absolute top-0 left-0 z-20" ref={imgRef} />
            <img onClick={handlePrev} src={`https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/img/left-arrow.png?cacheBust=${Math.floor(Date.now() / 10000)}`} alt='prev' className="absolute left-1 top-[63%] -translate-y-1/2 w-28 cursor-pointer z-50 md:left-10 md:top-1/2" />
            <img onClick={handleNext} src={`https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/img/right-arrow.png?cacheBust=${Math.floor(Date.now() / 10000)}`} alt='next' className="absolute right-1 top-[63%] -translate-y-1/2 w-28 cursor-pointer z-5 md:right-10 md:top-1/2" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 font-sans font-bold text-3xl z-50">{products.length > 0 && products[activeItem].name}</div>
            <div className="absolute bottom-[10rem] left-1/2 -translate-x-1/2 z-50 w-full md:bottom-28 md:w-auto">
                <div className="font-bold text-3xl text-center mb-2">{products.length > 0 && products[activeItem].price} AED</div>
                <div className="font-bold text-center text-1">{products.length > 0 && products[activeItem].uagb_excerpt}</div>
            </div>
            <button
                onClick={() => handlePreBooking(products[activeItem])}
                className="absolute bottom-[6.5rem] left-1/2 -translate-x-1/2 font-sans font-bold text-xl hover:bg-white/40 border-2 border-white rounded-full px-10 py-2 z-50 md:bottom-10"
            >
                Pre Book
            </button>

            <button
                onClick={toggleAnimation}
                className="absolute top-10 right-10 text-xl font-bold bg-blue-500 text-white p-2 rounded-full"
            >
                {paused ? "Start Animation" : "Stop Animation"}
            </button>

            <Canvas className="w-screen h-screen z-30" camera={{ fov: 22 }}>
                <ambientLight />
                <Environment preset="city" />
                <CameraController active={activeItem} items={items} />
                <Models items={items} active={activeItem} paused={paused} scaleFactor={scaleFactor} productName={products[activeItem]?.name} />
            </Canvas>
        </div>
    )
};

CollectionPage.propTypes = {
    show: PropTypes.bool.isRequired,
};

const Models = ({ items, active, paused, scaleFactor, productName }) => {
    const ref = useRef([]);

    // Load textures using local image imports
    const FlitzyTexture = useLoader(TextureLoader, Flitzy);
    const RosellaTexture = useLoader(TextureLoader, Rosella);
    const OrphéeTexture = useLoader(TextureLoader, Orphée);
    const ZekeTexture = useLoader(TextureLoader, Zeke);
    const CallaLillyTexture = useLoader(TextureLoader, CallaLilly);
    const BellaTexture = useLoader(TextureLoader, Bella);
    const BuzzyTexture = useLoader(TextureLoader, Buzzy);
    const OrabellaTexture = useLoader(TextureLoader, Orabella);
    const AuréliaTexture = useLoader(TextureLoader, Aurélia);
    const AméthiaTexture = useLoader(TextureLoader, Améthia);
    const ZiggyTexture = useLoader(TextureLoader, Ziggy);

    useFrame(({ pointer }) => {
        if (paused) return;  // Stop animation if paused
        if (!ref.current) return;
        ref.current[active].rotation.y = lerp(ref.current[active].rotation.y, items[active].rotation.y - pointer.x * 0.5, 0.05);
    });

    return (
        <Float speed={5} rotationIntensity={0.05} floatIntensity={1} floatingRange={[0, 0.4]} >
            {
                items.map((item, idx) => {

                    switch (productName) {
                        case 'Flitzy':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 10 * scaleFactor : 10 * scaleFactor, window.innerWidth < 768 ? 10 * scaleFactor : 15 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={FlitzyTexture} />
                                </sprite>
                            );
                        case 'Rosella':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 15 * scaleFactor : 25 * scaleFactor, window.innerWidth < 768 ? 20 * scaleFactor : 30 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={RosellaTexture} />
                                </sprite>
                            );
                        case 'Orphée':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 20 * scaleFactor : 30 * scaleFactor, window.innerWidth < 768 ?  35 * scaleFactor : 45 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={OrphéeTexture} />
                                </sprite>
                            );
                        case 'Zeke':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={ZekeTexture} />
                                </sprite>
                            );
                        case 'Calla Lilly':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 15 * scaleFactor : 20 * scaleFactor, window.innerWidth < 768 ? 25 * scaleFactor : 25 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={CallaLillyTexture} />
                                </sprite>
                            );
                        case 'Bella':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={BellaTexture} />
                                </sprite>
                            );
                        case 'Buzzy':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ?  40 * scaleFactor : 60 * scaleFactor, window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={BuzzyTexture} />
                                </sprite>
                            );
                        case 'Orabella':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ?  20 * scaleFactor : 25 * scaleFactor, window.innerWidth < 768 ? 25 * scaleFactor : 35 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={OrabellaTexture} />
                                </sprite>
                            );
                        case 'Aurélia':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 20 * scaleFactor : 30 * scaleFactor, window.innerWidth < 768 ? 30 * scaleFactor : 45 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={AuréliaTexture} />
                                </sprite>
                            );
                        case 'Améthia':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 15 * scaleFactor : 20 * scaleFactor, window.innerWidth < 768 ? 25 * scaleFactor : 25 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={AméthiaTexture} />
                                </sprite>
                            );
                        case 'Ziggy':
                            return (
                                <sprite ref={el => ref.current[idx] = el} {...item} scale={[window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, window.innerWidth < 768 ? 40 * scaleFactor : 60 * scaleFactor, 1]} >
                                    <spriteMaterial attach="material" map={ZiggyTexture} />
                                </sprite>
                            );
                        
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
    paused: PropTypes.bool.isRequired,
    scaleFactor: PropTypes.number.isRequired,
};

const CameraController = ({ active, items }) => {
    const temp = useRef(new Vector3());
    const { scene } = useThree();
    const bgMap = useTexture(`https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/Scene 2 A.jpg?cacheBust=${Math.floor(Date.now() / 10000)}`);
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
