'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import ImageSafe from './ImageSafe';
import { brands as brandsAll } from '../lib/products';

function cand(brand: string) {
  const base = String(brand || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return [
    `/marcas/${base}.svg`,
    `/marcas/${base}.webp`,
    `/marcas/${base}.png`,
    `/marcas/${base}-logo.svg`,
    `/marcas/${base}-logo.webp`,
    `/marcas/${base}-logo.png`,
    `/marcas/${base}.jpg`,
  ];
}

export default function BrandCarousel(){
  const logos = useMemo(() => (brandsAll.length ? brandsAll : ['WEG','NSK','HCH','JL']), []);
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let raf=0, x=0;
    const speed = 0.4;
    const tick = ()=>{
      const el = ref.current as unknown as HTMLDivElement | null;
      if(el && !paused){
        x = (x - speed) % (el.scrollWidth/2 || 1);
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const vis = ()=>{ /* pausa em background */ };
    document.addEventListener('visibilitychange', vis);
    return ()=>{ cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', vis); };
  },[paused]);

  const items = [...logos, ...logos];

  return (
    <div className="overflow-hidden py-6" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div ref={ref} className="flex items-center gap-10 will-change-transform">
        {items.map((name,i)=> (
          <div key={i} className="h-10 w-auto brand-logo">
            <ImageSafe srcs={cand(name)} alt={name} className="h-10 w-auto object-contain" type="brand" />
          </div>
        ))}
      </div>
    </div>
  );
}
