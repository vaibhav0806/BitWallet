import "../styles/Modal.css";
interface ModalFormProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  input1: string;
  setInput1: React.Dispatch<React.SetStateAction<string>>;
  input2: string;
  setInput2: React.Dispatch<React.SetStateAction<string>>;
}

const ModalForm: React.FC<ModalFormProps> = ({
  showModal,
  handleCloseModal,
  handleSubmit,
  input1,
  setInput1,
  input2,
  setInput2,
}) => {
  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <div className="modalHeader">Import Wallet</div>
            <form onSubmit={handleSubmit}>
              <label>
                Enter your wallet name : <br /> 
                <input
                  type="text"
                  value={input1}
                  className="input-name"
                  onChange={(e) => setInput1(e.target.value)}
                />
              </label>
              <br />
              <label>
                Enter your mnemonic : <br />
                <textarea
                  value={input2}
                  className="input-mnemonic"
                  onChange={(e) => setInput2(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
