import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, CheckCircle2, TrendingUp, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Powered by Ethereum Blockchain
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Decentralized Voting
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Made Transparent
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A secure, transparent, and immutable voting platform built on blockchain technology.
              Every vote counts, every vote matters.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/vote">
                  Start Voting
                  <CheckCircle2 className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/results">View Results</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why VoteChain?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge blockchain technology to ensure trust and transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl">Secure</h3>
                <p className="text-muted-foreground">
                  Military-grade encryption with blockchain immutability
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-xl">Transparent</h3>
                <p className="text-muted-foreground">
                  All votes are publicly verifiable on the blockchain
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl">Efficient</h3>
                <p className="text-muted-foreground">
                  Instant vote counting with real-time results
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Lock className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-xl">Immutable</h3>
                <p className="text-muted-foreground">
                  Once cast, votes cannot be altered or deleted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to participate in decentralized democracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="font-bold text-xl">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your MetaMask wallet to authenticate and participate
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="font-bold text-xl">Cast Your Vote</h3>
              <p className="text-muted-foreground">
                Review candidates and submit your vote securely on-chain
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="font-bold text-xl">Verify Results</h3>
              <p className="text-muted-foreground">
                View transparent results verified on the blockchain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of voters using blockchain technology for transparent elections
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link to="/vote">
              Start Voting Now
              <CheckCircle2 className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
