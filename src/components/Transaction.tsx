import "../styles/Transaction.css";

import BitcoinSVG from "../assets/bitcoin.svg";
import ArrowSVG from '../assets/arrow.svg';

type TransactionProps = {
  date: string;
  time: string;
  wallet: string;
  result: string;
  amount : string;
  status: string;
  id: number;
};

const Wallet = (props: TransactionProps) => {
  return (
    <div className="transaction">
      <div className="transaction-datetime">
        <img
          src={BitcoinSVG}
          alt="My Icon"
          style={{ width: "30px", height: "30px" }}
        />{" "}
        <div className="datetime">
            {props.date} <br/>
            <span className="time">{props.time}</span>
        </div>
      </div>
      <div className="transaction-wallet">{props.wallet}</div>
      <div className="transaction-amount">
        {props.amount} BTC
      </div>
      <div className="transaction-result">
        <img src={ArrowSVG} alt="MyIcon" style={{ width: "15px", height: "15px" }}/>{props.result}
      </div>
      <div className="transaction-status">
        {props.status}
      </div>
    </div>
  );
};

export default Wallet;
