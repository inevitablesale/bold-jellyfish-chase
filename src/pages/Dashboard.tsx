import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agents } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { showError } from "@/utils/toast";
import type { Agent } from "../data/agents";

const Dashboard = () => {
  const [request, setRequest] = useState(agents[0].exampleRequest);
  const [matchedAgents, setMatchedAgents] = useState<typeof agents>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMatch = () => {
    setIsLoading(true);
    setMatchedAgents([]);

    setTimeout(() => {
      const requestWords = request
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2);

      let bestMatch: { agent: Agent; score: number } | null = null;

      agents.forEach(agent => {
        let score = 0;
        const lowerCaseSkills = agent.skills.join(' ').toLowerCase();
        const lowerCaseName = agent.name.toLowerCase();
        const lowerCaseDescription = agent.description.toLowerCase();

        requestWords.forEach(word => {
          if (lowerCaseSkills.includes(word)) {
            score += 5; // Highest weight for skills
          }
          if (lowerCaseName.includes(word)) {
            score += 3; // Medium weight for name
          }
          if (lowerCaseDescription.includes(word)) {
            score += 1; // Low weight for description
          }
        });

        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { agent, score };
        }
      });

      if (bestMatch && bestMatch.score > 5) { // Require a minimum score to avoid bad matches
        setMatchedAgents([bestMatch.agent]);
      } else {
        showError("No suitable agent found. Try rephrasing your request.");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Multi-Agent Performance Platform
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
          Reach business goals faster by intelligently matching your requests with the most effective AI agents.
        </p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="e.g., Find me 100 new leads for..."
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleMatch} disabled={isLoading}>
            {isLoading ? "Matching..." : "Match Agent"}
          </Button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Try requests like "generate leads", "market research", or "sync my crm".
        </p>
      </div>

      {isLoading && (
        <div className="mt-12 text-center">
          <p>Analyzing request and finding the best agent...</p>
        </div>
      )}

      {matchedAgents.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center">Best Matched Agent</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-1 max-w-2xl mx-auto">
            {matchedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;