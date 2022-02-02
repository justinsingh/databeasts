import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import faviconImage from '../public/databeasts_favicon.png'
import { Container, Box, Image, Center } from '@chakra-ui/react'
import backgroundImage from '../public/webbackground-2.png'
import syncButtonImage from '../public/sync_button.png'
import unsyncButtonImage from '../public/unsync_button.png'
import { useDataBeastsContext } from '../context/DataBeastsContext'
import titleImage from '../public/databeasts_website_gif.gif'
import metaTitleImage from '../public/databeasts_title_meta_image.png'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { userAddress, syncWallet, desyncWallet } = useDataBeastsContext();

  return (
    <Container overflow="hidden" maxW="100vw" minH="100vh" p={0} m={0}>
      <Box zIndex={-1} position={["fixed", "fixed"]} width="100vw" height={["100vh", "100vh"]} bgImage={backgroundImage.src} bgSize="cover" bgPosition="center" bgRepeat="repeat"></Box>
      
      <Center>
        <Box mt={[4, 0]} mb={2} maxW={["85vw", "45vw"]}>
          <Center>
            <Link href="/">
              <Image cursor="pointer" width="100%" height="100%" src={titleImage.src} alt="DataBeasts Title Image" />
            </Link>
          </Center>
        </Box>
      </Center>

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