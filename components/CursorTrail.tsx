'use client';
import { useEffect } from 'react';

export default function CursorTrail(){
  useEffect(()=>{
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mql.matches) return;

    let raf = 0;
    let last = 0;
    const dots: HTMLDivElement[] = [];
    const maxDots = 18;

    const onMove = (e: MouseEvent)=>{
      const now = performance.now();
      if(now - last < 16) return; // throttle ~60fps
      last = now;

      const d = document.createElement('div');
      d.className = 'pointer-events-none fixed w-2 h-2 rounded-full bg-weg/60';
      d.style.left = e.clientX + 'px';
      d.style.top = e.clientY + 'px';
      d.style.transform = 'translate(-50%,-50%)';
      d.style.filter = 'blur(0.5px)';
      document.body.appendChild(d);
      dots.push(d);
      if(dots.length > maxDots){
        const x = dots.shift();
        if(x) x.remove();
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        dots.forEach((el, idx)=>{
          el.style.opacity = String(1 - idx/maxDots);
        });
      });
    };

    const onVisibility = ()=>{
      if(document.hidden){
        dots.splice(0).forEach(el=> el.remove());
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVisibility);
    return ()=>{
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      dots.forEach(el=> el.remove());
    };
  },[]);
  return null;
}
