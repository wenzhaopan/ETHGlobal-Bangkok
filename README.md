# Bridge Flow

## **Description**
At Devcon, we attended several talks highlighting the importance of unifying the Ethereum ecosystem. The challenges of fragmentation between L2s affected us during a recent attempt to bridge to Zircuit. With our funds exclusively on L2s, we needed to bridge from Arbitrum to Zircuit. However, we discovered that Zircuit's native bridge only supports transfers from Ethereum. As a result, we had to manually swap USDC to Ethereum, bridge to Ethereum L1, and then bridge again to Zircuit.

The process was frustrating—it took over an hour, required us to wait for one bridge to complete before manually initiating the next, and cost us significantly more in gas fees since we had to use Ethereum L1.

With just a single click, BridgeFlow identifies the most cost-efficient route and handles all intermediary bridging seamlessly. Additionally, since our solution performs intermediary swaps through dApp-controlled contracts, users don’t need to have gas on intermediary chains to execute those swaps. If we had our aggregator then, it would’ve optimized the route—using Orbiter to bridge directly between L2s—saving us both time and gas fees. This tool is a step toward a unified, user-friendly Ethereum ecosystem.

---

### How it's made
We aimed to build our bridge aggregator so that bridging happens permissionlessly and trustlessly. We accomplished this using the idea of "intent addresses" and CREATE2.

CREATE2 is an EVM opcode that allows you to pre-determine the address a contract will be deployed to based on the constructor arguments and contract code. Changing the contract source code will result in changing the CREATE2 address.

An intent address is a CREATE2 address which hashes the parameters of a bridge transfer into an address. The intent contract we wrote allows only a single action: sending tokens held by the contract into the bridging protocol specified in the parameters. The intent address ensures that only a single contract can be deployed to the CREATE2 address, and the only thing this contract can do is send tokens to a bridge.

The intended flow for interacting with an intent contract is:
1. The user sends funds to the pre-determined CREATE2 address of the contract.
2. A relayer deploys the intent contract to the CREATE2 address.
3. The contract sends tokens to the bridge and initiates the bridge transfer.

Here is an example lifecycle for a bridge transfer from zircuit to linea using rhino and axelar with base as an intermediary chain:
1. The user sends tokens to the intent address on zircuit.
2. A relayer deploys the intent contract to the intent address and calls the `executeAction` function. This sends the tokens to the rhinofi bridge and initiates bridging.
3. Once the bridge completes, it will send funds to the same intent address on base. The relayer deploys the intent contract on base and similarly calls the `executeAction` function to initiate bridging using Axelar.
4. When the bridge completes, the funds will be sent to the intent address on linea. Again, the relayer deploys the intent contract on linea and calls the `executeAction`. The `executeAction` function will see that linea is the final destination chain and send the funds to the user.

Intent addresses enable the whole bridging process to execute permisionlessly and trustlessly without any cross-chain communication. Trustless because the user doesn't have to trust the relayer to act honestly and still be guaranteed to receive funds on their destinatino chain. Permisionless because anyone can deploy the intent contract and call `executeAction`, even the user themselves, so funds will never get stuck.

The intent addresses architecture enables a seamless UX for the user. The user doesn't need to hold gas on any of the destination or intermediary chains.

---

# Bounties

## Zircuit
### A clear short one-sentence description of your submission
One-click bridge aggregator that identifies the cheapest route and seamlessly supports multi-hop bridge routes across any input/output bridges and tokens.

### A short description of what you integrated Zircuit with and how
Contracts:
CREATE3 factory: https://explorer.zircuit.com/address/0x4e59b44847b379578588920cA78FbF26c0B4956C?activeTab=3

We aimed to build our bridge aggregator so that bridging happens permissionlessly and trustlessly. We accomplished this using the idea of "intent addresses" and CREATE2. We deployed our contracts to Zircuit to enable trustless bridging with relayers. We deployed a contract to interact with a bridger, an intent factory contract to deploy intents, and a relayer contract which relayers can use to permisionlessly fulfill intents. Here is a technical breakdown of how we used intents.

CREATE2 is an EVM opcode that allows you to pre-determine the address a contract will be deployed to based on the constructor arguments and contract code. Changing the contract source code will result in changing the CREATE2 address.

An intent address is a CREATE2 address which hashes the parameters of a bridge transfer into an address. The intent contract we wrote allows only a single action: sending tokens held by the contract into the bridging protocol specified in the parameters. The intent address ensures that only a single contract can be deployed to the CREATE2 address, and the only thing this contract can do is send tokens to a bridge.

The intended flow for interacting with an intent contract is:
1. The user sends funds to the pre-determined CREATE2 address of the contract.
2. A relayer deploys the intent contract to the CREATE2 address.
3. The contract sends tokens to the bridge and initiates the bridge transfer.

Here is an example lifecycle for a bridge transfer from zircuit to linea using rhino and axelar with base as an intermediary chain:
1. The user sends tokens to the intent address on zircuit.
2. A relayer deploys the intent contract to the intent address and calls the `executeAction` function. This sends the tokens to the rhinofi bridge and initiates bridging.
3. Once the bridge completes, it will send funds to the same intent address on base. The relayer deploys the intent contract on base and similarly calls the `executeAction` function to initiate bridging using Axelar.
4. When the bridge completes, the funds will be sent to the intent address on linea. Again, the relayer deploys the intent contract on linea and calls the `executeAction`. The `executeAction` function will see that linea is the final destination chain and send the funds to the user.

Intent addresses enable the whole bridging process to execute permisionlessly and trustlessly without any cross-chain communication. Trustless because the user doesn't have to trust the relayer to act honestly and still be guaranteed to receive funds on their destinatino chain. Permisionless because anyone can deploy the intent contract and call `executeAction`, even the user themselves, so funds will never get stuck.

The intent addresses architecture enables a seamless UX for the user. The user doesn't need to hold gas on any of the destination or intermediary chains.

### Team Introduction
- Matthew Liu - Studying computer science at University of Waterloo. Prev SWE Intern at Nest Wallet.
- Wenzhao Pan - Studying computer science at University of Waterloo. Hack The North 2023 hackathon winner.

### Instructions for Testing the Integration

1. **Prerequisites**:
   - Install [Node.js](https://nodejs.org/) on your system.
   - Ensure you have a wallet compatible with the application (e.g., MetaMask).
   - Clone the repository from GitHub:
     
bash
     git clone https://github.com/wenzhaopan/ETHGlobal-Bangkok.git


2. **Steps to Test**:
   - **Frontend Setup**:
     1. Navigate to the frontend directory:
        
bash
        cd ETHGlobal-Bangkok/frontend

     2. Install dependencies:
        
bash
        npm install

     3. Start the frontend server:
        
bash
        npm run dev

   - **Backend Setup**:
     1. Open a new terminal and navigate to the backend directory:
        
bash
        cd ETHGlobal-Bangkok/backend

     2. Install dependencies:
        
bash
        npm install

     3. Start the backend server:
        
bash
        npm run dev

   - **Testing the Integration**:
     1. Open the frontend in your browser (default: http://localhost:3000).
     2. Connect your wallet using the UI.
     3. Select the input and output chains.
     4. Find the addresses of the input and output tokens for the selected chains.
     5. Open the route-finder code (located in the backend) and configure it:
        - Input the token addresses.
        - Ensure the route-finder uses **CCTP**, **Orbiter.finance**, and **Rhino.fi** to verify a valid route exists.
     6. Start the bridging process using the route-finder.
     7. Monitor the bridging process (it may take 10-60 minutes depending on the calculated route).

3. **Expected Outcomes**:
   - **Frontend**: The wallet should connect successfully, and you should be able to select input/output chains.
   - **Backend**: The server should validate the input and output tokens and calculate a valid bridging route.
   - **Bridging Process**: The tokens should successfully bridge between chains within 10-60 minutes based on the optimal route.



### Feedback
I found that some other companies don't support Zircuit. For example, I was using Alchemy to deploy contracts, and it worked for all other chains except it didn't support zircuit so I had to figure out a different way of doing it which was extra work compared to the other chains.

Also, when deploying contracts our deployment transaction was reverting but it wasn't on other chains. There was no revert message making it hard to debug.


### Demo
- **Video Demo**: https://drive.google.com/file/d/109b9OmDZTEgkS33BWJ3EjJrOAGinPqhi/view?usp=sharing
- **Slide Deck**: https://docs.google.com/presentation/d/1poyc4fBmh7Pbp_ZEdji4dSJ16PIGDnSi8h7hqHhO8Ro/edit?usp=sharing

---
## Linea

### Contracts:
https://lineascan.build/address/0x9B5F478963D96002E21c82DdDfd1C185d51faF11#code
https://lineascan.build/address/0x8fA128A9d46F9678444C4283108997A542714f16#code

### Use of Linea:
We aimed to build our bridge aggregator so that bridging happens permissionlessly and trustlessly. We accomplished this using the idea of "intent addresses" and CREATE2. We deployed our contracts to Linea to enable trustless bridging with relayers. We deployed a contract to interact with a bridger, an intent factory contract to deploy intents, and a relayer contract which relayers can use to permisionlessly fulfill intents. Here is a technical breakdown of how we used intents.

CREATE2 is an EVM opcode that allows you to pre-determine the address a contract will be deployed to based on the constructor arguments and contract code. Changing the contract source code will result in changing the CREATE2 address.

An intent address is a CREATE2 address which hashes the parameters of a bridge transfer into an address. The intent contract we wrote allows only a single action: sending tokens held by the contract into the bridging protocol specified in the parameters. The intent address ensures that only a single contract can be deployed to the CREATE2 address, and the only thing this contract can do is send tokens to a bridge.

The intended flow for interacting with an intent contract is:
1. The user sends funds to the pre-determined CREATE2 address of the contract.
2. A relayer deploys the intent contract to the CREATE2 address.
3. The contract sends tokens to the bridge and initiates the bridge transfer.

Here is an example lifecycle for a bridge transfer from zircuit to linea using rhino and axelar with base as an intermediary chain:
1. The user sends tokens to the intent address on zircuit.
2. A relayer deploys the intent contract to the intent address and calls the `executeAction` function. This sends the tokens to the rhinofi bridge and initiates bridging.
3. Once the bridge completes, it will send funds to the same intent address on base. The relayer deploys the intent contract on base and similarly calls the `executeAction` function to initiate bridging using Axelar.
4. When the bridge completes, the funds will be sent to the intent address on linea. Again, the relayer deploys the intent contract on linea and calls the `executeAction`. The `executeAction` function will see that linea is the final destination chain and send the funds to the user.

Intent addresses enable the whole bridging process to execute permisionlessly and trustlessly without any cross-chain communication. Trustless because the user doesn't have to trust the relayer to act honestly and still be guaranteed to receive funds on their destinatino chain. Permisionless because anyone can deploy the intent contract and call `executeAction`, even the user themselves, so funds will never get stuck.

The intent addresses architecture enables a seamless UX for the user. The user doesn't need to hold gas on any of the destination or intermediary chains.

---

## Polygon
### Contracts
- cctp bridger: https://polygonscan.com/address/0x915c26782031b38636F6F987b75D3bd4a1E6b62e#code
- intent factory: https://polygonscan.com/address/0x7D7F0D8f2941247918795346DFC5AFd2c98a20b8#code
- relayer contract: https://polygonscan.com/address/0x88b638d93ca5278ef77ea977b14b4dc347fe38d8#code

## Scroll:
Contracts:
- intent factory addr: https://scrollscan.com/address/0x9B5F478963D96002E21c82DdDfd1C185d51faF11#code
- CCTP bridger: https://scrollscan.com/address/0x9B5F478963D96002E21c82DdDfd1C185d51faF11#code
