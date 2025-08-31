'use client';
import { useEffect } from 'react';

export default function CursorTrail(){
  useEffect(()=>{
    const on = (e: MouseEvent) => {
      const d = document.createElement('div');
      d.className = 'cursor-trail';
      d.style.left = e.clientX + 'px';
      d.style.top = e.clientY + 'px';
      document.body.appendChild(d);
      setTimeout(()=> d.remove(), 700);
    };
    window.addEventListener('mousemove', on);
    return ()=> window.removeEventListener('mousemove', on);
  },[]);
  return null;
}
