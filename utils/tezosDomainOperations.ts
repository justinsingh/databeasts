import { TaquitoTezosDomainsClient } from "@tezos-domains/taquito-client"
import { TezosToolkit } from "@taquito/taquito";
import { bytes2Char, char2Bytes } from "@taquito/utils";

const tezosDomainRegistryContract = "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS";

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