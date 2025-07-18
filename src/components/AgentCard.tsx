import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Cpu, Star, Zap, ShieldCheck } from "lucide-react";
import type { Agent, AgentSource } from "../data/agents";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AgentCardProps {
  agent: Agent;
}

const formatRuns = (runs?: number) => {
  if (!runs) return '0';
  if (runs < 1000) return runs.toString();
  return `${(runs / 1000).toFixed(1)}k`;
};

export const AgentCard = ({ agent }: AgentCardProps) => {
  const getBadgeVariant = (source: AgentSource) => {
    switch (source) {
      case 'N8N':
      case 'Make.com':
      case 'Zapier':
        return 'default';
      case 'Internal':
        return 'destructive';
      case 'LangChain':
      case 'CrewAI':
        return 'secondary';
      case 'Apify':
        return 'outline';
      default:
        return 'secondary';
    }
  }

  return (
    <Card className="flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight">{agent.name}</CardTitle>
          {agent.price ? (
            <Badge variant="default" className="shrink-0">${agent.price}{agent.pricingModel === 'subscription' ? '/mo' : ''}</Badge>
          ) : (
            <Badge variant="secondary" className="shrink-0">Free</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getBadgeVariant(agent.source)} className="text-xs">{agent.source}</Badge>
          {agent.isVerified && (
            <Tooltip>
              <TooltipTrigger>
                <ShieldCheck className="h-5 w-5 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Verified Agent</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{agent.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 pt-4">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">{agent.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">By {agent.author}</span>
          </div>
          <div className="flex items-center gap-3">
            {agent.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-medium">{agent.rating.toFixed(1)}</span>
              </div>
            )}
            {agent.runs && (
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">{formatRuns(agent.runs)} runs</span>
              </div>
            )}
          </div>
        </div>
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