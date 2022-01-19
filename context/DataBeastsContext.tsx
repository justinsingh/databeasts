import React, { useContext, useEffect, useState } from 'react'
import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Network, NetworkType } from "@airgap/beacon-sdk";
import { TaquitoTezosDomainsClient } from '@tezos-domains/taquito-client'
import { Tzip16Module } from '@taquito/tzip16'
import { fetchReverseRecord } from '../utils/tezosDomains'

// Type for Provider Component props
type ProviderProps = {
  children: React.ReactNode
};

// Type for DataBeasts Context
type DataBeastsContextType = {
  userAddress: string | undefined,
  userTezosDomain: string | undefined,
  syncWallet: () => void
  desyncWallet: () => void
  TezosDomains: TaquitoTezosDomainsClient
  Tezos: TezosToolkit
};

// Create context
const DataBeastsContext = React.createContext<DataBeastsContextType>({} as DataBeastsContextType);

// Hook for using DataBeasts context
export const useDataBeastsContext = () => {
  const dataBeastsContext = useContext(DataBeastsContext);

  // Check if context has not been given values from a Provider
  if (!dataBeastsContext) {
    throw new Error("No DataBeastsContext.Provider found when calling useDataBeastsContext");
  }
  return dataBeastsContext as DataBeastsContextType;
}

const Tezos = new TezosToolkit("https://mainnet.smartpy.io");
var wallet: BeaconWallet

// Add extension and create client for Tezos Domains
Tezos.addExtension(new Tzip16Module());
const TezosDomains = new TaquitoTezosDomainsClient({
  tezos: Tezos,
  network: 'mainnet',
  caching: { enabled: true }
});

export const DataBeastsProvider = ({ children }: ProviderProps) => {
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
  const [userTezosDomain, setUserTezosDomain] = useState<string | undefined>(undefined);

  useEffect(() => {
    wallet = new BeaconWallet({
      name: "DataBeasts",
      preferredNetwork: NetworkType.MAINNET,
    });

    Tezos.setWalletProvider(wallet);
    initUserAddress();

    return () => {
      destroyClient();
    }
  }, []);

  const initUserAddress = async () => {
    const activeAccount = await wallet.client.getActiveAccount();

    if (activeAccount !== undefined) {
      let address = await wallet.getPKH();
      setUserAddress(address);
    }
  }

  const syncWallet = async () => {
    const network: Network = { type: NetworkType.MAINNET };
    const activeAccount = await wallet.client.getActiveAccount();

    // Request wallet connection if no active account found
    if (activeAccount === undefined) {
      console.log("Requesting wallet connection");
      await wallet.requestPermissions({ network });
      let address = await wallet.getPKH();
      setUserAddress(address); 
      console.log("New connection: ", address);

      // Set Tezos Domain for user address if it exists
      fetchReverseRecord({ address }).then(reverseRecord => {
        let items = reverseRecord.items;

        // Set domain name. Use undefined if not present
        let domainName = items.length > 0 ? items[0].domain.name : undefined;

        // Set tezosDomainName to domainName
        setUserTezosDomain(domainName);
      })
    }
  }

  const desyncWallet = async () => {
    await wallet.client.clearActiveAccount()
    console.log("Wallet disconnected");
    setUserAddress(undefined);
    setUserTezosDomain(undefined);
  }

  const destroyClient = async () => {
    await wallet.client.destroy()
    console.log("Client destroyed");
  }

  return (
    <DataBeastsContext.Provider value={{ userAddress, userTezosDomain, syncWallet, desyncWallet, TezosDomains, Tezos }} >
      {children}
    </DataBeastsContext.Provider>
  )
}

export default DataBeastsProvider;