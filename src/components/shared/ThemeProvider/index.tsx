import React, { createContext, useContext, useEffect, useState } from 'react';

// Available theme options
export type ThemeName = 'default' | 'blue-purple' | 'fire' | 'ocean';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme metadata for UI display
export const THEME_METADATA: Record<ThemeName, { label: string; description: string; preview: string }> = {
  'default': {
    label: 'Neon Green',
    description: 'Classic casino green with neon accents',
    preview: 'hsl(74 100% 53%)', // Primary color
  },
  'blue-purple': {
    label: 'Blue Purple',
    description: 'Cool blue and purple tones',
    preview: 'hsl(220 100% 60%)',
  },
  'fire': {
    label: 'Fire',
    description: 'Hot orange and red flames',
    preview: 'hsl(14 100% 57%)',
  },
  'ocean': {
    label: 'Ocean',
    description: 'Calm cyan and teal waters',
    preview: 'hsl(180 100% 50%)',
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'default',
  storageKey = 'app-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // Load theme from localStorage on mount
    const stored = localStorage.getItem(storageKey) as ThemeName;
    return stored && stored in THEME_METADATA ? stored : defaultTheme;
  });

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    
    // Remove all theme attributes
    Object.keys(THEME_METADATA).forEach(t => {
      root.removeAttribute(`data-theme`);
    });
    
    // Set current theme
    root.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    availableThemes: Object.keys(THEME_METADATA) as ThemeName[],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
