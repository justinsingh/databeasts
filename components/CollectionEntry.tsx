import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getBeastNumberFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { VStack, Image, Box, HStack, Text, Circle } from "@chakra-ui/react";

const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  var entryImageSrc: string;

  // Source the image from /public/beast_gifs. Use ipfs.io if not found.
  try {
    entryImageSrc = require('../public/beast_gifs/' + token.id + '.gif').default.src;
  } catch (error: unknown) {
    entryImageSrc = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);
  }

  return (
    <Box m={2} mb={4} paddingBottom={2} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <VStack>
        <Box position="relative">
          <Circle fontSize={18} fontWeight="bold" position="absolute" top="-3" left="-3" size={["45px", "55px"]} bg="white" color="black" boxShadow={'md'}>
            <Text>#{getBeastNumberFromTitle(token.title)}</Text>
          </Circle>
          <Image borderTopRadius={10} width={[150, 300, 400]} height={[150, 300, 400]} src={entryImageSrc} />
        </Box>
        <HStack wordBreak={"break-word"} fontWeight="bold" paddingTop={2} paddingBottom={2}>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
          <Text>{"x" + quantity}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default CollectionEntry;