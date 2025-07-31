'use server';

/**
 * @fileOverview An AI-powered location selection flow.
 *
 * - aiPoweredLocationSelection - A function that determines the best proxy server location.
 * - AIPoweredLocationSelectionInput - The input type for the aiPoweredLocationSelection function.
 * - AIPoweredLocationSelectionOutput - The return type for the aiPoweredLocationSelection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredLocationSelectionInputSchema = z.object({
  userLocation: z.string().describe('The geographic location of the user.'),
  networkConditions: z.string().describe('The current network conditions of the user.'),
});
export type AIPoweredLocationSelectionInput = z.infer<typeof AIPoweredLocationSelectionInputSchema>;

const AIPoweredLocationSelectionOutputSchema = z.object({
  bestLocation: z.string().describe('The best proxy server location for the user.'),
  latency: z.number().describe('The estimated latency to the best proxy server location.'),
});
export type AIPoweredLocationSelectionOutput = z.infer<typeof AIPoweredLocationSelectionOutputSchema>;

export async function aiPoweredLocationSelection(input: AIPoweredLocationSelectionInput): Promise<AIPoweredLocationSelectionOutput> {
  return aiPoweredLocationSelectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredLocationSelectionPrompt',
  input: {schema: AIPoweredLocationSelectionInputSchema},
  output: {schema: AIPoweredLocationSelectionOutputSchema},
  prompt: `You are an AI assistant that determines the best proxy server location for a user based on their geographic location and network conditions.

User Location: {{{userLocation}}}
Network Conditions: {{{networkConditions}}}

Based on this information, what is the best proxy server location for the user? Also, provide the estimated latency to that location.

Respond using the following format:
{
  "bestLocation": "<best proxy server location>",
  "latency": <estimated latency in milliseconds>
}
`
});

const aiPoweredLocationSelectionFlow = ai.defineFlow(
  {
    name: 'aiPoweredLocationSelectionFlow',
    inputSchema: AIPoweredLocationSelectionInputSchema,
    outputSchema: AIPoweredLocationSelectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
