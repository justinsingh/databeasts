import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Spinner } from '@chakra-ui/react'
import CollectionInfo from "./CollectionInfo";
import CollectionEntry from './CollectionEntry'
import ScrollTopArrow from "../components/ScrollTopArrow"

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
  supply: number
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
            <CollectionInfo address={address as string} totalBeasts={totalBeasts} distinctBeasts={distinctBeasts} />
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} /*marginTop={0} spacing={3} maxW={[332, 1389]}*/>
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

  useEffect(() => {
    // Fetch collection data if address is a string (need to check due to CollectionProps type, see for more info)
    if (typeof address === 'string') {
      // Set collectionEntries if fetchCollection() returns entries
      fetchCollection(address).then(entries => {
        setCollectionEntries(entries);
        setDistinctBeasts(entries.length);
        setTotalBeasts(entries.length === 0 ? 0 :
          entries.reduce((a: CollectionEntryProps, b: CollectionEntryProps) => ({ quantity: a.quantity + b.quantity })).quantity
        );
        setIsLoading(false);
      });
    }
  }, []);


  return (
    isLoading ? LoadingCollection() : CollectionItems()
  )
}

export default Collection;