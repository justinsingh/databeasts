import { useRouter } from "next/dist/client/router"
import type { NextPage } from 'next'
import Collection from "../../components/Collection"
import { Box, VStack, Image } from "@chakra-ui/react"
import titleImage from '/public/databeasts_website_gif.gif'

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <VStack p={10} spacing={10}>
      <Box maxW="850px">
        <Image width={[300, 600, 850]} height={[150, 300, 425]} src={titleImage.src} alt="DataBeasts Title Image" />
      </Box>

      <Box>
        {router.isReady && (<Collection address={address} />)}
      </Box>
    </VStack>
  )
}

export default CollectionPage;