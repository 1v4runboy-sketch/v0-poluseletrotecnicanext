'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import ImageSafe from './ImageSafe';
import { brands as brandsAll } from '../lib/products';

const EXCLUDE = new Set(['polus','polus eletrotecnica','polus eletrotécnica']);

function norm(s:string){
  return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

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
  const logos = useMemo(() => {
    const uniq: string[] = [];
    for(const b of brandsAll){
      const n = norm(b);
      if(!n || EXCLUDE.has(n)) continue;
      if(!uniq.some(x=> norm(x)===n)) uniq.push(b);
    }
    // Extras para garantir visibilidade
    const extras = ['Cifa','JL Capacitores','Jacuzzi','IGUI','Lanc Comercial','Solda Cobix','WEG','NSK','HCH'];
    for(const e of extras){ if(!uniq.some(x=> norm(x)===norm(e))) uniq.push(e); }
    return uniq;
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let raf=0, x=0;
    const speed = 0.4;
    const tick = ()=>{
      const el = ref.current;
      if(el && !paused){
        x = (x - speed) % (Math.max(1, el.scrollWidth/2));
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const stop = ()=>{};
    document.addEventListener('visibilitychange', stop);
    return ()=>{ cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', stop); };
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
