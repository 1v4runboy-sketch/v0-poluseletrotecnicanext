'use client';
import { useEffect, useRef } from 'react';

export default function CursorTrail(){
  const enabledRef = useRef(true);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (m.matches) { enabledRef.current = false; return; }

    let hidden = false;
    const onVis = ()=> { hidden = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    let last = 0;
    const handler = (e: MouseEvent)=>{
      if (!enabledRef.current || hidden) return;
      const now = performance.now();
      if (now - last < 20) return;  // throttle ~50fps
      last = now;

      const d = document.createElement('div');
      d.className = 'cursor-trail-star';
      d.style.left = e.clientX + 'px';
      d.style.top  = e.clientY + 'px';
      document.body.appendChild(d);
      setTimeout(()=> d.remove(), 700);
    };

    window.addEventListener('mousemove', handler, { passive:true });
    return ()=>{
      window.removeEventListener('mousemove', handler);
      document.removeEventListener('visibilitychange', onVis);
    };
  },[]);

  return null;
}
