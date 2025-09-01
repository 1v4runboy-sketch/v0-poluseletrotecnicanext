'use client';
import React, { useEffect } from 'react';
export default function CursorTrail() {
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;
    function spawn(x:number,y:number){
      const d = document.createElement('div');
      d.className = 'cursor-trail';
      d.style.left = x+'px'; d.style.top = y+'px';
      document.body.appendChild(d);
      setTimeout(()=>d.remove(), 700);
    }
    function onMove(e: MouseEvent){ spawn(e.pageX, e.pageY); }
    function onTouch(e: TouchEvent){
      const t = e.touches[0]; if (t) spawn(t.pageX, t.pageY);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch); };
  }, []);
  return null;
}
