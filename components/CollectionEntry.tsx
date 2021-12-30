import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getBeastNumberFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { VStack, Image, Box, HStack, Text, Circle } from "@chakra-ui/react";

const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  var entryImageSrc: string;
  const blueHex = "#0055F4"
  const blueGradient = "linear-gradient(to top left, rgba(2,0,36,1) 0%, rgba(1,31,112,1) 0%, rgba(1,42,139,1) 0%, rgba(0,69,204,1) 0%, rgba(0,85,244,1) 50%, rgba(0,212,255,1) 100%)" 

  // Source the image from /public/beast_gifs. Use ipfs.io if not found.
  try {
    entryImageSrc = require('../public/beast_gifs/' + token.id + '.gif').default.src;
  } catch (error: unknown) {
    entryImageSrc = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);
  }

  return (
    <Box m={2} mb={4} p={[5,10]} bgColor="white" borderRadius={10} boxShadow={'md'} borderWidth={4} borderColor={blueHex}>
      <VStack spacing={7}>
        <Box position="relative">
          <Circle 
            fontSize={[13, 18]} 
            fontWeight="bold" 
            position="absolute" 
            top="-3" 
            left="-3" 
            size={["45px", "65px"]} 
            bgColor={blueHex} 
            bgImage={blueGradient}            
            color="white" 
            boxShadow={["lg"]} 
            borderWidth={3} 
            borderColor="white"
            outline={blueHex + " solid 4px"}
          >
            <Text>#{getBeastNumberFromTitle(token.title)}</Text>
          </Circle>
            <Image width={[250, 300, 400]} height={[250, 300, 400]} src={entryImageSrc} borderRadius={10} outline={blueHex + " solid 5px"} />
        </Box>
        <HStack paddingLeft={5} paddingRight={5} wordBreak={"break-word"} fontSize={[15, 20]} fontWeight="bold" paddingTop={2} paddingBottom={2} borderRadius={10} borderWidth={4} borderColor="#0055F4">
          <Text>{quantity + "x"}</Text>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default CollectionEntry;