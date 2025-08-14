import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStoreData = create(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data) => set(() => ({ userData: data })),
    }),
    {
      name: "user-data",
      getStorage: () => localStorage,
    }
  )
);
