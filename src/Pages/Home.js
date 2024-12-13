import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const FullScreenBackground = () => {
  const mountRef = useRef(null);
  const logoRef = useRef(null); // Reference for the logo
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const butterflies = useRef([]); // Store butterfly references

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

    // Load a static JPG texture for the background
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

    // Butterfly model loading
    const butterflyLoader = new GLTFLoader();
    const butterflyCount = 10; // Number of butterflies to be created
    for (let i = 0; i < butterflyCount; i++) {
      butterflyLoader.load('/butterfly.glb', (gltf) => {
        const butterfly = gltf.scene;
        butterfly.scale.set(0.1, 0.1, 0.1);
        butterfly.position.set(
          Math.random() * 10 - 5,  // Random position within the screen space
          Math.random() * 10 - 5,
          Math.random() * 5 - 2
        );
        scene.add(butterfly);
        butterflies.current.push(butterfly);
      }, undefined, (error) => {
        console.error('Error loading butterfly model', error);
      });
    }

    // Mouse Interaction (to rotate the logo)
    document.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Rotate the logo based on mouse position
      if (logoRef.current && isModelLoaded) {
        logoRef.current.rotation.y = mouseX * Math.PI * 0.1;
        logoRef.current.rotation.x = mouseY * Math.PI * 0.1;
      }
    });

    // Butterfly Movement Animation
    const moveButterflies = () => {
      butterflies.current.forEach((butterfly) => {
        if (butterfly) {
          // Random butterfly movement logic (simulate natural flight)
          butterfly.position.x += Math.random() * 0.1 - 0.05; // Small random movements
          butterfly.position.y += Math.random() * 0.1 - 0.05;
          butterfly.position.z += Math.random() * 0.1 - 0.05;
          
          // Make sure butterflies stay within the scene boundaries
          if (butterfly.position.x > 5 || butterfly.position.x < -5) butterfly.position.x = Math.random() * 10 - 5;
          if (butterfly.position.y > 5 || butterfly.position.y < -5) butterfly.position.y = Math.random() * 10 - 5;
          if (butterfly.position.z > 5 || butterfly.position.z < -5) butterfly.position.z = Math.random() * 5 - 2;
        }
      });
    };

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      moveButterflies(); // Call butterfly movement function
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      document.removeEventListener('mousemove', () => {});
    };
  }, [isModelLoaded]);

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
  );
};

export default FullScreenBackground;
