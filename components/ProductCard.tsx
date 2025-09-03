'use client';
import { useRouter } from 'next/navigation';
import BrandBadge from './BrandBadge';
import ImageSafe from './ImageSafe';
import { titleCaseSmart } from '../lib/site';

const CartIcon = (props)=>(
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4M6.16 6l.84 2h10a1 1 0 0 1 .96 1.27l-1.5 5A2 2 0 0 1 14.55 16H9.45a2 2 0 0 1-1.91-1.36L5 8H3a1 1 0 0 1 0-2z"/></svg>
);
const WhatsIcon = (props)=>(
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2a10 10 0 0 0-8.94 14.61L2 22l5.55-1.46A10 10 0 1 0 12 2m0 2a8 8 0 0 1 6.32 12.91l-.33.4l.63 2.34l-2.41-.65l-.4.24A8 8 0 1 1 12 4m-3.6 4.1l.16-.02c.32 0 .74.05 1.19.81c.12.2.29.5.33.54c.05.06.07.13.03.21c-.35.72-.73 1.1-.94 1.32c-.14.14-.3.31-.13.58c.17.26.76 1.26 1.64 2.04c1.12.99 2.07 1.32 2.36 1.46c.29.14.46.12.63-.07c.17-.2.72-.84.91-1.13c.19-.29.38-.24.63-.14c.26.1 1.62.76 1.9.9c.28.14.47.21.53.33c.06.14.06.8-.19 1.57c-.26.77-1.51 1.48-2.11 1.58c-.53.08-1.2.16-2.03-.13c-.83-.29-1.81-.63-3.13-1.54c-1.32-.91-2.17-2.06-2.48-2.4c-.31-.34-.79-1.05-1.06-1.94c-.27-.88-.02-1.86.1-2.03c.12-.17.27-.39.47-.61c.2-.22.55-.53.62-.58Z"/></svg>
);

function SpecMini({ p }){
  const list = Array.isArray(p.techSpecs) ? p.techSpecs.slice(0,3) : [];
  if(!list.length) return null;
  return (
    <ul className="mt-2 text-xs text-slate-600 dark:text-slate-400 grid grid-cols-2 gap-x-3 gap-y-1">
      {list.map((kv,idx)=> <li key={idx} className="truncate"><span className="opacity-70">{kv[0]}:</span> <strong className="opacity-90">{kv[1]}</strong></li>)}
    </ul>
  );
}

export default function ProductCard({ product, highlight }){
  const router = useRouter();
  const go = ()=> router.push(`/produtos/${product.slug}`);
  const onKey = (e)=> { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); go(); } };

  const niceTitle = titleCaseSmart(product.title || '');
  const first = product.images?.[0];
  const candidates = [
    first?.src,
    `/produtos/${product.slug}-1.webp`,
    `/produtos/${product.slug}.webp`,
    `/produtos/${product.slug}.png`,
    `/produtos/${product.slug}.jpg`,
  ].filter(Boolean);

  const renderTitle = ()=>{
    const base = niceTitle;
    const q = (highlight || '').toLowerCase().trim();
    if(!q) return base;
    const idx = base.toLowerCase().indexOf(q);
    if(idx<0) return base;
    return (<>{base.slice(0, idx)}<mark className="bg-yellow-200 dark:bg-yellow-600/50">{base.slice(idx, idx+q.length)}</mark>{base.slice(idx+q.length)}</>);
  };

  return (
    <div role="link" tabIndex={0} onClick={go} onKeyDown={onKey}
         className="card-modern hover:cursor-pointer overflow-hidden bg-gradient-to-b from-white/90 to-white/60 dark:from-white/10 dark:to-white/5">
      <div className="relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-black/5 dark:border-white/10">
        <div className="w-full aspect-[4/3] flex items-center justify-center p-3">
          <ImageSafe srcs={candidates} alt={niceTitle} className="max-w-full max-h-full object-contain" />
        </div>
        <BrandBadge product={product} />
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{renderTitle()}</h3>
        {product.shortDescription && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{product.shortDescription}</p>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <a
          href={`/api/whatsapp?title=${encodeURIComponent(niceTitle)}`}
          target="_blank" rel="noopener noreferrer"
          className="btn-quote"
          onClick={(e)=> e.stopPropagation()}
        >
          <WhatsIcon/> Solicitar cotação
        </a>
        <button
          onClick={(e)=>{ e.stopPropagation(); const lst = JSON.parse(localStorage.getItem('orcamento')||'[]'); if(!lst.find(x=>x===product.id)) lst.push(product.id); localStorage.setItem('orcamento', JSON.stringify(lst)); alert('Adicionado ao carrinho'); }}
          className="btn-cart"
        >
          <CartIcon/> Adicionar
        </button>
      </div>
    </div>
  );
}
