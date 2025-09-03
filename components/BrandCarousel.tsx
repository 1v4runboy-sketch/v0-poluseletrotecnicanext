'use client';
import { useEffect, useRef } from 'react';

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
  const pausedRef = useRef(false);
  const widthRef  = useRef(0);
  const xRef      = useRef(0);
  const rafRef    = useRef<number| null>(null);

  useEffect(()=>{
    const measure = ()=>{
      const el = trackRef.current?.querySelector<HTMLDivElement>('.brand-seq');
      widthRef.current = el?.scrollWidth || 0;
    };
    measure();
    const ro = trackRef.current ? new ResizeObserver(measure) : null;
    if (trackRef.current && ro) ro.observe(trackRef.current);
    window.addEventListener('resize', measure, { passive:true });
    return ()=>{ window.removeEventListener('resize', measure); ro?.disconnect(); };
  },[]);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let last = performance.now();

    const loop = (now:number)=>{
      const el = trackRef.current, cw = widthRef.current;
      const dt = (now - last)/1000; last = now;
      if(el && cw>0 && !pausedRef.current){
        xRef.current -= 0.45 * (dt*60);
        if (xRef.current <= -cw) xRef.current += cw;
        el.style.transform = `translateX(${xRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return ()=> { if(rafRef.current) cancelAnimationFrame(rafRef.current); };
  },[]);

  const onEnter = ()=> (pausedRef.current = true);
  const onLeave = ()=> (pausedRef.current = false);

  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="py-8 brand-tape-sm">
      <h2 className="text-center text-xs sm:text-sm tracking-[0.3em] text-slate-600 dark:text-slate-300 mb-6">
        MARCAS QUE TRABALHAMOS
      </h2>

      <div className="brand-viewport" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div ref={trackRef} className="brand-track">
          <div className="brand-seq" style={{flex:'0 0 auto'}}>
            {items.slice(0, BRANDS.length).map((b,i)=>(
              <div key={`a-${i}`} className="brand-cell">
                <img src={b.src} alt={b.label} className="brand-logo-item" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <div className="brand-seq" style={{flex:'0 0 auto'}} aria-hidden>
            {items.slice(BRANDS.length).map((b,i)=>(
              <div key={`b-${i}`} className="brand-cell">
                <img src={b.src} alt="" className="brand-logo-item" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
