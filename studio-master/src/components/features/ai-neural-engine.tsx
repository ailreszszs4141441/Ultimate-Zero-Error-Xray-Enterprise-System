
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AINeuralEngineSchema, generateAINeuralEngineConfig } from "@/ai/flows/ai-neural-engine";
import type { AINeuralEngine } from "@/ai/flows/ai-neural-engine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Cpu, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function AINeuralEngine() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AINeuralEngine | null>(null);

  const form = useForm<AINeuralEngine>({
    resolver: zodResolver(AINeuralEngineSchema),
    defaultValues: {
        Transformer_based_Traffic_Prediction: true,
        GAN_for_Traffic_Generation: false,
        Reinforcement_Learning_Router: true,
        Federated_Learning_Privacy: true,
        _0_1ms_Decision_Making: true,
        Threat_Detection_1ms: true,
        Pattern_Recognition_AI: true,
        Behavioral_Cloning_Defense: false,
    },
  });

  async function onSubmit(values: AINeuralEngine) {
    setLoading(true);
    setResult(null);
    const config = generateAINeuralEngineConfig(values);
    setResult(config);
    setLoading(false);

    toast({
        title: "AI Neural Engine Configured",
        description: "Your new AI-powered configuration has been generated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Cpu className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">AI Neural Engine</CardTitle>
        </div>
        <CardDescription>Configure the military-grade AI engine for unparalleled performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Advanced ML Models</h4>
                <FormField control={form.control} name="Transformer_based_Traffic_Prediction" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Transformer Traffic Prediction</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="GAN_for_Traffic_Generation" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>GAN for Traffic Generation</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Reinforcement_Learning_Router" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Reinforcement Learning Router</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Federated_Learning_Privacy" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Federated Learning Privacy</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Real-time Analysis</h4>
                <FormField control={form.control} name="_0_1ms_Decision_Making" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>0.1ms Decision Making</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Threat_Detection_1ms" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Threat Detection &lt;1ms</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Pattern_Recognition_AI" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Pattern Recognition AI</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Behavioral_Cloning_Defense" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Behavioral Cloning Defense</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate AI Config
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
