import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgentMarketplace from "./pages/AgentMarketplace";
import AgentExecution from "./pages/AgentExecution";
import RegisterAgent from "./pages/RegisterAgent";
import ArchitecturePage from "./pages/Architecture";
import Workflows from "./pages/Workflows";
import { Layout } from "./components/Layout";
import CreateWorkflow from "./pages/CreateWorkflow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/marketplace" element={<AgentMarketplace />} />
            <Route path="/agent/:id" element={<AgentExecution />} />
            <Route path="/register-agent" element={<RegisterAgent />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/workflows/new" element={<CreateWorkflow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;