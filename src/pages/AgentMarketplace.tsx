import { useState } from "react";
import { Link } from "react-router-dom";
import { agents } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type FilterType = 'all' | 'free' | 'paid';

const AgentMarketplace = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAgents = agents.filter(agent => {
    if (filter === 'free') return !agent.price;
    if (filter === 'paid') return !!agent.price;
    return true;
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Agent Marketplace
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our open ecosystem of free and premium AI agents.
        </p>
      </div>

      <div className="my-8 p-6 bg-card border rounded-lg text-center">
        <Sparkles className="mx-auto h-8 w-8 text-primary mb-2" />
        <h2 className="text-2xl font-bold tracking-tight">Become a Creator</h2>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Have a powerful workflow or a custom automation? Publish it on our marketplace and share it with the world.
        </p>
        <Button asChild className="mt-4">
          <Link to="/register-agent">Publish Your Agent</Link>
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'free' ? 'default' : 'outline'} onClick={() => setFilter('free')}>Free</Button>
        <Button variant={filter === 'paid' ? 'default' : 'outline'} onClick={() => setFilter('paid')}>Paid</Button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentMarketplace;