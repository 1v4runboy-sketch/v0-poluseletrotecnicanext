'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import ImageSafe from './ImageSafe';
import { brands as brandsAll } from '../lib/products';

const EXCLUDE = new Set(['polus','polus eletrotecnica','polus eletrotécnica']);
const norm = (s)=> String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();

function cand(brand) {
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
    const uniq = [];
    for(const b of brandsAll){
      const n = norm(b);
      if(!n || EXCLUDE.has(n)) continue;
      if(!uniq.some(x=> norm(x)===n)) uniq.push(b);
    }
    const extras = ['Cifa','JL Capacitores','Jacuzzi','IGUI','Lanc Comercial','Solda Cobix','WEG','NSK','HCH'];
    for(const e of extras){ if(!uniq.some(x=> norm(x)===norm(e))) uniq.push(e); }
    return uniq;
  }, []);

  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let raf=0, x=0;
    const speed = 0.45;
    const tick = ()=>{
      const el = ref.current;
      if(el && !paused){
        x = (x - speed) % (Math.max(1, el.scrollWidth/2));
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  },[paused]);

  const items = [...logos, ...logos];

  return (
    <section className="py-8">
      <h2 className="text-center text-sm sm:text-base tracking-[0.25em] text-slate-600 dark:text-slate-300 mb-6">
        MARCAS QUE TRABALHAMOS
      </h2>

      <div
        className="overflow-hidden"
        onMouseEnter={()=>setPaused(true)}
        onMouseLeave={()=>setPaused(false)}
      >
        <div
          ref={ref}
          className="flex items-center gap-16 sm:gap-20 md:gap-24 will-change-transform"
        >
          {items.map((name,i)=> (
            <div
              key={i}
              className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto brand-logo"
              title={String(name)}
            >
              <ImageSafe
                srcs={cand(name)}
                alt={name}
                className="h-full w-auto object-contain"
                type="brand"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
