/* eslint-disable no-constant-condition */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { getTransactions } from "../api/getTransactions";
import { getBalanceViaAddress } from "../api/getBalanceViaAddress";

interface Wallet {
  name: string;
  balance: string;
  address: string;
  id: number;
}

interface Transaction {
  date: string;
  time: string;
  wallet: string;
  result: string;
  amount: string;
  status: string;
  id: number;
}

interface recieveTransaction {
  date: Date;
  amountBTC: number;
  confirmations: number;
  address: string;
}

interface AppContextValue {
  loading: boolean;
  toggleLoading: () => void;
  walletArr: Wallet[];
  pushWalletArr: (wallet: Wallet) => void;
  transactionData: Transaction[];
  pushTransactionData: (transaction: Transaction) => void;
  pushSyncQueue: (walletAddress: string) => void;
  startSyncQueue: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

let len = 0;
let holdlen = 0;
const transactionsGlobal: Transaction [] = [];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [walletArr, setWalletArr] = useState<Wallet[]>([]);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [syncQueue, setSyncQueue] = useState<string[]>([]);

  const toggleLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  const pushWalletArr = async (wallet: Wallet) => {
    setWalletArr((prev) => [...prev, wallet]);
    const transactions = await getTransactions(wallet.address);

    transactions.forEach((transaction : recieveTransaction) => {
      const datetime = transaction.date.toISOString().split("T");
      const date = datetime[0];
      const time = datetime[1].split(".")[0];

      const newTransaction = {
        date: date,
        time: time,
        wallet: wallet.name,
        amount: transaction.amountBTC.toString(),
        result: "RECEIVED",
        status: (transaction.confirmations >= 6)? "SUCCESS" : "IN PROGRESS",
        id: transactionData.length + 1,
      };
      pushTransactionData(newTransaction);
    });
    pushSyncQueue(wallet.address);
  };

  const pushSyncQueue = (walletAddress : string | undefined) => {
    if (walletAddress) {
      setSyncQueue((prev) => {
        return [...prev, walletAddress]
      });

      holdlen++;
      len++;
    }
  }

  const pushTransactionData = (transaction: Transaction) => {
    setTransactionData((prev) => [...prev, transaction]);
  };

  const startSyncQueue = async () => {
    toggleLoading();
    if (len) {
      const addr: string | undefined = syncQueue.shift();
      
      let balance: string;
      while (true) {
        try {
          balance = await getBalanceViaAddress(addr);
          break;
        } catch (err) {
          console.log("error fetching!!");
        }
      }

      walletArr[holdlen - len].balance = balance;

      while (true) {
        try {
          const transactions = await getTransactions(addr);
          transactions.forEach((transaction : recieveTransaction) => {
            const datetime = transaction.date.toISOString().split("T");
            const date = datetime[0];
            const time = datetime[1].split(".")[0];
            
            const newTransaction = {
              date: date,
              time: time,
              wallet: walletArr[holdlen - len].name,
              amount: transaction.amountBTC.toString(),
              result: "RECEIVED",
              status: (transaction.confirmations >= 6)? "SUCCESS" : "IN PROGRESS",
              id: transactionData.length + 1,
            };

            transactionsGlobal.push(newTransaction);
          });
          break;
        } catch (err) {
          console.log("error fetching!!");
        }
      }

      syncQueue.push(addr ? addr: "");
      
      len--;
      setTimeout(startSyncQueue, 200);
    } else {
      setWalletArr([...walletArr]);
      setTransactionData([...transactionsGlobal]);
    }
    toggleLoading();
  }

  const contextValue: AppContextValue = {
    loading,
    toggleLoading,
    walletArr,
    pushWalletArr,
    transactionData,
    pushTransactionData,
    pushSyncQueue,
    startSyncQueue
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
