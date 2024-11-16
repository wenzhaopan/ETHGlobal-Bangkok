import { Address, decodeEventLog, encodeFunctionData, EncodeFunctionDataReturnType, Hex, keccak256, parseAbi } from "viem";

interface OnChainCall {
    to: Address,
    value: BigInt,
    data: EncodeFunctionDataReturnType,
}

export async function getCCTPReceiveCall(
    order: ,
  ): Promise<OnChainCall | undefined> {
    const burnMessage = await getCCTPMessageSent(order);
    if (!burnMessage) {
      console.log(
        `no burn message found for order ${order.intentAddr}`,
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
      to: getCCTPMessageTransmitterAddress(getOrderDestChainId(order)),
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
        `retrieving CCTP attestation for message hash ${messageHash}`,
    );
    const queryURL = `https://iris-api.circle.com/attestations/${messageHash}`;

    const res = await fetch(queryURL);
    const attestationResponse = (await res.json()) as {
        attestation: Hex;
        status: string;
    };
    console.log(
        `[ORDER] retrieved CCTP attestation: ${JSON.stringify(
        attestationResponse,
        )}`,
    );

    if (attestationResponse.status !== "complete") return null;

    return attestationResponse.attestation;
}

  async function getCCTPMessageSent(sourceStartTxHash: Hex) {
    const { logs } = await client.getTransactionReceipt({
        hash: sourceStartTxHash,
      });

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
      case ethereum.chainId:
        return "0x0a992d191DEeC32aFe36203Ad87D7d289a738F81";
      case avalanche.chainId:
        return "0x8186359aF5F57FbB40c6b14A588d2A59C0C29880";
      case optimism.chainId:
        return "0x4D41f22c5a0e5c74090899E5a8Fb597a8842b3e8";
      case arbitrum.chainId:
        return "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca";
      case base.chainId:
        return "0xAD09780d193884d503182aD4588450C416D6F9D4";
      case polygon.chainId:
        return "0xF3be9355363857F3e001be68856A2f96b4C39Ba9";
      case optimismSepolia.chainId:
      case baseSepolia.chainId:
        return "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD";
      case avalancheFuji.chainId:
        return "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79";
      case arbitrumSepolia.chainId:
        return "0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872";
      default:
        throw new Error(`unknown chainId ${chainId}`);
    }
  }