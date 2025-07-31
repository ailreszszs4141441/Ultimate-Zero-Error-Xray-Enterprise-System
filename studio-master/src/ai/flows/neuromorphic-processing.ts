import { z } from 'zod';

// Define the schema for Neuromorphic Processing
export const NeuromorphicProcessingSchema = z.object({
  Enable_Neuromorphic_Processing: z.boolean().default(false).describe("Enable neuromorphic processing for ultra-low power consumption and high-speed processing."),
  Neuromorphic_Chip_Simulation: z.boolean().default(false).describe("Simulate neuromorphic chips for development and testing."),
  Power_Consumption_Mode: z.enum(["ultra-low", "low", "normal"]).default("normal").describe("Set the power consumption mode."),
  Processing_Speed_Mode: z.enum(["high", "normal", "low"]).default("normal").describe("Set the processing speed mode."),
});

// Define the type for Neuromorphic Processing
export type NeuromorphicProcessing = z.infer<typeof NeuromorphicProcessingSchema>;

// Function to generate a Neuromorphic Processing configuration
export function generateNeuromorphicProcessingConfig(options: NeuromorphicProcessing) {
  return {
    "neuromorphic-processing": {
      "enabled": options.Enable_Neuromorphic_Processing,
      "simulation": options.Neuromorphic_Chip_Simulation,
      "power-mode": options.Power_Consumption_Mode,
      "speed-mode": options.Processing_Speed_Mode,
    }
  };
}
