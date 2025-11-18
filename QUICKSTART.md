# Quick Start Guide - Voting DApp

## Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Local Blockchain (Terminal 1)
```bash
npx hardhat node
```
**Keep this terminal running!** It's your local blockchain.

### Step 3: Deploy Smart Contract (Terminal 2 - New Window)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

This will:
- Deploy the Voting smart contract
- Register 4 sample candidates automatically
- Display the contract address

**IMPORTANT:** The contract address is already configured in the code (`0x5FbDB2315678afecb367f032d93F642f64180aa3`). This is the default Hardhat deployment address and will work automatically.

### Step 4: Configure MetaMask

1. **Add Localhost Network:**
   - Open MetaMask → Networks → Add Network → Add Network Manually
   - Network Name: `Localhost 8545`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
   - Click Save

2. **Import Test Account:**
   - Look at your Hardhat terminal (from Step 2)
   - Copy any private key from the "Private Keys" section
   - In MetaMask: Click account icon → Import Account → Paste private key
   - This account has 10,000 test ETH!

### Step 5: Start Frontend (Terminal 3 - New Window)
```bash
npm run dev
```

Visit: `http://localhost:8080`

### Step 6: Navigate to Setup Page

Click **"Setup"** in the navbar to verify everything is working correctly. The setup page will show you:
- ✅ Wallet connection status
- ✅ Network configuration status  
- ✅ Contract deployment status
- ✅ Number of candidates registered

### Step 7: Start Voting!

Once setup is complete:
1. Go to **Vote** page
2. Select a candidate
3. Click "Cast Vote"
4. Approve transaction in MetaMask
5. View results on **Results** page

## Admin Access

To register more candidates:
1. Go to **Admin** page
2. Only the account that deployed the contract can access admin
3. Use Account #0 from Hardhat (the first account shown)

## Troubleshooting

**"Contract not deployed" error:**
- Make sure Step 2 (hardhat node) is still running
- Re-run Step 3 (deploy script)
- Refresh the webpage

**"Wrong network" warning:**
- Make sure MetaMask is on "Localhost 8545" network
- Not on Ethereum Mainnet, Sepolia, or other networks

**Transaction fails:**
- Make sure you have test ETH (import account from Hardhat)
- Check if you already voted (one vote per address)

## What's Next?

- **Testnet Deployment:** See `DEPLOYMENT.md` for Sepolia testnet instructions
- **Production:** Consider auditing the contract before mainnet deployment
- **Customization:** Modify candidates, add features, update UI

## Project Structure

```
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment scripts
├── src/
│   ├── pages/        # React pages (Vote, Results, Admin, Setup)
│   ├── components/   # Reusable components
│   └── contexts/     # Web3 context for blockchain connection
└── hardhat.config.js # Hardhat configuration
```

## Need Help?

Check the **Setup** page in the app - it provides real-time status and troubleshooting tips!
