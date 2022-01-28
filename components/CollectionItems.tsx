import { Button, Grid, GridItem } from '@chakra-ui/react'
import CollectionInfo from "./CollectionInfo";
import CollectionEntry from './CollectionEntry'
import ScrollTopArrow from "../components/ScrollTopArrow"
import { CollectionEntryProps } from '../components/CollectionEntry'

type CollectionItemsProps = {
  tezosAddress: string
  tezosDomainName: string | undefined
  totalBeasts: number
  distinctBeasts: number
  collectionEntries: CollectionEntryProps[] | undefined
  sortCollectionEntries: (sortingFunction: (a: CollectionEntryProps, b: CollectionEntryProps) => number ) => void
}

const CollectionItems = ({
  tezosAddress,
  tezosDomainName,
  totalBeasts,
  distinctBeasts,
  collectionEntries,
  sortCollectionEntries,
}: CollectionItemsProps) => {
  return (
    <>
      {typeof collectionEntries !== 'undefined' && (
        <>
          <ScrollTopArrow />
          <CollectionInfo
            address={tezosAddress}
            domainName={tezosDomainName}
            totalBeasts={totalBeasts}
            distinctBeasts={distinctBeasts}
          />
          <Grid templateColumns={["repeat(2, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}>
            {collectionEntries.map(entry => {
              return (
                <GridItem p={1.5} key={entry.token.id}>
                  <CollectionEntry quantity={entry.quantity} token={entry.token} />
                </GridItem>
              )
            }
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default CollectionItems