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
      {children}
    </Container>
  )
}

export default Layout;