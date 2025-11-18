import hre from "hardhat";

async function main() {
  console.log("Deploying Voting contract...");

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  const address = await voting.getAddress();
  console.log("Voting contract deployed to:", address);
  console.log("\nUpdate the CONTRACT_ADDRESS in src/contexts/Web3Context.tsx with this address");

  // Register some sample candidates
  console.log("\nRegistering sample candidates...");
  
  const candidates = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Hon. Elizabeth Williams",
    "Mr. David Anderson"
  ];

  for (const candidate of candidates) {
    const tx = await voting.registerCandidate(candidate);
    await tx.wait();
    console.log(`Registered: ${candidate}`);
  }

  console.log("\nDeployment complete!");
  console.log("Contract Address:", address);
  console.log("Registered Candidates:", candidates.length);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
