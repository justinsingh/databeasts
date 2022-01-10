import '../styles/globals.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
//import DataBeastsProvider from '../context/DataBeastsContext'
/*
const DataBeastsProvider = dynamic(
  () => import ('../context/DataBeastsContext'),
  { ssr: false }
)
*/
import { ChakraProvider } from '@chakra-ui/react'
import faviconImage from '../public/databeasts_favicon.png'
import metaTitleImage from '../public/databeasts_title_meta_image.png'
import Head from 'next/head'
/*
const Layout = dynamic(
  () => import('../components/Layout'),
  { ssr: false }
)
*/

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
        <meta property="og:image" content="https://github.com/justinsingh/databeasts/blob/main/public/databeasts_title_meta_image.png?raw=true" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.databeasts.xyz/" />
        <meta property="twitter:title" content="DataBeasts" />
        <meta property="twitter:description" content="View and share your DataBeasts collection." />
        <meta property="twitter:image" content="https://github.com/justinsingh/databeasts/blob/main/public/databeasts_title_meta_image.png?raw=true" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp