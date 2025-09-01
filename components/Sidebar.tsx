
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PRODUCTS from '@/lib/products';
import { BRANDS } from '@/lib/brands';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Sidebar(){
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = () => setOpen(v => !v);
    window.addEventListener('sidebar:toggle', t);
    return () => window.removeEventListener('sidebar:toggle', t);
  }, []);

  const cats = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.category))).sort(), []);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={()=> setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl z-50 transition-transform ${open? 'translate-x-0':'-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/loading-logo.png" alt="Menu" className="w-7 h-7 rounded-full"/>
            <h3 className="font-semibold">Explorar</h3>
          </div>
          <button onClick={()=> setOpen(false)} className="text-sm rounded px-2 py-1 border">Fechar</button>
        </div>
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100%-56px)]">
          <div>
            <p className="text-sm font-medium mb-2">Acesso rápido</p>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" onClick={()=>setOpen(false)} className="block hover:underline">Catálogo</Link></li>
              <li><Link href="/avaliacoes" onClick={()=>setOpen(false)} className="block hover:underline">Avaliações & Loja</Link></li>
              <li><Link href="/contato" onClick={()=>setOpen(false)} className="block hover:underline">Contato</Link></li>
              <li><a href={SITE.instagram} target="_blank" className="block hover:underline">Instagram</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Marcas</p>
            <div className="grid grid-cols-3 gap-2">
              {BRANDS.map(b => (
                <Link key={b.slug} href={`/?marca=${encodeURIComponent(b.name)}`} onClick={()=>setOpen(false)} className="flex items-center justify-center h-14 rounded bg-white/80 dark:bg-black/40 ring-1 ring-black/10 dark:ring-white/10">
                  <img src={b.logo} alt={b.name} className="h-8 object-contain brand-logo" />
                </Link>
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

          <div className="rounded-xl p-3 bg-gradient-to-br from-weg/10 to-sky-200/20 dark:from-indigo-700/20 dark:to-cyan-600/10 ring-1 ring-black/10 dark:ring-white/10">
            <h4 className="font-semibold mb-1">Cotação rápida</h4>
            <p className="text-sm opacity-80">Fale conosco agora no WhatsApp.</p>
            <a href={SITE.whatsappHref()} target="_blank" className="mt-2 inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700">
              Abrir WhatsApp
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
