'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PRODUCTS, { type Product } from '@/lib/products';
import ProductCard from './ProductCard';
const perPage = 15;
function useQueryState(){
  const [params, setParams] = useState(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''));
  useEffect(()=>{
    const onPop = ()=>setParams(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  function set(key: string, value: string){
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value); else p.delete(key);
    const url = `${window.location.pathname}?${p.toString()}`;
    window.history.pushState({}, '', url);
    setParams(p);
  }
  return { params, set };
}
function highlight(text: string, q: string){
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (<>{text.slice(0,idx)}<mark className="bg-yellow-200 dark:bg-yellow-600/60">{text.slice(idx, idx+q.length)}</mark>{text.slice(idx+q.length)}</>);
}
export default function ProductListPageClient(){
  const { params, set } = useQueryState();
  const q = params.get('q') || '';
  const marca = params.get('marca') || '';
  const cat = params.get('cat') || '';
  const sub = params.get('sub') || '';
  const page = parseInt(params.get('page') || '1');
  const marcas = useMemo(()=>Array.from(new Set(PRODUCTS.map(p=>p.brand).filter(Boolean))) as string[], []);
  const cats = useMemo(()=>Array.from(new Set(PRODUCTS.map(p=>p.category))), []);
  const subs = useMemo(()=>Array.from(new Set(PRODUCTS.filter(p=>!cat || p.category===cat).map(p=>p.subcategory).filter(Boolean))) as string[], [cat]);
  const filtered = useMemo(()=>{
    let arr = PRODUCTS.slice();
    if (q) arr = arr.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (marca) arr = arr.filter(p => (p.brand||'') === marca);
    if (cat) arr = arr.filter(p => p.category === cat);
    if (sub) arr = arr.filter(p => p.subcategory === sub);
    return arr;
  }, [q, marca, cat, sub]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageClamp = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((pageClamp-1)*perPage, pageClamp*perPage);
  useEffect(()=>{ if (page !== pageClamp) set('page', String(pageClamp)); }, [page, pageClamp]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input aria-label="Buscar" placeholder="Buscar..." defaultValue={q} onChange={e=>set('q', e.target.value)} className="px-3 py-2 rounded-md border bg-white/70 dark:bg-black/40"/>
        <select aria-label="Marca" value={marca} onChange={e=>set('marca', e.target.value)} className="px-3 py-2 rounded-md border bg-white/70 dark:bg-black/40">
          <option value="">Marca</option>
          {marcas.map(m=><option key={m} value={m}>{m}</option>)}
        </select>
        <select aria-label="Categoria" value={cat} onChange={e=>{ set('cat', e.target.value); set('sub', ''); }} className="px-3 py-2 rounded-md border bg-white/70 dark:bg-black/40">
          <option value="">Categoria</option>
          {cats.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Subcategoria" value={sub} onChange={e=>set('sub', e.target.value)} className="px-3 py-2 rounded-md border bg-white/70 dark:bg-black/40">
          <option value="">Subcategoria</option>
          {subs.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map(p => (
          <div key={p.id}>
            <ProductCard p={{ ...p, title: String(highlight(p.title, q)) as any }} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {Array.from({length: totalPages}).map((_,idx)=>{
          const n = idx+1;
          return <button key={n} aria-label={`Página ${n}`} onClick={()=>set('page', String(n))} className={`px-3 py-1 rounded border ${n===pageClamp?'bg-black text-white dark:bg-white dark:text-black':''}`}>{n}</button>;
        })}
      </div>
    </div>
  );
}
