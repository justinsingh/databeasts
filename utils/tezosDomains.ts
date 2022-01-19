//import { TaquitoTezosDomainsClient } from "@tezos-domains/taquito-client"
import { TezosToolkit } from "@taquito/taquito";
import { bytes2Char, char2Bytes } from "@taquito/utils";
import { fetchGraphQL } from "./graphql";

const tezosDomainRegistryContract = "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS";

// Using TaquitoTezosDomainsClient caused a punycode error.
/*
export const getTezosAddressFromName = async (client: TaquitoTezosDomainsClient, name: string) => {
  let tezosAddress = client.resolver.resolveNameToAddress(name);
  console.log(tezosAddress);
  return tezosAddress;
}

export const getTezosNameFromAddress = async (client: TaquitoTezosDomainsClient, address: string) => {
  let tezosName = await client.resolver.resolveAddressToName(address);
  return tezosName;
}
*/

// Tezos Domains Contract Storage 
export const getTezosAddressFromName = async (client: TezosToolkit, name: string): Promise<string> => {
  const contract = await client.wallet.at(tezosDomainRegistryContract);
  const storage: any = await contract.storage();
  const domain = await storage.store.records.get(char2Bytes(name));
  if (domain) {
    return domain.owner;
  } else {
    return name;
  }
}

export const getTezosNameFromAddress = async (client: TezosToolkit, address: string): Promise<string> => {
  const contract = await client.wallet.at(tezosDomainRegistryContract);
  const storage: any = await contract.storage();
  const domain = await storage.store.reverse_records.get(address);
  if (domain) {
    return bytes2Char(domain.name);
  } else {
    return address;
  }
}

// Tezos Domains GraphQL 
type domainRecordQueryVariables = {
  domain: string
}

// TODO: The type for address should be the following: https://api-schema.tezos.domains/address.doc.html
// "Base58Check-encoded string of length 36 prefixed with tz1 (ed25519), tz2 (secp256k1), tz3 (p256) or KT1."
type reverseRecordQueryVariables = {
  address: string
}

const domainRecordQuery = `
query domainRecord($domain: String!) {
   domains(where: { name: { equalTo: $domain } }) {
    items {
      address
    }
  }
}
`

const reverseRecordQuery = `
query reverseRecord($address: Address!) {
  reverseRecords(
    where: {
      address: {
        equalTo: $address
      }
    }
  ) {
    items {
      domain {
        name
      }
    }
  }
}
`

export const fetchDomainRecord = async (variables: domainRecordQueryVariables) => {
  const { errors, data } = await fetchGraphQL("https://api.tezos.domains/graphql", domainRecordQuery, 'domainRecord', variables);
  if (errors) {
    console.error(errors);
  }
  const result = data.domains  
  return result
}

export const fetchReverseRecord = async (variables: reverseRecordQueryVariables) => {
  const { errors, data } = await fetchGraphQL("https://api.tezos.domains/graphql", reverseRecordQuery, 'reverseRecord', variables);
  if (errors) {
    console.error(errors);
  }
  const result = data.reverseRecords
  return result
}