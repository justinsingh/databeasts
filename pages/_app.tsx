import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DataBeastsProvider } from '../context/DataBeastsContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataBeastsProvider>
      <Component {...pageProps} />
    </DataBeastsProvider>
  )
}

export default MyApp