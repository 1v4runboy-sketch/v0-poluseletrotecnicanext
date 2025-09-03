'use client';
import { useEffect, useMemo, useState } from 'react';
import { products } from '../lib/products';
import ProductCard from './ProductCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { hashSlug, stableShuffle } from '../lib/site';

const PER_PAGE = 15;

function buildTree(list){
  const out = {};
  for(const p of list){
    if(!p.category) continue;
    out[p.category] ??= {};
    if(p.subcategory) out[p.category][p.subcategory] = (out[p.category][p.subcategory]||0)+1;
  }
  return out;
}

function pageNumbers(cur, total){
  const arr = [];
  const push = (n)=> arr.push(n);
  if (total <= 7) { for(let i=1;i<=total;i++) push(i); return arr; }
  push(1);
  if (cur > 4) push('…');
  for (let i=Math.max(2,cur-1); i<=Math.min(total-1,cur+1); i++) push(i);
  if (cur < total-3) push('…');
  push(total);
  return arr;
}

function scrollTopSmooth(){ try{ window.scrollTo({ top: 0, behavior: 'smooth' }); }catch{ window.scrollTo(0,0); } }

export default function ProductListPageClient(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [q, setQ] = useState(searchParams.get('q') || '');
  const [debounced, setDebounced] = useState(q);

  useEffect(()=>{ const t=setTimeout(()=>setDebounced(q),300); return ()=>clearTimeout(t); },[q]);

  const marca = searchParams.get('marca') || '';
  const cat   = searchParams.get('cat')   || '';
  const sub   = searchParams.get('sub')   || '';
  const ord   = (searchParams.get('ord') || 'rand');
  const page  = parseInt(searchParams.get('page') || '1', 10);

  useEffect(()=>{ scrollTopSmooth(); }, [page, pathname]);

  const tree = useMemo(()=> buildTree(products), []);
  const filtered = useMemo(()=>{
    let arr = products.slice();
    if(marca) arr = arr.filter(p => p.brand === marca);
    if(cat)   arr = arr.filter(p => p.category === cat);
    if(sub)   arr = arr.filter(p => p.subcategory === sub);
    if(debounced.trim()){
      const s = debounced.toLowerCase();
      arr = arr.filter(p => (p.title||'').toLowerCase().includes(s));
    }
    if(ord === 'rand'){
      const seed = products.reduce((a,p)=> a + hashSlug(p.slug), 0);
      arr = stableShuffle(arr, seed);
    } else {
      arr.sort((a,b)=> (a.title||'').localeCompare((b.title||'')));
    }
    return arr;
  },[marca,cat,sub,debounced,ord]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const curPage = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((curPage-1)*PER_PAGE, curPage*PER_PAGE);

  function setParam(key, value, resetPage=true){
    const sp = new URLSearchParams(searchParams.toString());
    if(value) sp.set(key, value); else sp.delete(key);
    if(resetPage) sp.set('page','1');
    router.push(`${pathname}?${sp.toString()}`);
    scrollTopSmooth();
  }

  return (
    <div className="space-y-4">
      {/* Busca + Ordem */}
      <div className="flex flex-wrap gap-2 items-center">
        <input value={q} onChange={(e)=> setQ(e.target.value)} placeholder="Buscar produtos..." className="px-3 py-2 rounded-xl bg-white/70 dark:bg-white/10 outline-none" />
        <select className="chip" value={ord} onChange={e=> setParam('ord', e.target.value)}>
          <option value="rand">Misturar catálogo</option>
          <option value="">Ordenar A–Z</option>
        </select>
      </div>

      {/* Filtros por Categoria/Sub */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <button onClick={()=> setParam('cat','')} className={`chip ${!cat?'ring-2 ring-weg/60':''}`}>Todas as categorias</button>
          {Object.keys(tree).sort().map(C=>(
            <button key={C} onClick={()=> setParam('cat', C)} className={`chip ${cat===C?'ring-2 ring-weg/60':''}`}>{C}</button>
          ))}
        </div>
        {cat && tree[cat] && (
          <div className="flex flex-wrap gap-2">
            <button onClick={()=> setParam('sub','')} className={`chip ${!sub?'ring-2 ring-weg/60':''}`}>Todas as subcategorias</button>
            {Object.keys(tree[cat]).sort().map(S=>(
              <button key={S} onClick={()=> setParam('sub', S)} className={`chip ${sub===S?'ring-2 ring-weg/60':''}`}>{S} <span className="opacity-60">({tree[cat][S]})</span></button>
            ))}
          </div>
        )}
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map(p=> <ProductCard key={p.id} product={p} highlight={debounced} />)}
      </div>

      {/* Paginação */}
      <nav className="flex justify-center items-center gap-2 select-none">
        <button disabled={curPage<=1} onClick={()=> setParam('page', String(curPage-1), false)} className="chip disabled:opacity-50">Anterior</button>
        {pageNumbers(curPage, totalPages).map((n, idx)=>(
          typeof n === 'number'
            ? <button key={idx} onClick={()=> setParam('page', String(n), false)} className={`chip ${n===curPage?'ring-2 ring-weg/60':''}`}>{n}</button>
            : <span key={idx} className="px-1">…</span>
        ))}
        <button disabled={curPage>=totalPages} onClick={()=> setParam('page', String(curPage+1), false)} className="chip disabled:opacity-50">Próxima</button>
      </nav>
    </div>
  );
}
