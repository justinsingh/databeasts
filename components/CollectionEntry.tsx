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
    >
      <Image width={["40vw", "100%"]} height={["auto", "522"]} src={cardImageSrc} />
      <Box position="absolute" top='0' left='0' width="100%" height="100%" overflow="hidden">
        <Text
          display="flex"
          as="a"
          target="_blank"
          _hover={{ textDecoration: "underline" }}
          href={"https://objkt.com/asset/hicetnunc/" + token.id}
          position="relative"
          top={["3.25%"]}
          left={["53%"]}
          fontSize={[12, 17]}
          fontWeight="bold"
          color="silver"
        >
          OBJKT#{token.id}
        </Text>
        <Text position="relative" top={["3%", "3%"]} left={["7%", "7.5%"]} fontSize={[14, 19]} fontWeight="bold" color="white">
          #{getBeastNumberFromTitle(token.title)}
        </Text>
        <Image position="relative" left={[3, "7%"]} top={[-7, "-5.15%"]} zIndex={-1} width={[160, 400]} height={[160, 400]} src={entryImageSrc} />
        <HStack
          position="relative"
          left={["11%"]}
          top={["0%", "-3%"]}
          spacing={"12%"}
          wordBreak={"break-word"}
          fontSize={[20, 32]}
          fontWeight="bold"
          color="white"
        >
          <Text>{quantity + "x"}</Text>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
        </HStack>
      </Box>

    </Box>
  )

  /*
  return (
    <Box
      position={"relative"}
      width={["100%", 455]}
      height={["100%", 522]}
      transform={"translate3d(0, 0, 200px)"}
    >
      <Image width={["40vw", "100%"]} height="auto" src={cardImageSrc} />
      <Box position="absolute" top='0' left='0' width="100%" height="100%" overflow="hidden">
        <Text
          display="flex"
          as="a"
          target="_blank"
          _hover={{ textDecoration: "underline" }}
          href={"https://objkt.com/asset/hicetnunc/" + token.id}
          position="relative"
          top={["3.25%"]}
          left={["53%"]}
          fontSize={[12, 17]}
          fontWeight="bold"
          color="silver"
        >
          OBJKT#{token.id}
        </Text>
        <Text position="relative" top={["3%", "3%"]} left={["7%", "7.5%"]} fontSize={[14, 19]} fontWeight="bold" color="white">
          #{getBeastNumberFromTitle(token.title)}
        </Text>
        <Image position="relative" left={[3, "7%"]} top={[-7, "-5.15%"]} zIndex={-1} width={[160, 400]} height={[160, 400]} src={entryImageSrc} />
        <HStack
          position="relative"
          left={["11%"]}
          top={["0%", "-3%"]}
          spacing={"12%"}
          wordBreak={"break-word"}
          fontSize={[20, 32]}
          fontWeight="bold"
          color="white"
        >
          <Text>{quantity + "x"}</Text>
          <Text>{getBeastNameFromTitle(token.title)}</Text>
        </HStack>
      </Box>
    </Box>
  )
  */

  /*
  return (
    <Box m={2} p={[5, 8]} bgColor="white" borderRadius={10} boxShadow={'md'} borderWidth={5} borderColor={beastColorHex}>
      <VStack spacing={7}>
        <Box position="relative">
          <Circle
            fontSize={[13, 19]}
            fontWeight="bold"
            position="absolute"
            top={isSafariBrowser ? '-5' : "-3"}
            left={isSafariBrowser ? '-5' : "-3"}
            size={["45px", "65px"]}
            bgColor={beastColorHex}
            bgImage={beastColorGradient}
            color="white"
            boxShadow={"lg"}
            borderWidth={3}
            borderColor="white"
            outline={isSafariBrowser ? '' : beastColorHex + " solid 5px"}
          >
            <Text>#{getBeastNumberFromTitle(token.title)}</Text>
          </Circle>
          <Box borderRadius={10} borderWidth={5} borderColor={beastColorHex}>
            <Image borderRadius={5} zIndex={3} width={[250, 300, 400]} height={[250, 300, 400]} src={entryImageSrc} />
          </Box>
        </Box>
        <HStack
          spacing={0}
          wordBreak={"break-word"}
          fontSize={[15, 20]}
          fontWeight="bold"
          borderRadius={10}
          borderWidth={"5px"}
          borderColor={beastColorHex}        
          bgClip="padding-box"
        >
          <Flex borderColor="white" borderTopRightRadius={25} borderBottomRightRadius={25} borderTopLeftRadius={5} borderBottomLeftRadius={'5'} bg={beastColorHex} bgImage={beastColorGradient}>
            <Text paddingTop={2} paddingBottom={2} paddingLeft={3} paddingRight={5} color="white">{quantity + "x"}</Text>
          </Flex>
          <Flex paddingTop={2} paddingBottom={2} paddingLeft={5} paddingRight={5} maxWidth={[200, 300]} width={[200, 300]}>
            <Text>{getBeastNameFromTitle(token.title)}</Text>
          </Flex>
        </HStack>
      </VStack>
    </Box>
  )
  */
}

export default CollectionEntry;