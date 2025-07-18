import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';

interface TriggerConfigurationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentDescription: string;
  onSave: (newDescription: string, type: TriggerType) => void;
}

type TriggerType = 'manual' | 'scheduled' | 'webhook';

export const TriggerConfigurationDialog = ({ isOpen, setIsOpen, currentDescription, onSave }: TriggerConfigurationDialogProps) => {
  const [triggerType, setTriggerType] = useState<TriggerType>('manual');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (currentDescription.startsWith('Scheduled:')) {
        setTriggerType('scheduled');
        setSchedule(currentDescription.replace('Scheduled: ', ''));
      } else if (currentDescription === 'Webhook Trigger') {
        setTriggerType('webhook');
      } else {
        setTriggerType('manual');
        setSchedule('');
      }
    }
  }, [isOpen, currentDescription]);

  const handleSave = () => {
    let newDescription = 'Manual Run';
    if (triggerType === 'scheduled') {
      newDescription = schedule ? `Scheduled: ${schedule}` : 'Scheduled Run';
    } else if (triggerType === 'webhook') {
      newDescription = 'Webhook Trigger';
    }
    onSave(newDescription, triggerType);
    showSuccess('Trigger updated successfully!');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Trigger</DialogTitle>
          <DialogDescription>
            Choose how your symphony will be initiated.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="trigger-type">Trigger Type</Label>
            <Select value={triggerType} onValueChange={(value) => setTriggerType(value as TriggerType)}>
              <SelectTrigger id="trigger-type">
                <SelectValue placeholder="Select a trigger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual Run</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {triggerType === 'scheduled' && (
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule Details</Label>
              <Input 
                id="schedule" 
                value={schedule} 
                onChange={(e) => setSchedule(e.target.value)} 
                placeholder="e.g., Every day at 9 AM" 
              />
            </div>
          )}
          {triggerType === 'webhook' && (
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input 
                readOnly 
                value="https://api.aisymphony.com/v1/webhooks/wh_..." 
              />
              <p className="text-xs text-muted-foreground">Send a POST request to this URL to trigger the symphony.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};