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

  // medir largura da seq uma única vez + onresize
  useEffect(()=>{
    const measure = ()=>{
      const el = trackRef.current?.querySelector<HTMLDivElement>('.brand-seq');
      widthRef.current = el?.scrollWidth || 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return ()=>{ try{ro.disconnect()}catch{}; window.removeEventListener('resize', measure); };
  },[]);

  // animação rAF contínua (não reinicia xRef)
  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let raf = 0, last = performance.now();
    const loop = (now:number)=>{
      const el = trackRef.current;
      const contentW = widthRef.current;
      const dt = (now - last) / 1000; last = now;
      if (el && contentW > 0 && !pausedRef.current){
        xRef.current -= 0.5 * (dt*60); // ~30 px/s
        if (xRef.current <= -contentW) xRef.current += contentW;
        el.style.transform = `translateX(${xRef.current}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=> cancelAnimationFrame(raf);
  },[]);

  const onEnter = ()=> (pausedRef.current = true);
  const onLeave = ()=> (pausedRef.current = false);

  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="py-8">
      <h2 className="text-center text-xs sm:text-sm tracking-[0.3em] text-slate-500 dark:text-slate-300 mb-6">
        MARCAS QUE TRABALHAMOS
      </h2>
      <div className="overflow-hidden" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div ref={trackRef} className="flex will-change-transform">
          <div className="brand-seq flex items-center gap-12 px-6" style={{flex:'0 0 auto'}}>
            {BRANDS.map((b,i)=>(
              <div key={`a-${i}`} className="flex items-center justify-center" style={{flex:'0 0 auto'}}>
                <img
                  src={b.src}
                  alt={b.label}
                  className="h-[44px] sm:h-[50px] md:h-[56px] w-auto object-contain transition-transform duration-150 ease-out hover:scale-[1.06]"
                  loading="lazy" decoding="async"
                  style={{filter:'drop-shadow(0 4px 12px rgba(10,108,178,.20))'}}
                />
              </div>
            ))}
          </div>
          <div className="brand-seq flex items-center gap-12 px-6" style={{flex:'0 0 auto'}} aria-hidden>
            {BRANDS.map((b,i)=>(
              <div key={`b-${i}`} className="flex items-center justify-center" style={{flex:'0 0 auto'}}>
                <img
                  src={b.src}
                  alt=""
                  className="h-[44px] sm:h-[50px] md:h-[56px] w-auto object-contain transition-transform duration-150 ease-out hover:scale-[1.06]"
                  loading="lazy" decoding="async"
                  style={{filter:'drop-shadow(0 4px 12px rgba(10,108,178,.18))'}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
