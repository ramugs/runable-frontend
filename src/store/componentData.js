import { create } from "zustand";
import { persist } from "zustand/middleware";

export const componentStoreData = create(
  persist(
    (set) => ({
      componentData: null,
      setComponentData: (data) => set(() => ({ componentData: data })),
    }),
    {
      name: "component-data",
      getStorage: () => localStorage,
    }
  )
);
