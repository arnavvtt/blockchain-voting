import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, User } from "lucide-react";

interface CandidateCardProps {
  id: number;
  name: string;
  voteCount: number;
  onVote?: (id: number) => void;
  hasVoted?: boolean;
  isVoting?: boolean;
  showVoteButton?: boolean;
}

const CandidateCard = ({
  id,
  name,
  voteCount,
  onVote,
  hasVoted,
  isVoting,
  showVoteButton = false,
}: CandidateCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">Candidate #{id}</p>
            </div>
          </div>
          {hasVoted && (
            <CheckCircle2 className="h-5 w-5 text-accent" />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Votes</span>
            <span className="font-bold text-lg text-primary">{voteCount}</span>
          </div>

          {showVoteButton && onVote && (
            <Button
              onClick={() => onVote(id)}
              disabled={hasVoted || isVoting}
              className="w-full"
              variant={hasVoted ? "outline" : "default"}
            >
              {isVoting
                ? "Voting..."
                : hasVoted
                ? "Already Voted"
                : "Vote for this Candidate"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
