'use client';
import React, { useEffect, useRef } from 'react';
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const count = 180;
    const stars = Array.from({length: count}).map(() => ({
      x: Math.random()*w, y: Math.random()*h, z: Math.random()*1, r: Math.random()*1.2+0.2, a: Math.random()*0.6+0.2, t: Math.random()*Math.PI*2
    }));
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    function draw(){
      if (!ctx) return;
      ctx.clearRect(0,0,w,h);
      for (const s of stars){
        s.t += 0.01*(mql.matches?0.2:1);
        const twinkle = (Math.sin(s.t)+1)/2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${s.a*twinkle})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    function onResize(){
      w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas aria-hidden className="fixed inset-0 z-[-1] hidden dark:block pointer-events-none" ref={ref} />;
}
