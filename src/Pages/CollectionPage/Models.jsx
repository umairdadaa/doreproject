import { forwardRef } from "react";
import { useGLTF, Gltf } from "@react-three/drei";

export const Flower = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/models/modelOne.glb')
    return (
        <group {...props} dispose={null} ref={ref} scale={10.0}>
            <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} rotation={[0, -Math.PI , 0]} />
        </group>
    )
});

export const Bug = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/models/bug 2-transformed.glb')
    return (
        <group {...props} dispose={null} ref={ref} scale={1.5} >
            <group rotation={[0, Math.PI, 0]}>
                <mesh geometry={nodes.Box002.geometry} material={nodes.Box002.material} />
                <mesh geometry={nodes.Gem.geometry} material={materials.Ring_Crystal} />
                <mesh geometry={nodes.Line001.geometry} material={nodes.Line001.material} />
                <mesh geometry={nodes.Line049.geometry} material={nodes.Line049.material} />
            </group>
        </group>
    )
});

export const Ring = forwardRef((props, ref) => {
    return (
        <group {...props} ref={ref}>
            <Gltf src="https://pub-c2bb244c4b2641f99eb92df5396cefa1.r2.dev/doji_diamond_ring.glb" scale={20} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
    )
})
