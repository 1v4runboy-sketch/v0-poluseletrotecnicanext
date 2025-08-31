'use client';
import React from 'react';
import type { Product } from '@/lib/products';
import ProductCarousel from './ProductCarousel';
import BrandBadge from './BrandBadge';
import { SITE } from '@/lib/site';
import { add } from '@/lib/budgetList';
export default function ProductCard({ p }: { p: Product }){
  return (
    <div className="relative rounded-xl border border-black/10 dark:border-white/10 p-3 bg-white/70 dark:bg-black/40 backdrop-blur shadow-sm hover:shadow-md transition [transform:translateZ(0)]">
      <BrandBadge brand={p.brand} />
      <ProductCarousel images={p.images.slice(0,3)} />
      <div className="mt-3">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">{p.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">{p.shortDescription || ''}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <a aria-label={`WhatsApp ${p.title}`} href={SITE.whatsappHref(p.title)} target="_blank" rel="noreferrer" className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Consultar / Cotação</a>
        <button aria-label="Adicionar ao orçamento" onClick={()=>add({ id: p.id, title: p.title, qty: 1, brand: p.brand })} className="px-3 py-2 text-sm rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90">Adicionar</button>
      </div>
    </div>
  );
}
