import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { create } from "zustand";

type AuthUser = {
  uid: string;
  email: string;
  name: string;
};

type AuthStore = {
  user: AuthUser | null;
  hasHydrated: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  hasHydrated: false,

  register: async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    set({
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        name,
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
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        name:
          userCredential.user.displayName ||
          userCredential.user.email?.split("@")[0] ||
          "User",
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
            uid: user.uid,
            email: user.email || "",
            name:
              user.displayName ||
              user.email?.split("@")[0] ||
              "User",
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