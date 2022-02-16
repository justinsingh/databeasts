// @ts-nocheck
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model(props: any) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/3D_models/minecraft_diamond_axe/diamondAxe.gltf')

  const meshes = () => {
    return (
      <>
        <mesh geometry={nodes.mesh_0.geometry} material={materials["Material.001"]} />
        <mesh geometry={nodes.mesh_1.geometry} material={materials["Material.002"]} />
        <mesh geometry={nodes.mesh_2.geometry} material={materials["Material.003"]} />
        <mesh geometry={nodes.mesh_3.geometry} material={materials["Material.004"]} />
        <mesh geometry={nodes.mesh_4.geometry} material={materials["Material.005"]} />
        <mesh geometry={nodes.mesh_5.geometry} material={materials["Material.006"]} />
        <mesh geometry={nodes.mesh_6.geometry} material={materials["Material.007"]} />
        <mesh geometry={nodes.mesh_7.geometry} material={materials["Material.008"]} />
        <mesh geometry={nodes.mesh_8.geometry} material={materials["Material.009"]} />
      </>
    )
  }

  return (
    <group ref={group} dispose={null} {...props} >
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>

      </group>
    </group>
  )
}

useGLTF.preload("/3D_models/minecraft_diamond_axe/diamondAxe.gltf")