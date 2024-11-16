// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

struct TokenAmount {
    /// @dev Zero address = native asset, e.g. ETH
    IERC20 token;
    uint256 amount;
}
