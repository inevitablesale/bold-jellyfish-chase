import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        <CardTitle className="flex items-center justify-between">
          {agent.name}
          <Badge variant={getBadgeVariant(agent.source)}>{agent.source}</Badge>
        </CardTitle>
        <CardDescription>{agent.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {agent.skills.map((skill) => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/agent/${agent.id}`}>
            View Agent <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};