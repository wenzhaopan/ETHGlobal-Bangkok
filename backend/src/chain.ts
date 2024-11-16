import { Chain, createPublicClient, http, PublicClient } from "viem";
import dotenv from "dotenv";
import { mainnet, avalanche, optimism, arbitrum, base, polygon, zircuit, linea, scroll } from 'viem/chains';

dotenv.config();
const RPC_API_KEY = process.env.RPC_API_KEY;

export const chainIdToChain: Record<number, Chain> = {
    1: mainnet,
    43114: avalanche,
    10: optimism,
    42161: arbitrum,
    8453: base,
    137: polygon,
    48900: zircuit,
    59144: linea,
    534352: scroll,
  };

export const clients: Record<number, PublicClient> = {
    1: createPublicClient({
      chain: mainnet,
      transport: http(RPC_API_KEY),
    }),
    43114: createPublicClient({
      chain: avalanche,
      transport: http(RPC_API_KEY),
    }),
    10: createPublicClient({
      chain: optimism, 
      transport: http(RPC_API_KEY),
    }) as PublicClient,
    42161: createPublicClient({
      chain: arbitrum,
      transport: http(RPC_API_KEY),
    }),
    8453: createPublicClient({
      chain: base,
      transport: http(RPC_API_KEY),
    }) as PublicClient,
    137: createPublicClient({
      chain: polygon,
      transport: http(RPC_API_KEY),
    }),
    48900: createPublicClient({
      chain: zircuit,
      transport: http(RPC_API_KEY),
    }),
    59144: createPublicClient({
      chain: linea,
      transport: http(RPC_API_KEY),
    }),
    534352: createPublicClient({
      chain: scroll,
      transport: http(RPC_API_KEY),
    }),
  };
