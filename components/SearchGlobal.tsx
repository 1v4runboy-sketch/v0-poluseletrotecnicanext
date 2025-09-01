'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PRODUCTS from '@/lib/products';
export default function SearchGlobal(){
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const items = useMemo(()=>{
    if (q.length<1) return [];
    const letter = q[0].toLowerCase();
    return PRODUCTS.filter(p => p.title.toLowerCase().startsWith(letter)).slice(0,8);
  }, [q]);
  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => { if (e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  function submit(e: React.FormEvent){
    e.preventDefault();
    window.location.href = `/?q=${encodeURIComponent(q)}`;
  }
  return (
    <div className="relative max-w-sm w-full">
      <form onSubmit={submit}>
        <input aria-label="Busca global" placeholder="Buscar no catálogo..." value={q} onChange={e=>{setQ(e.target.value); setOpen(true);}}
               className="w-full px-3 py-2 rounded-md border bg-white/70 dark:bg-black/40" />
      </form>
      {open && items.length>0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
          {items.map(it => (<a key={it.id} href={`/produtos/${it.slug}`} className="block px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">{it.title}</a>))}
        </div>
      )}
    </div>
  );
}
