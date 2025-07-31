
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Globe, Bot, Loader2 } from 'lucide-react';

interface ServerPanelProps {
  currentServer: string;
  onSetServer: (serverId: string) => void;
  onFindBestLocation: () => void;
  isLoading: boolean;
}

const MOCK_SERVERS = [
  { id: 'us-west', name: 'USA (West)' },
  { id: 'de-central', name: 'Germany' },
  { id: 'jp-east', name: 'Japan' },
  { id: 'sg-south', name: 'Singapore' },
];

export const ServerPanel: FC<ServerPanelProps> = ({
  currentServer,
  onSetServer,
  onFindBestLocation,
  isLoading,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="text-primary" />
          <span>Server Selection</span>
        </CardTitle>
        <CardDescription>
          Choose your connection point or let our AI find the best one for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RadioGroup value={currentServer} onValueChange={onSetServer} className="gap-2">
          {MOCK_SERVERS.map((server) => (
            <div key={server.id} className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent/50 transition-colors">
              <RadioGroupItem value={server.id} id={server.id} />
              <Label htmlFor={server.id} className="flex-grow cursor-pointer">{server.name}</Label>
            </div>
          ))}
        </RadioGroup>
        
        <Button onClick={onFindBestLocation} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Find Best Location
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
