import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, UserPlus, Shield } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const { account, contract } = useWeb3();
  const [candidateName, setCandidateName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account && contract) {
      checkOwnership();
    }
  }, [account, contract]);

  const checkOwnership = async () => {
    if (!contract || !account) return;
    
    try {
      setLoading(true);
      const owner = await contract.owner();
      setIsOwner(owner.toLowerCase() === account.toLowerCase());
    } catch (error: any) {
      console.error("Error checking ownership:", error);
      if (error.code === "CALL_EXCEPTION") {
        toast.error("Contract not deployed. Please check Setup page.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidateName.trim()) {
      toast.error("Please enter a candidate name");
      return;
    }

    if (!contract) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsRegistering(true);
      const tx = await contract.registerCandidate(candidateName);
      toast.info("Transaction submitted. Waiting for confirmation...");
      
      await tx.wait();
      toast.success(`Candidate "${candidateName}" registered successfully!`);
      setCandidateName("");
    } catch (error: any) {
      console.error("Error registering candidate:", error);
      toast.error(error.message || "Failed to register candidate");
    } finally {
      setIsRegistering(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to access the admin panel
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Access Denied: Only the contract owner can access this admin panel
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage candidates and election settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Register New Candidate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterCandidate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Candidate Name</Label>
                <Input
                  id="candidateName"
                  type="text"
                  placeholder="e.g., Dr. Sarah Johnson"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  disabled={isRegistering}
                />
                <p className="text-sm text-muted-foreground">
                  Enter a professional name for the candidate
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isRegistering || !candidateName.trim()}
              >
                {isRegistering ? "Registering..." : "Register Candidate"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Alert className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Admin Instructions:</strong>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm">
              <li>Register all candidates before voters start casting votes</li>
              <li>Each transaction requires gas fees paid in ETH</li>
              <li>All actions are recorded on the blockchain</li>
              <li>Use professional and appropriate candidate names</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Admin;
