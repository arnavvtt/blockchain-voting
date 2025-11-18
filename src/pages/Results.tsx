import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import CandidateCard from "@/components/CandidateCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trophy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

const Results = () => {
  const { contract } = useWeb3();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState<{ name: string; voteCount: number } | null>(null);

  useEffect(() => {
    if (contract) {
      loadResults();
    }
  }, [contract]);

  const loadResults = async () => {
    if (!contract) return;
    
    try {
      setLoading(true);
      const count = await contract.getCandidateCount();
      const candidateList: Candidate[] = [];
      let maxVotes = 0;
      let winningCandidate: Candidate | null = null;

      for (let i = 1; i <= Number(count); i++) {
        const [name, voteCount] = await contract.getCandidate(i);
        const candidate = {
          id: i,
          name,
          voteCount: Number(voteCount),
        };
        candidateList.push(candidate);

        if (candidate.voteCount > maxVotes) {
          maxVotes = candidate.voteCount;
          winningCandidate = candidate;
        }
      }

      // Sort by vote count descending
      candidateList.sort((a, b) => b.voteCount - a.voteCount);
      setCandidates(candidateList);

      if (winningCandidate && winningCandidate.voteCount > 0) {
        setWinner({
          name: winningCandidate.name,
          voteCount: winningCandidate.voteCount,
        });
      }
    } catch (error: any) {
      console.error("Error loading results:", error);
      if (error.code === "CALL_EXCEPTION") {
        toast.error("Contract not deployed. Please check Setup page.");
      } else {
        toast.error("Failed to load results");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.voteCount, 0);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Election Results</h1>
            <p className="text-lg text-muted-foreground">
              Live results verified on the blockchain
            </p>
            <Button
              onClick={loadResults}
              variant="outline"
              className="mt-4 gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Results
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {winner && (
                <Card className="mb-8 border-2 border-accent bg-gradient-to-br from-accent/5 to-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Trophy className="h-6 w-6 text-accent" />
                      Current Leader
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{winner.name}</p>
                        <p className="text-muted-foreground">Leading the election</p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-accent">{winner.voteCount}</p>
                        <p className="text-sm text-muted-foreground">votes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Vote Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Votes</p>
                      <p className="text-2xl font-bold">{totalVotes}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Candidates</p>
                      <p className="text-2xl font-bold">{candidates.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-2xl font-bold text-accent">Live</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">All Candidates</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      id={candidate.id}
                      name={candidate.name}
                      voteCount={candidate.voteCount}
                      showVoteButton={false}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
