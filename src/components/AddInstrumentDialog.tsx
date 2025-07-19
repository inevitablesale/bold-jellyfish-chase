import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { agents as allAgents, Agent } from "@/data/agents";
import { Bot, Search } from 'lucide-react';

interface AddInstrumentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAgentSelect: (agent: Agent) => void;
}

export const AddInstrumentDialog = ({ isOpen, setIsOpen, onAgentSelect }: AddInstrumentDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = allAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (agent: Agent) => {
    onAgentSelect(agent);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add an Instrument</DialogTitle>
          <DialogDescription>
            Select an agent from the library to add as the next step in your symphony.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for an instrument..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <ScrollArea className="h-72">
          <div className="space-y-2 pr-4">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handleSelect(agent)}
              >
                <div className="bg-muted-foreground/10 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{agent.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{agent.description}</p>
                </div>
              </div>
            ))}
             {filteredAgents.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No instruments found.
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};