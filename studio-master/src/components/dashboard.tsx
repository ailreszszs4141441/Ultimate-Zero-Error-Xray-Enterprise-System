
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfigGenerator } from "@/components/features/config-generator";
import { SmartRouting } from "@/components/features/smart-routing";
import { TrafficObfuscation } from "@/components/features/traffic-obfuscation";
import { StealthMode } from "@/components/features/stealth-mode";
import { QuantumRelay } from "@/components/features/quantum-relay";
import { AINeuralEngine } from "@/components/features/ai-neural-engine";
import { HyperPerformanceModule } from "@/components/features/hyper-performance-module";
import { QuantumSafeSupreme } from "@/components/features/quantum-safe-supreme";
import { StealthTechnologyProMax } from "@/components/features/stealth-technology-pro-max";
import { InfrastructureFeatures } from "@/components/features/infrastructure-features";
import { BarChart, Cpu, Server, ShieldCheck, Zap } from "lucide-react";

export function Dashboard() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
        <TabsTrigger value="dashboard">
          <Zap className="mr-2 h-4 w-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="generator">
          <Server className="mr-2 h-4 w-4" />
          Generator
        </TabsTrigger>
        <TabsTrigger value="ai-tools">
          <Cpu className="mr-2 h-4 w-4" />
          AI Tools
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wider">Dashboard</CardTitle>
            <CardDescription>Real-time status of your QuantumProxy connection.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-primary/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">Connected</div>
                <p className="text-xs text-muted-foreground">Low Latency: 12ms</p>
              </CardContent>
            </Card>
             <Card className="hover:border-primary/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Protocol</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">VLESS + Reality</div>
                <p className="text-xs text-muted-foreground">Quantum-Safe Encryption: Falcon</p>
              </CardContent>
            </Card>
             <Card className="hover:border-primary/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Transferred</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124.5 GB</div>
                <p className="text-xs text-muted-foreground">This session</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="generator" className="mt-4">
        <ConfigGenerator />
        <div className="mt-6">
            <HyperPerformanceModule />
        </div>
        <div className="mt-6">
            <InfrastructureFeatures />
        </div>
      </TabsContent>
      <TabsContent value="ai-tools" className="mt-4">
        <div className="grid gap-6 lg:grid-cols-2">
            <SmartRouting />
            <TrafficObfuscation />
            <StealthMode />
            <QuantumRelay />
        </div>
        <div className="mt-6">
            <AINeuralEngine />
        </div>
        <div className="mt-6">
            <QuantumSafeSupreme />
        </div>
        <div className="mt-6">
            <StealthTechnologyProMax />
        </div>
      </TabsContent>
    </Tabs>
  );
}
