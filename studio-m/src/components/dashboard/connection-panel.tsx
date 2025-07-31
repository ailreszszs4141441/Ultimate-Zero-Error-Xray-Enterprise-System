
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Shield, ShieldAlert, ShieldCheck, Power, Server, Network, Signal } from 'lucide-react';

interface ConnectionPanelProps {
  isConnected: boolean;
  onToggleConnection: () => void;
  latency: number | null;
  throughput: number | null;
  server: string | null;
  protocol: string | null;
  securityLevel: 'Basic' | 'Advanced' | 'Quantum';
}

const serverNames: { [key: string]: string } = {
  'us-west': 'USA (West)',
  'de-central': 'Germany',
  'jp-east': 'Japan',
  'sg-south': 'Singapore',
};

export const ConnectionPanel: FC<ConnectionPanelProps> = ({
  isConnected,
  onToggleConnection,
  latency,
  throughput,
  server,
  protocol,
  securityLevel,
}) => {
  const SecurityIcon = securityLevel === 'Quantum' ? ShieldCheck : securityLevel === 'Advanced' ? Shield : ShieldAlert;
  
  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-primary" />
            <span>Connection Status</span>
          </div>
          <Badge variant={isConnected ? 'default' : 'destructive'} className="transition-colors">
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex justify-center">
          <Button
            size="lg"
            className={`w-48 h-16 text-xl rounded-full transition-all duration-300 transform hover:scale-105 ${
              isConnected
                ? 'bg-destructive/90 hover:bg-destructive'
                : 'bg-primary/90 hover:bg-primary'
            }`}
            onClick={onToggleConnection}
          >
            <Power className="mr-2 h-6 w-6" />
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-2 p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Server size={16} />
              <span>Current Server</span>
            </div>
            <p className="text-lg font-semibold">{server ? serverNames[server] : 'N/A'}</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-2 p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Network size={16} />
              <span>Protocol</span>
            </div>
            <p className="text-lg font-semibold">{protocol || 'N/A'}</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-2 p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SecurityIcon size={16} />
              <span>Security Level</span>
            </div>
            <p className="text-lg font-semibold">{securityLevel}</p>
          </div>
        </div>

        {isConnected && (
          <div className="grid gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Latency</span>
                <span className="text-sm font-bold text-primary">{latency} ms</span>
              </div>
              <Progress value={latency ? 200 - Math.min(latency, 200) : 0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Throughput</span>
                <span className="text-sm font-bold text-primary">{throughput?.toFixed(2)} Mbps</span>
              </div>
              <Progress value={throughput || 0} className="h-2" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
