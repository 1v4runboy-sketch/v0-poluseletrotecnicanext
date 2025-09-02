'use client';
import { useEffect, useMemo, useState } from 'react';
import { brands, categories, subcategoriesOf } from '../lib/products';
import { useRouter } from 'next/navigation';
import { whatsappHref } from '../lib/site';

export default function Sidebar({ open, setOpen }){
  const router = useRouter();
  useEffect(()=>{
    const onEsc = (e)=>{ if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return ()=> window.removeEventListener('keydown', onEsc);
  },[setOpen]);
  return (
    <div className={`fixed inset-0 z-50 transition ${open?'':'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 ${open?'opacity-100':'opacity-0'}`} onClick={()=>setOpen(false)} />
      <aside className={`absolute left-0 top-0 bottom-0 w-80 p-4 bg-white dark:bg-slate-900 shadow-xl transition-transform ${open?'translate-x-0':'-translate-x-full'}`}>
        <h3 className="text-lg font-semibold mb-3">Navegação</h3>
        <nav className="space-y-2">
          <button onClick={()=>{ router.push('/'); setOpen(false); }} className="chip w-full justify-start">Catálogo</button>
          <button onClick={()=>{ router.push('/avaliacoes'); setOpen(false); }} className="chip w-full justify-start">Avaliações & Loja</button>
          <button onClick={()=>{ router.push('/contato'); setOpen(false); }} className="chip w-full justify-start">Contato</button>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="chip w-full justify-start">Instagram</a>
        </nav>
        <div className="mt-4">
          <div className="text-sm font-semibold mb-2">Marcas</div>
          <div className="grid grid-cols-3 gap-2">
            {brands.map((b)=>(
              <button key={b} onClick={()=>{ router.push(`/`+`?marca=${encodeURIComponent(b)}`); setOpen(false);}}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                <img src={`/marcas/${b.toLowerCase()}.svg`} alt={b} className="w-full h-10 object-contain brand-logo"/>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-semibold mb-2">Categorias</div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c)=>(
              <button key={c} onClick={()=>{ router.push(`/?cat=${encodeURIComponent(c)}`); setOpen(false);}}
                className="chip">{c}</button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-magnetic w-full block text-center">WhatsApp</a>
        </div>
      </aside>
    </div>
  );
}
