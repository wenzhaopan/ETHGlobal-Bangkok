// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "openzeppelin-contracts/contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

import "./Utils.sol";
import "./interfaces/IBridger.sol";

contract BridgeMultiplexer is IBridger, Ownable2Step {
    using SafeERC20 for IERC20;

    // Map chainId to the contract address of a specific IBridger implementation
    mapping(uint256 chainId => IBridger bridger)
        public chainIdToBridger;

    event BridgeAdded(uint256 indexed chainId, address bridger);
    event BridgeRemoved(uint256 indexed chainId);

    constructor(
        address _owner,
        uint256[] memory _chainIds,
        IBridger[] memory _bridgers
    ) Ownable(_owner) {
        uint256 n = _chainIds.length;
        require(n == _bridgers.length, "wrong bridgers length");

        for (uint256 i = 0; i < n; ++i) {
            _addBridger({chainId: _chainIds[i], bridger: _bridgers[i]});
        }
    }

    function addBridger(
        uint256 chainId,
        IBridger bridger
    ) public onlyOwner {
        _addBridger({chainId: chainId, bridger: bridger});
    }

    function _addBridger(uint256 chainId, IBridger bridger) private {
        require(chainId != 0, "DPB: missing chainId");
        chainIdToBridger[chainId] = bridger;
        emit BridgeAdded({chainId: chainId, bridger: address(bridger)});
    }

    function removeBridger(uint256 chainId) public onlyOwner {
        delete chainIdToBridger[chainId];
        emit BridgeRemoved({chainId: chainId});
    }

    function bridgeToChain(
        Route calldata route,
        bytes calldata extraData
    ) public {
        require(route.currChainId != block.chainid, "incorrect chain");

        IBridger bridger = chainIdToBridger[route.toChainId];
        require(address(bridger) != address(0), "missing bridger");

        // Move input token from caller to this contract and initiate bridging.
        IERC20(route.inputAmount.token).safeTransferFrom({
            from: msg.sender,
            to: address(this),
            value: route.inputAmount.amount
        });

        // Approve tokens to the bridge contract and intiate bridging.
        IERC20(route.inputAmount.token).forceApprove({
            spender: address(bridger),
            value: route.inputAmount.amount
        });
        bridger.bridgeToChain(route, extraData);
    }
}
