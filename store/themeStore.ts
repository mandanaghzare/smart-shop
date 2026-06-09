import { create } from "zustand";

type ThemeStore = {
  darkMode: boolean;
  toggleTheme: () => void;
  initTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: false,

  initTheme: () => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    document.documentElement.classList.toggle("dark", isDark);
    set({ darkMode: isDark });
  },

  toggleTheme: () => {
    set((state) => {
      const newMode = !state.darkMode;

      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");

      return { darkMode: newMode };
    });
  },
}));