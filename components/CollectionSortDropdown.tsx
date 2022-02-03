import { useState } from 'react'
import { CollectionEntryProps } from './CollectionEntry'
import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { rare15EditionBeasts } from '../constants/beastData'
import { IoIosArrowDown } from 'react-icons/io'

type CollectionSortDropdownProps = {
  sortCollectionEntries: (sortingFunction: (a: CollectionEntryProps, b: CollectionEntryProps) => number) => void
}

const sortByOldest = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  return (a.token.timestamp > b.token.timestamp) ? 1 : -1
}

const sortByNewest = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  return (b.token.timestamp > a.token.timestamp) ? 1 : -1
}

const sortBySupplyAsc = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  // Sort beasts with lower edition counts in front of beasts with higher edition counts
  if (a.token.supply < b.token.supply) return -1;
  if (a.token.supply > b.token.supply) return 1;

  // Sort equal edition numbered beasts with purple color in front of blue beasts
  if (rare15EditionBeasts.includes(a.token.id)) return -1;
  if (rare15EditionBeasts.includes(b.token.id)) return 1;

  // Sort equal edition numbered beasts by timestamp (most recent beasts first)
  return (a.token.timestamp > b.token.timestamp) ? -1 : 1;
}

const sortBySupplyDesc = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  // Sort beasts with higher edition counts in front of beasts with lower edition counts
  if (a.token.supply < b.token.supply) return 1;
  if (a.token.supply > b.token.supply) return -1;

  // Sort equal edition numbered beasts with purple color behind blue beasts
  if (rare15EditionBeasts.includes(a.token.id)) return 1;
  if (rare15EditionBeasts.includes(b.token.id)) return -1;

  // Sort equal edition numbered beasts by timestamp (most recent beasts first)
  return (a.token.timestamp > b.token.timestamp) ? -1 : 1;
}

const sortByQuantityAsc = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  // Sort entries with a lower quantity in front of beasts with higher quantity
  if (a.quantity < b.quantity) return -1;
  if (a.quantity > b.quantity) return 1;

  // Sort equal quantity beasts by timestamp (most recent beasts first)
  return (a.token.timestamp > b.token.timestamp) ? -1 : 1;
}

const sortByQuantityDesc = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  // Sort entries with a higher quantity in front of beasts with lower quantity
  if (a.quantity < b.quantity) return 1;
  if (a.quantity > b.quantity) return -1;

  // Sort equal quantity beasts by timestamp (most recent beasts first)
  return (a.token.timestamp > b.token.timestamp) ? -1 : 1;
}

const CollectionSortDropdown = ({ sortCollectionEntries }: CollectionSortDropdownProps) => {
  const [selectedSortText, setSelectedSortText] = useState<string>("Newest");

  return (
    <Box>
      <Menu gutter={3} matchWidth>
        <MenuButton
          // Positioned to right
          //position="absolute"
          //right="410px"
          //top="410px"

          // Positioned below CollectionInfo
          marginTop={["7px"]}

          as={Button}
          minW={["50vw", "16vw"]}
          h={["7.3vw", "2.3vw"]}
          borderRadius={10}
          boxShadow={'md'}
          bgColor="rgba(255, 255, 255)"
          _hover={{ backgroundColor: "rgba(245, 245, 245)" }}
          _focus={{ boxShadow: 'none' }}
          _active={{ backgroundColor: "rgba(245, 245, 245)" }}
          fontSize={["3.5vw", "1.1vw"]}
          textAlign={"left"}
          rightIcon={<IoIosArrowDown />}
        >
          {selectedSortText}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => {
            sortCollectionEntries(sortByNewest);
            setSelectedSortText("Newest");
          }}>
            Newest
          </MenuItem>
          <MenuItem onClick={() => {
            sortCollectionEntries(sortByOldest);
            setSelectedSortText("Oldest");
          }}>
            Oldest
          </MenuItem>
          <MenuItem onClick={() => {
            sortCollectionEntries(sortBySupplyAsc);
            setSelectedSortText("Editions (Low to High)");
          }}>
            Editions (Low to High)
          </MenuItem>
          <MenuItem onClick={() => {
            sortCollectionEntries(sortBySupplyDesc);
            setSelectedSortText("Editions (High to Low)");
          }}>
            Editions (High to Low)
          </MenuItem>
          <MenuItem onClick={() => {
            sortCollectionEntries(sortByQuantityAsc);
            setSelectedSortText("Quantity Owned (Low to High)");
          }}>
            Quantity Owned (Low to High)
          </MenuItem>
          <MenuItem onClick={() => {
            sortCollectionEntries(sortByQuantityDesc);
            setSelectedSortText("Quantity Owned (High to Low)");
          }}>
            Quantity Owned (High to Low)
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default CollectionSortDropdown