import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { UploadCloud, GitBranch, Link, Code } from "lucide-react";

const RegisterAgent = () => {
  const [source, setSource] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Agent submitted for review!");
  };

  const renderSourceSpecificFields = () => {
    switch (source) {
      case 'n8n':
      case 'make-com':
        return (
          <div className="space-y-2">
            <Label htmlFor="blueprint-json">Blueprint/Workflow JSON</Label>
            <Label htmlFor="blueprint-json" className="flex items-center gap-4 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
              <div>
                <span className="font-semibold text-primary">Upload {source === 'n8n' ? 'N8N Workflow' : 'Make.com Scenario'}</span>
                <p className="text-xs text-muted-foreground">Upload the exported JSON blueprint.</p>
              </div>
            </Label>
            <Input id="blueprint-json" type="file" className="hidden" accept=".json" />
          </div>
        );
      case 'apify':
        return (
          <div className="space-y-2">
            <Label htmlFor="apify-actor-id">Apify Actor ID</Label>
            <div className="relative">
              <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="apify-actor-id" placeholder="e.g., john-doe/my-cool-scraper" required className="pl-10" />
            </div>
            <p className="text-sm text-muted-foreground">Provide the Actor ID from the Apify platform.</p>
          </div>
        );
      case 'langchain':
      case 'crewai':
      case 'open-source':
        return (
          <div className="space-y-2">
            <Label htmlFor="git-repo">Git Repository URL</Label>
            <div className="relative">
              <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="git-repo" placeholder="https://github.com/user/repo.git" required className="pl-10" />
            </div>
            <p className="text-sm text-muted-foreground">Provide the repository containing your agent's code and Dockerfile.</p>
          </div>
        );
      case 'custom-api':
        return (
          <div className="space-y-2">
            <Label htmlFor="api-endpoint">API Endpoint</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="api-endpoint" placeholder="https://api.your-agent.com/execute" required className="pl-10" />
            </div>
            <p className="text-sm text-muted-foreground">Provide the public endpoint for our engine to call your agent.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Register a New Agent</CardTitle>
          <CardDescription>
            Our platform is tech-agnostic. Connect your agent by selecting its source and providing the required information.
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
              <Textarea id="description" placeholder="Describe what your agent does, its inputs, and its outputs." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="e.g., SEO, Content Analysis, Keyword Research (comma-separated)" required />
              <p className="text-sm text-muted-foreground">
                Provide a comma-separated list of skills. This is crucial for matching.
              </p>
            </div>
            
            <div className="border-t pt-6 space-y-4">
              <h4 className="text-lg font-medium">Agent Source & Configuration</h4>
              <p className="text-sm text-muted-foreground">
                Select the source of your agent. The required fields will appear below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select required onValueChange={setSource}>
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select a source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="n8n">N8N</SelectItem>
                      <SelectItem value="make-com">Make.com</SelectItem>
                      <SelectItem value="apify">Apify</SelectItem>
                      <SelectItem value="langchain">LangChain</SelectItem>
                      <SelectItem value="crewai">CrewAI</SelectItem>
                      <SelectItem value="open-source">Python/Other (Open Source)</SelectItem>
                      <SelectItem value="custom-api">Custom API</SelectItem>
                      <SelectItem value="internal">Internal (Legacy)</SelectItem>
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
              {source && (
                <div className="p-4 border bg-muted/50 rounded-lg">
                  {renderSourceSpecificFields()}
                </div>
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
               <h4 className="text-lg font-medium">Monetization</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <Label htmlFor="pricing-model">Pricing Model</Label>
                   <Select>
                     <SelectTrigger id="pricing-model">
                       <SelectValue placeholder="Select a model" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="free">Free</SelectItem>
                       <SelectItem value="one-time">One-Time Purchase</SelectItem>
                       <SelectItem value="subscription">Subscription</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="price">Price (USD)</Label>
                   <Input id="price" type="number" placeholder="e.g., 25" />
                 </div>
               </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">Submit for Review</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterAgent;