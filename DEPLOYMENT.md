# Voting DApp Deployment Guide

## Quick Start (5 Minutes)

### Prerequisites

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MetaMask** browser extension - [Install here](https://metamask.io/)

### Installation

```bash
# Install all dependencies (includes Hardhat)
npm install
```

## Local Blockchain Setup

### Step 1: Start Hardhat Node

```bash
npx hardhat node
```

This will start a local Ethereum node at `http://127.0.0.1:8545` and provide 20 test accounts with 10000 ETH each.

### Step 2: Deploy Smart Contract

In a new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address and update `CONTRACT_ADDRESS` in `src/contexts/Web3Context.tsx`.

### Step 3: Configure MetaMask

1. Open MetaMask
2. Add network:
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

3. Import test account:
   - Copy private key from Hardhat node output
   - Import into MetaMask

### Step 4: Run Frontend

```bash
npm run dev
```

Visit `http://localhost:8080`

## Testnet Deployment (Sepolia)

### Step 1: Get Sepolia ETH

Get free Sepolia testnet ETH from:
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia

### Step 2: Setup Environment Variables

Create `.env` file:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
```

### Step 3: Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 4: Verify Contract (Optional)

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## Smart Contract Features

- **registerCandidate**: Admin registers candidates (only owner)
- **vote**: Users cast votes (one vote per address)
- **getCandidate**: Retrieve candidate details
- **getCandidateCount**: Get total candidates
- **hasVoted**: Check if address has voted
- **declareResults**: View winner and vote counts

## Testing Smart Contract

```bash
# Create test file: test/Voting.test.js
npx hardhat test
```

## Troubleshooting

### MetaMask Connection Issues
- Ensure network is set correctly
- Try resetting MetaMask account

### Transaction Failures
- Check account has sufficient ETH for gas
- Ensure contract address is correct

### Contract Not Found
- Verify contract is deployed
- Check CONTRACT_ADDRESS in Web3Context.tsx

## Security Notes

- **Never commit** private keys or `.env` files
- Use testnet for development
- Audit contract before mainnet deployment
- Implement proper access controls

## User Flow

1. **Admin**: Connect wallet → Navigate to Admin → Register candidates
2. **Voter**: Connect wallet → Navigate to Vote → Cast vote
3. **Anyone**: View Results page for live tallies

## Gas Optimization Tips

- Register all candidates in batch if possible
- Consider implementing candidate registration limits
- Use events for efficient data tracking

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
