import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";

type AuthStore = {
  user: { email: string } | null;
  hasHydrated: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  hasHydrated: false,

  register: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    set({
      user: {
        email: userCredential.user.email || email,
      },
    });
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    set({
      user: {
        email: userCredential.user.email || email,
      },
    });
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({
          user: {
            email: user.email || "",
          },
          hasHydrated: true,
        });
      } else {
        set({
          user: null,
          hasHydrated: true,
        });
      }
    });
  },
}));