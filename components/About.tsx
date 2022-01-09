import React from "react";
import { Box, Text} from '@chakra-ui/react'

const About = () => {
  const aTagColor="#0088c6"

  return (
    <Box p={[15, 30]} maxW={["75vw", "40vw"]} minHeight="8vh" bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <Text align="center" justifyContent={"center"} fontSize={[12, 14, 16]} fontWeight="600">
        DataBeasts are digital creatures powered by the Tezos blockchain.
        <br />
        <br />
        Collect DataBeasts on the <Text as="a" _hover={{textDecoration: "underline"}} color={aTagColor} target="_blank" href="https://objkt.com/profile/databeasts/created">marketplace </Text> 
        and through community events announced on <Text as="a" _hover={{textDecoration: "underline"}} color={aTagColor} target="_blank" href="https://mobile.twitter.com/databeasts">Twitter </Text>
        and <Text as="a" _hover={{textDecoration: "underline"}} color={aTagColor} target="_blank" href="https://discord.gg/Rn7YQqPhsm">Discord</Text>.
        <br />
        <br />
        DataBeasts by Nam Mac Nguyen
        <br />
        Website by <Text as="a" _hover={{textDecoration: "underline"}} color={aTagColor} target="_blank" href="https://twitter.com/ByJustinSingh">Justin Singh</Text>
      </Text>
    </Box>
  )
}

export default About;