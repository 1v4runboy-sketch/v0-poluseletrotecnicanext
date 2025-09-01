
'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle(){
  const { theme, setTheme } = useTheme();
  const isDark = theme==='dark';
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    // tiny stars in dark
    const el = ref.current; if(!el) return;
    if (!isDark) { el.querySelectorAll('.star').forEach(n=>n.remove()); return; }
    for (let i=0;i<8;i++){
      const s = document.createElement('span');
      s.className='star';
      s.style.left = Math.random()*80 + '%';
      s.style.top = Math.random()*60 + '%';
      el.appendChild(s);
      setTimeout(()=> s.remove(), 1500 + (Math.random()*1000|0));
    }
  }, [isDark]);

  return (
    <button
      ref={ref}
      onClick={()=> setTheme(isDark ? 'light' : 'dark')}
      className={`relative w-16 h-9 rounded-full border anim-soft overflow-hidden ${
        isDark?'bg-gradient-to-r from-indigo-900 to-purple-800':'bg-gradient-to-r from-white to-blue-50'
      }`}
      aria-label="Trocar tema"
      title="Trocar tema"
    >
      <span className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-white dark:bg-gray-200 shadow anim-soft ${isDark?'translate-x-7':''}`}/>
    </button>
  );
}
