import axios from 'axios';

const apiKey = import.meta.env.VITE_BLOCKCYPHER_API_KEY;

async function getTransactions(walletAddress) {
    try {
        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/full?token=${apiKey}`;

        const response = await axios.get(apiUrl);

        const transactions = response.data.txs || [];

        const formattedTransactions = transactions.map((tx) => ({
            date: new Date(tx.confirmed || tx.received),
            amountBTC: tx.outputs[0].value / 100000000, // Convert from Satoshis to BTC
            confirmations: tx.confirmations || 0,
            address: tx.inputs[0].addresses[0],
        }));

        return formattedTransactions;
        // return transactions;
        
    } catch (error) {
        console.error('Error fetching Bitcoin transactions:', error.message);
        throw error;
    }
}

export { getTransactions };