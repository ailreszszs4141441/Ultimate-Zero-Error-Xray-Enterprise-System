"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { runTrafficObfuscation } from "@/lib/actions";
import type { TrafficObfuscationOutput } from "@/ai/flows/traffic-obfuscation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Rabbit, Loader2 } from "lucide-react";

const formSchema = z.object({
  networkConditions: z.string().min(5, "Describe network conditions."),
  desiredAnonymityLevel: z.string(),
});

export function TrafficObfuscation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrafficObfuscationOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      networkConditions: "Aggressive DPI, port blocking on UDP.",
      desiredAnonymityLevel: "high",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const res = await runTrafficObfuscation(values);
    setResult(res);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Rabbit className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">AI Traffic Obfuscation</CardTitle>
        </div>
        <CardDescription>Dynamically adjust traffic patterns to evade DPI and censorship.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="desiredAnonymityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Anonymity Level</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendation
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 border rounded-md bg-card-foreground/5 space-y-2">
            <h4 className="font-semibold text-accent">Obfuscation Plan:</h4>
            <div className="flex items-center gap-4">
                <p className="text-sm"><strong className="text-primary-foreground/80">Protocol:</strong> {result.protocolRecommendation}</p>
                {result.stealthModeEnabled && <Badge variant="outline" className="border-accent text-accent">Stealth Mode ON</Badge>}
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-foreground/80">Configuration Details:</p>
              <p className="text-sm font-code bg-black/20 p-2 rounded-md mt-1">{result.configurationDetails}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
