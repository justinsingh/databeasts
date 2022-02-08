// @ts-nocheck
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model(props: any) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/3D_models/minecraft_diamond_axe/diamondAxe.gltf')
  console.log(nodes);
  console.log(materials);
  return (
    <group ref={group} dispose={null} {...props}>
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials.material_2} />
        <mesh geometry={nodes.mesh_1.geometry} material={materials.material_3} />
      </group>
    </group>
  )
}

useGLTF.preload("/3D_models/minecraft_diamond_axe/diamondAxe.gltf")