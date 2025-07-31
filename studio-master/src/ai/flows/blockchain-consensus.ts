import { z } from 'zod';

// Define the schema for Blockchain Consensus
export const BlockchainConsensusSchema = z.object({
  Enable_Blockchain_Consensus: z.boolean().default(false).describe("Enable blockchain consensus for server identity verification and routing."),
  Server_Identity_Verification: z.boolean().default(false).describe("Use blockchain to verify server identities."),
  Smart_Contract_Routing: z.boolean().default(false).describe("Use smart contracts for decentralized routing decisions."),
  Decentralized_Server_Network: z.boolean().default(false).describe("Enable a decentralized server network."),
  Blockchain_Platform: z.enum(["ethereum", "solana", "cardano", "custom"]).default("ethereum").describe("Select the blockchain platform."),
});

// Define the type for Blockchain Consensus
export type BlockchainConsensus = z.infer<typeof BlockchainConsensusSchema>;

// Function to generate a Blockchain Consensus configuration
export function generateBlockchainConsensusConfig(options: BlockchainConsensus) {
  return {
    "blockchain-consensus": {
      "enabled": options.Enable_Blockchain_Consensus,
      "server-identity-verification": options.Server_Identity_Verification,
      "smart-contract-routing": options.Smart_Contract_Routing,
      "decentralized-server-network": options.Decentralized_Server_Network,
      "platform": options.Blockchain_Platform,
    }
  };
}
