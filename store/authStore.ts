import { create } from "zustand"
import { persist } from "zustand/middleware"


type AuthStore = {
    user: {email: string} | null
    login: (email: string) => void
    logout: () => void
    hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
        user: null,
        hasHydrated: false,

        setHasHydrated: (value) => set({ hasHydrated: value }),

        login: (email) => set({user: {email}}),
        logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);