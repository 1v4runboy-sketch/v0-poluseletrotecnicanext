'use client';

import Link from 'next/link';

function toSrc(img:any) {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.src) return String(img.src);
  return '';
}

export default function ProductCard({ product }: { product: any }) {
  const coverSrc =
    toSrc(product?.images?.[0]) ||
    `/produtos/${product?.slug || 'placeholder'}.webp`;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5">
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-white dark:bg-slate-900">
          {coverSrc ? (
            <img src={coverSrc} alt={product.title || ''} className="w-full h-full object-contain" loading="lazy" decoding="async" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">sem imagem</div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {product.brandLogo ? (
            <img src={product.brandLogo} alt={product.brand || ''} className="h-[20px] w-auto object-contain opacity-90" loading="lazy" decoding="async" />
          ) : null}
          <span className="text-[11px] font-bold tracking-wide uppercase text-slate-600 dark:text-slate-300">
            {product.brand}{product.model ? ` • ${product.model}` : ''}
          </span>
        </div>

        <Link href={`/produto/${product.slug}`} className="block">
          <h3 className="text-[13px] font-semibold leading-snug text-slate-900 dark:text-slate-100 line-clamp-2">
            {product.title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
