import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Spinner } from '@chakra-ui/react'
import CollectionInfo from "./CollectionInfo";
import CollectionEntry from './CollectionEntry'
import ScrollTopArrow from "../components/ScrollTopArrow"
import { isTezosDomainName } from "../utils/stringOperations";
import { getTezosAddressFromName, getTezosNameFromAddress } from "../utils/tezosDomains";
import { useDataBeastsContext } from '../context/DataBeastsContext'
import { fetchCollection } from '../utils/hicdex'
import { fetchDomainRecord, fetchReverseRecord } from '../utils/tezosDomains'

type CollectionProps = {
  /*
  This was just supposed to be type string. 
  But, Next's router.query returns string | string[] | undefined. 
  This causes the need for additional checks.
  */
  address: string | string[] | undefined
}

export type CollectionEntryProps = {
  quantity: number
  token: Token
}

type Token = {
  id: number,
  artifact_uri: string
  display_uri: string
  thumbnail_uri: string
  title: string
  description: string
  supply: number
}

const Collection = ({ address }: CollectionProps) => {
  const [collectionEntries, setCollectionEntries] = useState<CollectionEntryProps[]>()
  const [totalBeasts, setTotalBeasts] = useState<number>(0);
  const [distinctBeasts, setDistinctBeasts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tezosAddress, setTezosAddress] = useState<string>(address as string);
  const [tezosDomainName, setTezosDomainName] = useState<string | undefined>(undefined);
  const { Tezos } = useDataBeastsContext();

  const LoadingCollection = () => {
    return (
      <Box position="absolute" top={["50%"]}>
        <Spinner
          thickness="8px"
          speed='0.55s'
          emptyColor='white'
          color='blue.500'
          size='xl'
        />
      </Box>
    )
  }

  const CollectionItems = () => {
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

  const initializeCollection = (address: string) => {
    /*
    Fetch collection data if address is a string.
    Could be null if address was a nonexistent Tezos domain
    */
    if (typeof address === 'string') {
      // Set collectionEntries if fetchCollection() returns entries
      fetchCollection({ address }).then(entries => {
        setCollectionEntries(entries);
        setDistinctBeasts(entries.length);
        setTotalBeasts(entries.length === 0 ? 0 :
          entries.reduce((a: CollectionEntryProps, b: CollectionEntryProps) => ({ quantity: a.quantity + b.quantity })).quantity
        );
        setIsLoading(false);
      });
    }
  }

  useEffect(() => {
    // If address is in Tezos Domain Name format (ends in .tez)
    if (typeof address === 'string' && isTezosDomainName(address)) {
      let domain: string = address;

      // Set tezosDomainName to domain
      setTezosDomainName(domain);

      // Try Tezos Domains graphQL API. If error, read from contract storage directly
      try {
        fetchDomainRecord({ domain }).then(domainRecord => {
          let items = domainRecord.items;

          // Set reverse record address. Use empty string if not present.
          let domainRecordAddress = items.length > 0 ? items[0].address : "";

          // Set tezosAddress to domainName
          setTezosAddress(domainRecordAddress)

          // Initialize collection with the reverseRecordAddress
          initializeCollection(domainRecordAddress);
        })
      } catch (error: unknown) {
        // Set tezosAddress to address linked in Tezos Domain record (null if not found)
        getTezosAddressFromName(Tezos, address as string).then(res => {
          setTezosAddress(res);
          initializeCollection(typeof res === 'string' ? res : "");
        })
      }
    }
    // If address is in Tezos address format (TODO: check for tezos address format criteria)
    else if (typeof address === 'string') {
      // Set tezosAddress to address
      setTezosAddress(address as string);

      
      // Check if Tezos Domain exists for address
      // Try Tezos Domains graphQL API. If error, read from contract storage directly
      try {
        fetchReverseRecord({ address }).then(reverseRecord => {
          let items = reverseRecord.items;

          // Set domain name. Use undefined if not present
          let domainName = items.length > 0 ? items[0].domain.name : undefined;

          // Set tezosDomainName to domainName
          setTezosDomainName(domainName);
        })
      } catch (error: unknown) {
        // Set tezosDomainName to Tezos Domain (address if not found)
        getTezosNameFromAddress(Tezos, address as string).then(res => {
          setTezosDomainName(res);
        })
      }

      //Render collection
      initializeCollection(address as string);
    }
  }, []);


  return (
    isLoading ? LoadingCollection() : CollectionItems()
  )
}

export default Collection;