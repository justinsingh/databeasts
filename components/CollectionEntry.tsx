import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { VStack, Image, Box, HStack, Center, Text, Flex } from "@chakra-ui/react";

const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  const ipfsImageURL = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);

  return (
    <Box minWidth={400} paddingBottom={2} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
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