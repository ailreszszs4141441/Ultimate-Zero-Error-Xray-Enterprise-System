'use server';

/**
 * @fileOverview A Genkit Flow to intelligently select the optimal transport protocol
 * based on real-time network analysis, leveraging AI to avoid detection and censorship.
 *
 * @interface ProtocolMorphingAiInput - Defines the input schema for the flow.
 * @interface ProtocolMorphingAiOutput - Defines the output schema for the flow.
 * @function protocolMorphingAi - The main function to invoke the protocol morphing flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @interface ProtocolMorphingAiInput
 * @description Defines the input schema for the ProtocolMorphingAi flow.
 */
const ProtocolMorphingAiInputSchema = z.object({
  networkConditions: z
    .string()
    .describe('A description of the current network conditions.'),
  censorshipLevel: z.number().describe('The current level of censorship detected.'),
});
export type ProtocolMorphingAiInput = z.infer<typeof ProtocolMorphingAiInputSchema>;

/**
 * @interface ProtocolMorphingAiOutput
 * @description Defines the output schema for the ProtocolMorphingAi flow.
 */
const ProtocolMorphingAiOutputSchema = z.object({
  protocol: z.string().describe('The optimal transport protocol to use.'),
  reason: z.string().describe('The reason for choosing this protocol.'),
});
export type ProtocolMorphingAiOutput = z.infer<typeof ProtocolMorphingAiOutputSchema>;

/**
 * @function protocolMorphingAi
 * @description The main function to invoke the protocol morphing flow.
 * @param {ProtocolMorphingAiInput} input - The input data for the flow.
 * @returns {Promise<ProtocolMorphingAiOutput>} The output containing the optimal protocol and reason.
 */
export async function protocolMorphingAi(input: ProtocolMorphingAiInput): Promise<ProtocolMorphingAiOutput> {
  return protocolMorphingAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'protocolMorphingAiPrompt',
  input: {schema: ProtocolMorphingAiInputSchema},
  output: {schema: ProtocolMorphingAiOutputSchema},
  prompt: `Based on the following network conditions and censorship level, determine the optimal transport protocol to use to avoid detection and censorship. Explain your reasoning.

Network Conditions: {{{networkConditions}}}
Censorship Level: {{{censorshipLevel}}}

Consider protocols like VLESS, VMess, Trojan, and Shadowsocks.

Return the protocol and reason in a JSON format.
`,
});

const protocolMorphingAiFlow = ai.defineFlow(
  {
    name: 'protocolMorphingAiFlow',
    inputSchema: ProtocolMorphingAiInputSchema,
    outputSchema: ProtocolMorphingAiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


