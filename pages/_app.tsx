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
const Layout = dynamic(
  () => import('../components/Layout'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp