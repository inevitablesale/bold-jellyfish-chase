import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agents as initialAgents } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { showError } from "@/utils/toast";
import type { Agent } from "../data/agents";
import { findBestMatch } from "@/lib/vector-search";
import { Loader2 } from "lucide-react";
import { AgentBuilderDialog } from "@/components/AgentBuilderDialog";

const Dashboard = () => {
  const [request, setRequest] = useState(initialAgents[0].exampleRequest);
  const [agentsList, setAgentsList] = useState<Agent[]>(initialAgents);
  const [matchedAgents, setMatchedAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const handleMatch = async () => {
    setIsLoading(true);
    setSearchAttempted(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const bestMatch = await findBestMatch(request, agentsList);
      setMatchedAgents(bestMatch ? [bestMatch] : []);
    } catch (error) {
      console.error("Search failed:", error);
      showError("An error occurred during the matching process.");
      setMatchedAgents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentCreate = (newAgent: Agent) => {
    setAgentsList(prev => [...prev, newAgent]);
    setMatchedAgents([newAgent]);
    setIsLoading(false);
    setSearchAttempted(true);
  };

  const renderResults = () => {
    if (isLoading) {
      return (
        <div className="text-center p-8">
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <h2 className="text-xl font-semibold tracking-tight">Finding best agent...</h2>
          </div>
          <p className="text-muted-foreground mt-2">Analyzing your request to find the perfect match.</p>
        </div>
      );
    }

    if (!searchAttempted) {
      return null;
    }

    if (matchedAgents.length > 0) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-center">Best Matched Agent</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-1 max-w-2xl mx-auto">
            {matchedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold tracking-tight">No Suitable Agent Found</h2>
        <p className="text-muted-foreground mt-2 mb-4">We couldn't find an agent for your request. You can build a new one.</p>
        <Button onClick={() => setIsBuilderOpen(true)}>
          Build New Agent with AI
        </Button>
      </div>
    );
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
            onKeyDown={(e) => e.key === 'Enter' && handleMatch()}
          />
          <Button onClick={handleMatch} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? "Matching..." : "Match Agent"}
          </Button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Try requests like "generate leads", "market research", or "sync my crm".
        </p>
      </div>

      <div className="mt-16">
        {renderResults()}
      </div>

      <AgentBuilderDialog 
        isOpen={isBuilderOpen}
        setIsOpen={setIsBuilderOpen}
        onAgentCreate={handleAgentCreate}
        initialQuery={request}
      />
    </div>
  );
};

export default Dashboard;