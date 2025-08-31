'use client';
import PRODUCTS, { type Product } from '@/lib/products';
import ProductCard from './ProductCard';
import { useMemo, useState } from 'react';

const PAGE = 15;

export default function ProductGrid(){
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(()=>{
    const s = q.trim().toLowerCase();
    return PRODUCTS.filter(p => !s || p.title.toLowerCase().includes(s));
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const pageItems = filtered.slice((page-1)*PAGE, page*PAGE);

  return (
    <div className="space-y-4">
      <input
        value={q} onChange={e=>{ setQ(e.target.value); setPage(1); }}
        placeholder="Buscar produtos..."
        className="w-full rounded-md border px-3 py-2 bg-white/80 dark:bg-black/30"
        aria-label="Buscar produtos"
      />
      {pageItems.length === 0 && <p className="text-sm opacity-70">Nenhum produto encontrado.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageItems.map(p => <ProductCard key={p.slug} product={p} />)}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 rounded border disabled:opacity-50">Anterior</button>
          <span className="text-sm">Página {page} / {totalPages}</span>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 rounded border disabled:opacity-50">Próxima</button>
        </div>
      )}
    </div>
  );
}
