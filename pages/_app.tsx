import '../styles/globals.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { DataBeastsProvider } from '../context/DataBeastsContext'
import { ChakraProvider } from '@chakra-ui/react'
const Layout = dynamic(
  () => import('../components/Layout'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DataBeastsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataBeastsProvider>
    </ChakraProvider>
  )
}

export default MyApp