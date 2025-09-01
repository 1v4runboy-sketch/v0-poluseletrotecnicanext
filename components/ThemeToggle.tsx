'use client';
import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [pressed, setPressed] = useState(false);
  const isDark = theme === 'dark';
  return (
    <button
      aria-label="Alternar tema"
      onClick={() => { setPressed(true); setTimeout(()=>setPressed(false), 200); setTheme(isDark ? 'light' : 'dark'); }}
      className={`relative inline-flex items-center justify-between w-16 h-9 rounded-full transition-transform ${pressed?'scale-95':''}`}
      style={{ background: isDark ? 'linear-gradient(135deg,#0ea5e9,#7c3aed)' : 'linear-gradient(135deg,#f59e0b,#22c55e)',
               boxShadow: isDark ? '0 0 30px rgba(124,58,237,.35)' : '0 0 24px rgba(34,197,94,.25)' }}
    >
      <span className="sr-only">Alternar tema</span>
      <span className={`absolute inset-0 overflow-hidden rounded-full pointer-events-none ${isDark?'':'opacity-0'}`}>
        {[...Array(6)].map((_,i)=>(
          <span key={i} className="absolute w-1 h-1 bg-white/80 rounded-full animate-ping"
                style={{ top: `${10+Math.random()*60}%`, left: `${10+Math.random()*70}%`, animationDuration: `${1200+Math.random()*800}ms` }} />
        ))}
      </span>
      <span className={`z-10 w-7 h-7 bg-white/90 dark:bg-black/70 rounded-full mx-1 transition-all ${isDark?'translate-x-8':''}`}
            style={{ boxShadow: isDark ? 'inset 0 0 12px rgba(255,255,255,.1), 0 6px 18px rgba(0,0,0,.35)' : 'inset 0 0 12px rgba(0,0,0,.06), 0 6px 18px rgba(0,0,0,.2)'}} />
    </button>
  );
}
