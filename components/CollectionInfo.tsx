import React from "react";
import { Flex, Box, Text, Center, VStack, HStack, StackDivider } from '@chakra-ui/react'
import { shortenAddress } from '../utils/stringOperations'

type CollectionInfoProps = {
  address: string,
  totalBeasts: number,
  distinctBeasts: number
}

const CollectionInfo = ({ address, totalBeasts, distinctBeasts}: CollectionInfoProps) => {
  return (
    <Flex paddingBottom={[1, 2]} marginBottom={3} paddingLeft={[5, 50]} paddingRight={[5, 50]} bgColor="rgba(255, 255, 255)" borderRadius={10} boxShadow={'md'}>
      <Center>
        <VStack wordBreak={"break-word"} fontWeight="bold" paddingTop={2} paddingBottom={2}>
          <Text fontSize={[16, 32]}>{shortenAddress(address)} Collection</Text>
          <HStack fontSize={[12, 24]} divider={<StackDivider borderColor='gray' />}>
            <Text marginRight={2}>{totalBeasts} Total</Text>
            <Text marginLeft={2}>{distinctBeasts} Distinct</Text>
          </HStack>
        </VStack>
      </Center>
    </Flex>
  ) 
}

export default CollectionInfo