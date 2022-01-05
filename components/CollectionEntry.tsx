import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getBeastNumberFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { isSafari } from "../utils/browserOperations";
import { Flex, VStack, Image, Box, HStack, Text, Circle, calc, baseStyle } from "@chakra-ui/react";
import commonCard from '../public/collection_entry/card_frame_1_common.png';
import rareCard from '../public/collection_entry/card_frame_1_rare.png';
import legendaryCard from '../public/collection_entry/card_frame_1_legendary.png';

const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  var entryImageSrc: string;
  var cardImageSrc: string;
  //var isSafariBrowser = isSafari();
  
  if (token.supply > 10 && token.id !== 572968) {
    cardImageSrc = commonCard.src;
  }
  else if (token.supply > 5) {
    cardImageSrc = rareCard.src;
  }
  else {
    cardImageSrc = legendaryCard.src;
  }
  
  // Source the image from /public/beast_gifs. Use ipfs.io if not found.
  try {
    entryImageSrc = require('../public/beast_gifs/' + token.id + '.gif').default.src;
  } catch (error: unknown) {
    entryImageSrc = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);
  }
  
  return (

    <Box
      position={"relative"}
      width={["100%", 455]}
      height={["100%", 522]}
      transform={"translate3d(0, 0, 200px)"}
      _hover={{ transform: 'scale(1.01)' }} 
      transition="all ease-in 75ms"
    >
      <Image width={["160px", "100%"]} height={["auto", "522"]} src={cardImageSrc} />
      <Box position="absolute" top='0' left='0' width="100%" height="100%" overflow="hidden">
        <Text
          width={["36%", "33%"]}
          display="flex"
          position="relative"
          top={["2.75%", "3.25%"]}
          left={["49%", "53%"]}
          fontSize={[7, 17]}
          fontWeight="bold"
          color="silver"
          zIndex={3}
        >
          OBJKT#{token.id}
        </Text>
        <Text width={["11%"]} pointerEvent="none" position="relative" top={["1.75%", "3%"]} left={["7%", "7.5%"]} fontSize={[8, 19]} fontWeight="bold" color="white">
          #{getBeastNumberFromTitle(token.title)}
        </Text>
        <Box as="a"
          target="_blank"
          href={"https://objkt.com/asset/hicetnunc/" + token.id}
          position="fixed"
          left={["7%"]}
          top={["5%"]}
          width={[140, 400]}
          height={[140, 400]}
        />
        <Image position="relative" left={["6.5%", "7%"]} top={[-3, "-5.15%"]} zIndex={-1} width={[140, 400]} height={[140, 400]} src={entryImageSrc} />
        <HStack
          width={["85%"]}
          position="relative"
          left={["11%"]}
          top={["-4.55%", "-3%"]}
          spacing={["13%", "14%"]}
          wordBreak={"break-word"}
          fontSize={[12, 32]}
          fontWeight="bold"
          color="white"
        >
          <Text>{quantity + "x"}</Text>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
        </HStack>
      </Box>
    </Box>
  )
 }

export default CollectionEntry;