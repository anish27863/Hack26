import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialConfig } from "./initialConfig";

type ConfigState = typeof initialConfig;

interface ConfigStore {
  config: ConfigState;
  updateConfig: <K extends keyof ConfigState>(section: K, payload: ConfigState[K]) => void;
  resetConfig: () => void;
  
  // Registration Helpers
  addRegistration: (registration: any) => void;
  updateRegistrationStatus: (id: string, status: string) => void;
  
  // Generic CRUD for arrays
  addOrUpdateItem: <K extends "prizes" | "schedule" | "sponsors" | "faq">(section: K, item: any) => void;
  deleteItem: <K extends "prizes" | "schedule" | "sponsors" | "faq">(section: K, id: string) => void;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      config: initialConfig,
      
      updateConfig: (section, payload) =>
        set((state) => ({
          config: {
            ...state.config,
            [section]: payload,
          },
        })),

      resetConfig: () => set({ config: initialConfig }),

      addRegistration: (registration) =>
        set((state) => ({
          config: {
            ...state.config,
            registrations: [...state.config.registrations, registration],
          },
        })),

      updateRegistrationStatus: (id, status) =>
        set((state) => ({
          config: {
            ...state.config,
            registrations: state.config.registrations.map((r) =>
              r.id === id ? { ...r, status } : r
            ),
          },
        })),

      addOrUpdateItem: (section, item) =>
        set((state) => {
          const list = state.config[section] as any[];
          const exists = list.find((i) => i.id === item.id);
          return {
            config: {
              ...state.config,
              [section]: exists
                ? list.map((i) => (i.id === item.id ? item : i))
                : [...list, item],
            },
          };
        }),
        
      deleteItem: (section, id) =>
        set((state) => {
          const list = state.config[section] as any[];
          return {
            config: {
              ...state.config,
              [section]: list.filter((i) => i.id !== id),
            },
          };
        }),
    }),
    {
      name: "hackathon-config-storage",
    }
  )
);
