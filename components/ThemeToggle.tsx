'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle(){
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); },[]);
  if(!mounted) return null;

  const isDark = theme === 'dark';
  return (
    <button
      aria-label="Alternar tema"
      onClick={()=> setTheme(isDark ? 'light' : 'dark')}
      className="relative w-16 h-9 rounded-full overflow-hidden backface-hidden"
      style={{boxShadow:'var(--hairline-light)'}}
    >
      <div className="absolute inset-0 transition-all"
        style={{background: isDark ? 'linear-gradient(180deg,#1e1b4b,#0ea5e9)' : 'linear-gradient(180deg,#e0f2fe,#ffffff)'}}/>
      <div
        className="absolute top-1 left-1 w-7 h-7 rounded-full bg-white dark:bg-slate-200 transition-all"
        style={{transform: isDark ? 'translateX(28px)' : 'translateX(0)'}}
      />
      {isDark && <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* ephemeral stars */}
        <svg className="w-full h-full opacity-60" viewBox="0 0 100 100">
          {Array.from({length:10}).map((_,i)=> <circle key={i} cx={Math.random()*100} cy={Math.random()*100} r={Math.random()*0.8+0.2} fill="white" />)}
        </svg>
      </div>}
    </button>
  );
}
