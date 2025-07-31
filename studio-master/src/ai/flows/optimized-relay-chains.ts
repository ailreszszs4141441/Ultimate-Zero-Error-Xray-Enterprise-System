'use server';

/**
 * @fileOverview Implements an AI-powered route optimization flow for low-latency multi-hop relay chains.
 *
 * - optimizeRelayChains - A function that initiates the route optimization process.
 * - OptimizeRelayChainsInput - The input type for the optimizeRelayChains function.
 * - OptimizeRelayChainsOutput - The return type for the optimizeRelayChains function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRelayChainsInputSchema = z.object({
  userLocation: z
    .string()
    .describe('The geolocation of the user requesting the proxy connection.'),
  networkConditions: z
    .string()
    .describe('A description of the current network conditions experienced by the user.'),
  availableServers: z
    .string()
    .describe('A list of available proxy servers with their locations and current loads.'),
});
export type OptimizeRelayChainsInput = z.infer<typeof OptimizeRelayChainsInputSchema>;

const OptimizeRelayChainsOutputSchema = z.object({
  optimizedRoute: z
    .string()
    .describe(
      'The optimized multi-hop relay chain, including server locations and configurations, for the lowest latency connection.'
    ),
  expectedLatency: z
    .string()
    .describe('The estimated latency for the optimized route.'),
});
export type OptimizeRelayChainsOutput = z.infer<typeof OptimizeRelayChainsOutputSchema>;

export async function optimizeRelayChains(
  input: OptimizeRelayChainsInput
): Promise<OptimizeRelayChainsOutput> {
  return optimizeRelayChainsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRelayChainsPrompt',
  input: {schema: OptimizeRelayChainsInputSchema},
  output: {schema: OptimizeRelayChainsOutputSchema},
  prompt: `You are an AI route optimization expert specializing in selecting the best proxy server routes for users based on their location, network conditions, and available server locations and loads.

  Given the following information, determine the optimal multi-hop relay chain for the user to achieve the lowest possible latency and stable connection.

  User Location: {{{userLocation}}}
  Network Conditions: {{{networkConditions}}}
  Available Servers: {{{availableServers}}}

  Provide the optimized route, including server locations and configurations, and the expected latency for the route.
  `,
});

const optimizeRelayChainsFlow = ai.defineFlow(
  {
    name: 'optimizeRelayChainsFlow',
    inputSchema: OptimizeRelayChainsInputSchema,
    outputSchema: OptimizeRelayChainsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
