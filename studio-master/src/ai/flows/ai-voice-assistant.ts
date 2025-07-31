import { z } from 'zod';

// Define the schema for AI Voice Assistant
export const AIVoiceAssistantSchema = z.object({
  Enable_AI_Voice_Assistant: z.boolean().default(false).describe("Enable the AI voice assistant for hands-free control."),
  Wake_Word: z.string().default("Hey Quantum").describe("The wake word to activate the assistant."),
  Supported_Commands: z.array(z.string()).default([
    "connect to fastest server",
    "enable maximum security mode",
    "bypass this firewall",
    "disconnect",
    "show network status",
  ]).describe("The list of supported voice commands."),
});

// Define the type for AI Voice Assistant
export type AIVoiceAssistant = z.infer<typeof AIVoiceAssistantSchema>;

// Function to generate an AI Voice Assistant configuration
export function generateAIVoiceAssistantConfig(options: AIVoiceAssistant) {
  return {
    "ai-voice-assistant": {
      "enabled": options.Enable_AI_Voice_Assistant,
      "wake-word": options.Wake_Word,
      "supported-commands": options.Supported_Commands,
    }
  };
}
