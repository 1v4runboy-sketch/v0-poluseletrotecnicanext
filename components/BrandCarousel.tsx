'use client';
import { useEffect, useRef, useState } from 'react';

// Marcas exatamente como na sua pasta /public/marcas
const BRANDS = [
  { label: 'Cifa',            src: '/marcas/cifa.webp' },
  { label: 'HCH',             src: '/marcas/hch-logo.webp' },
  { label: 'IGUI',            src: '/marcas/igui.webp' },
  { label: 'Jacuzzi',         src: '/marcas/jacuzzi.webp' },
  { label: 'JL Capacitores',  src: '/marcas/jl-capacitores.webp' },
  { label: 'Lanc Comercial',  src: '/marcas/lanc-comercial.webp' },
  { label: 'NSK',             src: '/marcas/nsk-logo.webp' },
  { label: 'Solda Cobix',     src: '/marcas/solda-cobix.webp' },
  { label: 'WEG',             src: '/marcas/weg.webp' },
  { label: 'Tramar',          src: '/marcas/tramar.webp' },
  { label: 'Cofibam',         src: '/marcas/cofibam.webp' },
];

export default function BrandCarousel(){
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return; // fallback sem movimento
    let raf = 0, x = 0;
    const speed = 0.45; // px/frame (60fps ~ 27px/s)
    const tick = ()=>{
      const el = ref.current;
      if(el && !paused){
        x = (x - speed) % Math.max(1, el.scrollWidth/2);
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  },[paused]);

  const items = [...BRANDS, ...BRANDS];

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
        <div ref={ref} className="flex items-center gap-16 sm:gap-20 md:gap-24 will-change-transform">
          {items.map((b,i)=>(
            <img
              key={`${b.label}-${i}`}
              src={b.src}
              alt={b.label}
              className="h-16 sm:h-20 md:h-24 w-auto object-contain brand-logo"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
