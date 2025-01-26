import { Suspense, useRef, useEffect } from 'react';
import { Gltf } from '@react-three/drei';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const ModelViewer = ({ modelPath, animationKey, currentState }) => {
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.position, {
        y: currentState === animationKey ? 0.6 : -4,
        duration: 1.5,
        ease: 'power2.out',
      });
    }
  }, [currentState, animationKey]);

  return (
    <Suspense fallback={null}>
      <Gltf
        ref={modelRef}
        src={modelPath}
        position={[0, -1.1, 1]}
        scale={0.055}
      />
    </Suspense>
  );
};

ModelViewer.propTypes = {
  modelPath: PropTypes.string.isRequired,
  animationKey: PropTypes.number.isRequired,
  currentState: PropTypes.number.isRequired,
};

export default ModelViewer;
