# Voting DApp - Blockchain-Based Voting System

A decentralized voting application built with React, Solidity, and Hardhat. Vote securely on the blockchain with full transparency and immutability.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local blockchain (Terminal 1)
npx hardhat node

# 3. Deploy contract (Terminal 2)
npx hardhat run scripts/deploy.js --network localhost

# 4. Start frontend (Terminal 3)
npm run dev
```

**👉 See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions**

## Features

- 🔐 **Secure Voting:** Each address can vote only once
- 🌐 **Decentralized:** All votes recorded on blockchain
- 📊 **Real-time Results:** Live vote tallies
- 🎯 **Admin Panel:** Register candidates (owner only)
- ✅ **Setup Verification:** Built-in setup guide and status checks
- 🦊 **MetaMask Integration:** Easy wallet connection

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** TailwindCSS + shadcn/ui
- **Blockchain:** Solidity + Hardhat + Ethers.js
- **Network:** Local (Hardhat) / Sepolia Testnet

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get started in 5 minutes
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide

## Contract Address

Default: `0x5FbDB2315678afecb367f032d93F642f64180aa3` (Hardhat localhost)

## Pages

- **Home:** Landing page with features
- **Vote:** Cast your vote for candidates
- **Results:** View live election results
- **Admin:** Register new candidates (owner only)
- **Setup:** Verify your configuration

---

## Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6a092ca2-ee6c-4f32-a7cd-af767a85a722

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6a092ca2-ee6c-4f32-a7cd-af767a85a722) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6a092ca2-ee6c-4f32-a7cd-af767a85a722) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
