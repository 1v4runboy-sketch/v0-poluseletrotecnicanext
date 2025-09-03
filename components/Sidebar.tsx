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

// ícones inline (JS-only)
const IconHome = (p:any)=>(<svg width="18" height="18" viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 3 3 10h2v10h5v-6h4v6h5V10h2z"/></svg>);
const IconStar = (p:any)=>(<svg width="18" height="18" viewBox="0 0 24 24" {...p}><path fill="currentColor" d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73-1.64 7.03z"/></svg>);
const IconIg   = (p:any)=>(<svg width="18" height="18" viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2.2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 7.2M18 6.5a1 1 0 1 1-1 1a1 1 0 0 1 1-1"/></svg>);
const IconWp   = (p:any)=>(<svg width="18" height="18" viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a10 10 0 0 0-8.94 14.61L2 22l5.55-1.46A10 10 0 1 0 12 2m0 2a8 8 0 0 1 6.32 12.91l-.33.4l.63 2.34l-2.41-.65l-.4.24A8 8 0 1 1 12 4m-3.6 4.1l.16-.02c.32 0 .74.05 1.19.81c.12.2.29.5.33.54c.05.06.07.13.03.21c-.35.72-.73 1.1-.94 1.32c-.14.14-.3.31-.13.58c.17.26.76 1.26 1.64 2.04c1.12.99 2.07 1.32 2.36 1.46c.29.14.46.12.63-.07c.17-.2.72-.84.91-1.13c.19-.29.38-.24.63-.14c.26.1 1.62.76 1.9.9c.28.14.47.21.53.33c.06.14.06.8-.19 1.57c-.26.77-1.51 1.48-2.11 1.58c-.53.08-1.2.16-2.03-.13c-.83-.29-1.81-.63-3.13-1.54c-1.32-.91-2.17-2.06-2.48-2.4c-.31-.34-.79-1.05-1.06-1.94c-.27-.88-.02-1.86.1-2.03c.12-.17.27-.39.47-.61c.2-.22.55-.53.62-.58Z"/></svg>);

export default function Sidebar({ open, setOpen }:{ open:boolean; setOpen:(v:boolean)=>void }){
  const router = useRouter();
  const tree = buildTree();
  const brandList = brands
    .filter(b => !['polus','polus eletrotecnica','polus eletrotécnica'].includes(norm(b)))
    .slice(0,24);
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

  // Essentials inline → overlay sempre
  const overlay: React.CSSProperties = { position:'fixed', inset:'0', zIndex:100000, pointerEvents: open?'auto':'none' };
  const mask: React.CSSProperties    = { position:'absolute', inset:'0', background:'rgba(0,0,0,.45)', opacity: open?1:0, transition:'opacity .25s cubic-bezier(.2,.8,.2,1)' };
  const panel: React.CSSProperties   = {
    position:'fixed', left:0, top:0, height:'100vh', width:'min(88vw,360px)', padding:'20px', overflow:'auto',
    background:'linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.78))',
    backdropFilter:'blur(14px)', borderRight:'1px solid rgba(0,0,0,.06)',
    boxShadow:'0 10px 50px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.35)',
    transform:`translateX(${open?0:-100}%)`, transition:'transform .28s cubic-bezier(.2,.8,.2,1)', borderRadius:'0 18px 18px 0'
  };

  return (
    <ClientPortal>
      <div style={overlay} aria-hidden={!open}>
        <div style={mask} onClick={()=> setOpen(false)} />
        <aside ref={panelRef} style={panel}>
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-base font-semibold">Navegação</div>
            <button onClick={()=> setOpen(false)} className="sidebar-close" aria-label="Fechar">×</button>
          </div>

          {/* Ações rápidas */}
          <div className="sidebar-section">
            <button onClick={()=> go('/')} className="sidebar-link flex items-center gap-2"><IconHome/> Catálogo</button>
            <button onClick={()=> go('/avaliacoes')} className="sidebar-link flex items-center gap-2"><IconStar/> Avaliações & Loja & Contato</button>
            <a href="https://www.instagram.com/_poluseletrotecnica/" target="_blank" rel="noopener noreferrer" className="sidebar-link flex items-center gap-2"><IconIg/> Instagram</a>
          </div>

          {/* Marcas */}
          <div className="sidebar-section">
            <div className="sidebar-title">Marcas</div>
            <div className="flex flex-wrap gap-2">
              {brandList.map(b=>(
                <button key={b} onClick={()=> go('/?marca='+encodeURIComponent(b))} className="sidebar-chip hover-glow">{b}</button>
              ))}
            </div>
          </div>

          {/* Categorias + Subcategorias */}
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

          {/* CTA */}
          <div className="mt-6">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-quote w-full justify-center inline-flex"><IconWp/> Falar no WhatsApp</a>
          </div>

          <div className="pt-6 text-xs opacity-60">© {new Date().getFullYear()} Polus Eletrotécnica</div>
        </aside>
      </div>
    </ClientPortal>
  );
}
