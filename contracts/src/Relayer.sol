// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "./IntentFactory.sol";

contract Relayer {
    IntentFactory public immutable intentFactory;

    constructor(IntentFactory _intentFactory) {
        intentFactory = _intentFactory;
    }

    function deployAndBridge(
        Call[] calldata preCalls,
        Intent calldata intent,
        Call[] calldata calls,
        bytes calldata bridgeExtraData
    ) public {
        for (uint256 i = 0; i < preCalls.length; ++i) {
            Call calldata call = preCalls[i];
            (bool success, ) = call.to.call{value: call.value}(call.data);
            require(success, "pre-call failed");
        }

        // Deploy the intent contract
        IntentContract intentContract = intentFactory.createIntent(intent);

        // Execute the intent
        intentContract.executeAction({
            intent: intent,
            preCalls: calls,
            bridgeExtraData: bridgeExtraData
        });
    }

    receive() external payable {}
}
