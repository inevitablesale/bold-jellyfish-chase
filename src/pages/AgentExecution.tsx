import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { agents } from "../data/agents";
import type { Agent } from "../data/agents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Terminal, CheckCircle, Clock, ShoppingCart, Cpu } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const AgentExecution = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const foundAgent = agents.find((a) => a.id === id);
    setAgent(foundAgent || null);
    if (foundAgent && !foundAgent.price) {
      setIsPurchased(true); // Free agents are considered "purchased"
    }
  }, [id]);

  const handleRunAgent = () => {
    if (agent?.price && !isPurchased) {
      showSuccess(`Purchased "${agent.name}" successfully!`);
      setIsPurchased(true);
    }

    setIsRunning(true);
    setIsComplete(false);
    setProgress(0);
    setLog(["[INFO] Starting agent execution..."]);
    const startTime = Date.now();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const endTime = Date.now();
          setExecutionTime((endTime - startTime) / 1000);
          setIsRunning(false);
          setIsComplete(true);
          setLog((prevLog) => [...prevLog, `[SUCCESS] Agent X identified and delivered 100 leads from source Y.`, "[INFO] Execution finished."]);
          return 100;
        }
        const newProgress = prev + 10;
        if (newProgress === 30) setLog(l => [...l, "[INFO] Accessing data sources..."]);
        if (newProgress === 60) setLog(l => [...l, "[INFO] Analyzing and filtering leads..."]);
        if (newProgress === 90) setLog(l => [...l, "[INFO] Compiling results..."]);
        return newProgress;
      });
    }, 500);
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Company,Contact,Email\n"
      + "TechCorp,John Doe,john.doe@techcorp.com\n"
      + "Innovate LLC,Jane Smith,jane.smith@innovate.com\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!agent) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Agent not found</h2>
        <Button asChild className="mt-4">
          <Link to="/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  const buttonText = isPurchased ? (isRunning ? "Running..." : "Run Agent") : `Purchase & Run ($${agent.price})`;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>{agent.name}</CardTitle>
          <CardDescription>{agent.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Details</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Source:</strong> {agent.source}</p>
                <p><strong>Author:</strong> {agent.author}</p>
                <p><strong>Version:</strong> {agent.version}</p>
                <p><strong>Output Format:</strong> {agent.outputFormat}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              {agent.technologies && agent.technologies.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center"><Cpu className="mr-2 h-4 w-4" /> Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold">Execute Agent</h3>
            <div className="mt-4 flex items-center gap-4">
              <Button onClick={handleRunAgent} disabled={isRunning}>
                {!isPurchased && <ShoppingCart className="mr-2 h-4 w-4" />}
                {buttonText}
              </Button>
              {isRunning && <Progress value={progress} className="w-[60%]" />}
            </div>
          </div>

          {log.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold flex items-center"><Terminal className="mr-2 h-4 w-4" /> Execution Log</h4>
              <div className="mt-2 p-4 bg-muted rounded-md font-mono text-sm h-48 overflow-y-auto">
                {log.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}

          {isComplete && (
            <div className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-green-500" /> Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Execution Time</p>
                      <p className="text-lg font-bold">{executionTime}s</p>
                    </div>
                  </div>
                   <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Results Count</p>
                      <p className="text-lg font-bold">100</p>
                    </div>
                  </div>
                   <div className="flex items-center space-x-3">
                    <Download className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Output Size</p>
                      <p className="text-lg font-bold">12 KB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-semibold">Results</h4>
                <p className="text-sm text-muted-foreground mt-1">A sample of the generated leads. Full list is available for download.</p>
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>TechCorp</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell>john.doe@techcorp.com</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Innovate LLC</TableCell>
                          <TableCell>Jane Smith</TableCell>
                          <TableCell>jane.smith@innovate.com</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Button onClick={handleDownload} className="mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Results ({agent.outputFormat})
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentExecution;