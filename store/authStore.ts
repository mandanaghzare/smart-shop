import { create } from "zustand"
import { persist } from "zustand/middleware"


type authStore = {
    user: {email: string} | null
    login: (email: string) => void
    logout: () => void
}

export const useAuthStore = create<authStore>()(
    persist(
        (set) => ({
            user:null,
            login: (email) => set({user: {email}}),
            logout: () => set({user: null})
        }),
        {
            name: "auth-storage",
        }
    )
)