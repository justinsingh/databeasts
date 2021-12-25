import React from "react";
import { Box, Text, Center, VStack, HStack, StackDivider } from '@chakra-ui/react'
import { shortenAddress } from '../utils/stringOperations'

type CollectionInfoProps = {
  address: string,
  totalBeasts: number,
  distinctBeasts: number
}

const CollectionInfo = ({ address, totalBeasts, distinctBeasts}: CollectionInfoProps) => {
  return (
    <Box maxWidth={[332, 832, 1248]} width={[300, 600, 700]} marginBottom={0} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <Center>
        <VStack wordBreak={"break-word"} fontWeight="bold" paddingTop={2} paddingBottom={2}>
          <Text fontSize={[16, 32]}>{shortenAddress(address)} Collection</Text>
          <HStack fontSize={[12, 24]} divider={<StackDivider borderColor='gray' />}>
            <Text marginRight={2}>Total Beasts: {totalBeasts}</Text>
            <Text marginLeft={2}>Distinct Beasts: {distinctBeasts}</Text>
          </HStack>
        </VStack>
      </Center>
    </Box>
  ) 
}

export default CollectionInfo