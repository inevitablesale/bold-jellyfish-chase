import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Agent } from "../data/agents";

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  const getBadgeVariant = (source: Agent['source']) => {
    switch (source) {
      case 'Open Source': return 'secondary';
      case 'N8N': return 'default';
      case 'Make.com': return 'outline';
      case 'Internal': return 'destructive';
      default: return 'secondary';
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{agent.name}</CardTitle>
          {agent.price ? (
            <Badge variant="default">${agent.price}{agent.pricingModel === 'subscription' ? '/mo' : ''}</Badge>
          ) : (
            <Badge variant="secondary">Free</Badge>
          )}
        </div>
        <CardDescription>{agent.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-wrap gap-2">
          {agent.skills.map((skill) => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Source: <Badge variant={getBadgeVariant(agent.source)} className="text-xs">{agent.source}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/agent/${agent.id}`}>
            {agent.price ? 'View & Purchase' : 'View Agent'}
            {agent.price ? <ShoppingCart className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};