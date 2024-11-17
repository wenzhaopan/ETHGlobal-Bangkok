// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "openzeppelin-contracts/contracts/access/Ownable2Step.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

import "./interfaces/IBridger.sol";
import "./cctp/ICCTPTokenMessenger.sol";

contract CCTPBridger is IBridger, Ownable2Step {
    using SafeERC20 for IERC20;

    struct CCTPBridgeRoute {
        uint32 domain;
        address bridgeTokenOut;
    }

    ICCTPTokenMessenger public cctpMessenger;

    mapping(uint256 toChainId => CCTPBridgeRoute bridgeRoute)
        public bridgeRouteMapping;

    event BridgeRouteAdded(
        uint256 indexed toChainId,
        CCTPBridgeRoute bridgeRoute
    );

    constructor(
        address _owner,
        ICCTPTokenMessenger _cctpMessenger,
        uint256[] memory _toChainIds,
        CCTPBridgeRoute[] memory _bridgeRoutes
    ) Ownable(_owner) {
        cctpMessenger = _cctpMessenger;
        _setBridgeRoutes({
            toChainIds: _toChainIds,
            bridgeRoutes: _bridgeRoutes
        });
    }

    function setBridgeRoutes(
        uint256[] memory toChainIds,
        CCTPBridgeRoute[] memory bridgeRoutes
    ) public onlyOwner {
        _setBridgeRoutes({toChainIds: toChainIds, bridgeRoutes: bridgeRoutes});
    }

    function _setBridgeRoutes(
        uint256[] memory toChainIds,
        CCTPBridgeRoute[] memory bridgeRoutes
    ) private {
        uint256 n = toChainIds.length;
        require(n == bridgeRoutes.length, "wrong bridgeRoutes length");

        for (uint256 i = 0; i < n; ++i) {
            bridgeRouteMapping[toChainIds[i]] = bridgeRoutes[i];
            emit BridgeRouteAdded({
                toChainId: toChainIds[i],
                bridgeRoute: bridgeRoutes[i]
            });
        }
    }

    function addressToBytes32(address addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(addr)));
    }

    function bridgeToChain(
        Route calldata route,
        bytes calldata /* extraData */
    ) public {
        require(route.toChainId != block.chainid, "same chain");

        CCTPBridgeRoute memory bridgeRoute = bridgeRouteMapping[
            route.toChainId
        ];

        IERC20 inToken = IERC20(route.inputAmount.token);
        uint256 inAmount = route.inputAmount.amount;

        // Transfer bridge token from sender
        inToken.safeTransferFrom({
            from: msg.sender,
            to: address(this),
            value: inAmount
        });

        // Approve and start CCTP bridge
        inToken.forceApprove({
            spender: address(cctpMessenger),
            value: inAmount
        });
        cctpMessenger.depositForBurn({
            amount: inAmount,
            destinationDomain: bridgeRoute.domain,
            mintRecipient: addressToBytes32(route.toAddress),
            burnToken: address(inToken)
        });

        emit BridgeInitiated({
            fromAddress: msg.sender,
            fromToken: address(inToken),
            fromAmount: inAmount,
            toChainId: route.toChainId,
            toAddress: route.toAddress,
            toToken: bridgeRoute.bridgeTokenOut,
            toAmount: route.expectedAmount.amount
        });
    }
}
