import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import WalletSVG from "../assets/wallet.svg";
import TransactionSVG from "../assets/transactions.svg";
import WalletSelectedSVG from "../assets/walletSelected.svg";
import TransactionSelectedSVG from "../assets/transactionsSelected.svg";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link
            to="/wallets"
            style={{
              fontWeight: location.pathname === "/wallets" ? "bold" : "normal",
              color: location.pathname === "/wallets" ? "#E2C19D" : "#FFFFFF",
              borderLeft:
                location.pathname === "/wallets" ? "4px solid #C0996F" : "",
            }}
            className="sidebar-link"
          >
            <img
              src={location.pathname === "/wallets" ? WalletSelectedSVG : WalletSVG}
              alt="My Icon"
              style={{ width: "20px", height: "20px" }}
            />
            <span>Wallets</span>
          </Link>
        </li>
        <hr className="horizontalLine"></hr>
        <li className="sidebar-item">
          <Link
            to="/transactions"
            style={{
              fontWeight:
                location.pathname === "/transactions" ? "bold" : "normal",
              color:
                location.pathname === "/transactions" ? "#E2C19D" : "#FFFFFF",
              borderLeft:
                location.pathname === "/transactions"
                  ? "4px solid #C0996F"
                  : "",
            }}
            className="sidebar-link"
          >
            <img
              src={location.pathname === "/transactions" ? TransactionSelectedSVG : TransactionSVG}
              alt="My Icon"
              style={{ width: "25px", height: "25px",}}
            />
            <span>Last Transactions</span>
          </Link>
        </li>
        <hr className="horizontalLine"></hr>
      </ul>
      <div className="support">Support</div>
    </div>
  );
};

export default Sidebar;
