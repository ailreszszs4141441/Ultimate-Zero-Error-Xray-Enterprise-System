
"use client";

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Network, Bot, Loader2 } from 'lucide-react';

interface ProtocolPanelProps {
  currentProtocol: string;
  onSetProtocol: (protocol: string) => void;
  onOptimizeProtocol: () => void;
  isLoading: boolean;
}

const MOCK_PROTOCOLS = ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'WireGuard', 'REALITY'];

export const ProtocolPanel: FC<ProtocolPanelProps> = ({
  currentProtocol,
  onSetProtocol,
  onOptimizeProtocol,
  isLoading,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="text-primary" />
          <span>Protocol Management</span>
        </CardTitle>
        <CardDescription>
          Choose your connection protocol or let our AI optimize it for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Manual Selection</label>
          <Select value={currentProtocol} onValueChange={onSetProtocol}>
            <SelectTrigger>
              <SelectValue placeholder="Select a protocol" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_PROTOCOLS.map((protocol) => (
                <SelectItem key={protocol} value={protocol}>
                  {protocol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={onOptimizeProtocol} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Optimize with AI
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
