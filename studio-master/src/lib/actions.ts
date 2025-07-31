
'use server';

import { smartServerSelection, type SmartServerSelectionInput, type SmartServerSelectionOutput } from '@/ai/flows/smart-server-selection';
import { optimizeRelayChains, type OptimizeRelayChainsInput, type OptimizeRelayChainsOutput } from '@/ai/flows/optimized-relay-chains';
import { stealthModeProtocolSwitching, type StealthModeProtocolSwitchingInput, type StealthModeProtocolSwitchingOutput } from '@/ai/flows/stealth-mode-protocol-switching';
import { trafficObfuscation, type TrafficObfuscationInput, type TrafficObfuscationOutput } from '@/ai/flows/traffic-obfuscation';

export async function runSmartServerSelection(input: SmartServerSelectionInput): Promise<SmartServerSelectionOutput> {
  return await smartServerSelection(input);
}

export async function runOptimizeRelayChains(input: OptimizeRelayChainsInput): Promise<OptimizeRelayChainsOutput> {
  return await optimizeRelayChains(input);
}

export async function runStealthModeProtocolSwitching(input: StealthModeProtocolSwitchingInput): Promise<StealthModeProtocolSwitchingOutput> {
  return await stealthModeProtocolSwitching(input);
}

export async function runTrafficObfuscation(input: TrafficObfuscationInput): Promise<TrafficObfuscationOutput> {
  return await trafficObfuscation(input);
}
