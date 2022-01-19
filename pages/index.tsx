import type { NextPage } from 'next'
import Link from 'next/link'
import ImageCard from '../components/ImageCard'
import { useDataBeastsContext } from '../context/DataBeastsContext'
import aboutImage from '../public/about.gif'
import discordImage from '../public/discord.gif'
import shopImage from '../public/shop.gif'
import twitterImage from '../public/twitter.gif'
import viewImage from '../public/view.gif'
import { Center, Stack, Wrap, WrapItem} from '@chakra-ui/react'

const Home: NextPage = () => {
  const { userAddress, userTezosDomain } = useDataBeastsContext();

  return (
    <Center>
      <Stack width={["80%", "100%", "100%"]} pb={3}>
        <Wrap spacing={[4, 6, 7]} justify="center">
          <WrapItem>
            <Link href="/about" passHref>
              <ImageCard imageSrc={aboutImage.src} imageAlt="About DataBeasts" caption="About" />
            </Link>
          </WrapItem>

          <WrapItem>
            {typeof userAddress === 'undefined' ?
              <ImageCard imageSrc={viewImage.src} imageAlt="View Your DataBeasts" caption="View" isSyncAlert />
              :
              <Link href={"/collection/" + (typeof userTezosDomain === 'undefined' ? userAddress : userTezosDomain)} passHref>
                <ImageCard imageSrc={viewImage.src} imageAlt="View Your DataBeasts" caption="View" />
              </Link>
            }
          </WrapItem>

          <WrapItem>
            <ImageCard imageSrc={shopImage.src} imageAlt="Buy DataBeasts" caption="Shop" href="https://objkt.com/profile/databeasts/created" />
          </WrapItem>

          <WrapItem>
            <ImageCard imageSrc={discordImage.src} imageAlt="DataBeasts Discord" caption="Discord" href="http://discord.gg/gXd7FHn4" />
          </WrapItem>

          <WrapItem>
            <ImageCard imageSrc={twitterImage.src} imageAlt="DataBeasts Twitter" caption="Twitter" href="https://mobile.twitter.com/databeasts" />
          </WrapItem>
        </Wrap>
      </Stack>
    </Center>
  )
}

export default Home