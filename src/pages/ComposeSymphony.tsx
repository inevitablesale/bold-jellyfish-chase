import { useState, useEffect, Fragment } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Bot, Play, Trash2, ArrowRight, MousePointer, Clock, Webhook } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";
import { agents as allAgents, Agent } from "@/data/agents";
import { TriggerConfigurationDialog } from "@/components/TriggerConfigurationDialog";
import { AddInstrumentDialog } from "@/components/AddInstrumentDialog";

type TriggerType = 'manual' | 'scheduled' | 'webhook';

type SymphonyStep = {
  id: string;
  type: 'trigger' | 'agent';
  triggerType?: TriggerType;
  content: {
    title: string;
    description?: string;
    agent?: Agent;
  };
};

const renumberSteps = (steps: SymphonyStep[]) => {
  return steps.map((step, index) => {
    const newTitle = step.type === 'trigger'
      ? `1. Trigger`
      : `${index + 1}. Instrument`;
    return { ...step, content: { ...step.content, title: newTitle } };
  });
};

const ComposeSymphony = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [symphonyName, setSymphonyName] = useState('');
  const [steps, setSteps] = useState<SymphonyStep[]>([]);
  const [isTriggerDialogOpen, setIsTriggerDialogOpen] = useState(false);
  const [isAddInstrumentDialogOpen, setIsAddInstrumentDialogOpen] = useState(false);

  useEffect(() => {
    const initialSteps: SymphonyStep[] = [
      {
        id: `trigger-${Date.now()}`,
        type: 'trigger',
        triggerType: 'manual',
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
            title: '2. Instrument',
            agent: agent,
          },
        });
        setSymphonyName(`${agent.name} Symphony`);
      }
    }
    setSteps(renumberSteps(initialSteps));
  }, [searchParams]);

  const handleAddStep = () => {
    setIsAddInstrumentDialogOpen(true);
  };

  const handleSelectInstrument = (agentToAdd: Agent) => {
    if (!agentToAdd) {
      showError("Could not add the selected agent.");
      return;
    }
    const newStep: SymphonyStep = {
      id: `agent-${agentToAdd.id}-${Date.now()}`,
      type: 'agent',
      content: {
        title: 'Instrument', // Will be renumbered
        agent: agentToAdd,
      },
    };
    setSteps(prevSteps => renumberSteps([...prevSteps, newStep]));
    showSuccess(`Added "${agentToAdd.name}" to the symphony.`);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(prevSteps => renumberSteps(prevSteps.filter(step => step.id !== id)));
    showSuccess("Instrument removed from symphony.");
  };

  const handleSaveTrigger = (newDescription: string, type: TriggerType) => {
    setSteps(prevSteps => {
      const newSteps = [...prevSteps];
      const triggerStepIndex = newSteps.findIndex(step => step.type === 'trigger');
      if (triggerStepIndex !== -1) {
        newSteps[triggerStepIndex].content.description = newDescription;
        newSteps[triggerStepIndex].triggerType = type;
      }
      return newSteps;
    });
  };

  const handleSave = () => {
    if (!symphonyName.trim()) {
      showError("Please provide a name for your symphony.");
      return;
    }
    showSuccess(`Symphony "${symphonyName}" is now ready for performance!`);
    navigate("/symphonies");
  };

  const getTriggerIcon = (type?: TriggerType) => {
    switch (type) {
      case 'scheduled':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'webhook':
        return <Webhook className="h-5 w-5 text-primary" />;
      default:
        return <MousePointer className="h-5 w-5 text-primary" />;
    }
  };

  const triggerStep = steps.find(step => step.type === 'trigger');

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>Compose a New Symphony</CardTitle>
          <CardDescription>
            Arrange your AI instruments on the canvas to create a multi-step composition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="symphony-name">Symphony Name</Label>
            <Input 
              id="symphony-name" 
              placeholder="e.g., Concerto for Market Analysis" 
              value={symphonyName}
              onChange={(e) => setSymphonyName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Composition Canvas</Label>
            <div className="p-6 border-2 border-dashed rounded-lg bg-muted/20 min-h-[300px]">
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {steps.map((step, index) => (
                  <Fragment key={step.id}>
                    <Card className="w-64 shrink-0 shadow-md">
                      <CardHeader className="flex-row items-start gap-3 space-y-0 pb-3">
                        <div className="bg-muted p-2 rounded-full">
                          {step.type === 'trigger' ? getTriggerIcon(step.triggerType) : <Bot className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{step.content.title}</p>
                          <p className="text-xs text-muted-foreground">{step.content.description}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {step.type === 'agent' ? (
                          <Badge variant="secondary">{step.content.agent?.name}</Badge>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => setIsTriggerDialogOpen(true)}>Change Trigger</Button>
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
                    
                    {index < steps.length -1 && (
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
            <Button variant="outline" onClick={() => navigate("/symphonies")}>Cancel</Button>
            <Button onClick={handleSave}>
              <Play className="mr-2 h-4 w-4" />
              Conduct Symphony
            </Button>
          </div>
        </CardContent>
      </Card>
      <TriggerConfigurationDialog
        isOpen={isTriggerDialogOpen}
        setIsOpen={setIsTriggerDialogOpen}
        currentDescription={triggerStep?.content.description || 'Manual Run'}
        onSave={handleSaveTrigger}
      />
      <AddInstrumentDialog
        isOpen={isAddInstrumentDialogOpen}
        setIsOpen={setIsAddInstrumentDialogOpen}
        onAgentSelect={handleSelectInstrument}
      />
    </div>
  );
};

export default ComposeSymphony;