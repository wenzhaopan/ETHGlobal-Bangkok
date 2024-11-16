// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "../Utils.sol";

struct Route {
    uint256 currChainId;
    uint256 toChainId;
    TokenAmount expectedAmount;
    TokenAmount inputAmount;
    address toAddress;
}

interface IBridger {
    event BridgeInitiated(
        address fromAddress,
        address fromToken,
        uint256 fromAmount,
        uint256 toChainId,
        address toAddress,
        address toToken,
        uint256 toAmount
    );

    function bridgeToChain(
        Route calldata route,
        bytes calldata extraData
    ) external;
}
