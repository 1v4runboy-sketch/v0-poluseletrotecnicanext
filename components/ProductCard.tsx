'use client';

import { useRouter } from 'next/navigation';
import * as SITEUTIL from '../lib/site';

const whatsappHref = SITEUTIL?.whatsappHref || ((t) => `https://wa.me/551135992935?text=${encodeURIComponent('Olá! Gostaria de uma cotação: ' + (t || ''))}`);

export default function ProductCard({ product, titleDisplay, imgSrc, imgAlt, onOpen }) {
  const router = useRouter();
  const info = SITEUTIL.resolveBrand(product); // { name, logoSrc }

  const open = () => {
    const slug = product.slug || product.title || '';
    router.push(`/produto/${encodeURIComponent(slug)}#productTop`);
  };

  return (
    <div
      role="link" tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
      className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm transition overflow-hidden cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      <div className="relative aspect-[4/3] bg-slate-100/70 dark:bg-slate-800/60 overflow-hidden">
        {/* Selo de marca (maior) */}
        <div className="absolute left-2 top-2 z-[2] bg-white/90 dark:bg-slate-900/90 rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1 shadow">
          <img
            src={info.logoSrc || '/polus-logo.svg'}
            alt={info.name}
            className="h-6 md:h-7 w-auto object-contain"
            draggable={false}
            onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}}
          />
        </div>

        <img
          src={imgSrc || '/polus-logo.svg'}
          alt={imgAlt || titleDisplay || 'Produto'}
          className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-300 group-hover:-translate-y-1"
          loading="lazy"
          decoding="async"
          onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}}
        />
      </div>

      <div className="p-4">
        <div className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
          {titleDisplay}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={whatsappHref(titleDisplay)} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center px-3.5 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
          >
            Pedir cotação
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); open(); }}
            className="inline-flex items-center justify-center px-3.5 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      <style jsx>{`
        .group:hover { box-shadow: 0 16px 36px rgba(2,8,23,0.10); }
        :global(html.dark) .group:hover { box-shadow: 0 16px 36px rgba(0,0,0,0.32); }
      `}</style>
    </div>
  );
}
