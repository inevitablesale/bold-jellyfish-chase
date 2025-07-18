import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Cpu } from "lucide-react";
import type { Agent, AgentSource } from "../data/agents";

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  const getBadgeVariant = (source: AgentSource) => {
    switch (source) {
      case 'N8N':
      case 'Make.com':
      case 'Zapier':
        return 'default'; // Automation Platforms
      case 'Internal':
        return 'destructive'; // Internal tools
      case 'LangChain':
      case 'CrewAI':
        return 'secondary'; // AI Frameworks
      case 'Apify':
        return 'outline'; // Scraping Platforms
      case 'Open Source':
      case 'Custom API':
      default:
        return 'secondary';
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
        <div>
          <p className="text-sm font-medium mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {agent.skills.map((skill) => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
        {agent.technologies && agent.technologies.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2 flex items-center"><Cpu className="mr-2 h-4 w-4" /> Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {agent.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground pt-2">
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