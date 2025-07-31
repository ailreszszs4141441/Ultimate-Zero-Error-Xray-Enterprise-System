"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { runOptimizeRelayChains } from "@/lib/actions";
import type { OptimizeRelayChainsOutput } from "@/ai/flows/optimized-relay-chains";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GitBranch, Loader2 } from "lucide-react";

const formSchema = z.object({
  userLocation: z.string().min(2, "Please enter a valid location."),
  networkConditions: z.string().min(5, "Describe your network conditions (e.g., 'High packet loss, 100Mbps')."),
  availableServers: z.string().min(10, "List available servers (e.g., 'US-West (low load), EU-Central (high load)')."),
});

export function QuantumRelay() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizeRelayChainsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userLocation: "New York, USA",
      networkConditions: "Stable, 200Mbps fiber",
      availableServers: "US-East (low), US-West (medium), EU-Central (low), Asia-SE (high)",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const res = await runOptimizeRelayChains(values);
    setResult(res);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <GitBranch className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">AI Quantum Relay</CardTitle>
        </div>
        <CardDescription>Real-time route optimization using multi-hop relay chains.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Location</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="networkConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Conditions</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableServers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Servers & Load</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Optimize Route
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 border rounded-md bg-card-foreground/5">
            <h4 className="font-semibold mb-2 text-accent">Optimized Route Found:</h4>
            <p className="text-sm"><strong className="text-primary-foreground/80">Route:</strong> {result.optimizedRoute}</p>
            <p className="text-sm"><strong className="text-primary-foreground/80">Expected Latency:</strong> {result.expectedLatency}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
