import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { agents as initialAgents } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { showError } from "@/utils/toast";
import type { Agent } from "../data/agents";
import { findBestMatch } from "@/lib/vector-search";
import { Loader2, BotMessageSquare, ArrowUp, Sparkles } from "lucide-react";
import { AgentBuilderDialog } from "@/components/AgentBuilderDialog";

const QUICK_START_SUGGESTIONS = [
  "Find new leads for my startup",
  "Analyze the market for AI tools",
  "Generate an image of a cat in a spacesuit",
  "Create a Twitter thread from a blog post",
];

const IndexPage = () => {
  const [request, setRequest] = useState("");
  const [agentsList, setAgentsList] = useState<Agent[]>(initialAgents);
  const [matchedAgents, setMatchedAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const handleMatch = async () => {
    if (!request.trim()) return;
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

  const handleQuickStart = (suggestion: string) => {
    setRequest(suggestion);
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
          <div className="mt-12 text-center p-8 border-2 border-dashed rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold tracking-tight">Not what you were looking for?</h3>
            <p className="text-muted-foreground mt-2 mb-4 max-w-xl mx-auto">
              Build a custom agent for your specific need. Your creations help our developer community build better, more capable agents for everyone.
            </p>
            <Button onClick={() => setIsBuilderOpen(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Build a Custom Agent
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold tracking-tight">No Suitable Agent Found</h2>
        <p className="text-muted-foreground mt-2 mb-4">We couldn't find an agent for your request. You can build a new one.</p>
        <Button onClick={() => setIsBuilderOpen(true)}>
          <Sparkles className="mr-2 h-4 w-4" />
          Build New Agent with AI
        </Button>
      </div>
    );
  };

  const featuredAgents = [
    agentsList.find(a => a.id === 'lead-gen-1'),
    agentsList.find(a => a.id === 'n8n-social-poster'),
    agentsList.find(a => a.id === 'comfyui-text2img-1'),
  ].filter(Boolean) as Agent[];

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 57px)' }}>
      <main className="flex-1 overflow-y-auto">
        <div className="py-8 px-4">
          {searchAttempted || isLoading ? (
            renderResults()
          ) : (
            <>
              <div className="text-center max-w-3xl mx-auto pt-16">
                <BotMessageSquare className="mx-auto h-12 w-12 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight mt-4">How can I help you today?</h1>
                <p className="text-muted-foreground mt-2">Describe a task, and I'll find the best agent for the job.</p>
              </div>

              <div className="mt-16 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2">A Universe of Capabilities</h2>
                <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                  Our tech-agnostic platform supports agents from any source. Here are a few examples from across the ecosystem.
                </p>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {featuredAgents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
                </div>
                <div className="text-center mt-12">
                  <Button asChild size="lg">
                    <Link to="/marketplace">Explore All Agents</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="max-w-3xl mx-auto p-4 space-y-4">
          {!searchAttempted && !isLoading && (
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_START_SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1.5 px-3"
                  onClick={() => handleQuickStart(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}
          <div className="relative">
            <Textarea
              placeholder="e.g., Find me 100 new leads for..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="pr-12 min-h-[48px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleMatch();
                }
              }}
            />
            <Button 
              size="icon" 
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={handleMatch} 
              disabled={isLoading || !request.trim()}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
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

export default IndexPage;