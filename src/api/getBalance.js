import axios from 'axios';

const apiKey = import.meta.env.VITE_BLOCKCYPHER_API_KEY;

async function getBalance(mnemonic) {
    try {
        const address = await axios.get(`https://bold-cloud-6867.fly.dev/getAddress?address=${mnemonic}`);

        let walletAddress = await address.data;
        walletAddress = walletAddress.substring(walletAddress.indexOf(":")+2, walletAddress.length);

        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/balance?token=${apiKey}`;

        const response = await axios.get(apiUrl);

        const balanceSatoshis = response.data.balance;
        const balanceBTC = balanceSatoshis / 100000000;

        return balanceBTC.toFixed(8);

    } catch (error) {
        console.error('Error fetching Bitcoin balance:', error.message);
        throw error;
    }
}

export { getBalance };