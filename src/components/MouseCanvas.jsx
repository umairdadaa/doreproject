import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';

const MouseCanvas = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-transparent z-10">
            <Canvas className='w-full h-full bg-transparent'>
                <EffectComposer>
                    <Fluid
                        rainbow={false}
                        fluidColor="hotpink"
                        showBackground={false}
                        // blend={1.0}
                        velocityDissipation={1.0}
                        radius={0.3}
                        curl={15.0}
                        pressure={0.7}
                        intensity={1}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};
export default MouseCanvas;
