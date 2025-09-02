'use client';
import { useEffect, useMemo, useState } from 'react';
import { products } from '../lib/products';
import { useRouter } from 'next/navigation';
import { titleCaseSmart } from '../lib/site';

export default function SearchGlobal(){
  const [q, setQ] = useState('');
  const router = useRouter();
  const list = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return [];
    return products.filter(p => p.title.toLowerCase().startsWith(s)).slice(0,6);
  },[q]);
  return (
    <div className="relative">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar..." className="px-3 py-2 rounded-xl w-60 bg-white/70 dark:bg-white/10 outline-none"/>
      {list.length>0 && (
        <div className="absolute mt-1 w-full bg-white/90 dark:bg-black/70 rounded-xl shadow z-50">
          {list.map(p=> (
            <div key={p.slug} className="px-3 py-2 hover:bg-slate-100/70 dark:hover:bg-white/10 cursor-pointer rounded-lg"
              onClick={()=> router.push(`/produtos/${p.slug}`)}>
              {titleCaseSmart(p.title)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
