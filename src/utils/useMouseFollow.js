import { useEffect, useRef } from 'react';

const useMouseFollow = (ringRef, sphereRef) => {
  // Target values for smooth interpolation
  const targetRotation = useRef({ x: 0, y: 0 });
  // Current values that will be lerped
  const currentRotation = useRef({ x: 0, y: 0 });
  // Mouse position
  const mousePosition = useRef({ x: 0, y: 0 });

  // Smoothing factor (0-1). Lower = smoother but slower
  const smoothFactor = 0.05;

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      // Convert mouse position to normalized coordinates (-1 to 1)
      mousePosition.current.x = (clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(clientY / window.innerHeight) * 2 + 1;

      // Set target rotations based on mouse position
      targetRotation.current.x = mousePosition.current.y * 0.5;
      targetRotation.current.y = mousePosition.current.x * 0.5;
    };

    const animate = () => {
      // Lerp current values toward target values
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * smoothFactor;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * smoothFactor;

      // Apply rotations to objects
      if (ringRef.current) {
        ringRef.current.rotation.y = currentRotation.current.y * 2;
      }

      if (sphereRef.current) {
        sphereRef.current.rotation.x = currentRotation.current.x * 0.3; // Reduced multiplier for subtler effect
        sphereRef.current.rotation.y = currentRotation.current.y * 0.3;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation loop
    animate();

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ringRef, sphereRef]);
};

export default useMouseFollow;
