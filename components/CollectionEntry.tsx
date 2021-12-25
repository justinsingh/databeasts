import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { VStack, Image, Box, HStack, Text } from "@chakra-ui/react";

const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  var entryImageSrc: string;

  // Source the image from /public/beast_gifs. Use ipfs.io if not found.
  try {
    entryImageSrc = require('../public/beast_gifs/' + token.id + '.gif').default.src;
  } catch (error: unknown) {
    entryImageSrc = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);
  }

  return (
    <Box m={2} paddingBottom={2} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <VStack>
        <Image borderTopRadius={10} width={[150, 300, 400]} height={[150, 300, 400]} src={entryImageSrc} />
        <HStack wordBreak={"break-word"} fontWeight="bold" paddingTop={2} paddingBottom={2}>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
          <Text>{"x" + quantity}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default CollectionEntry;