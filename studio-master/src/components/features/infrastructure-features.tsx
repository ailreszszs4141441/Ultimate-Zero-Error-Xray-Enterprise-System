
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfrastructureFeaturesSchema } from "@/ai/flows/infrastructure-features";
import type { InfrastructureFeatures } from "@/ai/flows/infrastructure-features";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Server } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export function InfrastructureFeatures() {
  const { updateInfrastructureFeaturesConfig } = useAppStore();

  const form = useForm<InfrastructureFeatures>({
    resolver: zodResolver(InfrastructureFeaturesSchema),
    defaultValues: {
        Mesh_Network_Topology: true,
        Satellite_Backup_Links: false,
        Quantum_Internet_Ready: false,
        IPv6_Only_Fast_Path: true,
        Anycast_Global_Network: true,
        GeoDNS_Load_Balancing: true,
        BGP_Anycast_Routing: true,
        CDN_Integration: false,
    },
  });

  const onSubmit = (values: InfrastructureFeatures) => {
    updateInfrastructureFeaturesConfig(values);
    toast({
        title: "Infrastructure Features Configured",
        description: "Your new infrastructure configuration has been integrated.",
    });
  };

  useEffect(() => {
    // Initial update on component mount
    updateInfrastructureFeaturesConfig(form.getValues());
    }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Server className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">Infrastructure Features</CardTitle>
        </div>
        <CardDescription>Configure the underlying network and server architecture for maximum resilience.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={() => onSubmit(form.getValues())} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Network Architecture</h4>
                <FormField control={form.control} name="Mesh_Network_Topology" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Mesh Network Topology</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Satellite_Backup_Links" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Satellite Backup Links</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Quantum_Internet_Ready" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Quantum Internet Ready</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="IPv6_Only_Fast_Path" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>IPv6-Only Fast Path</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Server Technology</h4>
                <FormField control={form.control} name="Anycast_Global_Network" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Anycast Global Network</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="GeoDNS_Load_Balancing" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>GeoDNS Load Balancing</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="BGP_Anycast_Routing" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>BGP Anycast Routing</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="CDN_Integration" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>CDN Integration</FormLabel>
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
