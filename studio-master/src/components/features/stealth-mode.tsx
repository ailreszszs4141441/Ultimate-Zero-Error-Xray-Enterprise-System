"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { runStealthModeProtocolSwitching } from "@/lib/actions";
import type { StealthModeProtocolSwitchingOutput } from "@/ai/flows/stealth-mode-protocol-switching";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EyeOff, Loader2 } from "lucide-react";

const formSchema = z.object({
  currentProtocol: z.string(),
  networkConditions: z.string().min(5, "Describe the network limitations."),
  availableProtocols: z.array(z.string()),
});

export function StealthMode() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StealthModeProtocolSwitchingOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentProtocol: "VMess",
      networkConditions: "Deep Packet Inspection detected, high throttling on port 443.",
      availableProtocols: ["VMess", "VLESS", "Trojan", "Shadowsocks"],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const res = await runStealthModeProtocolSwitching(values);
    setResult(res);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <EyeOff className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">AI Stealth Mode</CardTitle>
        </div>
        <CardDescription>Automated protocol switching to evade censorship and network limits.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentProtocol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Protocol</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="VMess">VMess</SelectItem>
                        <SelectItem value="VLESS">VLESS</SelectItem>
                        <SelectItem value="Trojan">Trojan</SelectItem>
                        <SelectItem value="Shadowsocks">Shadowsocks</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="networkConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detected Network Limitations</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Activate Anti-Censorship
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 border rounded-md bg-card-foreground/5">
            <h4 className="font-semibold mb-2 text-accent">Stealth Protocol Suggested:</h4>
            <p className="text-sm font-bold text-2xl text-primary">{result.suggestedProtocol}</p>
            <p className="text-sm mt-2"><strong className="text-primary-foreground/80">Reason:</strong> {result.reason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
