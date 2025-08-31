'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PRODUCTS from '@/lib/products';
import { BRANDS } from '@/lib/brands';
import Link from 'next/link';

export default function Sidebar(){
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = () => setOpen(v => !v);
    window.addEventListener('sidebar:toggle' as any, t);
    return () => window.removeEventListener('sidebar:toggle' as any, t);
  }, []);

  const cats = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.category))).sort(), []);
  const brands = BRANDS;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={()=> setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl z-50 transition-transform ${open? 'translate-x-0':'-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold">Navegação</h3>
          <button onClick={()=> setOpen(false)} className="text-sm rounded px-2 py-1 border">Fechar</button>
        </div>
        <nav className="p-4 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
          <div>
            <p className="text-sm font-medium mb-2">Institucional</p>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" onClick={()=>setOpen(false)} className="block hover:underline">Catálogo</Link></li>
              <li><Link href="/avaliacoes" onClick={()=>setOpen(false)} className="block hover:underline">Avaliações</Link></li>
              <li><Link href="/loja" onClick={()=>setOpen(false)} className="block hover:underline">Nossa Loja</Link></li>
              <li><Link href="/contato" onClick={()=>setOpen(false)} className="block hover:underline">Contato</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Marcas</p>
            <div className="flex flex-wrap gap-2">
              {brands.map(b => (
                <span key={b.slug} className="inline-flex items-center gap-2 rounded border px-2 py-1">
                  <img src={b.logo} alt={b.name} className="h-5 object-contain brand-logo" />
                  <span className="text-xs">{b.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Categorias</p>
            <ul className="flex flex-wrap gap-2 text-xs">
              {cats.map(c => (
                <li key={c}>
                  <Link href={`/?cat=${encodeURIComponent(c)}`} onClick={()=>setOpen(false)} className="inline-block rounded border px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
