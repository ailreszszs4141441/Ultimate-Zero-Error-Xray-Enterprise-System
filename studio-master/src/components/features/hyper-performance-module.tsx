
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HyperPerformanceModuleSchema, generateHyperPerformanceModuleConfig } from "@/ai/flows/hyper-performance-module";
import type { HyperPerformanceModule } from "@/ai/flows/hyper-performance-module";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Zap, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function HyperPerformanceModuleFeature() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const form = useForm<HyperPerformanceModule>({
    resolver: zodResolver(HyperPerformanceModuleSchema),
    defaultValues: {
        eBPF_XDP_Direct_Path: true,
        DPDK_Hardware_Acceleration: false,
        P4_Programmable_Switches: false,
        RDMA_over_Converged_Ethernet: false,
        Predictive_Pre_Caching: true,
        Quantum_Entanglement_Simulation: false,
        Edge_Computing_Integration: true,
        _5G_URLLC_Network_Slicing: false,
    },
  });

  async function onSubmit(values: HyperPerformanceModule) {
    setLoading(true);
    setResult(null);
    const config = generateHyperPerformanceModuleConfig(values);
    setResult(config);
    setLoading(false);

    toast({
        title: "Hyper-Performance Module Configured",
        description: "Your new high-speed configuration has been generated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Zap className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">Hyper-Performance Module</CardTitle>
        </div>
        <CardDescription>Achieve sub-0.5ms ping with our cutting-edge performance module.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Kernel Bypass Technology</h4>
                <FormField control={form.control} name="eBPF_XDP_Direct_Path" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>eBPF/XDP Direct Path</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="DPDK_Hardware_Acceleration" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>DPDK Hardware Acceleration</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="P4_Programmable_Switches" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>P4 Programmable Switches</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="RDMA_over_Converged_Ethernet" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>RDMA over Converged Ethernet</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Zero-Latency Architecture</h4>
                <FormField control={form.control} name="Predictive_Pre_Caching" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Predictive Pre-Caching</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Quantum_Entanglement_Simulation" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Quantum Entanglement Simulation</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Edge_Computing_Integration" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Edge Computing Integration</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="_5G_URLLC_Network_Slicing" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>5G URLLC Network Slicing</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Hyper-Performance Config
                </Button>
            </div>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 border rounded-md bg-card-foreground/5 font-mono text-xs">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
