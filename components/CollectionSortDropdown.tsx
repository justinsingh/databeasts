import { useState } from 'react'
import { CollectionEntryProps } from './CollectionEntry'
import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { rare15EditionBeasts } from '../constants/beastData'
import { IoIosArrowDown } from 'react-icons/io'

type CollectionSortDropdownProps = {
  sortCollectionEntries: (sortingFunction: (a: CollectionEntryProps, b: CollectionEntryProps) => number ) => void
}

const sortByOldest = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  return (a.token.timestamp > b.token.timestamp) ? 1 : -1
}

const sortByNewest = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  return (b.token.timestamp > a.token.timestamp) ? 1 : -1
}

const sortByEditionCountDesc = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  // Sort beasts with lower edition counts in front of beasts with higher edition counts
  if (a.token.supply < b.token.supply) return -1;
  if (a.token.supply > b.token.supply) return 1;

  // Sort equal edition numbered beasts with purple color in front of blue beasts
  if (rare15EditionBeasts.includes(a.token.id)) return -1;
  if (rare15EditionBeasts.includes(b.token.id)) return 1;

  // Sort equal edition numbered beasts by timestamp (most recent beasts first)
  return (a.token.timestamp > b.token.timestamp) ? -1 : 1; 
}

const sortByEditionCountAsc = (a: CollectionEntryProps, b: CollectionEntryProps): number => {
  // Sort beasts with higher edition counts in front of beasts with lower edition counts
  if (a.token.supply < b.token.supply) return 1;
  if (a.token.supply > b.token.supply) return -1;

  // Sort equal edition numbered beasts with purple color behind blue beasts
  if (rare15EditionBeasts.includes(a.token.id)) return 1;
  if (rare15EditionBeasts.includes(b.token.id)) return -1;

  // Sort equal edition numbered beasts by timestamp (most recent beasts first)
  return (a.token.timestamp > b.token.timestamp) ? -1 : 1;
}

const CollectionSortDropdown = ({ sortCollectionEntries }: CollectionSortDropdownProps) => {
  const [selectedSortText, setSelectedSortText] = useState<string>("Newest");

  return (
    <Menu>
      <MenuButton as={Button} fontSize={["3vw", "1.0vw"]} maxW={["80vw","30vw"]} rightIcon={<IoIosArrowDown />}>
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
          sortCollectionEntries(sortByEditionCountDesc);
          setSelectedSortText("Number of Editions (Descending)");
        }}>
          Number of Editions (Descending)
        </MenuItem>
        <MenuItem onClick={() => {
          sortCollectionEntries(sortByEditionCountAsc);
          setSelectedSortText("Number of Editions (Ascending)");
        }}>
          Number of Editions (Ascending)
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default CollectionSortDropdown