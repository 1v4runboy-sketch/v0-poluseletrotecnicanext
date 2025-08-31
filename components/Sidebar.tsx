'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PRODUCTS from '@/lib/products';
import { BRANDS } from '@/lib/brands';
export default function Sidebar(){
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const t = () => setOpen(v=>!v);
    window.addEventListener('sidebar:toggle' as any, t);
    return () => window.removeEventListener('sidebar:toggle' as any, t);
  }, []);
  const cats = useMemo(()=>Array.from(new Set(PRODUCTS.map(p=>p.category))), []);
  const brands = BRANDS;
  return (
    <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open?'':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={()=>setOpen(false)} />
      <aside className={`absolute left-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 border-r border-black/10 dark:border-white/10 p-4 transition-transform ${open?'translate-x-0':'-translate-x-full'}`}>
        <h2 className="text-lg font-semibold mb-3">Navegação</h2>
        <nav className="space-y-2">
          <a href="/" className="block hover:underline">Catálogo</a>
          <a href="/avaliacoes" className="block hover:underline">Avaliações</a>
          <a href="/loja" className="block hover:underline">Nossa Loja</a>
          <a href="/contato" className="block hover:underline">Contato</a>
          <a href="https://www.instagram.com/_poluseletrotecnica/" target="_blank" className="block hover:underline">Instagram</a>
        </nav>
        <div className="mt-6">
          <h3 className="font-medium">Marcas</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {brands.map(b=>(
              <div key={b.slug} className="p-2 rounded border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30">
                <img src={b.logo} alt={b.name} className="h-8 mx-auto brand-logo"/>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium">Categorias</h3>
          <ul className="mt-2 space-y-1">
            {cats.map(c=>(<li key={c}><a className="hover:underline" href={`/?cat=${encodeURIComponent(c)}`}>{c}</a></li>))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
