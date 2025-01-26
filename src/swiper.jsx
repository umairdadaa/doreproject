import { Swiper, SwiperSlide } from 'swiper/react';
import { Canvas } from '@react-three/fiber';
import { Gltf, OrbitControls } from '@react-three/drei';
import config from './assets/config';

const SliderWith3DModel = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {/* Swiper Slider for Background Images */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        effect='fade'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        {config.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${item.texturePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 3D Model Rendering */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
        }}
      >
        <Canvas>
          {config.map((item, index) => (
            <Gltf
              key={index}
              src={item.src}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
            />
          ))}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default SliderWith3DModel;
