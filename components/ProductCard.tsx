'use client';

import Link from 'next/link';

// normaliza: string | {src,alt?} -> string src
function toSrc(img) {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.src) return String(img.src);
  return '';
}

export default function ProductCard({ product }) {
  const coverSrc =
    toSrc(product?.images?.[0]) ||
    `/produtos/${product?.slug || 'placeholder'}.webp`;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5">
      {/* Imagem */}
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-white dark:bg-slate-900">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={product.title || ''}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
              sem imagem
            </div>
          )}
        </div>
      </Link>

      {/* Conteúdo */}
      <div className="p-3">
        {/* Marca + modelo */}
        <div className="flex items-center gap-2 mb-1">
          {product.brandLogo ? (
            <img
              src={product.brandLogo}
              alt={product.brand || ''}
              className="h-[20px] w-auto object-contain opacity-90"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <span className="text-[11px] font-bold tracking-wide uppercase text-slate-600 dark:text-slate-300">
            {product.brand}
            {product.model ? ` • ${product.model}` : ''}
          </span>
        </div>

        {/* Título */}
        <Link href={`/produto/${product.slug}`} className="block">
          <h3 className="text-[13px] font-semibold leading-snug text-slate-900 dark:text-slate-100 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Ações */}
        <div className="mt-3 flex items-center gap-2">
          <Link
            href={`/cotacao?produto=${encodeURIComponent(product.title || '')}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:translate-y-[1px] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4a2 2 0 0 0-2 2v2l10 6 10-6V6a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2" />
              <path d="M22 10 12 16 2 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-xs">Solicitar cotação</span>
          </Link>

          <Link
            href={`/produto/${product.slug}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 active:translate-y-[1px] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h2l.4 2M7 13h10l3-8H5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="21" r="1" fill="currentColor" />
              <circle cx="17" cy="21" r="1" fill="currentColor" />
            </svg>
            <span className="text-xs">Ver detalhes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
