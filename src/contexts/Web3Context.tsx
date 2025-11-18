import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BrowserProvider, Contract, Eip1193Provider } from "ethers";
import { toast } from "sonner";

interface Web3ContextType {
  account: string | null;
  contract: Contract | null;
  provider: BrowserProvider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Contract ABI and Address - Use environment variable or default
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  "function registerCandidate(string memory _name) public",
  "function vote(uint _candidateId) public",
  "function getCandidateCount() public view returns (uint)",
  "function getCandidate(uint _id) public view returns (string memory name, uint voteCount)",
  "function hasVoted(address _voter) public view returns (bool)",
  "function declareResults() public view returns (string memory winner, uint winningVoteCount)",
  "function owner() public view returns (address)"
];

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      toast.error("Please install MetaMask to use this dApp");
      return;
    }

    try {
      setIsConnecting(true);
      const browserProvider = new BrowserProvider(ethereum as Eip1193Provider);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setProvider(browserProvider);
        
        const signer = await browserProvider.getSigner();
        const votingContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(votingContract);
        
        toast.success("Wallet connected successfully!");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    setProvider(null);
    toast.info("Wallet disconnected");
  };

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        contract,
        provider,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within Web3Provider");
  }
  return context;
};
