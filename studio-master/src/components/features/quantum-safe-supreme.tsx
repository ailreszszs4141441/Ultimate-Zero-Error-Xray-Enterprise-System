
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuantumSafeSupremeSchema } from "@/ai/flows/quantum-safe-supreme";
import type { QuantumSafeSupreme } from "@/ai/flows/quantum-safe-supreme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export function QuantumSafeSupreme() {
  const { updateQuantumSafeSupremeConfig } = useAppStore();

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

  const onSubmit = (values: QuantumSafeSupreme) => {
    updateQuantumSafeSupremeConfig(values);
    toast({
        title: "Quantum-Safe Supreme Configured",
        description: "Your new quantum-resistant configuration has been integrated.",
    });
  };

  useEffect(() => {
    // Initial update on component mount
    updateQuantumSafeSupremeConfig(form.getValues());
    }, []);

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
          <form onChange={() => onSubmit(form.getValues())} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
