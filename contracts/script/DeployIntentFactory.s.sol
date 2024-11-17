// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "../src/IntentFactory.sol";
import "./DeployConstants.s.sol";

contract DeployIntentFactory is Script {
    function run() public {
        vm.startBroadcast();

        address intentFactory = CREATE3.deploy(
            keccak256("IntentFactory-1"),
            abi.encodePacked(type(IntentFactory).creationCode, abi.encode())
        );

        vm.stopBroadcast();

        console.log("intent factory deployed at address:", intentFactory);
    }

    // Exclude from forge coverage
    function test() public {}
}
