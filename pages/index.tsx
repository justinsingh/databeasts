import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import ImageCard from '../components/ImageCard'
import { useDataBeastsContext } from '../context/DataBeastsContext'
import aboutImage from '../public/about.gif'
import discordImage from '../public/discord.gif'
import shopImage from '../public/shop.gif'
import twitterImage from '../public/twitter.gif'
import viewImage from '../public/view.gif'
import { VStack, Center, Wrap, WrapItem, Fade } from '@chakra-ui/react'
import About from '../components/About'
import Head from 'next/head'
import metaTitleImage from '../public/databeasts_title_meta_image.png'
import faviconImage from '../public/databeasts_favicon.png'

const Home: NextPage = () => {
  const { userAddress } = useDataBeastsContext();
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const toggleShowAbout = () => {
    setShowAbout(!showAbout);
  }

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
      <Center>
        <VStack width={["80%", "100%", "100%"]} pb={0} spacing={[5, 75]}>
          <Wrap maxW={"75vw"} spacing={[4, 6, 7]} justify="center">
            <WrapItem onClick={() => toggleShowAbout()}>
              <ImageCard imageSrc={aboutImage.src} imageAlt="About DataBeasts" caption="About" />
            </WrapItem>

            <WrapItem>
              {typeof userAddress === 'undefined' ?
                <ImageCard imageSrc={viewImage.src} imageAlt="View Your DataBeasts" caption="View" isSyncAlert />
                :
                <Link href={"/collection/" + userAddress} passHref>
                  <ImageCard imageSrc={viewImage.src} imageAlt="View Your DataBeasts" caption="View" />
                </Link>
              }
            </WrapItem>

            <WrapItem>
              <ImageCard imageSrc={shopImage.src} imageAlt="Buy DataBeasts" caption="Shop" href="https://objkt.com/profile/databeasts/created" />
            </WrapItem>

            <WrapItem>
              <ImageCard imageSrc={discordImage.src} imageAlt="DataBeasts Discord" caption="Discord" href="http://discord.gg/Rn7YQqPhsm" />
            </WrapItem>

            <WrapItem>
              <ImageCard imageSrc={twitterImage.src} imageAlt="DataBeasts Twitter" caption="Twitter" href="https://mobile.twitter.com/databeasts" />
            </WrapItem>
          </Wrap>

          {showAbout && (
            <Fade in={showAbout}>
              <About />
            </Fade>
          )}
        </VStack>
      </Center>
    </>
  )
}

export default Home