// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "forge-std/Script.sol";

import "../src/Relayer.sol";
import "./DeployConstants.s.sol";

contract DeployRelayer is Script {
    function run() public {
        vm.startBroadcast();

        address intentFactory = CREATE3.getDeployed(
            msg.sender,
            keccak256("CCTPBridger-1")
        );
        console.log("intent factory addr:", intentFactory);
        address relayer = CREATE3.getDeployed(
            msg.sender,
            keccak256("Relayer-1")
        );
        console.log("relayer addr:", relayer);

        // address relayer = CREATE3.deploy(
        //     keccak256("Relayer-1"),
        //     abi.encodePacked(
        //         type(Relayer).creationCode,
        //         abi.encode(intentFactory)
        //     )
        // );

        vm.stopBroadcast();

        console.log("relayer deployed at:", relayer);
    }

    // Exclude from forge coverage
    function test() public {}
}
