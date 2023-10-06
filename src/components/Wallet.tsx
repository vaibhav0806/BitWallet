import "../styles/Wallet.css";

import BitcoinSVG from "../assets/bitcoin.svg";
import DeleteSVG from "../assets/delete.svg";

type WalletProps = {
  name: string;
  balance: string;
  id: number;
};

const Wallet = (props: WalletProps) => {
  return (
    <div className="wallet">
      <div className="wallet-name">
        <img src={BitcoinSVG} alt="My Icon" style={{ width: "40px",height: "40px" }}/> {props.name}
      </div>
      <div className="wallet-balance">BTC {props.balance}</div>
      <div className="wallet-delete">
        <img src={DeleteSVG} alt="My Icon" style={{ width: "20px",height: "20px", cursor: "pointer"}}/>
      </div>
    </div>
  );
};

export default Wallet;
