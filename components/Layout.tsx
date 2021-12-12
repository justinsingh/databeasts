import React from 'react';
import Head from 'next/head'
import faviconImage from '../public/databeasts_favicon.png'
import { Container, Box, Image } from '@chakra-ui/react'
import backgroundImage from '../public/webbackground-2.png'
import syncButtonImage from '../public/sync_button.png'
import unsyncButtonImage from '../public/sync_button.png'
import { useDataBeastsContext } from '../context/DataBeastsContext'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { userAddress, syncWallet, desyncWallet } = useDataBeastsContext();

  return (
    <Container maxW="100vw" bgImage={backgroundImage.src} bgAttachment="fixed" bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      <Head>
        <title>DataBeasts</title>
        <meta name="description" content="Interact With Your DataBeasts" />
        <link rel="icon" href={faviconImage.src} />
      </Head>
      <Box cursor="pointer" pos="absolute" top={5} right={5}>
        <Image 
          src={typeof userAddress === 'undefined' ? syncButtonImage.src : unsyncButtonImage.src}
          onClick={typeof userAddress === 'undefined' ? syncWallet : desyncWallet} 
          width={[61, 90, 110]} height={[27, 41, 50]} 
          userSelect="none" 
        />
      </Box>
      {children}
    </Container>
  )
}

export default Layout;