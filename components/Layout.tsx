import React from 'react';
import Head from 'next/head'
import faviconImage from '../public/databeasts_favicon.png'
import { Container } from '@chakra-ui/react'
import backgroundImage from '../public/webbackground.png'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxW="100vw" bgImage={backgroundImage.src} bgAttachment="fixed" bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      <Head>
        <title>DataBeasts</title>
        <meta name="description" content="Interact With Your DataBeasts" />
        <link rel="icon" href={faviconImage.src} />
      </Head>
      {children}
    </Container>
  )
}

export default Layout;