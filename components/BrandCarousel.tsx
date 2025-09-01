'use client';
import React, { useRef } from 'react';
import { BRANDS } from '@/lib/brands';
import { ChevronLeft, ChevronRight } from './icons';
export default function BrandCarousel(){
  const ref = useRef<HTMLDivElement>(null);
  function scrollBy(dx:number){ ref.current?.scrollBy({ left: dx, behavior: 'smooth' }); }
  return (
    <div className="relative">
      <div ref={ref} className="flex gap-8 overflow-x-auto px-10 py-4 scroll-smooth snap-x">
        {BRANDS.map(b => (
          <div key={b.slug} className="min-w-[120px] snap-start">
            <img src={b.logo} alt={b.name} className="h-12 w-auto mx-auto brand-logo transition-transform hover:rotate-2 hover:scale-105" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />
      <button aria-label="Marcas anteriores" onClick={()=>scrollBy(-240)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"><ChevronLeft /></button>
      <button aria-label="Mais marcas" onClick={()=>scrollBy(240)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"><ChevronRight /></button>
    </div>
  );
}
