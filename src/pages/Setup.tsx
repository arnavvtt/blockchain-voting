import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

const Setup = () => {
  const { account, contract, connectWallet } = useWeb3();
  const [contractStatus, setContractStatus] = useState<"checking" | "connected" | "error">("checking");
  const [networkStatus, setNetworkStatus] = useState<"checking" | "connected" | "wrong">("checking");
  const [candidateCount, setCandidateCount] = useState<number>(0);

  useEffect(() => {
    checkSetup();
  }, [account, contract]);

  const checkSetup = async () => {
    if (!account || !contract) {
      setContractStatus("checking");
      setNetworkStatus("checking");
      return;
    }

    // Check network
    try {
      const ethereum = (window as any).ethereum;
      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId === "0x7a69") { // 31337 in hex (localhost)
        setNetworkStatus("connected");
      } else {
        setNetworkStatus("wrong");
      }
    } catch (error) {
      console.error("Network check error:", error);
    }

    // Check contract
    try {
      const count = await contract.getCandidateCount();
      setCandidateCount(Number(count));
      setContractStatus("connected");
    } catch (error) {
      console.error("Contract check error:", error);
      setContractStatus("error");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "connected") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === "error" || status === "wrong") return <XCircle className="h-5 w-5 text-red-500" />;
    return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Setup Guide</h1>
          <p className="text-lg text-muted-foreground">
            Follow these steps to get your voting DApp running
          </p>
        </div>

        {/* Setup Status Cards */}
        <div className="grid gap-6 mb-8">
          {/* Step 1: Wallet Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">1</span>
                Connect MetaMask Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={account ? "connected" : "checking"} />
                  {!account && (
                    <Button onClick={connectWallet}>
                      Connect Wallet
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Network */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">2</span>
                Network Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {networkStatus === "connected" ? "Connected to Localhost (Chain ID: 31337)" : 
                     networkStatus === "wrong" ? "Wrong network - Please switch to Localhost 8545" :
                     "Checking network..."}
                  </p>
                </div>
                <StatusIcon status={networkStatus} />
              </div>

              {networkStatus === "wrong" && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Switch to Localhost Network</strong>
                    <ul className="mt-2 ml-4 list-disc space-y-1 text-sm">
                      <li>Network Name: Localhost 8545</li>
                      <li>RPC URL: http://127.0.0.1:8545</li>
                      <li>Chain ID: 31337</li>
                      <li>Currency Symbol: ETH</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Smart Contract */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">3</span>
                Smart Contract Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {contractStatus === "connected" ? `Contract deployed - ${candidateCount} candidates registered` :
                     contractStatus === "error" ? "Contract not found or not deployed" :
                     "Checking contract..."}
                  </p>
                </div>
                <StatusIcon status={contractStatus} />
              </div>

              {contractStatus === "error" && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Contract Not Deployed</strong>
                    <p className="mt-2 text-sm">Follow these steps to deploy the contract:</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Terminal className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">Terminal Commands:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-background p-2 rounded border">
                        <code className="text-sm flex-1">npx hardhat node</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard("npx hardhat node", "Command")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Start local blockchain (keep this running)</p>
                      
                      <div className="flex items-center gap-2 bg-background p-2 rounded border mt-2">
                        <code className="text-sm flex-1">npx hardhat run scripts/deploy.js --network localhost</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard("npx hardhat run scripts/deploy.js --network localhost", "Command")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Deploy contract (in new terminal)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Status */}
        {account && networkStatus === "connected" && contractStatus === "connected" && (
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong className="text-green-600">Setup Complete!</strong>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                Your voting DApp is ready. You can now navigate to the Vote page to start voting!
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Links */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Check DEPLOYMENT.md for detailed instructions</li>
              <li>• Ensure Hardhat node is running in a terminal</li>
              <li>• Make sure MetaMask is installed and configured</li>
              <li>• Import a test account from Hardhat node output</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
