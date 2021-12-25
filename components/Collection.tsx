import React, { useEffect, useState } from "react";
import { Flex, Box, Wrap, WrapItem } from '@chakra-ui/react'
import CollectionInfo from "./CollectionInfo";
import CollectionEntry from './CollectionEntry'

type CollectionProps = {
  /*
  This was just supposed to be type string. 
  But, Next's router.query returns string | string[] | undefined. 
  This causes the need for additional checks.
  */
  address: string | string[] | undefined
}

type CollectionQueryVariables = {
  address: string
}

type Token = {
  id: number,
  artifact_uri: string
  display_uri: string
  thumbnail_uri: string
  title: string
  description: string
}

export type CollectionEntryProps = {
  quantity: number
  token: Token
}

const query = `
query collectorGallery($address: String!) {
  hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, token: {supply: {_gt: "0"}, creator_id: {_eq: "tz1e2DSjooZBbya7QwJsQUR5Z59dHpcEb97z"}}, quantity: {_gt: "0"}}, order_by: {token_id: desc}) {
    quantity
    token {
      id
      artifact_uri
      display_uri
      thumbnail_uri
      timestamp
      mime
      title
      description
      supply
    }
  }
}
`;

async function fetchGraphQL(operationsDoc: string, operationName: string, variables: CollectionQueryVariables) {
  const result = await fetch(
    "https://api.hicdex.com/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

const fetchCollection = async (address: string) => {
  const { errors, data } = await fetchGraphQL(query, 'collectorGallery', { address: address });
  if (errors) {
    console.error(errors);
  }
  const result = data.hic_et_nunc_token_holder
  return result
}

const Collection = ({ address }: CollectionProps) => {
  const [collectionEntries, setCollectionEntries] = useState<CollectionEntryProps[]>()
  const [totalBeasts, setTotalBeasts] = useState<number>(0);
  const [distinctBeasts, setDistinctBeasts] = useState<number>(0);

  useEffect(() => {
    // Fetch collection data if address is a string (need to check due to CollectionProps type, see for more info)
    if (typeof address === 'string') {
      // Set collectionEntries if fetchCollection() returns entries
      fetchCollection(address).then(entries => {
        setCollectionEntries(entries);
        setDistinctBeasts(entries.length);
        setTotalBeasts(entries.reduce((a: CollectionEntryProps, b: CollectionEntryProps) => ({ quantity: a.quantity + b.quantity })).quantity);
      });
    }
  }, []);

  return (
    <>
      {typeof collectionEntries !== 'undefined' && (
        <>
          <CollectionInfo address={address as string} totalBeasts={totalBeasts} distinctBeasts={distinctBeasts} />
          <Wrap marginTop={0} spacing={0} maxW={[332, 832, 1248]}>
            {collectionEntries.map(entry => {
              return (
                <WrapItem p={0} key={entry.token.id}>
                  <CollectionEntry quantity={entry.quantity} token={entry.token} />
                </WrapItem>
              )}
            )}
          </Wrap>
        </>
      )}
    </>
  )
}

export default Collection;