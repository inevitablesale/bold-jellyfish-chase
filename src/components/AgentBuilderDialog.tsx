import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from '@/data/agents';
import { showSuccess } from '@/utils/toast';
import { Loader2 } from 'lucide-react';

interface AgentBuilderDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAgentCreate: (newAgent: Agent) => void;
  initialQuery: string;
}

export const AgentBuilderDialog = ({ isOpen, setIsOpen, onAgentCreate, initialQuery }: AgentBuilderDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const formattedName = initialQuery
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/[^a-zA-Z0-9 ]/g, '');
      setName(formattedName ? `${formattedName} Agent` : 'New Custom Agent');
      setDescription(`This agent is designed to handle requests related to: "${initialQuery}".`);
    }
  }, [initialQuery, isOpen]);

  const handleBuildAgent = async () => {
    if (!name || !description) return;
    setIsBuilding(true);

    // Simulate AI building process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newAgent: Agent = {
      id: `custom-${Date.now()}`,
      name,
      description,
      skills: ['Custom', 'AI-Generated'],
      technologies: ['Simulated Gemini Flash'],
      source: 'Internal',
      author: 'User',
      version: '1.0.0',
      outputFormat: 'JSON',
      exampleRequest: initialQuery,
    };

    onAgentCreate(newAgent);
    showSuccess(`Successfully built "${name}"!`);
    setIsBuilding(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Build a New Agent</DialogTitle>
          <DialogDescription>
            No agent matched your request. Let's build a new one with AI. Describe what you need, and we'll create it for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleBuildAgent} disabled={isBuilding}>
            {isBuilding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isBuilding ? 'Building with AI...' : 'Build Agent'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};