'use client';
import { useEffect, useRef } from 'react';

/**
 * Carrossel de marcas com rAF (sem reset) + CSS escopado (styled-jsx)
 * Tamanhos são controlados aqui dentro (não dependem do globals.css).
 * - max-height PEQUENO por breakpoint
 * - max-width para impedir estouro em logos muito compridas
 * - pause no hover + zoom leve
 */

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

  // mede a largura de UMA sequência para loop perfeito
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

  // animação rAF contínua (sem reset ao pausar)
  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let raf=0, last=performance.now();
    const loop=(now:number)=>{
      const el = trackRef.current, cw = widthRef.current;
      const dt = (now - last)/1000; last = now;
      if(el && cw>0 && !pausedRef.current){
        xRef.current -= 0.45 * (dt*60); // ~27px/s
        if (xRef.current <= -cw) xRef.current += cw;
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
    <section className="bc-wrap">
      <h2 className="bc-title">MARCAS QUE TRABALHAMOS</h2>

      <div className="bc-viewport" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div ref={trackRef} className="bc-track">
          {/* sequência A */}
          <div className="bc-seq" style={{flex:'0 0 auto'}}>
            {items.slice(0, BRANDS.length).map((b,i)=>(
              <div key={`a-${i}`} className="bc-cell">
                <img
                  src={b.src}
                  alt={b.label}
                  className="bc-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          {/* sequência B (clone) */}
          <div className="bc-seq" style={{flex:'0 0 auto'}} aria-hidden>
            {items.slice(BRANDS.length).map((b,i)=>(
              <div key={`b-${i}`} className="bc-cell">
                <img
                  src={b.src}
                  alt=""
                  className="bc-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CSS escopado ===== */}
      <style jsx>{`
        .bc-wrap{ padding: 2rem 0; }
        .bc-title{
          text-align:center;
          letter-spacing:.3em;
          font-size: .8rem;
          color: rgba(71,85,105,.9);
          margin-bottom: 1.5rem;
        }
        .bc-viewport{ overflow:hidden; }
        .bc-track{ display:flex; will-change: transform; }
        .bc-seq{ display:flex; align-items:center; gap: var(--gap); padding: 0 var(--gap); }
        .bc-cell{ flex: 0 0 auto; display:flex; align-items:center; justify-content:center; line-height:0; }

        /* Tamanhos 100% controlados por variáveis */
        :global(html) { --h: 24px; --w: 110px; --gap: 1.4rem; }     /* mobile */
        @media (min-width: 640px){ :global(html){ --h: 28px; --w: 125px; --gap: 1.8rem; } }
        @media (min-width: 768px){ :global(html){ --h: 32px; --w: 140px; --gap: 2.2rem; } }
        @media (min-width: 1024px){ :global(html){ --h: 36px; --w: 150px; --gap: 2.6rem; } }

        .bc-logo{
          display:block;
          height: var(--h);
          width: auto;
          max-width: var(--w);
          object-fit: contain;
          filter: drop-shadow(0 3px 10px rgba(10,108,178,.16));
          opacity: .98;
          transition: transform .16s ease, filter .16s ease, opacity .16s ease;
          will-change: transform;
        }
        .bc-logo:hover{
          transform: translateY(-1px) scale(1.04);
          filter: drop-shadow(0 5px 16px rgba(10,108,178,.24));
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
