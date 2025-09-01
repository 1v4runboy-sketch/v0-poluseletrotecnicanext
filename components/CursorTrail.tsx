'use client';
import { useEffect } from 'react';

export default function CursorTrail(){
  useEffect(()=>{
    let last = 0;
    const on = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 18) return; // throttle ~55fps
      last = now;
      const d = document.createElement('div');
      d.className = 'cursor-trail';
      d.style.left = e.clientX + 'px';
      d.style.top = e.clientY + 'px';
      document.body.appendChild(d);
      setTimeout(()=> d.remove(), 700);
    };
    window.addEventListener('mousemove', on, {passive:true});
    return ()=> window.removeEventListener('mousemove', on);
  },[]);
  return null;
}
