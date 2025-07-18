import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

const RegisterAgent = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit data to a backend.
    // For this demo, we'll just show a success message.
    showSuccess("Agent submitted for review!");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Register a New Agent</CardTitle>
          <CardDescription>
            Submit your agent to our ecosystem. Please provide the following metadata for review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input id="agent-name" placeholder="e.g., Advanced SEO Analyzer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe what your agent does." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="e.g., SEO, Content Analysis, Keyword Research (comma-separated)" required />
              <p className="text-sm text-muted-foreground">
                Provide a comma-separated list of skills. This is crucial for matching.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select required>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select a source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open-source">Open Source</SelectItem>
                    <SelectItem value="n8n">N8N</SelectItem>
                    <SelectItem value="make-com">Make.com</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="output-format">Default Output Format</Label>
                 <Select required>
                  <SelectTrigger id="output-format">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="api-endpoint">API Endpoint / SDK Info</Label>
              <Input id="api-endpoint" placeholder="https://api.youra-agent.com/execute or YourSDKName" required />
               <p className="text-sm text-muted-foreground">
                Provide the endpoint for our engine to call your agent.
              </p>
            </div>
            <Button type="submit" className="w-full md:w-auto">Submit for Review</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterAgent;