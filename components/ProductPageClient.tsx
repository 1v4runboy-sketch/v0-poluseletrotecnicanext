'use client';
import React, { useMemo } from 'react';
import type { Product } from '@/lib/products';
import PRODUCTS from '@/lib/products';
import { SITE } from '@/lib/site';
import ProductCarousel from './ProductCarousel';

export default function ProductPageClient({ product }: { product: Product }){
  const related = useMemo(
    ()=>PRODUCTS.filter(p => p.id!==product.id && (p.category===product.category || (product.brand && p.brand===product.brand))).slice(0,4),
    [product]
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="aspect-square bg-white/60 dark:bg-black/20 rounded-lg overflow-hidden">
        <ProductCarousel images={product.images} auto indicators />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        {product.shortDescription && <p className="mt-2 opacity-80">{product.shortDescription}</p>}

        {product.techSpecs && product.techSpecs.length>0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Ficha técnica</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {product.techSpecs.map(([k,v], i)=>(
                <div key={i} className="flex items-center justify-between rounded border px-3 py-1">
                  <span className="opacity-80">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <a
            href={SITE.whatsappHref(product.title)}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            target="_blank" rel="noopener noreferrer"
          >
            Consultar / Cotação
          </a>
        </div>
      </div>

      {related.length>0 && (
        <div className="lg:col-span-2 mt-4">
          <h3 className="font-semibold mb-2">Relacionados</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map(p => (
              <a key={p.slug} href={`/produtos/${p.slug}`} className="rounded border p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="aspect-square overflow-hidden rounded bg-white/60 dark:bg-black/20">
                  <img src={p.images?.[0]?.src || '/produtos/placeholder.webp'} alt={p.title} className="w-full h-full object-contain"/>
                </div>
                <div className="mt-1 text-xs line-clamp-2">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
