'use client';
import { useEffect } from 'react';
import { brands, products } from '../lib/products';
import { useRouter } from 'next/navigation';
import { whatsappHref } from '../lib/site';

function norm(s:string){
  return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

function treeFromProducts(){
  const out: Record<string, Set<string>> = {};
  for(const p of products){
    if(!p.category) continue;
    const cat = p.category;
    out[cat] ??= new Set();
    if (p.subcategory) out[cat].add(p.subcategory);
  }
  const obj: Record<string,string[]> = {};
  for(const k of Object.keys(out)) obj[k] = Array.from(out[k]).sort();
  return obj;
}

export default function Sidebar({ open, setOpen }){
  const router = useRouter();
  useEffect(()=>{
    const onEsc = (e)=>{ if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return ()=> window.removeEventListener('keydown', onEsc);
  },[setOpen]);

  const tree = treeFromProducts();
  const brandList = brands.filter(b => norm(b) !== 'polus' && norm(b) !== 'polus eletrotecnica' && norm(b) !== 'polus eletrotécnica');

  return (
    <div className={`fixed inset-0 z-[120] transition ${open?'':'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 ${open?'opacity-100':'opacity-0'}`} onClick={()=>setOpen(false)} />
      <aside className={`absolute left-0 top-0 bottom-0 w-80 p-4 bg-white dark:bg-slate-900 shadow-xl transition-transform ${open?'translate-x-0':'-translate-x-full'}`}>
        <h3 className="text-lg font-semibold mb-3">Navegação</h3>
        <nav className="space-y-2">
          <button onClick={()=>{ router.push('/'); setOpen(false); }} className="chip w-full justify-start">Catálogo</button>
          <button onClick={()=>{ router.push('/avaliacoes'); setOpen(false); }} className="chip w-full justify-start">Avaliações & Loja & Contato</button>
          <a href="https://www.instagram.com/_poluseletrotecnica/" target="_blank" rel="noopener noreferrer" className="chip w-full justify-start">Instagram</a>
        </nav>

        <div className="mt-4">
          <div className="text-sm font-semibold mb-2">Marcas</div>
          <div className="flex flex-wrap gap-2">
            {brandList.map((b)=>(
              <button key={b} onClick={()=>{ router.push('/?marca='+encodeURIComponent(b)); setOpen(false);} } className="chip">{b}</button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-semibold mb-2">Categorias</div>
          <div className="flex flex-col gap-2 max-h-[40vh] overflow-auto pr-1">
            {Object.keys(tree).sort().map(cat=>(
              <div key={cat}>
                <button className="chip mb-1" onClick={()=>{ router.push('/?cat='+encodeURIComponent(cat)); setOpen(false); }}>{cat}</button>
                <div className="flex flex-wrap gap-2 ml-1">
                  {tree[cat].map((s)=>(
                    <button key={s} className="chip" onClick={()=>{ router.push(`/?cat=${encodeURIComponent(cat)}&sub=${encodeURIComponent(s)}`); setOpen(false); }}>{s}</button>
                  ))}
                </div>
              </div>
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
