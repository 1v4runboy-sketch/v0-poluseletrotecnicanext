'use client';
import { useEffect, useRef } from 'react';

export default function Starfield(){
  const ref = useRef(null);
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext('2d'); if(!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setSize = () => {
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    setSize();

    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COUNT = reduce ? 0 : (mobile ? 80 : 160);

    const stars = new Array(COUNT).fill(0).map(()=>({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      z: Math.random()*1.2 + 0.2,
      a: Math.random()*0.6 + 0.2,
      t: Math.random()*Math.PI*2,
    }));

    let raf=0;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const now = performance.now()/1000;
      for(const s of stars){
        const twinkle = 0.5 + 0.5*Math.sin(now*2 + s.t);
        const r = (s.z*1.2 + 0.2) * (dpr*0.8);
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${s.a*twinkle})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { dpr = Math.min(window.devicePixelRatio||1, 2); setSize(); };
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(draw); };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    if (COUNT>0) raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); };
  },[]);

  return <canvas aria-hidden className="fixed inset-0 z-[-1] hidden dark:block pointer-events-none" ref={ref} />;
}
