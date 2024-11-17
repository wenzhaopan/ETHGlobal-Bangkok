import { Address, decodeEventLog, encodeFunctionData, EncodeFunctionDataReturnType, http, Hex, keccak256, parseAbi, PublicClient, Chain, Transport, ParseAccount, Account, RpcSchema } from "viem";

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

const orbiterRouterV3Abi = [
    {
      inputs: [
        { internalType: "bytes", name: "message", type: "bytes" },
        { internalType: "bytes", name: "signature", type: "bytes" }
      ],
      name: "processMessage",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function"
    }
];

export async function getOrbiterReceiveCall(
    sourceStartTxHash: Hex,
    sourceClient: PublicClient,
    destChainId: number,
): Promise<OnChainCall | undefined> {
    const transferMessage = await getOrbiterMessageSent(sourceClient, sourceStartTxHash);
    if (!transferMessage) {
        console.log(
            `No transfer message found for transaction ${sourceStartTxHash}`,
        );
        return;
    }

    const signature = await getOrbiterSignature(transferMessage);
    if (!signature) {
        console.log(
            `No signature found for transfer message ${transferMessage}`,
        );
        return;
    }

    return {
        to: getOrbiterRouterV3Address(destChainId),
        value: 0n,
        data: encodeFunctionData({
            abi: orbiterRouterV3Abi,
            functionName: "processMessage",
            args: [transferMessage, signature],
        }),
    };
}

export async function getOrbiterSignature(message: Hex): Promise<Hex | null> {
    const messageHash = keccak256(message);
    console.log(
        `Retrieving Orbiter signature for message hash ${messageHash}`,
    );
    const queryURL = `https://api.orbiter.finance/signatures/${messageHash}`;

    const res = await fetch(queryURL);
    const signatureResponse = (await res.json()) as {
        signature: Hex;
        status: string;
    };
    console.log(
        `Retrieved Orbiter signature: ${JSON.stringify(
            signatureResponse,
        )}`,
    );

    if (signatureResponse.status !== "complete") return null;

    return signatureResponse.signature;
}

async function getOrbiterMessageSent(
    client: PublicClient,
    sourceStartTxHash: Hex
) {
    const { logs } = await client.getTransactionReceipt({
        hash: sourceStartTxHash,
    });

    // Orbiter MessageSent event selector
    const eventTopic =
        "0x653f25dc641544675338cb47057f8ea530c69b78";
    const log = logs.find((l) => l.topics[0] === eventTopic);
    if (!log) return null;

    const decodedLog = decodeEventLog({
        abi: parseAbi(["event MessageSent(bytes message)"]),
        data: log.data,
        topics: log.topics,
    });

    return decodedLog.args.message;
}

export function getOrbiterRouterV3Address(chainId: number): Address {
    switch (chainId) {
        case 1: // Ethereum
            return "0xc741900276cd598060b0fe6594fbe977392928f4";
        case 137: // Polygon
            return "0x653f25dc641544675338cb47057f8ea530c69b78";
        case 534352: // Scroll
          return "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172";
        case 8453: // Base
          return "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172";
        case 59144: // Linea
          return "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172";
        default:
            throw new Error(`Unknown chainId ${chainId}`);
    }
}


interface RhinoOnChainCall {
  contract: Address;
  value: bigint;
  calldata: EncodeFunctionDataReturnType;
}

const rhinoBridgeAbi = [
  {
    inputs: [
      { internalType: "bytes", name: "message", type: "bytes" },
      { internalType: "bytes", name: "signature", type: "bytes" }
    ],
    name: "processMessage",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];  

export async function getRhinoBridgeCall(
  sourceTransactionHash: Hex,
  client: PublicClient,
  destinationChainId: number,
): Promise<RhinoOnChainCall | undefined> {
  const message = await fetchRhinoBridgeMessage(client, sourceTransactionHash);
  if (!message) {
      console.log(`No bridge message found for transaction ${sourceTransactionHash}`);
      return;
  }

  const proof = await fetchRhinoProof(message);
  if (!proof) {
      console.log(`No proof available for message ${message}`);
      return;
  }

  return {
      contract: getRhinoBridgeAddress(destinationChainId),
      value: 0n,
      calldata: encodeFunctionData({
          abi: rhinoBridgeAbi,
          functionName: "executeBridgeOperation",
          args: [message, proof],
      }),
  };
}

async function fetchRhinoBridgeMessage(
  client: PublicClient,
  transactionHash: Hex
): Promise<Hex | null> {
  const { logs } = await client.getTransactionReceipt({ hash: transactionHash });

  const rhinoMessageSentEvent =
      "0x93d08e6375ab45d69d9c2b60d5b38b5075a19376a8f2d02d2fcfdfd2178e82f8";
  const matchingLog = logs.find(log => log.topics[0] === rhinoMessageSentEvent);
  if (!matchingLog) return null;

  const decodedLog = decodeEventLog({
      abi: parseAbi(["event BridgeMessage(bytes message)"]),
      data: matchingLog.data,
      topics: matchingLog.topics,
  });

  return decodedLog.args.message;
}

async function fetchRhinoProof(message: Hex): Promise<Hex | null> {
  const hash = keccak256(message);
  console.log(`Fetching Rhino.fi proof for message hash: ${hash}`);

  const proofEndpoint = `https://api.rhino.fi/proofs/${hash}`;
  const response = await fetch(proofEndpoint);
  const result = (await response.json()) as { proof: Hex; status: string };

  console.log(`Received proof response: ${JSON.stringify(result)}`);

  return result.status === "complete" ? result.proof : null;
}

export function getRhinoBridgeAddress(chainId: number): Address {
  switch (chainId) {
    case 1: // Ethereum
        return "0xc741900276cd598060b0fe6594fbe977392928f4";
    case 137: // Polygon
        return "0x653f25dc641544675338cb47057f8ea530c69b78";
    case 534352: // Scroll
      return "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172";
    case 8453: // Base
      return "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172";
    case 59144: // Linea
      return "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172";
    default:
        throw new Error(`Unknown chainId ${chainId}`);
}
}
