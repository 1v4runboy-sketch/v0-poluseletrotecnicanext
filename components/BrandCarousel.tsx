'use client';
import { useEffect, useRef, useState } from 'react';
import ImageSafe from './ImageSafe';

// Arquivos reais no seu /public/marcas (foto que você mandou)
const HOME_BRANDS = [
  { label: 'Cifa',            base: 'cifa' },
  { label: 'HCH',             base: 'hch-logo' },
  { label: 'IGUI',            base: 'igui' },
  { label: 'Jacuzzi',         base: 'jacuzzi' },
  { label: 'JL Capacitores',  base: 'jl-capacitores' },
  { label: 'Lanc Comercial',  base: 'lanc-comercial' },
  { label: 'NSK',             base: 'nsk-logo' },
  { label: 'Solda Cobix',     base: 'solda-cobix' },
  { label: 'WEG',             base: 'weg' },
];

function cand(base){
  return [
    `/marcas/${base}.webp`,
    `/marcas/${base}.png`,
    `/marcas/${base}.jpg`,
  ];
}

export default function BrandCarousel(){
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

  const items = [...HOME_BRANDS, ...HOME_BRANDS];

  return (
    <section className="py-8">
      <h2 className="text-center text-sm sm:text-base tracking-[0.25em] text-slate-600 dark:text-slate-300 mb-6">
        MARCAS QUE TRABALHAMOS
      </h2>

      <div className="overflow-hidden" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
        <div ref={ref} className="flex items-center gap-16 sm:gap-20 md:gap-24 will-change-transform">
          {items.map((it,i)=> (
            <div key={i} className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto brand-logo" title={it.label}>
              <ImageSafe srcs={cand(it.base)} alt={it.label} className="h-full w-auto object-contain" type="brand" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
