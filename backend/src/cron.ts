import cron from 'node-cron';
import { createPublicClient, http, Address, Chain, erc20Abi, zeroAddress } from 'viem';
import dotenv from "dotenv";

dotenv.config();
const RPC_API_KEY = process.env.RPC_API_KEY;

export function createGetBalanceJob(chain: Chain, userAddress: Address, tokenAddress: Address): cron.ScheduledTask {
    const client = createPublicClient({
        chain,
        transport: http(RPC_API_KEY),
    });

    async function fetchBalance() {
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
            console.log(`Balance of ${userAddress} on chain ${JSON.stringify(chain)} in token ${tokenAddress} is ${balance}`); // TODO: change to return
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }
    
    console.log(`Get balance job started. Fetching balance every 5 minutes...`);
    // const task = cron.schedule('*/5 * * * * *', async () => { // 5 sec
    const task = cron.schedule('*/5 * * * *', async () => { // 5 mins
        await fetchBalance();
    });
    return task;
}

export function createGetCCTPAttestationJob() {
    async function fetchCCTPReceiveCall() {
        try {
            const res = getCCTPReceiveCall()
            if (!!res) {
                console.log(`CCTP Receive Call: ${JSON.stringify(res)}`); // TODO: change to return
            }
        } catch (error) {
            console.log('Error fetching CCTP Receive Call')
        }
    }

    console.log(`Get balance job started. Fetching balance every 5 minutes...`);
    // const task = cron.schedule('*/5 * * * * *', async () => { // 5 sec
    const task = cron.schedule('*/5 * * * *', async () => { // 5 mins
        await fetchCCTPReceiveCall();
    });
    return task;
}