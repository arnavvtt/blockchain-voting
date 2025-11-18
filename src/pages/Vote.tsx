import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import CandidateCard from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

const Vote = () => {
  const { account, contract } = useWeb3();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    if (account && contract) {
      loadCandidates();
      checkVotingStatus();
    }
  }, [account, contract]);

  const loadCandidates = async () => {
    if (!contract) return;
    
    try {
      setLoading(true);
      const count = await contract.getCandidateCount();
      const candidateList: Candidate[] = [];

      for (let i = 1; i <= Number(count); i++) {
        const [name, voteCount] = await contract.getCandidate(i);
        candidateList.push({
          id: i,
          name,
          voteCount: Number(voteCount),
        });
      }

      setCandidates(candidateList);
    } catch (error: any) {
      console.error("Error loading candidates:", error);
      if (error.code === "CALL_EXCEPTION") {
        toast.error("Contract not deployed. Please check Setup page.");
      } else {
        toast.error("Failed to load candidates");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkVotingStatus = async () => {
    if (!contract || !account) return;
    
    try {
      const voted = await contract.hasVoted(account);
      setHasVoted(voted);
    } catch (error: any) {
      console.error("Error checking voting status:", error);
      if (error.code === "CALL_EXCEPTION") {
        toast.error("Contract not deployed. Please check Setup page.");
      }
    }
  };

  const handleVote = async (candidateId: number) => {
    if (!contract) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsVoting(true);
      const tx = await contract.vote(candidateId);
      toast.info("Transaction submitted. Waiting for confirmation...");
      
      await tx.wait();
      toast.success("Vote cast successfully!");
      
      setHasVoted(true);
      await loadCandidates();
    } catch (error: any) {
      console.error("Error voting:", error);
      toast.error(error.message || "Failed to cast vote");
    } finally {
      setIsVoting(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to participate in voting
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Cast Your Vote</h1>
            <p className="text-lg text-muted-foreground">
              Select your preferred candidate and submit your vote on the blockchain
            </p>
            {hasVoted && (
              <Alert className="mt-6 max-w-md mx-auto border-accent">
                <AlertDescription className="text-accent font-medium">
                  You have already cast your vote in this election
                </AlertDescription>
              </Alert>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : candidates.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No candidates registered yet. Please check back later.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  id={candidate.id}
                  name={candidate.name}
                  voteCount={candidate.voteCount}
                  onVote={handleVote}
                  hasVoted={hasVoted}
                  isVoting={isVoting}
                  showVoteButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;
