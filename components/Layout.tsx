import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import faviconImage from '../public/databeasts_favicon.png'
import { Container, Box, Image, HStack, Center } from '@chakra-ui/react'
import backgroundImage from '../public/webbackground-2.png'
import syncButtonImage from '../public/sync_button.png'
import unsyncButtonImage from '../public/unsync_button.png'
import { useDataBeastsContext } from '../context/DataBeastsContext'
import titleImage from '/public/databeasts_website_gif.gif'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { userAddress, syncWallet, desyncWallet } = useDataBeastsContext();

  return (
    <Container overflow="hidden" maxW="100%" minH="100%" p={0} m={0}>
      <Box zIndex={-1} position="fixed" width="100%" height="100%" bgImage={backgroundImage.src} bgSize="cover" bgPosition="center" bgRepeat="no-repeat"></Box>
      <Head>
        <title>DataBeasts</title>
        <meta name="description" content="Interact With Your DataBeasts" />
        <link rel="icon" href={faviconImage.src} />
      </Head>
      <Center>
        <Box mt={10} mb={10} maxW="850px">
          <Link href="/">
            <Image cursor="pointer" width={[300, 600, 850]} height={[150, 300, 425]} src={titleImage.src} alt="DataBeasts Title Image" />
          </Link>
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