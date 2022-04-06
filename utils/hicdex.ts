import { fetchGraphQL } from "./graphql"

type BeastCollectionQueryVariables = {
  address: string
}

// Retrieves all DataBeasts owned by an address
const beastCollectionQuery = `
query collectorGallery($address: String!) {
  hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, token: {supply: {_gt: "0"}, creator_id: {_eq: "tz1e2DSjooZBbya7QwJsQUR5Z59dHpcEb97z"}}, quantity: {_gt: "0"}}, order_by: {token_id: desc}) {
    quantity
    token {
      id
      display_uri
      title
      description
      supply
      timestamp
    }
  }
}
`;

export const fetchCollection = async (variables: BeastCollectionQueryVariables) => {
  const { errors, data } = await fetchGraphQL("https://hdapi.teztools.io/v1/graphql", beastCollectionQuery, 'collectorGallery', variables);
  if (errors) {
    console.error(errors);
  }
  const result = data.hic_et_nunc_token_holder
  return result
}