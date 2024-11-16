import { Address, createPublicClient, decodeEventLog, encodeFunctionData, EncodeFunctionDataReturnType, http, Hex, keccak256, parseAbi, PublicClient, Chain, Transport, ParseAccount, Account, RpcSchema } from "viem";

interface OnChainCall {
    to: Address,
    value: BigInt,
    data: EncodeFunctionDataReturnType,
}

const cctpMessageTransmitterAbi = [
    {
      inputs: [
        { internalType: "bytes", name: "message", type: "bytes" },
        { internalType: "bytes", name: "attestation", type: "bytes" }
      ],
      name: "receiveMessage",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function"
    }
  ];

export async function getCCTPReceiveCall(
    sourceStartTxHash: Hex,
    sourceClient: PublicClient,
    destChainId: number,
  ): Promise<OnChainCall | undefined> {
    const burnMessage = await getCCTPMessageSent(sourceClient, sourceStartTxHash);
    if (!burnMessage) {
        console.log(
            `no burn message found for order ${sourceStartTxHash}`,
        );
        return;
        }

        const attestation = await getAttestation(burnMessage);
        if (!attestation) {
        console.log(
            `no attestation found for burn message ${burnMessage}`,
        );
        return;
    }

    return {
      to: getCCTPMessageTransmitterAddress(destChainId),
      value: 0n,
      data: encodeFunctionData({
        abi: cctpMessageTransmitterAbi,
        functionName: "receiveMessage",
        args: [burnMessage, attestation],
      }),
    };
  }


export async function getAttestation(message: Hex): Promise<Hex | null> {
    const messageHash = keccak256(message);
    console.log(
        `[ORDER] retrieving CCTP attestation for message hash ${messageHash}`,
    );
    const queryURL = `https://iris-api.circle.com/attestations/${messageHash}`;

    const res = await fetch(queryURL);
    const attestationResponse = (await res.json()) as {
        attestation: Hex;
        status: string;
    };
    console.log(
        `retrieved CCTP attestation: ${JSON.stringify(
            attestationResponse,
        )}`,
    );

    if (attestationResponse.status !== "complete") return null;

    return attestationResponse.attestation;
}

  async function getCCTPMessageSent(
    client: PublicClient,
    sourceStartTxHash: Hex
  ) {
    const { logs } = await client.getTransactionReceipt({
        hash: sourceStartTxHash,
      });

    // CCTP MessageSent event selector
    const eventTopic =
      "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036";
    const log = logs.find((l) => l.topics[0] === eventTopic);
    if (!log) return null;

    const decodedLog = decodeEventLog({
      abi: parseAbi(["event MessageSent(bytes message)"]),
      data: log.data,
      topics: log.topics,
    });

    return decodedLog.args.message;
  }

  export function getCCTPMessageTransmitterAddress(chainId: number): Address {
    switch (chainId) {
      case 1: // Ethereum
        return "0x0a992d191DEeC32aFe36203Ad87D7d289a738F81";
      case 43114: // Avalanche
        return "0x8186359aF5F57FbB40c6b14A588d2A59C0C29880";
      case 10: // Optimism
        return "0x4D41f22c5a0e5c74090899E5a8Fb597a8842b3e8";
      case 42161: // Arbitrum
        return "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca";
      case 8453: // Base
        return "0xAD09780d193884d503182aD4588450C416D6F9D4";
      case 137: // Polygon
        return "0xF3be9355363857F3e001be68856A2f96b4C39Ba9";
      default:
        throw new Error(`unknown chainId ${chainId}`);
    }
  }