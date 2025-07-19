import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ArrowDown, 
  User, 
  Layers, 
  Box, 
  Database, 
  UploadCloud,
  Server,
  BrainCircuit,
  Container,
  ShieldCheck,
  Scaling,
  Cloud,
  CreditCard,
  Webhook,
  Music
} from "lucide-react";

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge variant="secondary" className="text-xs font-normal">{children}</Badge>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold tracking-tight text-center mb-8">{children}</h2>
);

const ComponentCard = ({ title, icon, description, techs }: { title: string, icon: React.ReactNode, description: string, techs: string[] }) => (
  <Card className="w-full text-center">
    <CardHeader className="pb-2">
      <div className="mx-auto bg-muted p-3 rounded-full mb-2">{icon}</div>
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <div className="flex flex-wrap justify-center gap-1">
        {techs.map(tech => <TechBadge key={tech}>{tech}</TechBadge>)}
      </div>
    </CardContent>
  </Card>
);

const ArchitecturePage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Technical Architecture
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-lg text-muted-foreground">
          A detailed breakdown of our robust, scalable, and secure multi-agent platform, designed for performance and extensibility.
        </p>
      </div>

      {/* Core System Diagram */}
      <SectionTitle>Core System Diagram</SectionTitle>
      <div className="space-y-6">
        {/* Row 1: User & Gateway */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <ComponentCard 
            title="User Interface"
            icon={<User className="h-6 w-6" />}
            description="Users interact with the platform to find instruments and compose symphonies."
            techs={["React", "TypeScript", "Tailwind CSS", "Vite"]}
          />
          <ArrowRight className="hidden md:block h-8 w-8 shrink-0" />
          <ArrowDown className="md:hidden h-8 w-8 shrink-0" />
          <ComponentCard 
            title="API Gateway"
            icon={<Webhook className="h-6 w-6" />}
            description="Single entry point for all client requests. Handles routing, auth, and rate limiting."
            techs={["NGINX", "Cloudflare"]}
          />
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="h-8 w-8 shrink-0" />
        </div>

        {/* Row 2: Orchestration Engine */}
        <Card className="bg-muted/40">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2"><Music className="h-5 w-5" /> Orchestration Engine</CardTitle>
            <CardDescription className="text-center">The brain of the platform, orchestrating single instruments and multi-step Symphonies.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ComponentCard 
              title="Request Service"
              icon={<Server className="h-6 w-6" />}
              description="Handles various triggers (manual, scheduled, webhook) and initiates agent jobs or symphonies."
              techs={["Node.js", "NestJS"]}
            />
            <ComponentCard 
              title="Matching Service"
              icon={<BrainCircuit className="h-6 w-6" />}
              description="Uses vector search to match natural language requests with the best instrument."
              techs={["Python", "Pinecone"]}
            />
            <ComponentCard 
              title="Execution Service"
              icon={<Container className="h-6 w-6" />}
              description="Manages the execution of individual instruments and orchestrates the flow of data in multi-step symphonies."
              techs={["Go", "Kubernetes API"]}
            />
            <ComponentCard 
              title="Payment Service"
              icon={<CreditCard className="h-6 w-6" />}
              description="Handles all monetization aspects, integrating with Stripe."
              techs={["Stripe API"]}
            />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <ArrowDown className="h-8 w-8 shrink-0" />
        </div>

        {/* Row 3: Data & Execution Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <Card>
            <CardHeader className="text-center">
              <Database className="mx-auto h-6 w-6 mb-2" />
              <CardTitle className="text-lg">Data & Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><TechBadge>PostgreSQL:</TechBadge> Stores user data, instrument metadata, and job history.</p>
              <p><TechBadge>Pinecone:</TechBadge> Vector database for semantic instrument matching.</p>
              <p><TechBadge>AWS S3:</TechBadge> Stores agent execution results and artifacts.</p>
              <p><TechBadge>Redis:</TechBadge> Caching layer for performance.</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardHeader className="text-center">
              <Box className="mx-auto h-6 w-6 mb-2" />
              <CardTitle className="text-lg">Agent Execution Layer</CardTitle>
              <CardDescription>The key to our tech-agnostic approach.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><TechBadge>Kubernetes:</TechBadge> Orchestrates agent containers for scalability and resilience.</p>
              <p><TechBadge>Docker:</TechBadge> Agents are packaged as standardized containers, allowing any technology (Python, Go, N8N, etc.) to run securely and independently.</p>
              <p><TechBadge>Istio:</TechBadge> Service mesh for secure communication between agents and services.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Cloud className="mx-auto h-6 w-6 mb-2" />
              <CardTitle className="text-lg">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><TechBadge>Stripe:</TechBadge> Secure payment processing.</p>
              <p><TechBadge>Datadog:</TechBadge> Centralized logging, monitoring, and application performance.</p>
              <p><TechBadge>GitHub:</TechBadge> Source control and CI/CD for instrument onboarding.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Security & Sandboxing</CardTitle>
                <CardDescription>Ensuring a secure multi-tenant environment.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Container Isolation:</strong> Each agent runs in its own Docker container, providing a strong baseline of isolation at the OS level.</p>
              <p><strong>Network Policies:</strong> Kubernetes network policies strictly control traffic, preventing agents from accessing unauthorized internal services.</p>
              <p><strong>Resource Limits:</strong> CPU and memory limits are enforced on every agent container to prevent resource exhaustion and ensure fair multi-tenancy.</p>
              <p><strong>Secrets Management:</strong> A tool like HashiCorp Vault is used to securely inject secrets and API keys into agents at runtime, avoiding hardcoded credentials.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <Scaling className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Scalability & Performance</CardTitle>
                <CardDescription>Designed to handle growth and high demand.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Horizontal Scaling:</strong> Both the backend microservices and the agent execution capacity can be scaled horizontally using Kubernetes Horizontal Pod Autoscalers.</p>
              <p><strong>Asynchronous Job Processing:</strong> User requests trigger asynchronous jobs, allowing the UI to remain responsive while long-running agents execute in the background.</p>
              <p><strong>Global CDN:</strong> A Content Delivery Network (e.g., Cloudflare) is used to serve the frontend application and cache static assets close to users worldwide.</p>
              <p><strong>Database Read Replicas:</strong> Read replicas for our PostgreSQL database can be provisioned to handle high read loads without impacting write performance.</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <SectionTitle>Instrument Onboarding Flow</SectionTitle>
          <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-4 text-center">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
            <div className="absolute left-0 w-full flex justify-around z-0">
              <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground" style={{ transform: 'translateY(-12px)' }} />
              <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground" style={{ transform: 'translateY(-12px)' }} />
            </div>
            <Card className="flex-1 z-10 bg-card">
              <CardHeader>
                <UploadCloud className="mx-auto h-8 w-8 mb-2" />
                <CardTitle className="text-lg">1. Submit Blueprint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Developer submits agent via our adaptive form (Git repo, API endpoint, JSON blueprint, etc.).</p>
              </CardContent>
            </Card>
            <Card className="flex-1 z-10 bg-card">
              <CardHeader>
                <Box className="mx-auto h-8 w-8 mb-2" />
                <CardTitle className="text-lg">2. CI/CD Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">A CI/CD pipeline (GitHub Actions) runs security scans, builds the Docker image if needed, and runs tests.</p>
              </CardContent>
            </Card>
            <Card className="flex-1 z-10 bg-card">
              <CardHeader>
                <Database className="mx-auto h-8 w-8 mb-2" />
                <CardTitle className="text-lg">3. Publish to Registry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">On success, the agent is published to our internal registry and becomes available in the Instrument Library.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;