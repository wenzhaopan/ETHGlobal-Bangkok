// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import {CREATE3Factory} from "../src/create3/CREATE3Factory.sol";

uint256 constant ARBITRUM_MAINNET = 42161;
uint256 constant BASE_MAINNET = 8453;
uint256 constant LINEA_MAINNET = 59144;
uint256 constant OP_MAINNET = 10;
uint256 constant POLYGON_MAINNET = 137;
uint256 constant SCROLL_MAINNET = 534352;

uint32 constant ETH_DOMAIN = 0;
uint32 constant AVAX_DOMAIN = 1;
uint32 constant OP_DOMAIN = 2;
uint32 constant ARBITRUM_DOMAIN = 3;
uint32 constant BASE_DOMAIN = 6;
uint32 constant POLYGON_DOMAIN = 7;

function _getCCTPDomain(uint256 chainId) pure returns (uint32) {
    // Mainnets
    if (chainId == ARBITRUM_MAINNET) return ARBITRUM_DOMAIN;
    if (chainId == BASE_MAINNET) return BASE_DOMAIN;
    if (chainId == OP_MAINNET) return OP_DOMAIN;
    if (chainId == POLYGON_MAINNET) return POLYGON_DOMAIN;

    revert("Unsupported chainId");
}

// ----------------- Token Addresses ----------------- //

// USDC addresses
address constant ARBITRUM_MAINNET_USDC = 0xaf88d065e77c8cC2239327C5EDb3A432268e5831;
address constant BASE_MAINNET_USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
address constant OP_MAINNET_USDC = 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85;
address constant POLYGON_MAINNET_USDC = 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359;
address constant SCROLL_MAINNET_USDC = 0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4;

// Bridged USDC addresses
address constant LINEA_MAINNET_BRIDGED_USDC = 0x176211869cA2b568f2A7D4EE941E073a821EE1ff;

function _getUSDCAddress(uint256 chainId) pure returns (address) {
    // Mainnets
    if (chainId == ARBITRUM_MAINNET) return ARBITRUM_MAINNET_USDC;
    if (chainId == BASE_MAINNET) return BASE_MAINNET_USDC;
    if (chainId == OP_MAINNET) return OP_MAINNET_USDC;
    if (chainId == POLYGON_MAINNET) return POLYGON_MAINNET_USDC;
    if (chainId == SCROLL_MAINNET) return SCROLL_MAINNET_USDC;

    return address(0);
}

address constant ARBITRUM_MAINNET_TOKEN_MESSENGER = 0x19330d10D9Cc8751218eaf51E8885D058642E08A;
address constant BASE_MAINNET_TOKEN_MESSENGER = 0x1682Ae6375C4E4A97e4B583BC394c861A46D8962;
address constant OP_MAINNET_TOKEN_MESSENGER = 0x2B4069517957735bE00ceE0fadAE88a26365528f;
address constant POLYGON_MAINNET_TOKEN_MESSENGER = 0x9daF8c91AEFAE50b9c0E69629D3F6Ca40cA3B3FE;

// Retrieve the token messenger address for a given chainId.
function _getTokenMessengerAddress(uint256 chainId) pure returns (address) {
    if (chainId == ARBITRUM_MAINNET) return ARBITRUM_MAINNET_TOKEN_MESSENGER;
    if (chainId == BASE_MAINNET) return BASE_MAINNET_TOKEN_MESSENGER;
    if (chainId == OP_MAINNET) return OP_MAINNET_TOKEN_MESSENGER;
    if (chainId == POLYGON_MAINNET) return POLYGON_MAINNET_TOKEN_MESSENGER;

    return address(0);
}


// ----------------- Deployment ----------------- //

CREATE3Factory constant CREATE3 = CREATE3Factory(
    0x4Ce25bE5611B6527eA48f7Abf513d48BAcb4Cc44
);
