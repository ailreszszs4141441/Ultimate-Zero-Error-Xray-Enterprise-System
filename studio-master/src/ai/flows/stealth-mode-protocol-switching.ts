'use server';

/**
 * @fileOverview An AI agent that detects network limitations and switches protocols to maintain connectivity and anonymity.
 *
 * - stealthModeProtocolSwitching - A function that handles the protocol switching process.
 * - StealthModeProtocolSwitchingInput - The input type for the stealthModeProtocolSwitching function.
 * - StealthModeProtocolSwitchingOutput - The return type for the stealthModeProtocolSwitching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StealthModeProtocolSwitchingInputSchema = z.object({
  currentProtocol: z.string().describe('The current proxy protocol in use.'),
  networkConditions: z.string().describe('A description of the current network conditions, including any detected DPI, throttling, or limitations.'),
  availableProtocols: z.array(z.string()).describe('A list of available proxy protocols to switch to.'),
});
export type StealthModeProtocolSwitchingInput = z.infer<typeof StealthModeProtocolSwitchingInputSchema>;

const StealthModeProtocolSwitchingOutputSchema = z.object({
  suggestedProtocol: z.string().describe('The suggested proxy protocol to switch to, based on the network conditions and available protocols.'),
  reason: z.string().describe('The reason for suggesting the protocol switch.'),
});
export type StealthModeProtocolSwitchingOutput = z.infer<typeof StealthModeProtocolSwitchingOutputSchema>;

export async function stealthModeProtocolSwitching(input: StealthModeProtocolSwitchingInput): Promise<StealthModeProtocolSwitchingOutput> {
  return stealthModeProtocolSwitchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stealthModeProtocolSwitchingPrompt',
  input: {schema: StealthModeProtocolSwitchingInputSchema},
  output: {schema: StealthModeProtocolSwitchingOutputSchema},
  prompt: `You are an AI assistant that helps users bypass network censorship by suggesting optimal proxy protocols.

You will analyze the current network conditions and suggest a more suitable proxy protocol from the list of available protocols.

Consider the following factors when making your decision:
- The current protocol being used: {{{currentProtocol}}}
- The detected network conditions: {{{networkConditions}}}
- The available protocols to switch to: {{#each availableProtocols}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on this information, suggest the best protocol to switch to in the "suggestedProtocol" field, and explain your reasoning in the "reason" field.
`,
});

const stealthModeProtocolSwitchingFlow = ai.defineFlow(
  {
    name: 'stealthModeProtocolSwitchingFlow',
    inputSchema: StealthModeProtocolSwitchingInputSchema,
    outputSchema: StealthModeProtocolSwitchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
