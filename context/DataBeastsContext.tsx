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

export const DataBeastsProvider = ({ children }: ProviderProps) => {
  /* 
  Problem - Creating a BeaconWallet object attempts to access the window's localStorage. 
            However, window does not exist server side! It only exits client side.
 
  Temporary Fix - Check if window exists to avoid server side build error. 
                       
  Potential Solutions - 1) Dynamic importing of BeaconWallet with SSR = false.
                    I was advised to extract the error inducing logic to the component level and dynamically import it with SSR = false.
                    https://nextjs.org/docs/advanced-features/dynamic-import

                    2) Move client side code to useEffect
  */
  if (typeof window !== 'undefined') {
    const [userAddress, setUserAddress] = useState<string | undefined>(undefined);

    const wallet = new BeaconWallet({
      name: "DataBeasts",
      preferredNetwork: NetworkType.MAINNET,
    });
    Tezos.setWalletProvider(wallet);

    useEffect(() => {
      initState();
    }, []);

    const initState = async () => {
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
      }
    }

    const desyncWallet = async () => {
      await wallet.client.clearActiveAccount()
      console.log("Wallet disconnected");
      setUserAddress(undefined);
    }

    return (
      <DataBeastsContext.Provider value={{ userAddress, syncWallet, desyncWallet }} >
        {children}
      </DataBeastsContext.Provider>
    )
  }
  else {
    return <div></div>
  }
}