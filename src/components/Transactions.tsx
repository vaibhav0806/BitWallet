import { useAppContext } from "../context/AppContext";
import "../styles/Transactions.css";

import Transaction from "./Transaction";

const Transactions = () => {

  const { transactionData } = useAppContext();

  return (
    <div className="transactions">
      <div className="transactions-header">
        Transactions
      </div>
      <div className="transactions-pre">
        Total Transactions - {transactionData.length}
      </div>
      <hr className="hr-line" />
      <div className="transaction-head">
        <p>Coin</p>
        <p>Wallet</p>
        <p>Amount</p>
        <p>Result</p>
        <p>Status</p>
      </div>
      <div className="transaction-list">
        {transactionData.map((transaction) => (
          <Transaction
            date={transaction.date}
            time={transaction.time}
            wallet={transaction.wallet}
            result={transaction.result}
            amount={transaction.amount}
            status={transaction.status}
            id={transaction.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
