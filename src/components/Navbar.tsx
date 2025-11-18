import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useWeb3 } from "@/contexts/Web3Context";
import { Wallet, Vote } from "lucide-react";

const Navbar = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Vote className="h-8 w-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VoteChain
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/vote"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/vote") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Vote
            </Link>
            <Link
              to="/results"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/results") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Results
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/admin") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
            <Link
              to="/setup"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/setup") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Setup
            </Link>

            {account ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-md">
                  <p className="text-xs font-mono text-accent">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWallet} disabled={isConnecting} className="gap-2">
                <Wallet className="h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
