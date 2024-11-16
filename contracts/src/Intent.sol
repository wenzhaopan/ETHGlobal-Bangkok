// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
import "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

import "./interfaces/IBridger.sol";

struct Call {
    // contract address to call
    address to;
    // Native value if applicable
    uint256 value;
    // calldata
    bytes data;
}

struct Intent {
    Route[] routes;
    address payable recipient;
    address payable escrow;
    uint256 nonce;
}

function calcIntentHash(Intent calldata intent) pure returns (bytes32) {
    return keccak256(abi.encode(intent));
}

contract IntentContract is Initializable {
    using SafeERC20 for IERC20;

    bytes32 intentHash;

    constructor() {
        _disableInitializers();
    }

    function initialize(bytes32 _intentHash) public initializer {
        intentHash = _intentHash;
    }

    /// Called on the source chain to initiate the intent. Sends funds to dest
    /// chain.
    function executeAction(
        Intent calldata intent,
        address payable caller,
        Call[] calldata preCalls,
        bytes calldata bridgeExtraData
    ) public {
        require(calcIntentHash(intent) == intentHash, "wrong hash");
        require(msg.sender == intent.escrow, "only escrow");

        for (uint256 i = 0; i < preCalls.length; ++i) {
            Call calldata call = preCalls[i];
            (bool success, ) = call.to.call{value: call.value}(call.data);
            require(success, "pre-call failed");
        }

        Route memory route = getRoute(intent);

        // Check that sufficient tokens were received
        uint256 tokenBalance = route.expectedAmount.token.balanceOf(address(this));
        require(tokenBalance >= route.expectedAmount.amount, "insufficient tokens received");

        // Bridge the tokens

        selfdestruct(intent.escrow);
    }

    function getRoute(Intent calldata intent) public view returns (Route memory) {
        uint256 n = intent.routes.length;

        for (uint256 i = 0; i < n; ++i) {
            if (intent.routes[i].currChainId == block.chainid) {
                return intent.routes[i];
            }
        }

        revert("no route found");
    }

    receive() external payable {}
}
