# **Bridge Flow**

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

## **How It's Made**

---

## **Bounties**

### **Zircuit Bounty**
- One-click bridge aggregator that identifies the cheapest route and seamlessly supports multi-hop bridge routes across any input/output bridges and tokens.

#### **A Short Description of What You Integrated Zircuit With and How**

---

### **Team Introduction**
- **Matthew Liu**  
  Studying computer science at the University of Waterloo.  
  Prev SWE Intern at Nest Wallet.

- **Wenzhao Pan**  
  Studying computer science at the University of Waterloo.  
  Hack The North 2023 hackathon winner.

---

### **Instructions for Testing the Integration**

#### **Prerequisites**
- Install [Node.js](https://nodejs.org/) on your system.
- Ensure you have a wallet compatible with the application (e.g., MetaMask).
- Clone the repository from GitHub:
  ```bash
  git clone https://github.com/wenzhaopan/ETHGlobal-Bangkok.git
