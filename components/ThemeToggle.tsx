'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle(){
  const { theme, setTheme } = useTheme();
  const isDark = theme==='dark';
  return (
    <button
      onClick={()=> setTheme(isDark ? 'light' : 'dark')}
      className={`relative w-14 h-8 rounded-full border anim-soft ${isDark?'bg-gradient-to-r from-indigo-900 to-purple-800':'bg-gradient-to-r from-white to-blue-50'}`}
      aria-label="Trocar tema"
    >
      <span className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-200 shadow anim-soft ${isDark?'translate-x-6':''}`}/>
    </button>
  );
}
