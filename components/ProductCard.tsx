'use client';

import { useRouter } from 'next/navigation';
import * as SITEUTIL from '@/lib/site';

// Mapeamento de logos de marcas
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

function brandLogoFor(brand) {
  const key = String(brand || '').trim().toUpperCase();
  return BRAND_LOGOS[key] || '/polus-logo.svg';
}

export default function ProductCard({
  product,
  titleDisplay,
  imgSrc,
  imgAlt,
  brand,
  onOpen,
}) {
  const router = useRouter();
  const open = () => onOpen?.();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
      className="group relative rounded-xl border border-slate-200 bg-white hover:shadow-md transition overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/3] bg-slate-100">
        {/* Logo da marca no canto */}
        <div className="absolute left-2 top-2 z-[2] bg-white/90 rounded-md border border-slate-200 px-2 py-1">
          <img
            src={brandLogoFor(brand)}
            alt={brand}
            className="h-5 w-auto object-contain"
            draggable={false}
          />
        </div>

        <img
          src={imgSrc || '/polus-logo.svg'}
          alt={imgAlt || titleDisplay || 'Produto'}
          className="absolute inset-0 w-full h-full object-contain p-3"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-3">
        <div className="text-sm md:text-[15px] font-medium text-slate-800 line-clamp-2">
          {titleDisplay}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <a
            href={SITEUTIL?.whatsappHref(titleDisplay)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Pedir cotação
          </a>

          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/produto/${encodeURIComponent(product.slug)}`); }}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white hover:bg-slate-50"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
