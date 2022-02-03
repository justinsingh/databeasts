import { useEffect, useState } from "react";
import LoadingWheel from "./LoadingWheel";
import CollectionItems from "./CollectionItems";
import { CollectionEntryProps } from "./CollectionEntry";
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

const Collection = ({ address }: CollectionProps) => {
  const [collectionEntries, setCollectionEntries] = useState<CollectionEntryProps[]>()
  const [totalBeasts, setTotalBeasts] = useState<number>(0);
  const [distinctBeasts, setDistinctBeasts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tezosAddress, setTezosAddress] = useState<string>(address as string);
  const [tezosDomainName, setTezosDomainName] = useState<string | undefined>(undefined);
  const { Tezos } = useDataBeastsContext();

  const initializeCollection = (address: string) => {
    // Fetch collection data if address is a string.
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

  const sortCollectionEntries = (sortingFunction: (a: CollectionEntryProps, b: CollectionEntryProps) => number): void => {
    if (typeof collectionEntries !== 'undefined') {
      let newCollectionEntries = [...collectionEntries];

      newCollectionEntries.sort(sortingFunction);

      setCollectionEntries(newCollectionEntries);
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
    isLoading ? LoadingWheel() : CollectionItems({
      tezosAddress,
      tezosDomainName,
      totalBeasts,
      distinctBeasts,
      collectionEntries,
      sortCollectionEntries,
    })
  )
}

export default Collection;