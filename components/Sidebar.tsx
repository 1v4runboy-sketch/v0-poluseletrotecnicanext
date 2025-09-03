'use client';
import { useEffect, useRef } from 'react';
import { brands, products } from '../lib/products';
import { useRouter } from 'next/navigation';
import { whatsappHref } from '../lib/site';
import ClientPortal from './ClientPortal';

const norm = (s:string)=> String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
function buildTree(){
  const out: Record<string, Record<string, number>> = {};
  for(const p of products){
    if(!p?.category) continue;
    const cat = p.category; const sub = p.subcategory || 'Outros';
    (out[cat] ??= {}); out[cat][sub] = (out[cat][sub]||0)+1;
  }
  return out;
}

export default function Sidebar({ open, setOpen }:{
  open: boolean; setOpen: (v:boolean)=>void
}){
  const router = useRouter();
  const tree = buildTree();
  const brandList = brands.filter(b => !['polus','polus eletrotecnica','polus eletrotécnica'].includes(norm(b)));
  const go = (url:string)=>{ setOpen(false); router.push(url); };

  // ESC
  useEffect(()=>{
    const onEsc = (e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return ()=> window.removeEventListener('keydown', onEsc);
  },[setOpen]);

  // scroll lock
  useEffect(()=>{
    if(open){
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      return ()=>{ document.documentElement.style.overflow = prev; };
    }
  },[open]);

  // swipe
  const panelRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    if(!open) return;
    let s=0, x=0, drag=false;
    const onStart=(e:TouchEvent)=>{ drag=true; s=e.touches[0].clientX; x=s; };
    const onMove =(e:TouchEvent)=>{ if(!drag) return; x=e.touches[0].clientX; const dx=x-s; if(dx<0) return; if(panelRef.current) panelRef.current.style.transform=`translateX(${dx}px)`; };
    const onEnd  =()=>{ if(!drag) return; drag=false; const dx=x-s; if(dx>80) setOpen(false); if(panelRef.current) panelRef.current.style.transform=''; };
    const el = panelRef.current;
    el?.addEventListener('touchstart', onStart, {passive:true});
    el?.addEventListener('touchmove',  onMove,  {passive:true});
    el?.addEventListener('touchend',   onEnd,   {passive:true});
    return ()=>{ el?.removeEventListener('touchstart', onStart); el?.removeEventListener('touchmove', onMove); el?.removeEventListener('touchend', onEnd); };
  },[open, setOpen]);

  // Essentials inline (garante overlay mesmo sem CSS carregado)
  const overlay: React.CSSProperties = { position:'fixed', inset:'0', zIndex:100000, pointerEvents: open?'auto':'none' };
  const mask: React.CSSProperties    = { position:'absolute', inset:'0', background:'rgba(0,0,0,.45)', opacity: open?1:0, transition:'opacity .25s cubic-bezier(.2,.8,.2,1)' };
  const panel: React.CSSProperties   = {
    position:'fixed', left:0, top:0, height:'100vh', width:'min(88vw,340px)', padding:'18px', overflow:'auto',
    background:'linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.78))',
    backdropFilter:'blur(14px)', borderRight:'1px solid rgba(0,0,0,.06)',
    boxShadow:'0 10px 50px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.35)',
    transform:`translateX(${open?0:-100}%)`, transition:'transform .28s cubic-bezier(.2,.8,.2,1)'
  };

  return (
    <ClientPortal>
      <div style={overlay} aria-hidden={!open}>
        <div style={mask} onClick={()=> setOpen(false)} />
        <aside ref={panelRef} style={panel}>
          <div className="sidebar-header">
            <div className="text-base font-semibold">Menu</div>
            <button onClick={()=> setOpen(false)} className="sidebar-close" aria-label="Fechar">×</button>
          </div>

          <nav className="sidebar-section">
            <button onClick={()=> go('/')} className="sidebar-link">🏠 Catálogo</button>
            <button onClick={()=> go('/avaliacoes')} className="sidebar-link">⭐ Avaliações & Loja & Contato</button>
            <a href="https://www.instagram.com/_poluseletrotecnica/" target="_blank" rel="noopener noreferrer" className="sidebar-link">📸 Instagram</a>
          </nav>

          <div className="sidebar-section">
            <div className="sidebar-title">Marcas</div>
            <div className="flex flex-wrap gap-2">
              {brandList.map(b=>(
                <button key={b} onClick={()=> go('/?marca='+encodeURIComponent(b))} className="sidebar-chip hover-glow">{b}</button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Categorias</div>
            <div className="flex flex-col gap-3">
              {Object.keys(tree).sort().map(cat=>(
                <div key={cat} className="space-y-2">
                  <button onClick={()=> go('/?cat='+encodeURIComponent(cat))} className="sidebar-chip w-full justify-between">
                    <span>{cat}</span>
                    <span className="opacity-70">{Object.values(tree[cat]).reduce((a,b)=>a+b,0)}</span>
                  </button>
                  <div className="flex flex-wrap gap-2 pl-2">
                    {Object.keys(tree[cat]).sort().map(sub=>(
                      <button key={sub} onClick={()=> go(`/?cat=${encodeURIComponent(cat)}&sub=${encodeURIComponent(sub)}`)} className="sidebar-chip hover-glow">
                        {sub} <span className="opacity-60">({tree[cat][sub]})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-quote w-full justify-center inline-flex">Falar no WhatsApp</a>
          </div>

          <div className="pt-6 text-xs opacity-60">© {new Date().getFullYear()} Polus Eletrotécnica</div>
        </aside>
      </div>
    </ClientPortal>
  );
}
