'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { products } from '@/lib/products';
import { useRouter } from 'next/navigation';
import ClientPortal from './ClientPortal';

function norm(s=''){
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}

export default function SearchGlobal(){
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement|null>(null);
  const anchorRef = useRef<{x:number;y:number;width:number}|null>(null);

  // reposiciona o dropdown
  useEffect(()=>{
    const update = ()=>{
      const el = inputRef.current;
      if(!el) return;
      const r = el.getBoundingClientRect();
      anchorRef.current = { x: r.left, y: r.bottom+6, width: r.width };
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive:true });
    return ()=>{ window.removeEventListener('resize', update); window.removeEventListener('scroll', update); };
  },[]);

  const list = useMemo(()=>{
    const s = norm(q.trim());
    if(!s) return [];
    return products.filter(p=>{
      const bag = norm([p.title, p.slug, p.brand, p.category, p.subcategory].filter(Boolean).join(' '));
      return bag.includes(s);
    }).slice(0,10);
  },[q]);

  useEffect(()=> setOpen(!!(q.trim() && list.length)), [q, list.length]);

  const go = (slug:string)=>{
    setOpen(false);
    setQ('');
    router.push(`/produtos/${slug}`);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={q}
        onChange={(e)=> setQ(e.target.value)}
        onFocus={()=> setOpen(!!(q.trim() && list.length))}
        onBlur={()=> setTimeout(()=> setOpen(false), 100)} /* deixa clicar no item */
        placeholder="Buscar qualquer produto..."
        className="px-3 py-2 rounded-xl w-64 md:w-72 bg-white/80 dark:bg-white/10 outline-none"
      />

      {open && anchorRef.current && (
        <ClientPortal>
          <div
            className="rounded-xl shadow-lg border border-black/10 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 overflow-hidden"
            style={{
              position:'fixed',
              left: anchorRef.current.x,
              top:  anchorRef.current.y,
              width: anchorRef.current.width,
              zIndex: 120000
            }}
          >
            {list.map(p=>(
              <div
                key={p.slug}
                className="px-3 py-2 text-sm hover:bg-slate-100/80 dark:hover:bg-white/10 cursor-pointer"
                onMouseDown={(e)=> e.preventDefault()}
                onClick={()=> go(p.slug)}
              >
                {p.title}
                <div className="text-xs opacity-65">{[p.brand,p.category,p.subcategory].filter(Boolean).join(' • ')}</div>
              </div>
            ))}
            {list.length===0 && (<div className="px-3 py-2 text-sm opacity-60">Nada encontrado…</div>)}
          </div>
        </ClientPortal>
      )}
    </div>
  );
}
