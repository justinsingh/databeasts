import React from "react";
import { Flex, Box, Text, Center, VStack, HStack, Tooltip} from '@chakra-ui/react'
import { shortenAddress } from '../utils/stringOperations'
import { useMediaQuery } from "@chakra-ui/react"

type CollectionInfoProps = {
  address: string,
  totalBeasts: number,
  distinctBeasts: number
}

const CollectionInfo = ({ address, totalBeasts, distinctBeasts }: CollectionInfoProps) => {
  const [isMobile] = useMediaQuery("(max-width: 30em)")

  return (
    <Flex paddingBottom={[1, 2]} marginBottom={3} paddingLeft={[5, 50]} paddingRight={[5, 50]} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <VStack cursor="default" wordBreak={"break-word"} fontWeight="bold" paddingTop={2} paddingBottom={2}>
        <HStack>
          <Text fontSize={[16, 32]}>{shortenAddress(address)} Collection</Text>
          <Tooltip hasArrow label="Copy Collection URL" placement="top">
            <Box cursor="pointer" onClick={() => navigator.clipboard.writeText(window.origin + "/collection/" + address)}>
              <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? "12" : "18"} viewBox="0 0 24 24" width={isMobile ? "12" : "18"}><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
            </Box>
          </Tooltip>
        </HStack>
        <HStack spacing={5} fontSize={[12, 24]}>
          <Text>{totalBeasts} Total</Text>
          <Text>{distinctBeasts} Distinct</Text>
        </HStack>
      </VStack>
    </Flex>
  )
}

export default CollectionInfo