import { useRef } from 'react'
import type { NextPage } from 'next'
import { Box, VStack } from '@chakra-ui/react'
import { Canvas } from '@react-three/fiber'
import Eli from '../components/models/Eli'
import { Ground } from '../components/models/Ground'
import { Player } from '../components/models/Player'
import { Text } from '@react-three/drei'

import { PointerLockControls, OrbitControls, Environment, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import { Physics } from '@react-three/cannon'

const Light = () => {
  return (
    <>
      <ambientLight args={[0xff0000]} intensity={0.1} />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
    </>
  )
}

const Cube = (props: any) => {
  const ref = useRef();
  return (
    <group ref={ref} {...props}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}

const Play: NextPage = () => {
  return (
    <VStack>
      <Box alignItems="center" width={["80vw"]} height={["80vh"]}>
        <Canvas
          shadows
          gl={{ alpha: false }}
          camera={{ fov: 45 }}
          raycaster={{
            computeOffsets: (e) => ({ offsetX: e.target.width / 2, offsetY: e.target.height / 2 }),
          }}
        >
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Physics gravity={[0, -30, 0]}>
            <Player />
            <Eli position={[0, 0, -10]} />
            <Ground />
          </Physics>
          <PointerLockControls />
        </Canvas>
      </Box>
    </VStack>
  )
}

export default Play
