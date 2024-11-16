# Bridge Flow

## Description
At Devcon, we attended a number of talks about the need for unifying the Ethereum ecosystem. We recently experienced the pain of fragmentation between L2s when we wanted to bridge to Zircuit. We only had funds on L2s, so we wanted to bridge from Arbitrum to Zircuit. However, it turns out that Zircuit's native bridge only supports bridging from Ethereum. We only had funds on Arbitrum, so we had to manually swap USDC to Ethereum, bridge to Ethereum L1, and then bridge again to Zircuit.

The process was frustrating—it took over an hour, required us to wait for one bridge to complete before manually initiating the next, and cost us significantly more in gas fees since we had to use Ethereum L1.

With just a single click, our solution identifies the most cost-efficient route and handles all intermediary bridging seamlessly. Additionally, since our solution performs intermediary swaps through dApp-controlled contracts, users don’t need to have gas on intermediary chains to execute those swaps. If we had our aggregator then, it would’ve optimized the route—using Orbiter to bridge directly between L2s—saving us both time and gas fees. This tool is a step toward a unified, user-friendly Ethereum ecosystem.

### How it's made

---

## Bounties

### Zircuit
One-click bridge aggregator that identifies the cheapest route and seamlessly supports multi-hop bridge routes across any input/output bridges and tokens.

### A short description of what you integrated Zircuit with and how


### Team Introduction
- Matthew Liu - Studying computer science at University of Waterloo. Prev SWE Intern at Nest Wallet.

- Wenzhao Pan - Studying computer science at University of Waterloo. Hack The North 2023 hackathon winner.

### Instructions for Testing the Integration
1. **Prerequisites**:
   - [List any software, accounts, or dependencies required.]
   - [Provide any necessary links for setup.]

2. **Steps to Test**:
   - [Step-by-step guide on how to test the integration.]
   - [Include any relevant commands, configurations, or parameters.]

3. **Expected Outcomes**:
   - [Detail what users should expect at each step or upon successful testing.]


### Feedback
**[Provide a description of your experience building on Zircuit.]**


### Demo (Optional)
- **Video Demo**: [Link to video demo (if applicable)]
- **Slide Deck**: https://docs.google.com/presentation/d/1poyc4fBmh7Pbp_ZEdji4dSJ16PIGDnSi8h7hqHhO8Ro/edit?usp=sharing
---

 

---


---

## Linea Contract Address and Lineascan Link
- **Contract Address**: `[Insert Linea contract address here]`
- **LineaScan Link**: [Insert link to LineaScan here]

---

## Use of Linea
**[Outline how Linea was used in this project.]**

---

## Additional Notes
**[Provide any additional information or context if necessary.]**
