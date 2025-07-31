
"use client";

import { useState } from 'react';
import type { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Settings2, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ConfigWizardProps {
  onAutoConfig: (configStr: string) => Promise<boolean>;
  isLoading: boolean;
  children: React.ReactNode;
}

export const ConfigWizard: FC<ConfigWizardProps> = ({ onAutoConfig, isLoading, children }) => {
  const [open, setOpen] = useState(false);
  const [configStr, setConfigStr] = useState('');

  const handleSubmit = async () => {
    const success = await onAutoConfig(configStr);
    if (success) {
      setOpen(false);
      setConfigStr('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              {children}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Import from URL or code</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Automatic Configuration</DialogTitle>
          <DialogDescription>
            Paste your configuration URL or code here. The AI will automatically extract the details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="config-string">Configuration String/URL</Label>
            <Textarea 
              placeholder="e.g., vless://..."
              id="config-string" 
              value={configStr}
              onChange={(e) => setConfigStr(e.target.value)}
              className="min-h-[120px] font-code"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : "Import Configuration" }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
