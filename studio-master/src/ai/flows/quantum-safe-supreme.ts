
import { z } from 'zod';

// Define the schema for the Quantum-Safe Supreme
export const QuantumSafeSupremeSchema = z.object({
  // Next-Gen Encryption
  Lattice_based_Cryptography: z.boolean().default(true).describe("Enable lattice-based cryptography for post-quantum security."),
  Code_based_McEliece: z.boolean().default(false).describe("Enable code-based McEliece cryptography."),
  Hash_based_SPHINCS_Plus: z.boolean().default(true).describe("Enable hash-based SPHINCS+ for digital signatures."),
  Multivariate_Polynomials: z.boolean().default(false).describe("Enable multivariate polynomial cryptography."),

  // Quantum Key Distribution
  BB84_Protocol_Simulation: z.boolean().default(true).describe("Simulate the BB84 protocol for quantum key distribution."),
  Quantum_Teleportation_Keys: z.boolean().default(false).describe("Use quantum teleportation for secure key exchange."),
  Entanglement_based_Security: z.boolean().default(true).describe("Enable entanglement-based security for enhanced protection."),
});

// Define the type for the Quantum-Safe Supreme
export type QuantumSafeSupreme = z.infer<typeof QuantumSafeSupremeSchema>;

// Function to generate a Quantum-Safe Supreme configuration
export function generateQuantumSafeSupremeConfig(options: QuantumSafeSupreme) {
  return {
    "quantum-safe-supreme": {
      "next-gen-encryption": {
        "lattice-based-cryptography": options.Lattice_based_Cryptography,
        "code-based-mceliece": options.Code_based_McEliece,
        "hash-based-sphincs-plus": options.Hash_based_SPHINCS_Plus,
        "multivariate-polynomials": options.Multivariate_Polynomials,
      },
      "quantum-key-distribution": {
        "bb84-protocol-simulation": options.BB84_Protocol_Simulation,
        "quantum-teleportation-keys": options.Quantum_Teleportation_Keys,
        "entanglement-based-security": options.Entanglement_based_Security,
      },
    }
  };
}
