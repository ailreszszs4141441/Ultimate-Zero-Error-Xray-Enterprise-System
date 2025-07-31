'use server';

/**
 * @fileOverview This file implements the Smart Server Selection flow.
 *
 * It allows the user to automatically select the best proxy server based on
 * their location and network conditions to achieve the lowest latency and most
 * stable connection.
 *
 * @exports {
 *   smartServerSelection: (input: SmartServerSelectionInput) => Promise<SmartServerSelectionOutput>,
 *   SmartServerSelectionInput: type,
 *   SmartServerSelectionOutput: type,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartServerSelectionInputSchema = z.object({
  userLocation: z
    .string()
    .describe('The current location of the user (e.g., city, country).'),
  networkConditions: z
    .string()
    .describe('The current network conditions (e.g., latency, bandwidth).'),
});
export type SmartServerSelectionInput = z.infer<typeof SmartServerSelectionInputSchema>;

const SmartServerSelectionOutputSchema = z.object({
  selectedServer: z
    .string()
    .describe(
      'The best proxy server location selected based on the input criteria.'
    ),
  latency: z
    .number()
    .describe('The estimated latency to the selected server in milliseconds.'),
  stability: z.string().describe('The estimated stability of the connection.'),
  reason: z
    .string()
    .describe('The reason for selecting the specified proxy server.'),
});
export type SmartServerSelectionOutput = z.infer<typeof SmartServerSelectionOutputSchema>;

export async function smartServerSelection(
  input: SmartServerSelectionInput
): Promise<SmartServerSelectionOutput> {
  return smartServerSelectionFlow(input);
}

const smartServerSelectionPrompt = ai.definePrompt({
  name: 'smartServerSelectionPrompt',
  input: {schema: SmartServerSelectionInputSchema},
  output: {schema: SmartServerSelectionOutputSchema},
  prompt: `You are an AI assistant designed to select the best proxy server
location for a user based on their location and network conditions.

Given the user's current location: {{{userLocation}}} and network conditions:
{{{{networkConditions}}}}, analyze available proxy server locations and select
the best option considering latency and stability.

Return the selected proxy server location, estimated latency, stability, and a
reason for the selection.
`,
});

const smartServerSelectionFlow = ai.defineFlow(
  {
    name: 'smartServerSelectionFlow',
    inputSchema: SmartServerSelectionInputSchema,
    outputSchema: SmartServerSelectionOutputSchema,
  },
  async input => {
    const {output} = await smartServerSelectionPrompt(input);
    return output!;
  }
);
