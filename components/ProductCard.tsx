'use client';
import { useRouter } from 'next/navigation';
import BrandBadge from './BrandBadge';
import ImageSafe from './ImageSafe';
import { titleCaseSmart, whatsappHref } from '../lib/site';
import QuoteButton from './QuoteButton';
import WhatsButton from './WhatsButton';

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
    return (<>{base.slice(0,idx)}<mark className="bg-yellow-200 dark:bg-yellow-600/50">{base.slice(idx,idx+q.length)}</mark>{base.slice(idx+q.length)}</>);
  };

  const waHref  = whatsappHref(niceTitle);
  const cotHref = whatsappHref('SOLICITAR COTAÇÃO — ' + niceTitle);

  return (
    <div role="link" tabIndex={0} onClick={go} onKeyDown={onKey}
         className="card-modern hover:cursor-pointer overflow-hidden">
      <div className="relative rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-black/5 dark:border-white/10">
        <div className="w-full aspect-[4/3] flex items-center justify-center p-3">
          <ImageSafe srcs={candidates} alt={niceTitle} className="max-w-full max-h-full object-contain" />
        </div>
        <BrandBadge product={product} />
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{renderTitle()}</h3>
        {product.shortDescription && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{product.shortDescription}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          {product.brand && <span className="chip">{product.brand}</span>}
          {product.category && <span className="chip">{product.category}</span>}
          {product.subcategory && <span className="chip">{product.subcategory}</span>}
        </div>
        <SpecMini p={product} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <QuoteButton href={cotHref} onClick={(e)=> e.stopPropagation()} />
        <WhatsButton href={waHref}  onClick={(e)=> e.stopPropagation()} />
      </div>
    </div>
  );
}
