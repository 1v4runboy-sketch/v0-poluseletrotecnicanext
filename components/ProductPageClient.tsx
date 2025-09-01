'use client';
import React, { useMemo } from 'react';
import type { Product } from '@/lib/products';
import PRODUCTS from '@/lib/products';
import { SITE } from '@/lib/site';
import ProductCarousel from './ProductCarousel';
import BrandBadge from './BrandBadge';
import { add } from '@/lib/budgetList';

function formatTitleCommercial(title) {
  if (!title) return '';
  const KEEP_UP = new Set(['WEG','HCH','NSK','JL','IGUI','iGUi','CIFA','LANC','AC', 'DC', 'DDU', 'ZZ']);
  const LOWER = new Set(['de','da','do','das','dos','e','para','em','com']);
  return title.split(/\s+/).map((w,i)=>{
    const up = w.toUpperCase();
    if (KEEP_UP.has(up)) return up;
    if (LOWER.has(w.toLowerCase()) && i!==0) return w.toLowerCase();
    // preserva medidas/códigos (1/2, 0,19mm, 6203)
    if (/^\d+[\/\-]\d+$/.test(w) || /mm$/i.test(w) || /^\d{3,}$/.test(w)) return w;
    return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
  }).join(' ');
}

export default function ProductPageClient({ product }: { product: Product }){
  const related = useMemo(()=>PRODUCTS.filter(p => p.id!==product.id && (p.category===product.category || (product.brand && p.brand===product.brand))).slice(0,4), [product]);
  return (
    <div className="space-y-6">
      <div className="relative">
        <BrandBadge brand={product.brand} />
        <ProductCarousel images={product.images} />
      </div>
      <h1 className="text-2xl font-semibold">{formatTitleCommercial(product.title)}</h1>
      {product.shortDescription && <p className="text-zinc-700 dark:text-zinc-300">{product.shortDescription}</p>}
      {product.techSpecs && product.techSpecs.length>0 && (
        <div>
          <h2 className="font-medium mb-2">Ficha técnica</h2>
          <div className="overflow-x-auto">
            <table className="min-w-[360px] w-full border border-black/10 dark:border-white/10 rounded-lg">
              <tbody>
                {product.techSpecs.map(([k,v], i)=>(
                  <tr key={i} className="odd:bg-black/5 dark:odd:bg-white/5">
                    <td className="px-3 py-2 font-medium">{k}</td>
                    <td className="px-3 py-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <a href={SITE.whatsappHref(product.title)} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-emerald-600 text-white">Consultar / Cotação</a>
        <button onClick={()=>add({ id: product.id, title: product.title, qty: 1, brand: product.brand })} className="px-4 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black">Adicionar</button>
      </div>
      {related.length>0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map(p => (
              <a key={p.id} href={`/produtos/${p.slug}`} className="block rounded-lg border border-black/10 dark:border-white/10 p-2 hover:bg-black/5 dark:hover:bg:white/5">
                <img src={p.images[0]?.src || '/produtos/placeholder.webp'} alt={p.title} className="w-full h-32 object-contain" />
                <div className="mt-2 text-sm">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
