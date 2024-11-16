import cron from 'node-cron';
import { createPublicClient, http, Address, Chain, erc20Abi, zeroAddress } from 'viem';
import dotenv from "dotenv";

dotenv.config();
const RPC_API_KEY = process.env.RPC_API_KEY;

export const createGetBalanceJob = (chain: Chain, userAddress: Address, tokenAddress: Address): cron.ScheduledTask => {
    const client = createPublicClient({
        chain: chain,
        transport: http(RPC_API_KEY),
    });

    async function fetchEtherBalance() {
        try {
            const balance = tokenAddress === zeroAddress
                ?
                await client.getBalance({ address: userAddress }) :
                await client.readContract({
                    abi: erc20Abi,
                    address: tokenAddress,
                    functionName: 'balanceOf',
                    args: [userAddress],
                });
            console.log(`Balance of ${userAddress} on chain ${chain} in token ${tokenAddress} is ${balance}`);
        } catch (error) {
            console.error('Error fetching Ether balance:', error);
        }
    }
    
    console.log(`Cron job started. Fetching balance every 5 minutes...`);
    const task = cron.schedule('*/5 * * * * *', async () => {
    // const task = cron.schedule('*/5 * * * *', async () => {
        await fetchEtherBalance();
    });
    return task;
}
