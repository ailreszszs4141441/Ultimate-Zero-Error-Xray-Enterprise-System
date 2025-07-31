
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StealthTechnologyProMaxSchema } from "@/ai/flows/stealth-technology-pro-max";
import type { StealthTechnologyProMax } from "@/ai/flows/stealth-technology-pro-max";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export function StealthTechnologyProMax() {
  const { updateStealthTechnologyProMaxConfig } = useAppStore();

  const form = useForm<StealthTechnologyProMax>({
    resolver: zodResolver(StealthTechnologyProMaxSchema),
    defaultValues: {
        AI_Mimicry: true,
        Polymorphic_Traffic_Shaping: true,
        Temporal_Pattern_Randomization: true,
        Acoustic_Side_Channel_Defense: false,
        ML_based_Fingerprint_Evasion: true,
        Decoy_Traffic_Injection: true,
        Protocol_Hopping: false,
        DNS_over_Blockchain: false,
    },
  });

  const onSubmit = (values: StealthTechnologyProMax) => {
    updateStealthTechnologyProMaxConfig(values);
    toast({
        title: "Stealth Technology Pro Max Configured",
        description: "Your new ultra-stealth configuration has been integrated.",
    });
  };

  useEffect(() => {
    // Initial update on component mount
    updateStealthTechnologyProMaxConfig(form.getValues());
    }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <EyeOff className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">Stealth Technology Pro Max</CardTitle>
        </div>
        <CardDescription>Evade detection with the most advanced obfuscation techniques available.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={() => onSubmit(form.getValues())} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Ultimate Obfuscation</h4>
                <FormField control={form.control} name="AI_Mimicry" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>AI Mimicry (Netflix/YouTube)</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Polymorphic_Traffic_Shaping" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Polymorphic Traffic Shaping</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Temporal_Pattern_Randomization" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Temporal Pattern Randomization</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Acoustic_Side_Channel_Defense" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Acoustic Side-Channel Defense</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Anti-Detection</h4>
                <FormField control={form.control} name="ML_based_Fingerprint_Evasion" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>ML-based Fingerprint Evasion</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Decoy_Traffic_Injection" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Decoy Traffic Injection</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Protocol_Hopping" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Protocol Hopping (100ms)</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="DNS_over_Blockchain" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>DNS over Blockchain</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
