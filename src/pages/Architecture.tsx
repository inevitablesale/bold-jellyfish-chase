import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowDown, UploadCloud, Box, Database, User, Layers } from "lucide-react";

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge variant="secondary">{children}</Badge>
);

const ArchitecturePage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Technical Architecture
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          A visual overview of the system design, components, and technology stack.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Diagram</CardTitle>
          <CardDescription>
            This diagram illustrates the core components and data flow of the multi-agent platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Main Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
            <Card className="w-full md:w-1/4">
              <CardHeader>
                <User className="mx-auto h-8 w-8 mb-2" />
                <CardTitle className="text-lg">User Interface</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">User submits a request via the web application.</p>
                <div className="flex flex-wrap justify-center gap-1 pt-2">
                  <TechBadge>React</TechBadge>
                  <TechBadge>TypeScript</TechBadge>
                  <TechBadge>Vite</TechBadge>
                  <TechBadge>Tailwind CSS</TechBadge>
                </div>
              </CardContent>
            </Card>

            <ArrowRight className="hidden md:block h-8 w-8" />
            <ArrowDown className="md:hidden h-8 w-8" />

            <Card className="w-full md:w-1/2 bg-primary/5">
              <CardHeader>
                <Layers className="mx-auto h-8 w-8 mb-2" />
                <CardTitle className="text-lg">Orchestration Engine (Backend)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">Handles matching, execution, and monitoring.</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="p-2 border rounded-md">
                    <h4 className="font-semibold">Matching Service</h4>
                    <p className="text-xs text-muted-foreground">Matches request to agent.</p>
                     <div className="flex flex-wrap gap-1 pt-1">
                       <TechBadge>Node.js</TechBadge>
                       <TechBadge>Vector DB</TechBadge>
                     </div>
                  </div>
                  <div className="p-2 border rounded-md">
                    <h4 className="font-semibold">Execution Service</h4>
                    <p className="text-xs text-muted-foreground">Deploys & runs agents.</p>
                     <div className="flex flex-wrap gap-1 pt-1">
                       <TechBadge>Docker</TechBadge>
                       <TechBadge>Kubernetes</TechBadge>
                     </div>
                  </div>
                  <div className="p-2 border rounded-md">
                    <h4 className="font-semibold">API Gateway</h4>
                    <p className="text-xs text-muted-foreground">Manages all traffic.</p>
                  </div>
                   <div className="p-2 border rounded-md">
                    <h4 className="font-semibold">Agent Registry</h4>
                    <p className="text-xs text-muted-foreground">Agent metadata DB.</p>
                     <div className="flex flex-wrap gap-1 pt-1">
                       <TechBadge>PostgreSQL</TechBadge>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ArrowRight className="hidden md:block h-8 w-8" />
            <ArrowDown className="md:hidden h-8 w-8" />

            <Card className="w-full md:w-1/4">
              <CardHeader>
                <Box className="mx-auto h-8 w-8 mb-2" />
                <CardTitle className="text-lg">Agent Ecosystem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Sandboxed agents execute tasks.</p>
                 <div className="flex flex-wrap justify-center gap-1 pt-2">
                  <TechBadge>Docker</TechBadge>
                  <TechBadge>Any Language</TechBadge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Flow */}
          <div className="pt-8 border-t">
            <h3 className="text-xl font-semibold text-center mb-6">Agent Onboarding Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
              <Card className="w-full md:w-1/3">
                <CardHeader>
                  <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">1. Register Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Developer submits agent via UI, including source code/blueprint and metadata.</p>
                </CardContent>
              </Card>

              <ArrowRight className="hidden md:block h-8 w-8" />
              <ArrowDown className="md:hidden h-8 w-8" />

              <Card className="w-full md:w-1/3">
                <CardHeader>
                  <Box className="mx-auto h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">2. Containerization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Platform builds a standard Docker image from the agent's `Dockerfile`.</p>
                </CardContent>
              </Card>

              <ArrowRight className="hidden md:block h-8 w-8" />
              <ArrowDown className="md:hidden h-8 w-8" />

              <Card className="w-full md:w-1/3">
                <CardHeader>
                  <Database className="mx-auto h-8 w-8 mb-2" />
                  <CardTitle className="text-lg">3. Store in Registry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">The container image and metadata are stored, making the agent available in the marketplace.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitecturePage;