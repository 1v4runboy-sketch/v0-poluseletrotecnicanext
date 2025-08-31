'use client';
import { useMemo, useState } from 'react';
import PRODUCTS from '@/lib/products';

export default function SearchGlobal(){
  const [q, setQ] = useState('');
  const suggestions = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return PRODUCTS.filter(p => p.title.toLowerCase().startsWith(s)).slice(0,6);
  }, [q]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        id="global-search"
        value={q} onChange={e=>setQ(e.target.value)}
        placeholder="Buscar produto..."
        className="w-full rounded-md border bg-white/80 dark:bg-black/30 px-3 py-2"
      />
      {q && suggestions.length>0 && (
        <div className="absolute mt-1 w-full rounded-md border bg-white dark:bg-gray-900 shadow">
          {suggestions.map(s => (
            <a key={s.slug} href={`/produtos/${s.slug}`} className="block px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
              {s.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
