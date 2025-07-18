import { useState, useEffect, Fragment } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Bot, Play, Trash2, GripVertical, ArrowRight, MousePointer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";
import { agents as allAgents, Agent } from "@/data/agents";

type WorkflowStep = {
  id: string;
  type: 'trigger' | 'agent';
  content: {
    title: string;
    description?: string;
    agent?: Agent;
  };
};

const renumberSteps = (steps: WorkflowStep[]) => {
  return steps.map((step, index) => {
    const newTitle = step.type === 'trigger'
      ? `1. Trigger`
      : `${index + 1}. Run Agent`;
    return { ...step, content: { ...step.content, title: newTitle } };
  });
};

const CreateWorkflow = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [workflowName, setWorkflowName] = useState('');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);

  useEffect(() => {
    const initialSteps: WorkflowStep[] = [
      {
        id: `trigger-${Date.now()}`,
        type: 'trigger',
        content: {
          title: '1. Trigger',
          description: 'Manual Run',
        },
      },
    ];

    const agentId = searchParams.get('agentId');
    if (agentId) {
      const agent = allAgents.find(a => a.id === agentId);
      if (agent) {
        initialSteps.push({
          id: `agent-${agent.id}-${Date.now()}`,
          type: 'agent',
          content: {
            title: '2. Run Agent',
            agent: agent,
          },
        });
        setWorkflowName(`${agent.name} Workflow`);
      }
    }
    setSteps(renumberSteps(initialSteps));
  }, [searchParams]);

  const handleAddStep = () => {
    const agentToAdd = allAgents.find(a => a.id === 'seo-optimizer-1');
    if (!agentToAdd) {
      showError("Could not find a sample agent to add.");
      return;
    }
    const newStep: WorkflowStep = {
      id: `agent-${agentToAdd.id}-${Date.now()}`,
      type: 'agent',
      content: {
        title: 'Run Agent', // Will be renumbered
        agent: agentToAdd,
      },
    };
    setSteps(prevSteps => renumberSteps([...prevSteps, newStep]));
    showSuccess(`Added "${agentToAdd.name}" to the workflow.`);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(prevSteps => renumberSteps(prevSteps.filter(step => step.id !== id)));
    showSuccess("Step removed.");
  };

  const handleChangeTrigger = () => {
    showSuccess("Trigger configuration is not yet implemented.");
  };

  const handleSave = () => {
    if (!workflowName.trim()) {
      showError("Please provide a name for the workflow.");
      return;
    }
    showSuccess(`Workflow "${workflowName}" saved successfully!`);
    navigate("/workflows");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>Create a New Workflow</CardTitle>
          <CardDescription>
            Build a multi-step automation by chaining agents together on the visual canvas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input 
              id="workflow-name" 
              placeholder="e.g., Daily Market Analysis & Report" 
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Workflow Canvas</Label>
            <div className="p-6 border-2 border-dashed rounded-lg bg-muted/20 min-h-[300px]">
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {steps.map((step, index) => (
                  <Fragment key={step.id}>
                    <Card className="w-64 shrink-0 shadow-md">
                      <CardHeader className="flex-row items-start gap-3 space-y-0 pb-3">
                        <div className="bg-muted p-2 rounded-full">
                          {step.type === 'trigger' ? <MousePointer className="h-5 w-5 text-primary" /> : <Bot className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{step.content.title}</p>
                          {step.type === 'trigger' && <p className="text-xs text-muted-foreground">{step.content.description}</p>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {step.type === 'agent' ? (
                          <Badge variant="secondary">{step.content.agent?.name}</Badge>
                        ) : (
                          <Button variant="outline" size="sm" onClick={handleChangeTrigger}>Change Trigger</Button>
                        )}
                      </CardContent>
                      {step.type === 'agent' && (
                        <CardContent>
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleDeleteStep(step.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                    
                    {index < steps.length && (
                      <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0" />
                    )}
                  </Fragment>
                ))}

                <Button variant="outline" className="rounded-full h-16 w-16 shrink-0 bg-background" onClick={handleAddStep}>
                  <PlusCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate("/workflows")}>Cancel</Button>
            <Button onClick={handleSave}>
              <Play className="mr-2 h-4 w-4" />
              Save and Activate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWorkflow;