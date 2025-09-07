'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const BRAND_LOGOS = {
  'WEG': '/marcas/weg.webp',
  'NSK': '/marcas/nsk-logo.webp',
  'HCH': '/marcas/hch-logo.webp',
  'JL CAPACITORES': '/marcas/jl-capacitores.webp',
  'LANC COMERCIAL': '/marcas/lanc-comercial.webp',
  'IGUI': '/marcas/igui.webp',
  'JACUZZI': '/marcas/jacuzzi.webp',
  'TRAMAR': '/marcas/tramar.webp',
  'COFIBAM': '/marcas/cofibam.webp',
  'CIFA Fios e Linhas': '/marcas/cifa.webp',
  'COBIX': '/marcas/cobix.webp',
  'DANCOR': '/marcas/dancor.webp',
  // IMPORTANTE: POLUS NÃO entra no carrossel de "Marcas que Trabalhamos"
};
function logoFor(name) {
  const key = String(name || '').trim();
  return BRAND_LOGOS[key] || '/polus-logo.svg';
}

export default function BrandCarousel() {
  const base = useMemo(() => Object.keys(BRAND_LOGOS), []);
  const items = useMemo(() => [...base, ...base], [base]); // A + B duplicado
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let last = performance.now();
    const speed = 0.05; // px/ms
    const step = (t) => {
      const dt = t - last; last = t;
      if (!pausedRef.current && trackRef.current) {
        const track = trackRef.current;
        const total = track.scrollWidth / 2;
        offsetRef.current = (offsetRef.current + dt * speed) % total;
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  return (
    <div className="w-full py-7 md:py-9">
      <h2 className="text-center text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Marcas que Trabalhamos
      </h2>

      <div
        className="mx-auto max-w-7xl rounded-2xl shadow-lg ring-1 ring-slate-200/60 dark:ring-white/10 backdrop-blur-xl bg-white/60 dark:bg-black/40 px-3 md:px-4 py-3 md:py-4"
      >
        {!isMobile ? (
          <div
            className="relative select-none"
            style={{ overflowX: 'hidden', overflowY: 'visible' }}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            <div
              ref={trackRef}
              className="flex items-center will-change-transform"
              style={{ gap: 'var(--gap, 48px)', height: 'var(--h, 32px)' }}
            >
              {items.map((b, i) => (
                <div key={`${b}-${i}`} className="brand-item shrink-0" data-brand={b} style={{ height: 'var(--h, 32px)' }}>
                  <img
                    src={logoFor(b)}
                    alt={b}
                    className="brand-logo focusable"
                    draggable={false}
                    onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="flex items-center overflow-x-auto snap-x snap-mandatory gap-8 px-1 py-1"
            style={{ height: '32px', WebkitOverflowScrolling: 'touch' }}
          >
            {base.map((b, i) => (
              <div key={`${b}-${i}`} className="brand-item shrink-0 snap-start" data-brand={b} style={{ height: '32px' }}>
                <img src={logoFor(b)} alt={b} className="brand-logo focusable" draggable={false} onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        /* Base de tamanho/gap responsiva */
        @media (min-width: 768px) { :root { --h: 36px; --gap: 52px; } }
        @media (min-width: 1024px){ :root { --h: 40px; --gap: 60px; } }

        .brand-logo {
          height: 100%; width: auto; object-fit: contain;
          filter: contrast(1.05) saturate(1.02) brightness(1);
          opacity: 0.96;
          transform: scale(var(--s, 1));
          transition: transform .35s ease, opacity .35s ease, filter .35s ease;
        }
        .brand-logo:hover {
          transform: scale(calc(var(--s, 1) * 1.06));
          opacity: 1; filter: contrast(1.08) saturate(1.05) brightness(1.02);
        }

        /* Aumentos solicitados */
        .brand-item[data-brand="JACUZZI"] .brand-logo { --s: 1.38; }          /* +20% adicional sobre o anterior (~1.15*1.20) */
        .brand-item[data-brand="COFIBAM"] .brand-logo { --s: 1.15; }          /* mantido "um pouco maior" */
        .brand-item[data-brand="CIFA Fios e Linhas"] .brand-logo { --s: 1.69; }/* +30% adicional sobre 1.30 => ~1.69 */
        /* DANCOR entra no tamanho padrão inicialmente; ajuste aqui se quiser realçar: */
        /* .brand-item[data-brand="DANCOR"] .brand-logo { --s: 1.10; } */

        .focusable { outline: none; }
        .focusable:focus { box-shadow: 0 0 0 3px rgba(138,216,255,.45); border-radius: 10px; }
      `}</style>
    </div>
  );
}
