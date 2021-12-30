import React from "react";
import { CollectionEntryProps } from './Collection'
import { getBeastNameFromTitle, getBeastNumberFromTitle, getHashFromIpfsURI } from '../utils/stringOperations'
import { Flex, VStack, Image, Box, HStack, Text, Circle, calc } from "@chakra-ui/react";

// Styling values for common beasts
const blueHex = "#0043C1"
const blueGradient = "linear-gradient(to bottom right, rgba(2,0,36,1) 0%, rgba(1,31,112,1) 0%, rgba(0,46,156,1) 0%, rgba(142,176,244,1) 0%, rgba(0,85,244,1) 50%, rgba(0,67,193,1) 100%)"

// Styling values for rare beasts
const purpleHex = "#8e00c1"
const purpleGradient = "linear-gradient(to bottom right, rgba(215,187,224,1) 0%, rgba(142,0,193,1) 58%)"

// Styling values for legendary beasts
const orangeHex = "#c15a00"
const orangeGradient = "linear-gradient(to bottom right, rgba(255,220,189,1) 0%, rgba(193,90,0,1) 58%)"

const CollectionEntry = ({ quantity, token }: CollectionEntryProps) => {
  var entryImageSrc: string;
  var beastColorHex: string;
  var beastColorGradient: string;

  if (token.supply > 10 && token.id !== 572968) {
    beastColorHex = blueHex;
    beastColorGradient = blueGradient;
  }
  else if (token.supply > 5) {
    beastColorHex = purpleHex;
    beastColorGradient = purpleGradient;
  }
  else {
    beastColorHex = orangeHex;
    beastColorGradient = orangeGradient;
  }
  
  // Source the image from /public/beast_gifs. Use ipfs.io if not found.
  try {
    entryImageSrc = require('../public/beast_gifs/' + token.id + '.gif').default.src;
  } catch (error: unknown) {
    entryImageSrc = "https://ipfs.io/ipfs/" + getHashFromIpfsURI(token.display_uri);
  }

  return (
    <Box m={2} p={[5, 8]} bgColor="white" borderRadius={10} boxShadow={'md'} borderWidth={5} borderColor={beastColorHex}>
      <VStack spacing={7}>
        <Box position="relative">
          <Circle
            fontSize={[13, 19]}
            fontWeight="bold"
            position="absolute"
            top="-3"
            left="-3"
            size={["45px", "65px"]}
            bgColor={beastColorHex}
            bgImage={beastColorGradient}
            color="white"
            boxShadow={["lg"]}
            borderWidth={3}
            borderColor="white"
            outline={beastColorHex + " solid 5px"}
          >
            <Text>#{getBeastNumberFromTitle(token.title)}</Text>
          </Circle>
          <Image width={[250, 300, 400]} height={[250, 300, 400]} src={entryImageSrc} borderRadius={10} outline={beastColorHex + " solid 5px"} />
        </Box>
        <HStack
        /*
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={5}
          paddingRight={5}
          */
          spacing={0}
          wordBreak={"break-word"}
          fontSize={[15, 20]}
          fontWeight="bold"
          borderRadius={10}
          /*
          borderWidth={4}
          borderColor={orangeHex}        
          bgClip="padding-box"
          */
          outline={beastColorHex + " solid 5px"}

        >
          <Flex borderColor="white" borderTopRightRadius={25} borderBottomRightRadius={25} bg={beastColorHex} bgImage={beastColorGradient}>
            <Text paddingTop={2} paddingBottom={2} paddingLeft={3} paddingRight={5} color="white">{quantity + "x"}</Text>
          </Flex>
          <Flex paddingTop={2} paddingBottom={2} paddingLeft={5} paddingRight={5} justifyContent={"center"} maxWidth={[200, 300]} width={[200, 300]}>
            <Text paddingRight="25%">{getBeastNameFromTitle(token.title)}</Text>
          </Flex>
        </HStack>
      </VStack>
    </Box>
  )
}

export default CollectionEntry;