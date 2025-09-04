'use client';

import Link from 'next/link';

function toSrc(img:any){ if(!img) return ''; return typeof img==='string' ? img : (img.src||''); }
function brandLogoFor(brand:any){
  const b = String(brand||'').toUpperCase();
  const map:Record<string,string> = {
    'WEG':'/marcas/weg.webp','NSK':'/marcas/nsk-logo.webp','HCH':'/marcas/hch-logo.webp',
    'JL CAPACITORES':'/marcas/jl-capacitores.webp','LANC COMERCIAL':'/marcas/lanc-comercial.webp',
    'CIFA':'/marcas/cifa.webp','IGUI':'/marcas/igui.webp','JACUZZI':'/marcas/jacuzzi.webp',
    'TRAMAR':'/marcas/tramar.webp','COFIBAM':'/marcas/cofibam.webp',
  };
  return map[b];
}

export default function ProductCard({ product }:{product:any}) {
  const cover = toSrc(product?.images?.[0]) || `/produtos/${product?.slug||'placeholder'}.webp`;
  const logo  = product?.brandLogo || brandLogoFor(product?.brand);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5">
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl bg-white dark:bg-slate-900">
          <img src={cover} alt={product.title||''} className="w-full h-full object-contain" loading="lazy" decoding="async" />
          {logo && <img src={logo} alt={product.brand||''} className="absolute left-2 top-2 h-[22px] w-auto object-contain bg-white/90 dark:bg-black/60 rounded-md p-1" />}
        </div>
      </Link>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold tracking-wide uppercase text-slate-600 dark:text-slate-300">
            {String(product.brand||'').toUpperCase()}{product.model?` • ${String(product.model).toUpperCase()}`:''}
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
