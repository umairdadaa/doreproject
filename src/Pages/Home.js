import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const FullScreenBackground = () => {
  const mountRef = useRef(null);
  const logoRef = useRef(null); // Reference for the logo
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    sceneRef.current = scene;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Load a JPG texture for the background
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/menu_Background.jpeg', (texture) => {
      scene.background = texture; // Set the background to the loaded texture
    }, undefined, (error) => {
      console.error('Error loading background texture', error);
    });

    const loader = new GLTFLoader();
    let logo;

    // Load Logo model (this is your 3D model)
    loader.load('/logo.glb', (gltf) => {
      logo = gltf.scene;
      logo.scale.set(0.3, 0.3, 0.3);
      scene.add(logo);
      logoRef.current = logo;
      setIsModelLoaded(true);
    }, undefined, (error) => {
      console.error('Error loading logo model', error);
    });

    // Mouse Interaction
    let mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the logo based on mouse movement
      if (logoRef.current && isModelLoaded) {
        logoRef.current.rotation.y = mouse.x * Math.PI * 0.1;
        logoRef.current.rotation.x = mouse.y * Math.PI * 0.1;
      }

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      document.removeEventListener('mousemove', () => {});
    };
  }, [isModelLoaded]);

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}>
      {!isModelLoaded && <div>Loading model...</div>}
    </div>
  );
};

export default FullScreenBackground;
