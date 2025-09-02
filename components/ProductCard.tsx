'use client';
import { useRouter } from 'next/navigation';
import BrandBadge from './BrandBadge';
import ImageSafe from './ImageSafe';

export default function ProductCard({ product, highlight }){
  const router = useRouter();
  const go = ()=> router.push(`/produtos/${product.slug}`);
  const onKey = (e)=> { if(e.key==='Enter' || e.key===' '){ e.preventDefault(); go(); } };
  const first = product.images?.[0];
  const renderTitle = ()=>{
    if(!highlight) return product.title;
    const q = highlight.toLowerCase().trim();
    if(!q) return product.title;
    const idx = product.title.toLowerCase().indexOf(q);
    if(idx<0) return product.title;
    return (<>
      {product.title.slice(0, idx)}<mark className="bg-yellow-200 dark:bg-yellow-600/50">{product.title.slice(idx, idx+q.length)}</mark>{product.title.slice(idx+q.length)}
    </>);
  };

  const wpHref = `/api/whatsapp?title=${encodeURIComponent(product.title)}`;

  return (
    <div role="link" tabIndex={0} onClick={go} onKeyDown={onKey} className="card-modern flex flex-col gap-3 hover:cursor-pointer">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
        {first && <ImageSafe src={first.src} alt={first.alt} className="w-full h-full object-cover" />}
        <BrandBadge brand={product.brand} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{renderTitle()}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{product.shortDescription}</p>
      </div>
      <div className="flex items-center gap-2">
        <a href={wpHref} target="_blank" rel="noopener noreferrer" className="btn-magnetic text-sm">WhatsApp</a>
        <button
          onClick={(e)=>{ e.stopPropagation(); const lst = JSON.parse(localStorage.getItem('orcamento')||'[]'); if(!lst.find(x=>x===product.id)) lst.push(product.id); localStorage.setItem('orcamento', JSON.stringify(lst)); alert('Adicionado à lista de orçamento'); }}
          className="chip"
        >Adicionar</button>
      </div>
    </div>
  );
}
