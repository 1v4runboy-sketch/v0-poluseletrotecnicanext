'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Mapeamento de logos (com logger).
 */
const BRAND_LOGOS = {
  'WEG': '/marcas/weg.webp',
  'NSK': '/marcas/nsk-logo.webp',
  'HCH': '/marcas/hch-logo.webp',
  'JL CAPACITORES': '/marcas/jl-capacitores.webp',
  'LANC COMERCIAL': '/marcas/lanc-comercial.webp',
  'CIFA': '/marcas/cifa.webp',
  'IGUI': '/marcas/igui.webp',
  'JACUZZI': '/marcas/jacuzzi.webp',
  'TRAMAR': '/marcas/tramar.webp',
  'COFIBAM': '/marcas/cofibam.webp',
};

export default function BrandCarousel() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);

  // Definir a sequência base (A) e duplicada (A + B)
  const brands = useMemo(() => Object.keys(BRAND_LOGOS), []);
  const items = useMemo(() => [...brands, ...brands], [brands]);

  useEffect(() => {
    let last = performance.now();
    const speed = 0.05; // px/ms

    const step = (t) => {
      const dt = t - last;
      last = t;

      if (!pausedRef.current && trackRef.current) {
        const track = trackRef.current;
        const totalWidth = track.scrollWidth / 2; // metade é A
        offsetRef.current = (offsetRef.current + dt * speed) % totalWidth;
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full py-6 md:py-8">
      <h2 className="text-center text-base md:text-lg font-semibold text-slate-800 mb-3">
        Marcas que Trabalhamos
      </h2>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="brandstrip" style={{ ['--h']: '30px', ['--gap']: '40px' }}>
          <div
            ref={trackRef}
            className="flex items-center"
            style={{ gap: 'var(--gap)', willChange: 'transform' }}
          >
            {items.map((b, i) => (
              <div key={`${b}-${i}`} className="shrink-0" style={{ height: 'var(--h)' }}>
                <img
                  src={BRAND_LOGOS[b] || '/polus-logo.svg'}
                  alt={b}
                  className="h-full w-auto object-contain opacity-90 hover:opacity-100 transition"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .brandstrip { width: 100%; }
        @media (min-width: 768px) {
          .brandstrip { --h: 36px; --gap: 48px; }
        }
      `}</style>
    </div>
  );
}
