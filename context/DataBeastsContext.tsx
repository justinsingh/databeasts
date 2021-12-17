import React, { useContext, useEffect, useState } from 'react'
import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Network, NetworkType } from "@airgap/beacon-sdk";

// Type for Provider Component props
type ProviderProps = {
  children: React.ReactNode
};

// Type for DataBeasts Context
type DataBeastsContextType = {
  userAddress: string | undefined
  syncWallet: () => void
  desyncWallet: () => void
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

const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
var wallet: BeaconWallet

export const DataBeastsProvider = ({ children }: ProviderProps) => {
  console.log("provider rendering");
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);

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
      setUserAddress(address); // By changing state, we rerender the provider
      console.log("New connection: ", address);
    }
  }

  const desyncWallet = async () => {
    await wallet.client.clearActiveAccount()
    console.log("Wallet disconnected");
    setUserAddress(undefined);
  }

  const destroyClient = async () => {
    await wallet.client.destroy()
    console.log("Client destroyed");
  }

  return (
    <DataBeastsContext.Provider value={{ userAddress, syncWallet, desyncWallet }} >
      {children}
    </DataBeastsContext.Provider>
  )
}

export default DataBeastsProvider;