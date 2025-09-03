'use client';
import ProductCarousel from './ProductCarousel';
import { whatsappHref, hashSlug, stableShuffle, titleCaseSmart } from '../lib/site';
import ProductCard from './ProductCard';
import { products } from '../lib/products';

function Highlights({ product }){
  const specs = Array.isArray(product.techSpecs)? product.techSpecs : [];
  const pick = [];
  const keys = ['Potência','Tensão','Dimensão','Vedação','Blindagem','Frequência','Capacitância'];
  for(const k of keys){
    const found = specs.find(s=> (s?.[0]||'').toLowerCase().includes(k.toLowerCase()));
    if(found) pick.push(found);
    if(pick.length>=3) break;
  }
  if(pick.length===0) return null;
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
      {pick.map((kv, i)=>(
        <li key={i} className="rounded-lg px-3 py-2 bg-slate-100/70 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <span className="opacity-70">{kv[0]}: </span><strong>{kv[1]}</strong>
        </li>
      ))}
    </ul>
  );
}

export default function ProductPageClient({ product }){
  if(!product) return <div className="p-4">Produto não encontrado.</div>;

  const relatedPool = products.filter(p=> p.slug!==product.slug && (p.category===product.category || p.subcategory===product.subcategory));
  const fallbackPool = products.filter(p=> p.slug!==product.slug);
  const pool = relatedPool.length>0 ? relatedPool : fallbackPool;
  const seed = hashSlug(product.slug);
  const related = stableShuffle(pool, seed).slice(0,4);
  const niceTitle = titleCaseSmart(product.title || '');

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative select-none">
          <ProductCarousel images={product.images} brand={product.brand} product={product} />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{niceTitle}</h1>

          <div className="flex flex-wrap gap-2">
            {product.brand && (<span className="chip">{product.brand}</span>)}
            {product.category && (<span className="chip">{product.category}</span>)}
            {product.subcategory && (<span className="chip">{product.subcategory}</span>)}
          </div>

          <Highlights product={product} />

          {product.shortDescription && (
            <p className="text-slate-700 dark:text-slate-300">{product.shortDescription}</p>
          )}

          <div className="flex items-center gap-2">
            <a href={whatsappHref(niceTitle)} target="_blank" rel="noopener noreferrer" className="btn-quote">Solicitar cotação</a>
            <button
              onClick={()=>{ const lst = JSON.parse(localStorage.getItem('orcamento')||'[]'); if(!lst.find(x=>x===product.id)) lst.push(product.id); localStorage.setItem('orcamento', JSON.stringify(lst)); alert('Adicionado ao carrinho'); }}
              className="btn-cart">Adicionar ao carrinho</button>
          </div>
        </div>
      </div>

      {product.techSpecs && (
        <div className="card-modern">
          <div className="font-semibold mb-2">Ficha técnica</div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {product.techSpecs.map((kv,idx)=>(
              <div key={idx} className="flex justify-between gap-2 border-b border-black/10 dark:border-white/10 py-1">
                <dt className="text-slate-500 dark:text-slate-400">{kv[0]}</dt>
                <dd className="font-medium">{kv[1]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div>
        <div className="font-semibold mb-3">Relacionados</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
