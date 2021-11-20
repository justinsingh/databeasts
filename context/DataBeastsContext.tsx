import React, { useContext, useEffect, useState } from 'react'
import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Network, NetworkType, TezosOperationType } from "@airgap/beacon-sdk";

// Type for Provider Component props
type ProviderProps = {
  children: React.ReactNode
};

// Type for DataBeasts Context
type DataBeastsContext = {
  userAddress: string | undefined,
  syncWallet: (() => void) | (() => Promise<void>)
};

// Create context
const DataBeastsContext = React.createContext<DataBeastsContext>({} as DataBeastsContext);

// Hook for using DataBeasts context
export const useDataBeastsContext = () => {
  const dataBeastsContext = useContext(DataBeastsContext);
  
  // Check if context has not been given values from a Provider
  if (!dataBeastsContext)
    throw new Error("No DataBeastsContext.Provider found when calling useDataBeastsContext");
  return dataBeastsContext as DataBeastsContext;
}


if (typeof window !== 'undefined') {
  const network: Network = { type: NetworkType.MAINNET };
  const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
  const wallet = new BeaconWallet({
    name: "DataBeasts",
    preferredNetwork: network.type,
  });

  Tezos.setWalletProvider(wallet);
}

export const DataBeastsProvider = ({ children }: ProviderProps) => {
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);

  const syncWallet = async () => {
    if (typeof window !== 'undefined') {
      const activeAccount = await wallet.client.getActiveAccount();
      // Request wallet connection if no active account found
      if (activeAccount === undefined) {
        console.log("Requesting wallet connection");
        await wallet.requestPermissions({ network });
        let address = await wallet.getPKH();
        console.log("New connection: ", address);
      }
    }
  }

  return (
    <DataBeastsContext.Provider value={{ userAddress, syncWallet }} >
      {children}
    </DataBeastsContext.Provider>
  )
}