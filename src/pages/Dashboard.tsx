import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agents } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { showError, showLoading, dismissToast } from "@/utils/toast";
import type { Agent } from "../data/agents";
import { findBestMatch } from "@/lib/vector-search";

const Dashboard = () => {
  const [request, setRequest] = useState(agents[0].exampleRequest);
  const [matchedAgents, setMatchedAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMatch = async () => {
    setIsLoading(true);
    setMatchedAgents([]);
    const toastId = showLoading("Finding best agent...");

    try {
      // This now uses the fast, simulated search
      const bestMatch = await findBestMatch(request, agents);
      
      if (bestMatch) {
        setMatchedAgents([bestMatch]);
      } else {
        showError("No suitable agent found. Try rephrasing your request.");
      }
    } catch (error) {
      console.error("Search failed:", error);
      showError("An error occurred during the matching process.");
    } finally {
      setIsLoading(false);
      dismissToast(toastId);
    }
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