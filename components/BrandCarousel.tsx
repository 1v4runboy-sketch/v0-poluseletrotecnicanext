'use client';
import { useEffect, useRef, useState } from 'react';

// Marcas conforme sua pasta /public/marcas
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
  const trackRef = useRef<HTMLDivElement|null>(null);
  const [paused, setPaused] = useState(false);
  const [contentW, setContentW] = useState(0);

  // mede largura da primeira sequência para loop perfeito
  useEffect(()=>{
    const seq = trackRef.current?.querySelector<HTMLDivElement>('.brand-seq');
    function measure(){
      const el = trackRef.current?.querySelector<HTMLDivElement>('.brand-seq');
      if (!el) return;
      setContentW(el.scrollWidth || 0);
    }
    measure();
    const ro = seq ? new ResizeObserver(measure) : null;
    if (seq && ro) ro.observe(seq);
    window.addEventListener('resize', measure);
    return ()=>{ window.removeEventListener('resize', measure); ro?.disconnect(); };
  },[]);

  // animação rAF robusta (sem acessar .style em null)
  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let raf = 0, x = 0, prev = performance.now();
    function tick(t:number){
      const el = trackRef.current;
      if (!el) { raf = requestAnimationFrame(tick); prev=t; return; }
      const dt = t - prev; prev = t;
      if(!paused && contentW > 0){
        x -= 0.58 * (dt/16);            // ~35px/s (suave)
        if (x <= -contentW) x += contentW;
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  },[paused, contentW]);

  const items = [...BRANDS, ...BRANDS]; // duplicado

  return (
    <section className="py-8">
      <h2 className="text-center text-xs sm:text-sm tracking-[0.3em] text-slate-500 dark:text-slate-300 mb-6">
        MARCAS QUE TRABALHAMOS
      </h2>

      <div
        className="overflow-hidden"
        onMouseEnter={()=>setPaused(true)}
        onMouseLeave={()=>setPaused(false)}
      >
        <div ref={trackRef} className="flex will-change-transform">
          {/* seq A */}
          <div className="brand-seq flex items-center gap-12 px-6" style={{flex:'0 0 auto'}}>
            {BRANDS.map((b,i)=>(
              <div key={`a-${i}`} className="flex items-center justify-center" style={{flex:'0 0 auto'}}>
                <img
                  src={b.src}
                  alt={b.label}
                  className="h-[48px] sm:h-[56px] md:h-[60px] w-auto object-contain"
                  loading="lazy" decoding="async"
                  style={{filter:'drop-shadow(0 4px 14px rgba(10,108,178,.22))', opacity:.98}}
                />
              </div>
            ))}
          </div>
          {/* seq B (clone) */}
          <div className="brand-seq flex items-center gap-12 px-6" style={{flex:'0 0 auto'}} aria-hidden>
            {BRANDS.map((b,i)=>(
              <div key={`b-${i}`} className="flex items-center justify-center" style={{flex:'0 0 auto'}}>
                <img
                  src={b.src}
                  alt=""
                  className="h-[48px] sm:h-[56px] md:h-[60px] w-auto object-contain"
                  loading="lazy" decoding="async"
                  style={{filter:'drop-shadow(0 4px 14px rgba(10,108,178,.22))', opacity:.92}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
