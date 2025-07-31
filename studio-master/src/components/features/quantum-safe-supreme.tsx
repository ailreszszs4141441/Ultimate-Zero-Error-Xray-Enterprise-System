
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuantumSafeSupremeSchema, generateQuantumSafeSupremeConfig } from "@/ai/flows/quantum-safe-supreme";
import type { QuantumSafeSupreme } from "@/ai/flows/quantum-safe-supreme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function QuantumSafeSupremeFeature() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const form = useForm<QuantumSafeSupreme>({
    resolver: zodResolver(QuantumSafeSupremeSchema),
    defaultValues: {
        Lattice_based_Cryptography: true,
        Code_based_McEliece: false,
        Hash_based_SPHINCS_Plus: true,
        Multivariate_Polynomials: false,
        BB84_Protocol_Simulation: true,
        Quantum_Teleportation_Keys: false,
        Entanglement_based_Security: true,
    },
  });

  async function onSubmit(values: QuantumSafeSupreme) {
    setLoading(true);
    setResult(null);
    const config = generateQuantumSafeSupremeConfig(values);
    setResult(config);
    setLoading(false);

    toast({
        title: "Quantum-Safe Supreme Configured",
        description: "Your new quantum-resistant configuration has been generated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">Quantum-Safe Supreme</CardTitle>
        </div>
        <CardDescription>Fortify your connection with next-generation quantum-resistant encryption.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Next-Gen Encryption</h4>
                <FormField control={form.control} name="Lattice_based_Cryptography" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Lattice-based Cryptography</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Code_based_McEliece" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Code-based McEliece</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Hash_based_SPHINCS_Plus" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Hash-based SPHINCS+</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Multivariate_Polynomials" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Multivariate Polynomials</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-accent">Quantum Key Distribution</h4>
                <FormField control={form.control} name="BB84_Protocol_Simulation" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>BB84 Protocol Simulation</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Quantum_Teleportation_Keys" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Quantum Teleportation Keys</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="Entanglement_based_Security" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Entanglement-based Security</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )} />
            </div>
            <div className="md:col-span-2">
                <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Quantum-Safe Config
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
