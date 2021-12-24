import React from "react";
import { Box } from '@chakra-ui/react'

type CollectionInfoProps = {
  address: string,
  totalBeasts: number,
  distinctBeasts: number
}

const CollectionInfo = ({ address, totalBeasts, distinctBeasts}: CollectionInfoProps) => {
  return (
    <Box>
      {address} {totalBeasts} {distinctBeasts}
    </Box>
  ) 
}

export default CollectionInfo