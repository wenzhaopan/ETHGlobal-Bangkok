// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "../src/CCTPBridger.sol";
import "./DeployConstants.s.sol";

contract DeployCCTPBridger is Script {
    function run() public {
        address tokenMessenger = _getTokenMessengerAddress(block.chainid);

        (
            uint256[] memory chainIds,
            CCTPBridger.CCTPBridgeRoute[] memory bridgeRoutes
        ) = _getCCTPBridgeRoutes();

        vm.startBroadcast();

        address owner = msg.sender;

        address bridger = CREATE3.deploy(
            keccak256("CCTPBridger-1"),
            abi.encodePacked(
                type(CCTPBridger).creationCode,
                abi.encode(
                    owner,
                    ICCTPTokenMessenger(tokenMessenger),
                    chainIds,
                    bridgeRoutes
                )
            )
        );
        console.log("CCTP bridger deployed at address:", address(bridger));

        vm.stopBroadcast();
    }

    function _getCCTPBridgeRoutes()
        private
        view
        returns (
            uint256[] memory chainIds,
            CCTPBridger.CCTPBridgeRoute[] memory bridgeRoutes
        )
    {
        chainIds = new uint256[](4);
        chainIds[0] = ARBITRUM_MAINNET;
        chainIds[1] = BASE_MAINNET;
        chainIds[2] = OP_MAINNET;
        chainIds[3] = POLYGON_MAINNET;

        bridgeRoutes = new CCTPBridger.CCTPBridgeRoute[](4);
        for (uint256 i = 0; i < chainIds.length; ++i) {
            bridgeRoutes[i] = CCTPBridger.CCTPBridgeRoute({
                domain: _getCCTPDomain(chainIds[i]),
                bridgeTokenOut: _getUSDCAddress(chainIds[i])
            });
        }

        for (uint256 i = 0; i < chainIds.length; ++i) {
            console.log("Chain ID:", chainIds[i]);
            console.log("Domain:", bridgeRoutes[i].domain);
            console.log("Bridge token out:", bridgeRoutes[i].bridgeTokenOut);
            console.log("--------------------------------");
        }

        return (chainIds, bridgeRoutes);
    }

    // Exclude from forge coverage
    function test() public {}
}
