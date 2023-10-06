import { useState } from 'react';
import ModalForm from './Modal';
import '../styles/Wallets.css';
import PlusSVG from '../assets/plus.svg';
import Wallet from './Wallet';
import { getBalance } from '../api/getBalance';
import { useAppContext } from '../context/AppContext';
import { generateAddress } from '../api/generateAddress';

const Wallets = () => {
  const [showModal, setShowModal] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const { toggleLoading } = useAppContext();
  const { walletArr, pushWalletArr } = useAppContext();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchData = async (e : React.FormEvent) => {
    e.preventDefault();
    try {
      toggleLoading(); 
      const newWalletName = input1;
      const newBalance = await getBalance(input2);
      const newAddr = await generateAddress(input2);
      handleCloseModal();

      const newWallet = {
        name: newWalletName,
        balance: newBalance,
        id: walletArr.length + 1,
        address: newAddr, 
      };

      pushWalletArr(newWallet);
      setInput1('');
      setInput2('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      toggleLoading(); 
    }
  };

  return (
    <div className="wallets">
      <ModalForm
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={fetchData} 
        input1={input1}
        setInput1={setInput1}
        input2={input2}
        setInput2={setInput2}
      />
      <div className="import-wallet">
        <button className="button" onClick={handleOpenModal}>
          <img
            src={PlusSVG}
            alt="My Icon"
            style={{ width: '20px', height: '20px' }}
          />{' '}
          <div>IMPORT WALLET</div>
        </button>
      </div>
      <div className="wallet-pre">Total Wallets - {walletArr.length}</div>
      <hr className="hr-line" />
      <div className="wallet-head">
        <p>Coin</p>
        <p>Holding</p>
        <p>Action</p>
      </div>
      <div className="wallet-list">
        {walletArr.map((wallet) => (
          <Wallet key={wallet.id} name={wallet.name} balance={wallet.balance} id={wallet.id} />
        ))}
      </div>
    </div>
  );
};

export default Wallets;
