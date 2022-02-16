// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useState } from 'react'

export default function Eli(props: any) {
  const group = useRef()
  const { nodes, materials, animations, scene } = useGLTF('/3D_models/beasts/640027.glb')
  const { actions } = useAnimations(animations, group)
  const [ displayName, setDisplayName ] = useState<Boolean>(false);
  /*
  const mixer = new THREE.AnimationMixer(scene);
  animations.forEach(clip => {
    const action = mixer.clipAction(clip)
    action.play();
  });

  useFrame((state, delta) => {
    mixer.update(delta)
  })
  */

  return (
    <>
      <group ref={group} {...props} dispose={null} rotation={[0, 3.1, 0]} onPointerEnter={() => setDisplayName(true)} onPointerLeave={() => setDisplayName(false)}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder130.geometry}
          material={nodes.Cylinder130.material}
          position={[0, 0.91, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[0.37, 0.15, 0.37]}>
          { displayName && <Text position={[0, 3, 0]} fontSize={1} anchorX="center" anchorY="top-baseline">ELI</Text> }
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube260.geometry}
            material={nodes.Cube260.material}
            position={[-0.72, 0.47, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube264.geometry}
            material={nodes.Cube264.material}
            position={[0.72, 0.47, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube437.geometry}
            material={nodes.Roundcube437.material}
            position={[0.6, -4.61, -0.28]}
            scale={[0.65, 0.98, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube438.geometry}
            material={nodes.Roundcube438.material}
            position={[-0.88, -2.04, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube440.geometry}
            material={nodes.Roundcube440.material}
            position={[-0.6, -4.61, -0.28]}
            scale={[0.65, 0.98, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone040.geometry}
            material={nodes.Cone040.material}
            position={[0, -1.7, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone041.geometry}
            material={nodes.Cone041.material}
            position={[0, -1.7, 0]}
            rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cone042.geometry}
            material={nodes.Cone042.material}
            position={[0, -1.7, 0]}
            rotation={[Math.PI, -Math.PI / 4, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube261_1.geometry}
            material={materials['eyes.004']}
            position={[0, -0.77, 1.01]}
            rotation={[0.03, 0, 0]}
            scale={[0.05, 0.11, 0.05]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder131.geometry}
            material={nodes.Cylinder131.material}
            position={[0, 0, 0]}
            rotation={[0.83, 0, 0]}
            scale={[0.19, 0.33, 0.39]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube434.geometry}
            material={materials['eyes.001']}
            position={[0, -0.47, 0.97]}
            scale={[0.21, 1.18, 0.21]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube439.geometry}
            material={nodes.Roundcube439.material}
            position={[0.88, -2.04, 0]}
          />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload('/3D_models/beasts/640027.glb')