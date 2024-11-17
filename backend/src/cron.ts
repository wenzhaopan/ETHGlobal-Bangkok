import cron from 'node-cron';
import { createPublicClient, http, Address, Chain, erc20Abi, zeroAddress, Hex, PublicClient } from 'viem';
import dotenv from "dotenv";
import { getCCTPReceiveCall } from './bridges';
import { clients } from './chain';

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

export function createGetCCTPAttestationJob(sourceStartTxHash: Hex, sourceChainId: number, destChainId: number) {
    async function fetchCCTPReceiveCall(sourceStartTxHash: Hex, destChainId: number) {
        try {
            const res = getCCTPReceiveCall(sourceStartTxHash, clients[sourceChainId] as PublicClient, destChainId)
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
        await fetchCCTPReceiveCall(sourceStartTxHash, destChainId);
    });
    return task;
}