import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  MousePointer, 
  DatabaseZap, 
  FileText,
  Mail,
  Bot,
  PlusCircle,
  Sparkles,
  ArrowDown
} from "lucide-react";

const WorkflowStep = ({ icon, title, description, agentName }: { icon: React.ReactNode, title: string, description: string, agentName?: string }) => (
  <Card className="w-full md:w-80 text-left shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
      <div className="bg-muted p-3 rounded-lg">{icon}</div>
      <div>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </div>
    </CardHeader>
    {agentName && (
      <CardContent>
        <Badge variant="secondary"><Bot className="mr-1.5 h-3 w-3" /> {agentName}</Badge>
      </CardContent>
    )}
  </Card>
);

const Workflows = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          The AI Canvas: Build Workflows Visually
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-lg text-muted-foreground">
          Go beyond single agents. Chain them together on our visual canvas to create powerful, multi-step automations. No code required.
        </p>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Step 1 */}
          <WorkflowStep 
            icon={<MousePointer className="h-6 w-6 text-primary" />}
            title="Trigger"
            description="Start with a schedule, webhook, or manual run."
          />

          <ArrowRight className="hidden md:block h-8 w-8 shrink-0 text-muted-foreground" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0 text-muted-foreground my-2" />

          {/* Step 2 */}
          <WorkflowStep 
            icon={<DatabaseZap className="h-6 w-6 text-primary" />}
            title="Run Agent"
            description="Execute an agent from the marketplace."
            agentName="Lead Generation Bot"
          />

          <ArrowRight className="hidden md:block h-8 w-8 shrink-0 text-muted-foreground" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0 text-muted-foreground my-2" />

          {/* Step 3 */}
          <WorkflowStep 
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="Run Agent"
            description="Pass the output to another agent."
            agentName="Market Research Analyst"
          />
          
          <ArrowRight className="hidden md:block h-8 w-8 shrink-0 text-muted-foreground" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0 text-muted-foreground my-2" />

          {/* Step 4 */}
           <WorkflowStep 
            icon={<Mail className="h-6 w-6 text-primary" />}
            title="Action"
            description="Send results via email or to a webhook."
          />
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-dashed border-2 h-24 w-full md:w-80 flex-col gap-1 text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <PlusCircle className="h-6 w-6" />
            <span>Add a Step</span>
          </Button>
        </div>
      </div>

      <div className="mt-16 text-center p-8 bg-card border rounded-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">A Glimpse into the Future</h2>
        <p className="mt-2 text-muted-foreground">
          Our visual workflow builder is the next evolution of the platform. We're working hard to bring this powerful feature to you, enabling true agent-to-agent communication and complex task automation.
        </p>
        <Button size="lg" className="mt-6" disabled>
          Coming Soon
        </Button>
      </div>
    </div>
  );
};

export default Workflows;