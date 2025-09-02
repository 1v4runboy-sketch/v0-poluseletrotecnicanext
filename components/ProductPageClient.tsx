'use client';
import { useMemo } from 'react';
import { products } from '../lib/products';
import ProductCarousel from './ProductCarousel';
import BrandBadge from './BrandBadge';
import { whatsappHref, hashSlug, stableShuffle } from '../lib/site';
import ImageSafe from './ImageSafe';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';

export default function ProductPageClient({ slug }){
  const router = useRouter();
  const product = useMemo(()=> products.find(p=>p.slug===slug), [slug]);
  if(!product) return <div className="p-4">Produto não encontrado.</div>;

  const relatedPool = products.filter(p=> p.slug!==product.slug && (p.category===product.category || p.brand===product.brand));
  const fallbackPool = products.filter(p=> p.slug!==product.slug);
  const pool = relatedPool.length>0 ? relatedPool : fallbackPool;
  const seed = hashSlug(product.slug);
  const related = stableShuffle(pool, seed).slice(0,4);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <ProductCarousel images={product.images} brand={product.brand} />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={()=> router.push(`/?marca=${encodeURIComponent(product.brand)}`)} className="chip">{product.brand}</button>
            <button onClick={()=> router.push(`/?cat=${encodeURIComponent(product.category)}`)} className="chip">{product.category}</button>
            <button onClick={()=> router.push(`/?cat=${encodeURIComponent(product.category)}&sub=${encodeURIComponent(product.subcategory)}`)} className="chip">{product.subcategory}</button>
          </div>
          <p className="text-slate-700 dark:text-slate-300">{product.shortDescription}</p>
          <div className="flex items-center gap-2">
            <a href={whatsappHref(product.title)} target="_blank" rel="noopener noreferrer" className="btn-magnetic">WhatsApp</a>
            <button
              onClick={()=>{ const lst = JSON.parse(localStorage.getItem('orcamento')||'[]'); if(!lst.find(x=>x===product.id)) lst.push(product.id); localStorage.setItem('orcamento', JSON.stringify(lst)); alert('Adicionado à lista de orçamento'); }}
              className="chip">Adicionar à lista</button>
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
