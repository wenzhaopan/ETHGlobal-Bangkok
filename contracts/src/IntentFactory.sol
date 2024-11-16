// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "openzeppelin-contracts/contracts/utils/Create2.sol";
import "openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./Intent.sol";

contract IntentFactory {
    IntentContract public immutable intentImpl;

    constructor() {
        intentImpl = new IntentContract();
    }

    function createIntent(
        Intent calldata intent
    ) public returns (IntentContract ret) {
        ret = IntentContract(
            payable(
                address(
                    new ERC1967Proxy{salt: bytes32(0)}(
                        address(intentImpl),
                        abi.encodeCall(
                            IntentContract.initialize,
                            (calcIntentHash(intent))
                        )
                    )
                )
            )
        );
    }

    function getIntentAddress(
        Intent calldata intent
    ) public view returns (address) {
        return
            Create2.computeAddress(
                0,
                keccak256(
                    abi.encodePacked(
                        type(ERC1967Proxy).creationCode,
                        abi.encode(
                            address(intentImpl),
                            abi.encodeCall(
                                IntentContract.initialize,
                                (calcIntentHash(intent))
                            )
                        )
                    )
                )
            );
    }
}
