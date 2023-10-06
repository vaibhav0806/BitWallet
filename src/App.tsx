import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Wallets from "./components/Wallets";
import Transactions from "./components/Transactions";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div style={{
          display: "flex",
        }}>
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Wallets />} />{" "}
              <Route path="/wallets" element={<Wallets />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
