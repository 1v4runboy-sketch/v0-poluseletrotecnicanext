'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
type Theme = 'light' | 'dark';
const ThemeCtx = createContext<{theme: Theme; setTheme: (t:Theme)=>void}>({theme:'light', setTheme: ()=>{}});
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));
  }, []);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
      html.style.setProperty('--theme-fade', theme === 'dark' ? 'radial-gradient(1000px 600px at 10% -10%, rgba(255,255,255,0.06), transparent)' : 'radial-gradient(1000px 600px at 10% -10%, rgba(0,0,0,0.04), transparent)');
    }
  }, [theme]);
  return <ThemeCtx.Provider value={{theme, setTheme}}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
