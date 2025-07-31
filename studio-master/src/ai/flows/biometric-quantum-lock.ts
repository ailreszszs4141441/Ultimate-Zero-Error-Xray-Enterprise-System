import { z } from 'zod';

// Define the schema for Biometric Quantum Lock
export const BiometricQuantumLockSchema = z.object({
  Enable_Biometric_Quantum_Lock: z.boolean().default(false).describe("Enable biometric quantum lock for ultimate security."),
  Fingerprint_Quantum_Lock: z.boolean().default(false).describe("Enable quantum lock with fingerprint biometrics."),
  Face_ID_Quantum_Key: z.boolean().default(false).describe("Use Face ID to generate a quantum key."),
  Voice_Pattern_Encryption: z.boolean().default(false).describe("Encrypt data using voice patterns."),
  Biometric_Data_Storage: z.enum(["local", "encrypted-cloud", "decentralized"]).default("local").describe("Select where to store biometric data."),
});

// Define the type for Biometric Quantum Lock
export type BiometricQuantumLock = z.infer<typeof BiometricQuantumLockSchema>;

// Function to generate a Biometric Quantum Lock configuration
export function generateBiometricQuantumLockConfig(options: BiometricQuantumLock) {
  return {
    "biometric-quantum-lock": {
      "enabled": options.Enable_Biometric_Quantum_Lock,
      "fingerprint-lock": options.Fingerprint_Quantum_Lock,
      "face-id-key": options.Face_ID_Quantum_Key,
      "voice-pattern-encryption": options.Voice_Pattern_Encryption,
      "biometric-storage": options.Biometric_Data_Storage,
    }
  };
}
