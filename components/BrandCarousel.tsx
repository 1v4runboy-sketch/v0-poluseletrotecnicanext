'use client';
import { BRANDS } from '@/lib/brands';
import React, { useRef } from 'react';
import { IconChevronLeft, IconChevronRight } from './icons';

export default function BrandCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => { const el = ref.current; if (!el) return; el.scrollBy({ left: dx, behavior: 'smooth' }); };
  return (
    <section className="mt-6 relative">
      <h3 className="text-sm font-semibold mb-2 opacity-80">Marcas em destaque</h3>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent" />
      <button className="carousel-arrow left-0" aria-label="Anterior" onClick={()=>scrollBy(-300)}><IconChevronLeft/></button>
      <button className="carousel-arrow right-0" aria-label="Próximo" onClick={()=>scrollBy(300)}><IconChevronRight/></button>
      <div ref={ref} className="flex gap-6 overflow-x-auto py-3 px-1 snap-x snap-mandatory">
        {BRANDS.map(b => (
          <div key={b.slug} className="snap-start flex-shrink-0 flex items-center justify-center h-14 px-3 rounded-md bg-white/80 dark:bg-black/40 ring-1 ring-black/10 dark:ring-white/10">
            <img src={b.logo} alt={b.name} className="object-contain brand-logo h-8" />
          </div>
        ))}
      </div>
    </section>
  );
}
