import { useRouter } from "next/dist/client/router"
import type { NextPage } from 'next'
import Collection from "../../components/Collection"
import { Box, VStack, Image } from "@chakra-ui/react"

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <VStack spacing={0}>
      {router.isReady && (<Collection address={address} />)}
    </VStack>
  )
}

export default CollectionPage;