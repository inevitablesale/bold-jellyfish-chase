import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowRight, 
  MousePointer, 
  DatabaseZap, 
  FileText,
  Mail,
  Bot,
  PlusCircle,
  Sparkles,
  ArrowDown,
  PlayCircle,
  Pencil,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

      <div className="relative mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <WorkflowStep 
            icon={<MousePointer className="h-6 w-6 text-primary" />}
            title="Trigger"
            description="Start with a schedule, webhook, or manual run."
          />
          <ArrowRight className="hidden md:block h-8 w-8 shrink-0 text-muted-foreground" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0 text-muted-foreground my-2" />
          <WorkflowStep 
            icon={<DatabaseZap className="h-6 w-6 text-primary" />}
            title="Run Agent"
            description="Execute an agent from the marketplace."
            agentName="Lead Generation Bot"
          />
          <ArrowRight className="hidden md:block h-8 w-8 shrink-0 text-muted-foreground" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0 text-muted-foreground my-2" />
          <WorkflowStep 
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="Run Agent"
            description="Pass the output to another agent."
            agentName="Market Research Analyst"
          />
          <ArrowRight className="hidden md:block h-8 w-8 shrink-0 text-muted-foreground" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0 text-muted-foreground my-2" />
           <WorkflowStep 
            icon={<Mail className="h-6 w-6 text-primary" />}
            title="Action"
            description="Send results via email or to a webhook."
          />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Workflows</CardTitle>
            <CardDescription>Manage your automated agent workflows.</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Workflow
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Automated Lead Enrichment</TableCell>
                <TableCell><Badge>Active</Badge></TableCell>
                <TableCell>Manual</TableCell>
                <TableCell>2 hours ago</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 hover:text-red-500 focus:text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Daily Social Media Post</TableCell>
                <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                <TableCell>Scheduled (Daily at 9am)</TableCell>
                <TableCell>1 day ago</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 hover:text-red-500 focus:text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workflows;