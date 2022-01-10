import React from 'react';
import Head from 'next/head'
//import Link from 'next/link'
import faviconImage from '../public/databeasts_favicon.png'
import { Container, Box, Image, HStack, Center } from '@chakra-ui/react'
//import backgroundImage from '../public/webbackground-2.png'
//import syncButtonImage from '../public/sync_button.png'
//import unsyncButtonImage from '../public/unsync_button.png'
//import { useDataBeastsContext } from '../context/DataBeastsContext'
//import titleImage from '/public/databeasts_website_gif.gif'
import metaTitleImage from '../public/databeasts_title_meta_image.png'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxW="100vw" minH="100vh">
      <Head>
        <title>DataBeasts</title>
        <meta name="description" content="Interact With Your DataBeasts" />
        <link rel="icon" href={faviconImage.src} />
        <title>DataBeasts</title>
        <meta name="title" content="DataBeasts" />
        <meta name="description" content="View and share your DataBeasts collection." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.databeasts.xyz/" />
        <meta property="og:title" content="DataBeasts" />
        <meta property="og:description" content="View and share your DataBeasts collection." />
        <meta property="og:image" content={metaTitleImage.src} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.databeasts.xyz/" />
        <meta property="twitter:title" content="DataBeasts" />
        <meta property="twitter:description" content="View and share your DataBeasts collection." />
        <meta property="twitter:image" content={metaTitleImage.src} />
      </Head>
      {children}
    </Container>
  )
}

export default Layout;