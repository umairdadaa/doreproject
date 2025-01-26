import { useState, useEffect, useRef } from 'react';
import { TextureLoader, LinearFilter, SRGBColorSpace, DoubleSide } from 'three';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { Suspense } from 'react';
import {
  Float,
  Gltf,
  MeshRefractionMaterial,
  useEnvironment,
  useGLTF,
} from '@react-three/drei';

const TransitioningPlanes = ({
  texturePaths,
  modelPaths,
  modelTransforms,
  currentIndex,
  nextIndex,
  transitioning,
  transitionDuration = 1,
  activePlaneRef,
  activeRingRef,
}) => {
  const [textures, setTextures] = useState([]);
  const textureLoader = useRef(new TextureLoader());
  const groupRef = useRef();

  // const { nodes, materials } = useGLTF('/3-stone-transformed.glb');
  const env = useEnvironment({
    files:
      'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr',
  });

  const [planeSize, setPlaneSize] = useState([
    (window.innerWidth * 1.5) / 100,
    (window.innerHeight * 1.5) / 100,
  ]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setPlaneSize([
        (window.innerWidth * 1.5) / 100,
        (window.innerHeight * 1.5) / 100,
      ]);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Load textures
  useEffect(() => {
    const loadTextures = async () => {
      try {
        const loadedTextures = await Promise.all(
          texturePaths.map(
            (path) =>
              new Promise((resolve, reject) => {
                textureLoader.current.load(
                  path,
                  (tex) => {
                    tex.colorSpace = SRGBColorSpace;
                    tex.minFilter = LinearFilter;
                    tex.magFilter = LinearFilter;
                    tex.needsUpdate = true;
                    resolve(tex);
                  },
                  undefined,
                  reject
                );
              })
          )
        );
        setTextures(loadedTextures);
      } catch (error) {
        console.error('Error loading textures:', error);
      }
    };

    loadTextures();
    return () => {
      textures.forEach((texture) => texture.dispose());
    };
  }, [texturePaths]);

  // Handle transitions
  useEffect(() => {
    if (!groupRef.current || !transitioning) return;

    const direction = nextIndex > currentIndex ? -1 : 1;
    const distance = planeSize[0];
    const currentPosition = groupRef.current.position.x || 0;

    if (nextIndex === 0) {
      gsap.to(groupRef.current.position, {
        x: 0,
        duration: transitionDuration,
        ease: 'power2.inOut',
      });
    } else {
      const targetPosition = currentPosition + direction * distance;

      gsap.to(groupRef.current.position, {
        x: targetPosition,
        duration: transitionDuration,
        ease: 'power2.inOut',
      });
    }
  }, [transitioning, currentIndex, nextIndex, planeSize, transitionDuration]);

  if (textures.length === 0) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {textures.map((texture, index) => {
        return (
          <group key={index}>
            {/* Plane */}
            <mesh
              ref={index === currentIndex ? activePlaneRef : null}
              position={[index * planeSize[0], 0, 0]}
            >
              <planeGeometry args={planeSize} />
              <meshBasicMaterial
                map={texture}
                transparent={true}
                // opacity={index === currentIndex ? 1 : 0.0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

TransitioningPlanes.propTypes = {
  texturePaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  modelPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  modelTransforms: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.arrayOf(PropTypes.number).isRequired,
      rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
      scale: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  nextIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  transitionDuration: PropTypes.number,
  activePlaneRef: PropTypes.object,
  activeRingRef: PropTypes.object,
};

export default TransitioningPlanes;
