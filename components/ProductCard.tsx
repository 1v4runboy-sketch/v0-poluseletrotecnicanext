'use client';
import { useRouter } from 'next/navigation';
import BrandBadge from './BrandBadge';
import { SITE } from '@/lib/site';

function formatTitleCommercial(title){
  if(!title) return '';
  const KEEP_UP=new Set(['WEG','HCH','NSK','JL','IGUI','CIFA','LANC','AC','DC','DDU','ZZ']);
  const LOWER=new Set(['de','da','do','das','dos','e','para','em','com']);
  return title.split(/\s+/).map((w,i)=>{
    const up=w.toUpperCase();
    if(KEEP_UP.has(up)) return up;
    if(LOWER.has(w.toLowerCase()) && i!==0) return w.toLowerCase();
    if(/^\d+[\/\-]\d+$/.test(w) || /mm$/i.test(w) || /^\d{3,}$/.test(w)) return w;
    return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
  }).join(' ');
}

export default function ProductCard({ product }){
  const router = useRouter();
  const img = (product.images?.[0]?.src) || '/produtos/placeholder.webp';

  const go = ()=> router.push(`/produtos/${product.slug}`);
  const onKey = (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); go(); } };

  return (
    <div
      role="link" tabIndex={0}
      onClick={go} onKeyDown={onKey}
      className="card-modern relative block p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-weg/60 cursor-pointer"
      aria-label={product.title}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white/60 dark:bg-black/20">
        <img src={img} alt={product.images?.[0]?.alt || product.title} className="w-full h-full object-contain" loading="lazy" decoding="async"/>
        <div className="absolute top-2 left-2"><BrandBadge brand={product.brand} name={product.brand}/></div>
      </div>

      <h3 className="mt-2 font-medium leading-tight line-clamp-2">{formatTitleCommercial(product.title)}</h3>
      {product.shortDescription && <p className="text-xs opacity-70 line-clamp-2 mt-0.5">{product.shortDescription}</p>}

      <div className="mt-2 flex items-center gap-2 relative z-10">
        <a
          href={SITE.whatsappHref(product.title)}
          className="btn-magnetic px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          target="_blank" rel="noopener noreferrer"
          onClick={(e)=> e.stopPropagation()}
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
