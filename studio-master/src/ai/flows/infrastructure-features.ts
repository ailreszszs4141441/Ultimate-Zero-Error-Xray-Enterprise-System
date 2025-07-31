
import { z } from 'zod';

// Define the schema for the Infrastructure Features
export const InfrastructureFeaturesSchema = z.object({
  // Network Architecture
  Mesh_Network_Topology: z.boolean().default(true).describe("Enable a mesh network topology for resilient and decentralized connectivity."),
  Satellite_Backup_Links: z.boolean().default(false).describe("Utilize satellite backup links for uninterrupted service."),
  Quantum_Internet_Ready: z.boolean().default(false).describe("Prepare the infrastructure for the upcoming Quantum Internet."),
  IPv6_Only_Fast_Path: z.boolean().default(true).describe("Enable an IPv6-only fast path for improved performance."),

  // Server Technology
  Anycast_Global_Network: z.boolean().default(true).describe("Use an Anycast global network for low-latency connections."),
  GeoDNS_Load_Balancing: z.boolean().default(true).describe("Enable GeoDNS-based load balancing for optimal server selection."),
  BGP_Anycast_Routing: z.boolean().default(true).describe("Utilize BGP Anycast routing for efficient traffic distribution."),
  CDN_Integration: z.boolean().default(false).describe("Integrate with a Content Delivery Network (CDN) for faster content delivery."),
});

// Define the type for the Infrastructure Features
export type InfrastructureFeatures = z.infer<typeof InfrastructureFeaturesSchema>;

// Function to generate an Infrastructure Features configuration
export function generateInfrastructureFeaturesConfig(options: InfrastructureFeatures) {
  return {
    "infrastructure-features": {
      "network-architecture": {
        "mesh-network-topology": options.Mesh_Network_Topology,
        "satellite-backup-links": options.Satellite_Backup_Links,
        "quantum-internet-ready": options.Quantum_Internet_Ready,
        "ipv6-only-fast-path": options.IPv6_Only_Fast_Path,
      },
      "server-technology": {
        "anycast-global-network": options.Anycast_Global_Network,
        "geodns-load-balancing": options.GeoDNS_Load_Balancing,
        "bgp-anycast-routing": options.BGP_Anycast_Routing,
        "cdn-integration": options.CDN_Integration,
      },
    }
  };
}
