import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { agents, AGENT_CATEGORIES, AgentSource } from "../data/agents";
import type { Agent } from "../data/agents";
import { AgentCard } from "@/components/AgentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstrumentsSidebar } from "@/components/InstrumentsSidebar";
import { Sparkles, Search } from "lucide-react";

const ALL_SOURCES = [...new Set(agents.map(a => a.source))];

const InstrumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked ? [...prev, categoryId] : prev.filter(id => id !== categoryId)
    );
  };

  const handleSourceChange = (source: string, checked: boolean) => {
    setSelectedSources(prev =>
      checked ? [...prev, source] : prev.filter(s => s !== source)
    );
  };

  const filteredAgents = useMemo(() => {
    let filtered = agents;

    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(agent => selectedCategories.includes(agent.category));
    }

    if (selectedSources.length > 0) {
      filtered = filtered.filter(agent => selectedSources.includes(agent.source));
    }

    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => (b.runs || 0) - (a.runs || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Assuming IDs are somewhat sequential for this mock
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedSources, sortBy]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="my-8 p-6 bg-card border rounded-lg text-center">
        <Sparkles className="mx-auto h-8 w-8 text-primary mb-2" />
        <h2 className="text-2xl font-bold tracking-tight">Become a Creator</h2>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Have a powerful workflow or a custom automation? Publish it in our instrument library and share it with the world.
        </p>
        <Button asChild className="mt-4">
          <Link to="/register-agent">Publish Your Instrument</Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <InstrumentsSidebar
          sources={ALL_SOURCES as AgentSource[]}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          selectedSources={selectedSources}
          onSourceChange={handleSourceChange}
        />
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search instruments..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No Instruments Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InstrumentsPage;