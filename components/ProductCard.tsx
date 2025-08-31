'use client';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import ProductCarousel from './ProductCarousel';
import { SITE } from '@/lib/site';
import * as BL from '@/lib/budgetList';

export default function ProductCard({ product }: { product: Product }) {
  const href = `/produtos/${product.slug}`;
  return (
    <div className="card-modern p-3">
      <Link href={href} className="block">
        <div className="aspect-square bg-white/60 dark:bg-black/20 rounded-lg overflow-hidden">
          <ProductCarousel images={product.images} />
        </div>
        <h3 className="mt-2 font-medium line-clamp-2">{product.title}</h3>
        {product.shortDescription && <p className="text-xs opacity-70 line-clamp-2">{product.shortDescription}</p>}
      </Link>
      <div className="mt-2 flex items-center gap-2">
        <a
          href={SITE.whatsappHref(product.title)}
          className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          target="_blank" rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <button
          onClick={()=> BL.add(product)}
          className="px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
