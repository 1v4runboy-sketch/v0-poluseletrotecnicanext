'use client';
import { useEffect, useRef, useState } from 'react';

const logos = ['weg','nsk','hch','jl','ddu','zz','polus'];

export default function BrandCarousel(){
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(()=>{
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mql.matches) return;
    let raf=0, x=0;
    const speed = 0.4;
    const tick = ()=>{
      if(!paused && ref.current){
        x = (x - speed) % (ref.current.scrollWidth/2);
        ref.current.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onVis = ()=>{ if(document.hidden){ setPaused(true);} };
    document.addEventListener('visibilitychange', onVis);
    return ()=>{ cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); };
  },[paused]);
  const items = [...logos, ...logos];
  return (
    <div className="overflow-hidden py-6" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div ref={ref} className="flex items-center gap-10 will-change-transform">
        {items.map((l,i)=> (
          <img key={i} src={`/marcas/${l}.svg`} alt={l} className="h-10 w-auto brand-logo" loading="lazy" decoding="async" />
        ))}
      </div>
    </div>
  );
}
