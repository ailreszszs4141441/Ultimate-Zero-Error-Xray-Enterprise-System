
"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  aiPoweredLocationSelection,
  type AIPoweredLocationSelectionOutput,
} from '@/ai/flows/ai-powered-location-selection';
import {
  protocolMorphingAi,
  type ProtocolMorphingAiOutput,
} from '@/ai/flows/protocol-morphing-ai';
import {
  automaticConfiguration,
  type AutomaticConfigurationOutput,
} from '@/ai/flows/automatic-configuration';
import { useToast } from "@/hooks/use-toast"
import { Header } from '@/components/layout/header';
import { ConnectionPanel } from '@/components/dashboard/connection-panel';
import { ServerPanel } from '@/components/dashboard/server-panel';
import { ProtocolPanel } from '@/components/dashboard/protocol-panel';

const getSecurityLevel = (protocol: string | null): 'Basic' | 'Advanced' | 'Quantum' => {
  switch (protocol) {
    case 'REALITY':
    case 'VLESS':
      return 'Quantum';
    case 'Trojan':
    case 'VMess':
      return 'Advanced';
    default:
      return 'Basic';
  }
};

export default function Home() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [currentServer, setCurrentServer] = useState<string>('de-central');
  const [currentProtocol, setCurrentProtocol] = useState<string>('VLESS');
  const [latency, setLatency] = useState<number | null>(null);
  const [throughput, setThroughput] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState({
    location: false,
    protocol: false,
    config: false,
  });

  const securityLevel = getSecurityLevel(currentProtocol);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * (150 - 20 + 1)) + 20); // ms
        setThroughput(Math.random() * 100); // Mbps
      }, 2000);
    } else {
      setLatency(null);
      setThroughput(null);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnectionToggle = () => {
    setIsConnected((prev) => !prev);
  };

  const handleFindBestLocation = async () => {
    setIsLoading((prev) => ({ ...prev, location: true }));
    try {
      const result: AIPoweredLocationSelectionOutput = await aiPoweredLocationSelection({
        userLocation: 'auto-detect',
        networkConditions: 'stable fiber connection',
      });
      // In a real app, we'd map result.bestLocation to a server ID
      setCurrentServer('us-west'); // Mocking selection
      toast({
        title: "AI Location Selected",
        description: `Optimal location found: ${result.bestLocation} (Latency: ${result.latency}ms)`,
      })
    } catch (error) {
      console.error('Error finding best location:', error);
       toast({
        title: "AI Error",
        description: "Could not determine the best location.",
        variant: "destructive"
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, location: false }));
    }
  };

  const handleOptimizeProtocol = async () => {
    setIsLoading((prev) => ({ ...prev, protocol: true }));
    try {
      const result: ProtocolMorphingAiOutput = await protocolMorphingAi({
        networkConditions: 'Moderate packet loss detected',
        censorshipLevel: 3,
      });
      setCurrentProtocol(result.protocol);
      toast({
        title: "AI Protocol Optimized",
        description: `Switched to ${result.protocol}. Reason: ${result.reason}`,
      })
    } catch (error) {
      console.error('Error optimizing protocol:', error);
       toast({
        title: "AI Error",
        description: "Could not optimize the protocol.",
        variant: "destructive"
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, protocol: false }));
    }
  };

  const handleAutoConfig = async (configStr: string) => {
    if (!configStr.trim()) {
      toast({
        title: "Input Error",
        description: "Configuration string cannot be empty.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading((prev) => ({ ...prev, config: true }));
    try {
      const result: AutomaticConfigurationOutput = await automaticConfiguration({
        configurationText: configStr,
      });
      setCurrentProtocol(result.protocol);
      // In a real app, you would handle server address, port, etc.
      toast({
        title: "Configuration Imported",
        description: `Protocol set to ${result.protocol} from your configuration.`,
      })
      setIsLoading((prev) => ({ ...prev, config: false }));
      return true;
    } catch (error) {
      console.error('Error with auto configuration:', error);
       toast({
        title: "Import Error",
        description: "Could not parse the configuration.",
        variant: "destructive"
      })
      setIsLoading((prev) => ({ ...prev, config: false }));
      return false;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header 
        isConnected={isConnected} 
        onAutoConfig={handleAutoConfig} 
        isConfigLoading={isLoading.config}
      />
      <main className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid gap-8">
          <ConnectionPanel
            isConnected={isConnected}
            onToggleConnection={handleConnectionToggle}
            latency={latency}
            throughput={throughput}
            server={currentServer}
            protocol={currentProtocol}
            securityLevel={securityLevel}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <ServerPanel
              currentServer={currentServer}
              onSetServer={setCurrentServer}
              onFindBestLocation={handleFindBestLocation}
              isLoading={isLoading.location}
            />
            <ProtocolPanel
              currentProtocol={currentProtocol}
              onSetProtocol={setCurrentProtocol}
              onOptimizeProtocol={handleOptimizeProtocol}
              isLoading={isLoading.protocol}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
