'use client';
import { useEffect, useMemo, useState } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { hashSlug, stableShuffle } from '@/lib/site';

const PER_PAGE = 15;

function buildTree(list){
  const out = {};
  for(const p of list){
    if(!p?.category) continue;
    out[p.category] ??= {};
    const sub = p.subcategory || 'Outros';
    out[p.category][sub] = (out[p.category][sub]||0)+1;
  }
  return out;
}

function pageNumbers(cur, total){
  const arr = [];
  if (total <= 7) { for(let i=1;i<=total;i++) arr.push(i); return arr; }
  arr.push(1);
  if (cur > 4) arr.push('…');
  for (let i=Math.max(2,cur-1); i<=Math.min(total-1,cur+1); i++) arr.push(i);
  if (cur < total-3) arr.push('…');
  arr.push(total);
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
    if(marca) arr = arr.filter(p => (p.brand||'') === marca);
    if(cat)   arr = arr.filter(p => p.category === cat);
    if(sub)   arr = arr.filter(p => (p.subcategory||'') === sub);
    if(debounced.trim()){
      const s = debounced.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      arr = arr.filter(p => {
        const bag = [p.title, p.slug, p.brand, p.category, p.subcategory].filter(Boolean).join(' ')
          .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        return bag.includes(s);
      });
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
    <div className="relative z-[10] space-y-5">
      {/* Barra rápida de busca/ordem */}
      <div className="card-modern">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e)=> setQ(e.target.value)}
            placeholder="Buscar produtos por qualquer nome..."
            className="px-3 py-2 rounded-xl bg-white/80 dark:bg-white/10 outline-none w-64 md:w-80"
          />
          <select className="chip" value={ord} onChange={e=> setParam('ord', e.target.value)}>
            <option value="rand">Misturar catálogo</option>
            <option value="">Ordenar A–Z</option>
          </select>
          {(marca || cat || sub || debounced) && (
            <button className="chip" onClick={()=>{ router.push(pathname); setQ(''); scrollTopSmooth(); }}>
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Lista / Fallback */}
      {pageItems.length === 0 ? (
        <div className="card-modern">
          <div className="text-sm">
            Nenhum produto encontrado. <button className="chip ml-2" onClick={()=>{ router.push(pathname); setQ(''); }}>Limpar filtros</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageItems.map(p=> <ProductCard key={p.id} product={p} highlight={debounced} />)}
        </div>
      )}

      {/* Paginação */}
      {pageItems.length > 0 && (
        <nav className="flex justify-center items-center gap-2 select-none">
          <button disabled={curPage<=1} onClick={()=> setParam('page', String(curPage-1), false)} className="chip disabled:opacity-50">Anterior</button>
          {pageNumbers(curPage, totalPages).map((n, idx)=>(
            typeof n === 'number'
              ? <button key={idx} onClick={()=> setParam('page', String(n), false)} className={`chip ${n===curPage?'ring-2 ring-weg/60':''}`}>{n}</button>
              : <span key={idx} className="px-1">…</span>
          ))}
          <button disabled={curPage>=totalPages} onClick={()=> setParam('page', String(curPage+1), false)} className="chip disabled:opacity-50">Próxima</button>
        </nav>
      )}
    </div>
  );
}
