import { useState } from "react";
import { agents } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { Button } from "@/components/ui/button";

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

      <div className="mt-8 flex justify-center gap-2">
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