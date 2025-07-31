// This file implements the Genkit flow for the automaticConfiguration story.
// It enables the app to automatically extract configuration details from provided config strings or URLs using an LLM, to simplify initial setup.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomaticConfigurationInputSchema = z.object({
  configurationText: z.string().describe('The configuration text or URL to extract configuration details from.'),
});

export type AutomaticConfigurationInput = z.infer<typeof AutomaticConfigurationInputSchema>;

const AutomaticConfigurationOutputSchema = z.object({
  protocol: z.string().describe('The protocol used in the configuration (e.g., VLESS, VMess, Trojan).'),
  serverAddress: z.string().describe('The server address from the configuration.'),
  serverPort: z.number().describe('The server port from the configuration.'),
  userId: z.string().optional().describe('The user ID from the configuration, if applicable.'),
  encryptionMethod: z.string().optional().describe('The encryption method used in the configuration, if applicable.'),
});

export type AutomaticConfigurationOutput = z.infer<typeof AutomaticConfigurationOutputSchema>;

export async function automaticConfiguration(input: AutomaticConfigurationInput): Promise<AutomaticConfigurationOutput> {
  return automaticConfigurationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automaticConfigurationPrompt',
  input: {schema: AutomaticConfigurationInputSchema},
  output: {schema: AutomaticConfigurationOutputSchema},
  prompt: `You are an expert configuration extractor. Extract configuration details from the given text or URL.

  Configuration Text: {{{configurationText}}}
  
  Output the protocol, server address, server port, userId, and encryptionMethod to the output schema. If the configuration doesn't use a certain field, make that field undefined.`,
});

const automaticConfigurationFlow = ai.defineFlow(
  {
    name: 'automaticConfigurationFlow',
    inputSchema: AutomaticConfigurationInputSchema,
    outputSchema: AutomaticConfigurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
