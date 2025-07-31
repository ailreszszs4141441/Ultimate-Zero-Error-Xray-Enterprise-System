"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { runSmartServerSelection } from "@/lib/actions";
import type { SmartServerSelectionOutput } from "@/ai/flows/smart-server-selection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Globe, Loader2 } from "lucide-react";

const formSchema = z.object({
  userLocation: z.string().min(2, "Please enter a valid location."),
  networkConditions: z.string().min(5, "Describe your network conditions (e.g., 'Unstable, 50Mbps')."),
});

export function SmartRouting() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartServerSelectionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userLocation: "Sydney, Australia",
      networkConditions: "High latency on trans-pacific routes",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    const res = await runSmartServerSelection(values);
    setResult(res);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Globe className="text-primary" size={24}/>
            <CardTitle className="font-headline tracking-wider">AI GeoIP Smart Routing</CardTitle>
        </div>
        <CardDescription>Dynamically select optimal servers based on your geo-location.</CardDescription>
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
                  <FormLabel>Current Network Conditions</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Find Best Server
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 p-4 border rounded-md bg-card-foreground/5">
            <h4 className="font-semibold mb-2 text-accent">Recommendation:</h4>
            <p className="text-sm"><strong className="text-primary-foreground/80">Selected Server:</strong> {result.selectedServer}</p>
            <p className="text-sm"><strong className="text-primary-foreground/80">Est. Latency:</strong> {result.latency}ms</p>
            <p className="text-sm"><strong className="text-primary-foreground/80">Est. Stability:</strong> {result.stability}</p>
            <p className="text-sm mt-2"><strong className="text-primary-foreground/80">Reason:</strong> {result.reason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
