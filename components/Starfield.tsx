'use client';
import { useEffect, useRef } from 'react';

export default function Starfield(){
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c = ref.current; if(!c) return;
    const ctx = c.getContext('2d')!;
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const onRes = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener('resize', onRes);
    const stars = Array.from({length: 140}, ()=>({ x: Math.random()*w, y: Math.random()*h, z: Math.random()*0.5 + 0.5 }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      for(const s of stars){
        s.x += 0.05 * s.z; if (s.x>w) s.x=0;
        ctx.fillStyle = `rgba(147,197,253,${0.35*s.z})`;
        ctx.fillRect(s.x, s.y, 1.2*s.z, 1.2*s.z);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onRes); };
  },[]);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"/>;
}
