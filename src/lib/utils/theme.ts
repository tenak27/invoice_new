import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  isCompact: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setRadius: (radius: 'none' | 'sm' | 'md' | 'lg' | 'full') => void;
  setCompact: (isCompact: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      radius: 'md',
      isCompact: false,
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      setRadius: (radius) => set({ radius }),
      setCompact: (isCompact) => set({ isCompact }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  const savedTheme = window.localStorage.getItem('theme') as 'light' | 'dark';
  if (savedTheme) return savedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}

// Initialize theme
if (typeof window !== 'undefined') {
  applyTheme(getInitialTheme());
}