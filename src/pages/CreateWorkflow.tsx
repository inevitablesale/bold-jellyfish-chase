import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Bot, Play, Trash2, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const CreateWorkflow = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    showSuccess("Workflow saved successfully!");
    navigate("/workflows");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Workflow</CardTitle>
          <CardDescription>
            Build a multi-step automation by chaining agents together on the visual canvas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="workflow-name">Workflow Name</Label>
            <Input id="workflow-name" placeholder="e.g., Daily Market Analysis & Report" />
          </div>

          <div className="space-y-4">
            <Label>Workflow Canvas</Label>
            <div className="p-6 border-2 border-dashed rounded-lg space-y-4 bg-muted/50">
              
              <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-grow">
                  <p className="font-semibold">1. Trigger</p>
                  <p className="text-sm text-muted-foreground">Scheduled Run: Daily at 9:00 AM</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-grow">
                  <p className="font-semibold">2. Run Agent</p>
                  <Badge variant="secondary"><Bot className="mr-1.5 h-3 w-3" /> Market Research Analyst</Badge>
                </div>
                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
              </div>

              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Step (Agent or Action)
              </Button>
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