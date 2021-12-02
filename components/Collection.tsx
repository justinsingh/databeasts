import React, { useEffect, useState } from "react";
import { useDataBeastsContext } from '../context/DataBeastsContext'

type CollectionQueryVariables = {
  address: string
}

type Token = {
  artifactURI: string
  displayURI: string
  thumbnailURI: string
  title: string
  description: string
}

type CollectionEntry = {
  quantity: number
  token: Token
}

const query = `
query collectorGallery($address: String!) {
  hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, token: {supply: {_gt: "0"}, creator_id: {_eq: "tz1e2DSjooZBbya7QwJsQUR5Z59dHpcEb97z"}}}, order_by: {id: asc}) {
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
      token_tags {
        tag {
          tag
        }
      }
      creator {
        address
      }
      swaps(where: {status: {_eq: "0"}}, order_by: {price: asc}) {
        amount
        amount_left
        creator_id
        price
      }
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

const fetchCollection = async (userAddress: string) => {
  const { errors, data } = await fetchGraphQL(query, 'collectorGallery', { address: userAddress });
  if (errors) {
    console.error(errors);
  }
  const result = data.hic_et_nunc_token_holder
  return result
}

const Collection = () => {
  const { userAddress } = useDataBeastsContext();
  const [collectionEntries, setCollectionEntries] = useState<CollectionEntry[] | undefined>(undefined)

  useEffect(() => {
    // Set collectionEntries if fetchCollection() returns entries
    fetchCollection(userAddress as string).then(res => {
      if (res.length > 0)
        setCollectionEntries(res);
    });
  }, []);

  return (
    <div>
      {typeof collectionEntries !== 'undefined' && (
        collectionEntries.map(entry => {
          if (entry.quantity > 0) {
            return <h2>{entry.token.description} x{entry.quantity}</h2>
          }
        })
      )}
    </div>
  )
}

export default Collection;