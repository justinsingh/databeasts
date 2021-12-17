import { useRouter } from "next/dist/client/router"
import type { NextPage } from 'next'
import Collection from "../../components/Collection"
import { Box, VStack, Image } from "@chakra-ui/react"

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <VStack spacing={10}>
      <Box>
        {router.isReady && (<Collection address={address} />)}
      </Box>
    </VStack>
  )
}

export default CollectionPage;