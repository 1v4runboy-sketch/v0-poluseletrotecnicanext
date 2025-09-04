'use client';
import { useEffect, useRef } from 'react';

const BRANDS = [
  { label: 'WEG',             src: '/marcas/weg.webp' },
  { label: 'NSK',             src: '/marcas/nsk-logo.webp' },
  { label: 'HCH',             src: '/marcas/hch-logo.webp' },
  { label: 'JL Capacitores',  src: '/marcas/jl-capacitores.webp' },
  { label: 'Lanc Comercial',  src: '/marcas/lanc-comercial.webp' },
  { label: 'Cifa',            src: '/marcas/cifa.webp' },
  { label: 'IGUI',            src: '/marcas/igui.webp' },
  { label: 'Jacuzzi',         src: '/marcas/jacuzzi.webp' },
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
      const el = trackRef.current?.querySelector<HTMLDivElement>('.bc-seq');
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
        xRef.current -= 0.42 * (dt*60);
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Marcas que Trabalhamos
      </h2>

      <div className="overflow-hidden" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div ref={trackRef} className="flex will-change-transform">
          <div className="bc-seq flex items-center gap-[var(--gap)] px-6" style={{flex:'0 0 auto'}}>
            {items.map((b,i)=>(
              <div key={`a-${i}`} className="flex items-center justify-center" style={{flex:'0 0 auto'}}>
                <img src={b.src} alt={b.label} className="bc-logo" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <div className="bc-seq flex items-center gap-[var(--gap)] px-6" style={{flex:'0 0 auto'}} aria-hidden>
            {items.map((b,i)=>(
              <div key={`b-${i}`} className="flex items-center justify-center" style={{flex:'0 0 auto'}}>
                <img src={b.src} alt="" className="bc-logo" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(html){ --h: 26px; --w: 120px; --gap: 1.4rem; }
        @media (min-width: 640px){ :global(html){ --h: 28px; --w: 130px; --gap: 1.8rem; } }
        @media (min-width: 768px){ :global(html){ --h: 30px; --w: 140px; --gap: 2.0rem; } }
        @media (min-width: 1024px){ :global(html){ --h: 32px; --w: 150px; --gap: 2.2rem; } }

        .bc-logo{
          height: var(--h); width:auto; max-width: var(--w);
          object-fit: contain;
          filter: drop-shadow(0 3px 10px rgba(10,108,178,.16));
          opacity:.98;
          transition: transform .16s ease, filter .16s ease, opacity .16s ease;
          will-change: transform;
        }
        .bc-logo:hover{
          transform: translateY(-1px) scale(1.035);
          filter: drop-shadow(0 5px 16px rgba(10,108,178,.24));
          opacity:1;
        }
      `}</style>
    </section>
  );
}
