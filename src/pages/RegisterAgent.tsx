import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { UploadCloud } from "lucide-react";

const RegisterAgent = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Agent submitted for review!");
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Register a New Agent</CardTitle>
          <CardDescription>
            Submit your agent to our ecosystem. Fill out the form below or upload a blueprint to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
               <h4 className="text-lg font-medium">Import from a Platform</h4>
               <p className="text-sm text-muted-foreground">
                 Automatically populate fields by uploading a blueprint from a supported platform.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Label htmlFor="make-json" className="flex items-center gap-4 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                   <UploadCloud className="h-8 w-8 text-muted-foreground" />
                   <div>
                     <span className="font-semibold text-primary">Upload Make.com JSON</span>
                     <p className="text-xs text-muted-foreground">Parse a Scenario blueprint.</p>
                   </div>
                 </Label>
                 <Input id="make-json" type="file" className="hidden" accept=".json" />

                 <Label htmlFor="n8n-json" className="flex items-center gap-4 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                   <UploadCloud className="h-8 w-8 text-muted-foreground" />
                   <div>
                     <span className="font-semibold text-primary">Upload N8N Workflow JSON</span>
                     <p className="text-xs text-muted-foreground">Parse a Workflow blueprint.</p>
                   </div>
                 </Label>
                 <Input id="n8n-json" type="file" className="hidden" accept=".json" />
               </div>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs uppercase text-muted-foreground">
                  Or Fill Manually
                </span>
              </div>
            </div>

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
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies / Platforms</Label>
              <Input id="technologies" placeholder="e.g., Apify, Google Maps API, OpenAI GPT-4 (comma-separated)" />
              <p className="text-sm text-muted-foreground">
                List the core technologies or platforms your agent is built on.
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
                    <SelectItem value="zapier">Zapier</SelectItem>
                    <SelectItem value="langchain">LangChain</SelectItem>
                    <SelectItem value="crewai">CrewAI</SelectItem>
                    <SelectItem value="apify">Apify</SelectItem>
                    <SelectItem value="custom-api">Custom API</SelectItem>
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