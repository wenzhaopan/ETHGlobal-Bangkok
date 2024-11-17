# Bridge Flow

## **Description**
At Devcon, we attended a number of talks about the need for unifying the Ethereum ecosystem. We recently experienced the pain of fragmentation between L2s when we wanted to bridge to Zircuit. 

We only had funds on L2s, so we wanted to bridge from Arbitrum to Zircuit. However, it turns out that Zircuit's native bridge only supports bridging from Ethereum. We only had funds on Arbitrum, so we had to manually swap USDC to Ethereum, bridge to Ethereum L1, and then bridge again to Zircuit.

The process was frustrating:
- It took over an hour.
- Required us to wait for one bridge to complete before manually initiating the next.
- Cost us significantly more in gas fees since we had to use Ethereum L1.

With just a single click, **our solution**:
1. Identifies the most cost-efficient route.
2. Handles all intermediary bridging seamlessly.
3. Performs intermediary swaps through dApp-controlled contracts, so users don’t need gas on intermediary chains.

If we had our aggregator then, it would’ve optimized the route—using Orbiter to bridge directly between L2s—saving us both time and gas fees. This tool is a step toward a unified, user-friendly Ethereum ecosystem.

---

### How it's made

---

# Bounties

## Zircuit
One-click bridge aggregator that identifies the cheapest route and seamlessly supports multi-hop bridge routes across any input/output bridges and tokens.

### A short description of what you integrated Zircuit with and how


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
**[Provide a description of your experience building on Zircuit.]**


### Demo (Optional)
- **Video Demo**: https://drive.google.com/file/d/109b9OmDZTEgkS33BWJ3EjJrOAGinPqhi/view?usp=sharing
- **Slide Deck**: https://docs.google.com/presentation/d/1poyc4fBmh7Pbp_ZEdji4dSJ16PIGDnSi8h7hqHhO8Ro/edit?usp=sharing

---
## Linea
### Linea Contract Address and Lineascan Link
- **Contract Address**: [Insert Linea contract address here]
- **LineaScan Link**: [Insert link to LineaScan here]

### Use of Linea
**[Outline how Linea was used in this project.]**

---

## Additional Notes
**[Provide any additional information or context if necessary.]**
