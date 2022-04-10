import { fetchGraphQL } from "./graphql"
import { CollectionEntryProps } from "../components/CollectionEntry";

type BeastCollectionQueryVariables = {
  address: string
}

// URL to OBJKT.com graphql API
const OBJKTCOM_API_URL = "https://data.objkt.com/v2/graphql";

// Retrieves all DataBeasts owned by an address
const beastCollectionQuery = `
query collectorGallery($address: String!) {
  token_holder(where: {holder_address: {_eq: $address}, token: {supply: {_gt: "0"}, creators: {creator_address: {_eq: "tz1e2DSjooZBbya7QwJsQUR5Z59dHpcEb97z"}}}, quantity: {_gt: "0"}}, order_by: {token: {token_id: desc}}) {
    quantity
    token {
      id: token_id
      display_uri
      timestamp
      description
      title: name
      supply
    }
  }
}
`;

export const fetchCollection = async (variables: BeastCollectionQueryVariables) => {
  const { errors, data } = await fetchGraphQL(OBJKTCOM_API_URL, beastCollectionQuery, 'collectorGallery', variables);
  if (errors) {
    console.error(errors);
  }
  const result = data.token_holder;
  /*
  console.log(result);

  // Copy 'name' token key to new 'title' token key to please previous naming convention on HICDEX
  result.forEach((element: CollectionEntryProps)  => {
    element.token.title = element.token.name as string; 
  });
  */
  return result
}