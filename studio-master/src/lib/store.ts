
import { create } from 'zustand';
import { AINeuralEngine, generateAINeuralEngineConfig } from '@/ai/flows/ai-neural-engine';
import { HyperPerformanceModule, generateHyperPerformanceModuleConfig } from '@/ai/flows/hyper-performance-module';
import { InfrastructureFeatures, generateInfrastructureFeaturesConfig } from '@/ai/flows/infrastructure-features';
import { QuantumSafeSupreme, generateQuantumSafeSupremeConfig } from '@/ai/flows/quantum-safe-supreme';
import { StealthTechnologyProMax, generateStealthTechnologyProMaxConfig } from '@/ai/flows/stealth-technology-pro-max';

// This is a simplified merge logic. In a real-world scenario, this would be
// a sophisticated function that intelligently combines different config parts.
const mergeConfigs = (states: Partial<AppState>) => {
  const xrayConfig = {
    log: {
      loglevel: 'warning',
    },
    inbounds: [
      {
        port: 1080,
        protocol: 'socks',
        settings: {
          auth: 'noauth',
        },
      },
    ],
    outbounds: [
      {
        protocol: 'vless',
        settings: {},
        streamSettings: {},
      },
    ],
    policy: {
      levels: {
        '0': {
          handshake: 4,
          connIdle: 300,
          uplinkOnly: 1,
          downlinkOnly: 1,
        },
      },
    },
    other: {},
  };

  // Merge features into the base config
  if (states.aiNeuralEngineConfig) {
    xrayConfig.other = { ...xrayConfig.other, ...states.aiNeuralEngineConfig };
  }
  if (states.hyperPerformanceModuleConfig) {
    xrayConfig.other = { ...xrayConfig.other, ...states.hyperPerformanceModuleConfig };
  }
  if (states.infrastructureFeaturesConfig) {
    xrayConfig.other = { ...xrayConfig.other, ...states.infrastructureFeaturesConfig };
  }
  if (states.quantumSafeSupremeConfig) {
    // Example of deeper integration
    if (xrayConfig.outbounds[0].protocol === 'vless') {
        // @ts-ignore
        xrayConfig.outbounds[0].settings.vnext = [
        {
          users: [
            {
              encryption: 'none', // Placeholder
            },
          ],
        },
      ];
    }
    xrayConfig.other = { ...xrayConfig.other, ...states.quantumSafeSupremeConfig };
  }
  if (states.stealthTechnologyProMaxConfig) {
    xrayConfig.other = { ...xrayConfig.other, ...states.stealthTechnologyProMaxConfig };
  }

  return xrayConfig;
};

interface AppState {
  aiNeuralEngineConfig: Partial<AINeuralEngine>;
  hyperPerformanceModuleConfig: Partial<HyperPerformanceModule>;
  infrastructureFeaturesConfig: Partial<InfrastructureFeatures>;
  quantumSafeSupremeConfig: Partial<QuantumSafeSupreme>;
  stealthTechnologyProMaxConfig: Partial<StealthTechnologyProMax>;
  finalConfig: object;

  updateAINeuralEngineConfig: (values: AINeuralEngine) => void;
  updateHyperPerformanceModuleConfig: (values: HyperPerformanceModule) => void;
  updateInfrastructureFeaturesConfig: (values: InfrastructureFeatures) => void;
  updateQuantumSafeSupremeConfig: (values: QuantumSafeSupreme) => void;
  updateStealthTechnologyProMaxConfig: (values: StealthTechnologyProMax) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  aiNeuralEngineConfig: {},
  hyperPerformanceModuleConfig: {},
  infrastructureFeaturesConfig: {},
  quantumSafeSupremeConfig: {},
  stealthTechnologyProMaxConfig: {},
  finalConfig: mergeConfigs({}),

  updateAINeuralEngineConfig: (values) => {
    const config = generateAINeuralEngineConfig(values);
    set((state) => {
      const newPartialState = { ...state, aiNeuralEngineConfig: config };
      return { aiNeuralEngineConfig: config, finalConfig: mergeConfigs(newPartialState) };
    });
  },
  updateHyperPerformanceModuleConfig: (values) => {
    const config = generateHyperPerformanceModuleConfig(values);
    set((state) => {
      const newPartialState = { ...state, hyperPerformanceModuleConfig: config };
      return { hyperPerformanceModuleConfig: config, finalConfig: mergeConfigs(newPartialState) };
    });
  },
  updateInfrastructureFeaturesConfig: (values) => {
    const config = generateInfrastructureFeaturesConfig(values);
    set((state) => {
        const newPartialState = { ...state, infrastructureFeaturesConfig: config };
        return { infrastructureFeaturesConfig: config, finalConfig: mergeConfigs(newPartialState) };
      });
  },
  updateQuantumSafeSupremeConfig: (values) => {
    const config = generateQuantumSafeSupremeConfig(values);
    set((state) => {
        const newPartialState = { ...state, quantumSafeSupremeConfig: config };
        return { quantumSafeSupremeConfig: config, finalConfig: mergeConfigs(newPartialState) };
      });
  },
  updateStealthTechnologyProMaxConfig: (values) => {
    const config = generateStealthTechnologyProMaxConfig(values);
    set((state) => {
        const newPartialState = { ...state, stealthTechnologyProMaxConfig: config };
        return { stealthTechnologyProMaxConfig: config, finalConfig: mergeConfigs(newPartialState) };
      });
  },
}));
