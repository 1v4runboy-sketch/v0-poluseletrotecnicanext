'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PRODUCTS from '@/lib/products';
import { SITE } from '@/lib/site';
import * as BL from '@/lib/budgetList';
import BrandBadge from '@/components/BrandBadge';

const PER_PAGE = 15;
const URL_KEYS = { q:'q', brand:'marca', cat:'cat', sub:'sub', page:'page', ord:'ord' };
const LABEL_SEM_MARCA = 'Sem marca';
const LABEL_SEM_SUB = 'Sem subcategoria';

function hashString(str){ let h=2166136261>>>0; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619);} return h>>>0; }
function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function highlight(text, query){
  if(!query.trim()) return text;
  const q=query.trim(); const re=new RegExp(`(${escapeRegExp(q)})`, 'ig');
  return text.split(re).map((part,i)=> re.test(part)? <mark key={i} className="bg-yellow-200 dark:bg-yellow-600/50 rounded px-0.5">{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>);
}
function getAllFromParams(sp, key){
  const list=sp.getAll(key); const out=[];
  list.forEach(v=> v.includes(',')? v.split(',').forEach(x=>out.push(x)) : out.push(v));
  return Array.from(new Set(out.map(s=>s.trim()).filter(Boolean)));
}
function setMultiParam(sp,key,vals){ sp.delete(key); vals.forEach(v=> sp.append(key,v)); }

/** Title Case comercial, preservando siglas e medidas */
function formatTitleCommercial(title){
  if(!title) return '';
  const KEEP_UP=new Set(['WEG','HCH','NSK','JL','IGUI','CIFA','LANC','AC','DC','DDU','ZZ']);
  const LOWER=new Set(['de','da','do','das','dos','e','para','em','com']);
  return title.split(/\s+/).map((w,i)=>{
    const up=w.toUpperCase();
    if(KEEP_UP.has(up)) return up;
    if(LOWER.has(w.toLowerCase()) && i!==0) return w.toLowerCase();
    if(/^\d+[\/\-]\d+$/.test(w) || /mm$/i.test(w) || /^\d{3,}$/.test(w)) return w;
    return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
  }).join(' ');
}

/** -------- Card sem <a> externo (evita link aninhado) -------- */
function ListCard({ product, query }){
  const router = useRouter();
  const firstImg=(product.images && product.images[0] && product.images[0].src) || '/produtos/placeholder.webp';

  const go = () => router.push(`/produtos/${product.slug}`);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
  };

  const addToBudget = (e) => { e.stopPropagation(); BL.add(product); };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={onKey}
      className="card-modern relative block p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-weg/60 cursor-pointer"
      aria-label={product.title}
    >
      <div className="relative aspect-square bg-white/60 dark:bg-black/20 rounded-lg overflow-hidden">
        <img
          src={firstImg}
          alt={(product.images?.[0]?.alt)||product.title}
          className="w-full h-full object-contain transition-transform duration-200"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-2 left-2">
          <BrandBadge brand={product.brand} name={product.brand} />
        </div>
      </div>

      <h3 className="mt-2 font-medium leading-tight line-clamp-2">
        {highlight(formatTitleCommercial(product.title), query)}
      </h3>
      {product.shortDescription && (
        <p className="text-xs opacity-70 line-clamp-2 mt-0.5">{product.shortDescription}</p>
      )}

      <div className="mt-2 flex items-center gap-2 relative z-10">
        {/* CTA WhatsApp como <a> separado — sem link aninhado */}
        <a
          href={SITE.whatsappHref(product.title)}
          className="btn-magnetic px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e)=> e.stopPropagation()}
        >
          WhatsApp
        </a>

        {/* Botão “Adicionar” sem link aninhado */}
        <button
          onClick={addToBudget}
          className="btn-magnetic px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

/** ---------------- Dataset derivado ---------------- */
const ALL_BRANDS = (()=>{ const s=new Set(); PRODUCTS.forEach(p=>{ const b=(p.brand||'').trim(); if(b) s.add(b); }); const hasNo=PRODUCTS.some(p=>!p.brand||!p.brand.trim()); const arr=Array.from(s).sort((a,b)=>a.localeCompare(b)); return hasNo?[LABEL_SEM_MARCA, ...arr]:arr; })();
const ALL_CATEGORIES = (()=>{ const s=new Set(); PRODUCTS.forEach(p=>s.add(p.category)); return Array.from(s).sort((a,b)=>a.localeCompare(b)); })();
const ALL_SUBCATEGORIES = (()=>{ const s=new Set(); PRODUCTS.forEach(p=>{ const v=(p.subcategory||'').trim(); if(v) s.add(v); }); const hasNo=PRODUCTS.some(p=>!p.subcategory||!p.subcategory.trim()); const arr=Array.from(s).sort((a,b)=>a.localeCompare(b)); return hasNo?[LABEL_SEM_SUB, ...arr]:arr; })();

/** ---------------- Página de listagem ---------------- */
export default function ProductListPageClient(){
  const searchParams=useSearchParams(); const router=useRouter(); const pathname=usePathname();
  const qFromURL=searchParams.get(URL_KEYS.q)||''; const [qInput,setQInput]=useState(qFromURL);
  useEffect(()=>{ setQInput(qFromURL); },[qFromURL]);

  const selectedBrands=getAllFromParams(searchParams, URL_KEYS.brand);
  const selectedCats=getAllFromParams(searchParams, URL_KEYS.cat);
  const selectedSubs=getAllFromParams(searchParams, URL_KEYS.sub);
  const page=Math.max(1, parseInt(searchParams.get(URL_KEYS.page)||'1',10)||1);
  const ord=searchParams.get(URL_KEYS.ord)||'padrao';

  const pushParams=useCallback((update, scrollTop=true)=>{ const sp=new URLSearchParams(searchParams.toString()); update(sp); router.push(`${pathname}?${sp.toString()}`, {scroll:scrollTop}); },[router,searchParams,pathname]);

  useEffect(()=>{ const t=setTimeout(()=>{ pushParams(sp=>{ if(qInput.trim()) sp.set(URL_KEYS.q, qInput.trim()); else sp.delete(URL_KEYS.q); sp.set(URL_KEYS.page,'1'); }); },300); return ()=>clearTimeout(t); },[qInput,pushParams]);

  const toggleArrayFilter=useCallback((key, value)=>{ pushParams(sp=>{ const vals=getAllFromParams(sp,key); const i=vals.indexOf(value); if(i>=0) vals.splice(i,1); else vals.push(value); setMultiParam(sp,key,vals); sp.set(URL_KEYS.page,'1'); }); },[pushParams]);
  const clearAll=useCallback(()=>{ pushParams(sp=>{ [URL_KEYS.brand,URL_KEYS.cat,URL_KEYS.sub,URL_KEYS.q,URL_KEYS.page].forEach(k=>sp.delete(k)); }); },[pushParams]);
  const toggleOrder=useCallback(()=>{ pushParams(sp=>{ sp.set(URL_KEYS.ord, sp.get(URL_KEYS.ord)==='rand'?'padrao':'rand'); sp.set(URL_KEYS.page,'1'); }); },[pushParams]);

  const filtered=useMemo(()=> {
    const s=(searchParams.get(URL_KEYS.q)||'').trim().toLowerCase();
    const brands=getAllFromParams(searchParams, URL_KEYS.brand);
    const cats=getAllFromParams(searchParams, URL_KEYS.cat);
    const subs=getAllFromParams(searchParams, URL_KEYS.sub);

    const matchBrand=(p)=>{ if(brands.length===0) return true; const b=(p.brand||'').trim(); if(!b) return brands.includes(LABEL_SEM_MARCA); return brands.includes(b); };
    const matchCat =(p)=> cats.length===0 ? true : cats.includes(p.category);
    const matchSub =(p)=>{ if(subs.length===0) return true; const v=(p.subcategory||'').trim(); if(!v) return subs.includes(LABEL_SEM_SUB); return subs.includes(v); };
    const matchQuery=(p)=>{ if(!s) return true; const hay=`${p.title} ${p.shortDescription||''} ${p.brand||''} ${p.category} ${p.subcategory||''}`.toLowerCase(); return hay.includes(s); };

    let arr=PRODUCTS.filter(p=> matchBrand(p)&&matchCat(p)&&matchSub(p)&&matchQuery(p));
    if ((searchParams.get(URL_KEYS.ord)||'')==='rand') arr=arr.slice().sort((a,b)=>(hashString(a.slug)%997)-(hashString(b.slug)%997));
    return arr;
  },[searchParams]);

  const totalPages=Math.max(1, Math.ceil(filtered.length/PER_PAGE));
  const currentPage=Math.min(parseInt(searchParams.get(URL_KEYS.page)||'1',10)||1, totalPages);
  const pageItems=useMemo(()=> filtered.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE), [filtered,currentPage]);

  useEffect(()=>{ if(currentPage>totalPages){ pushParams(sp=> sp.set(URL_KEYS.page, String(totalPages))); } },[totalPages]); // eslint-disable-line

  const chips=[
    ...getAllFromParams(searchParams, URL_KEYS.brand).map(v=>({k:URL_KEYS.brand,v})),
    ...getAllFromParams(searchParams, URL_KEYS.cat).map(v=>({k:URL_KEYS.cat,v})),
    ...getAllFromParams(searchParams, URL_KEYS.sub).map(v=>({k:URL_KEYS.sub,v})),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
      {/* Filtros */}
      <aside className="lg:sticky lg:top-[76px] h-max space-y-6">
        <div className="card-modern p-3">
          <label htmlFor="busca" className="text-sm font-medium opacity-80">Buscar no catálogo</label>
          <input id="busca" value={qInput} onChange={e=>setQInput(e.target.value)} placeholder="Digite para buscar..." className="mt-1 w-full rounded-md border bg-white/80 dark:bg-black/30 px-3 py-2" aria-label="Buscar produtos"/>
          <div className="mt-2 flex items-center justify-between text-xs">
            <button onClick={toggleOrder} className="underline opacity-80 hover:opacity-100" title="Alternar ordenação">Ordenação: { (ord==='rand')?'Aleatória':'Padrão' }</button>
            <button onClick={clearAll} className="underline opacity-80 hover:opacity-100">Limpar tudo</button>
          </div>
        </div>

        <div className="card-modern p-3">
          <p className="text-sm font-medium mb-2 opacity-80">Marcas</p>
          <div className="flex flex-col gap-1 max-h-56 overflow-auto pr-1">
            {ALL_BRANDS.map(b=>(
              <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={getAllFromParams(searchParams, URL_KEYS.brand).includes(b)} onChange={()=>toggleArrayFilter(URL_KEYS.brand,b)}/>
                <span>{b}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card-modern p-3">
          <p className="text-sm font-medium mb-2 opacity-80">Categorias</p>
          <div className="flex flex-col gap-1 max-h-44 overflow-auto pr-1">
            {ALL_CATEGORIES.map(c=>(
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={getAllFromParams(searchParams, URL_KEYS.cat).includes(c)} onChange={()=>toggleArrayFilter(URL_KEYS.cat,c)}/>
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card-modern p-3">
          <p className="text-sm font-medium mb-2 opacity-80">Subcategorias</p>
          <div className="flex flex-col gap-1 max-h-44 overflow-auto pr-1">
            {ALL_SUBCATEGORIES.map(s=>(
              <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={getAllFromParams(searchParams, URL_KEYS.sub).includes(s)} onChange={()=>toggleArrayFilter(URL_KEYS.sub,s)}/>
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="text-sm opacity-80">
            Encontrados <strong>{filtered.length}</strong> produto(s){' '}
            {filtered.length>PER_PAGE && <span className="opacity-60">— Página {currentPage}/{totalPages}</span>}
          </div>

          {chips.length>0 && (
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                {chips.map((c,idx)=>(
                  <button key={`${c.k}-${c.v}-${idx}`} onClick={()=>toggleArrayFilter(c.k,c.v)} className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800" title="Remover filtro">
                    {c.v} ✕
                  </button>
                ))}
                <button onClick={clearAll} className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800">Limpar filtros</button>
              </div>
            </div>
          )}
        </div>

        {pageItems.length===0 ? (
          <p className="text-sm opacity-70">Nenhum produto encontrado com os filtros atuais.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageItems.map(p=>(<ListCard key={p.slug} product={p} query={qInput}/>))}
          </div>
        )}

        {totalPages>1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button disabled={currentPage===1} onClick={()=>pushParams(sp=>sp.set(URL_KEYS.page, String(Math.max(1, currentPage-1))))} className="px-3 py-1 rounded border disabled:opacity-50">Anterior</button>
            <span className="text-sm">Página {currentPage} / {totalPages}</span>
            <button disabled={currentPage===totalPages} onClick={()=>pushParams(sp=>sp.set(URL_KEYS.page, String(Math.min(totalPages, currentPage+1))))} className="px-3 py-1 rounded border disabled:opacity-50">Próxima</button>
          </div>
        )}
      </section>
    </div>
  );
}
