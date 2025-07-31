
"use client";

import type { FC } from 'react';
import { Unplug, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfigWizard } from '@/components/dashboard/config-wizard';
import { Button } from '@/components/ui/button';


interface HeaderProps {
  isConnected: boolean;
  onAutoConfig: (configStr: string) => Promise<boolean>;
  isConfigLoading: boolean;
}

export const Header: FC<HeaderProps> = ({ isConnected, onAutoConfig, isConfigLoading }) => {
  return (
    <header className="p-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Unplug className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            QuantumTunnel
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
             <span className="relative flex h-3 w-3">
                <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isConnected ? "bg-green-400" : "bg-red-400"
                )}></span>
                <span className={cn(
                    "relative inline-flex rounded-full h-3 w-3",
                    isConnected ? "bg-green-500" : "bg-red-500"
                )}></span>
            </span>
            <span className="text-sm text-muted-foreground hidden sm:inline">
                {isConnected ? "Secure" : "Disconnected"}
            </span>
          </div>
          <ConfigWizard onAutoConfig={onAutoConfig} isLoading={isConfigLoading}>
             <Button variant="ghost" size="icon">
                <Settings2 className="h-5 w-5" />
             </Button>
          </ConfigWizard>
        </div>
      </div>
    </header>
  );
};
