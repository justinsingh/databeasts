import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { VStack, Image, Box, HStack, Text } from "@chakra-ui/react";
import fallbackImage from '../public/view.gif'


const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  const ipfsImageURL = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);
  //const ipfsImageURL = "https://cloudflare-ipfs.com/ipfs/" + getHashFromIpfsURI(token.display_uri);

  return (
    <Box m={2} minWidth={400} paddingBottom={2} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <VStack>
        <Image borderTopRadius={10} width="400" height="400" src={ipfsImageURL} />
        <HStack fontWeight="bold" paddingTop={2} paddingBottom={2}>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
          <Text>{"x" + quantity}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default CollectionEntry;