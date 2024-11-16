#!/bin/bash
set -e

SCRIPTS=(
    # "script/DeployCreate3Factory.s.sol"

    "script/DeployCCTPBridger.s.sol"

    "script/DeployIntentFactory.s.sol"
    "script/DeployRelayer.s.sol"
)
CHAINS=(
    # MAINNETS
    # "https://base-mainnet.g.alchemy.com/v2/$ALCHEMY_API_KEY"
    # "https://opt-mainnet.g.alchemy.com/v2/$ALCHEMY_API_KEY"
    # "https://arb-mainnet.g.alchemy.com/v2/$ALCHEMY_API_KEY"
    # "https://polygon-mainnet.g.alchemy.com/v2/$ALCHEMY_API_KEY"
    "https://linea-mainnet.g.alchemy.com/v2/$ALCHEMY_API_KEY"
 
)

for SCRIPT in "${SCRIPTS[@]}"; do
    for CHAIN in "${CHAINS[@]}"; do
        IFS=',' read -r RPC_URL <<< "$CHAIN"
        echo ""
        echo "======= RUNNING $SCRIPT ========" 
        echo "ETHERSCAN_API_KEY: $ETHERSCAN_API_KEY"
        echo "RPC_URL          : $RPC_URL"

        FORGE_CMD="forge script $SCRIPT --sig run --fork-url $RPC_URL --private-key $PRIVATE_KEY"

        echo $FORGE_CMD
        echo ""
        $FORGE_CMD || exit 1
    done
done
