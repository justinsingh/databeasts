import React, { useState } from "react";
import { Box, Text, VStack, HStack, Tooltip, Collapse, useToast } from '@chakra-ui/react'
import { shortenAddress } from '../utils/stringOperations'
import { useMediaQuery } from "@chakra-ui/react"
import { isTezosDomainName } from "../utils/stringOperations";

type CollectionInfoProps = {
  address: string,
  totalBeasts: number,
  distinctBeasts: number
}

const CollectionInfo = ({ address, totalBeasts, distinctBeasts }: CollectionInfoProps) => {
  const [showQuantityInfo, setShowQuantityInfo] = useState<boolean>(false);
  const toggleShowQuantityInfo = () => setShowQuantityInfo(!showQuantityInfo);
  const [isMobile] = useMediaQuery("(max-width: 30em)")
  const copyURLToast = useToast({
    variant: "left-accent",
    position: "top-left",
    title: 'Collection URL Copied!',
    duration: 2000,
  });

  return (
    <Tooltip hasArrow label="Click To Copy Collection URL" placement="top" openDelay={175} >
      <Box
        maxW={["80vw", "30vw"]}
        marginBottom={2}
        paddingBottom={[1]}
        paddingLeft={[5]}
        paddingRight={[5]}
        bgColor="rgba(255, 255, 255)"
        borderRadius={10}
        boxShadow={'md'}
        cursor="pointer"
        onClick={() => {
          navigator.clipboard.writeText(window.origin + "/collection/" + address);
          copyURLToast();
        }}
        onMouseEnter={toggleShowQuantityInfo}
        onMouseLeave={toggleShowQuantityInfo}
      >
        <VStack fontSize={["4vw", "1.3vw"]} wordBreak={"break-word"} fontWeight="bold" spacing={0} paddingTop={0} paddingBottom={0}>
          <HStack>
            <Text /*fontSize={[16, 32]}*/>{!isTezosDomainName(address) ? shortenAddress(address) : address} Collection</Text>
            <svg xmlns="http://www.w3.org/2000/svg" height={isMobile ? "12" : "18"} viewBox="0 0 24 24" width={isMobile ? "12" : "18"}>
              <path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
          </HStack>

          <Box>
            <Collapse in={showQuantityInfo}>
              <HStack display="flex" spacing={5}>
                <Text>{totalBeasts} Total</Text>
                <Text>{distinctBeasts} Distinct</Text>
              </HStack>
            </Collapse>
          </Box>
        </VStack>
      </Box >

    </Tooltip>
  )
}

export default CollectionInfo