'use client';
import ProductCarousel from './ProductCarousel';
import { whatsappHref, hashSlug, stableShuffle, titleCaseSmart } from '../lib/site';
import ProductCard from './ProductCard';
import { products } from '../lib/products';

const CartIcon = (props)=>(
  <svg width="18" height="18" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4M6.16 6l.84 2h10a1 1 0 0 1 .96 1.27l-1.5 5A2 2 0 0 1 14.55 16H9.45a2 2 0 0 1-1.91-1.36L5 8H3a1 1 0 0 1 0-2z"/></svg>
);

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

          {product.shortDescription && (
            <p className="text-slate-700 dark:text-slate-300">{product.shortDescription}</p>
          )}

          <div className="flex items-center gap-2">
            <a href={whatsappHref(niceTitle)} target="_blank" rel="noopener noreferrer" className="btn-quote">Solicitar cotação</a>
            <button
              onClick={()=>{ const lst = JSON.parse(localStorage.getItem('orcamento')||'[]'); if(!lst.find(x=>x===product.id)) lst.push(product.id); localStorage.setItem('orcamento', JSON.stringify(lst)); alert('Adicionado ao carrinho'); }}
              className="btn-cart"
            ><CartIcon/> Adicionar ao carrinho</button>
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
