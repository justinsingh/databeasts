import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DataBeastsProvider } from '../context/DataBeastsContext'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DataBeastsProvider>
        <Component {...pageProps} />
      </DataBeastsProvider>
    </ChakraProvider>
  )
}

export default MyApp