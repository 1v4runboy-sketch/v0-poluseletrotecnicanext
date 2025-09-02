'use client';
import { useEffect, useMemo, useState } from 'react';
import { products } from '../lib/products';
import ProductCard from './ProductCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { hashSlug, stableShuffle } from '../lib/site';

const PER_PAGE = 15;

export default function ProductListPageClient(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [debounced, setDebounced] = useState(q);

  useEffect(()=>{
    const t = setTimeout(()=> setDebounced(q), 300);
    return ()=> clearTimeout(t);
  },[q]);

  const marca = searchParams.get('marca') || '';
  const cat = searchParams.get('cat') || '';
  const sub = searchParams.get('sub') || '';
  const page = parseInt(searchParams.get('page')||'1', 10);
  const ord = searchParams.get('ord') || '';

  const filtered = useMemo(()=>{
    let arr = products.slice();
    if(marca) arr = arr.filter(p => p.brand === marca);
    if(cat) arr = arr.filter(p => p.category === cat);
    if(sub) arr = arr.filter(p => p.subcategory === sub);
    if(debounced.trim()){
      const s = debounced.toLowerCase();
      arr = arr.filter(p => p.title.toLowerCase().includes(s));
    }
    if(ord === 'rand'){
      const seed = products.reduce((a,p)=> a + hashSlug(p.slug), 0);
      arr = stableShuffle(arr, seed);
    }else{
      arr.sort((a,b)=> a.title.localeCompare(b.title));
    }
    return arr;
  },[marca, cat, sub, debounced, ord]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((pageSafe-1)*PER_PAGE, pageSafe*PER_PAGE);

  function setParam(key, value){
    const sp = new URLSearchParams(searchParams.toString());
    if(value) sp.set(key, value); else sp.delete(key);
    sp.set('page', '1');
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input value={q} onChange={(e)=> setQ(e.target.value)} placeholder="Buscar produtos..." className="px-3 py-2 rounded-xl bg-white/70 dark:bg-white/10 outline-none" />
        <select className="chip" value={marca} onChange={e=> setParam('marca', e.target.value)}>
          <option value="">Marca</option>
          {Array.from(new Set(products.map(p=>p.brand))).sort().map(b=> <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="chip" value={cat} onChange={e=> setParam('cat', e.target.value)}>
          <option value="">Categoria</option>
          {Array.from(new Set(products.map(p=>p.category))).sort().map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="chip" value={sub} onChange={e=> setParam('sub', e.target.value)}>
          <option value="">Sub</option>
          {Array.from(new Set(products.filter(p=>!cat || p.category===cat).map(p=>p.subcategory))).sort().map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="chip" value={ord} onChange={e=> setParam('ord', e.target.value)}>
          <option value="">Ordenação padrão</option>
          <option value="rand">Pseudo-aleatória</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map(p=> <ProductCard key={p.id} product={p} highlight={debounced} />)}
      </div>

      <div className="flex justify-center items-center gap-2">
        <button disabled={pageSafe<=1} onClick={()=> setParam('page', String(pageSafe-1))} className="chip disabled:opacity-50">Anterior</button>
        <span className="text-sm">Página {pageSafe} / {totalPages}</span>
        <button disabled={pageSafe>=totalPages} onClick={()=> setParam('page', String(pageSafe+1))} className="chip disabled:opacity-50">Próxima</button>
      </div>
    </div>
  );
}
