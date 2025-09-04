'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ClientPortal from '@/components/ClientPortal';

export default function Sidebar({ open, setOpen }:{
  open: boolean; setOpen: (v:boolean)=>void;
}){
  // ESC fecha
  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[setOpen]);

  // trava scroll
  useEffect(()=>{ document.body.style.overflow = open ? 'hidden' : ''; },[open]);

  // swipe close
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

  return (
    <ClientPortal>
      <div className="sidebar-backdrop" style={{pointerEvents: open ? 'auto' : 'none'}}>
        <div className="sidebar-mask" onClick={()=> setOpen(false)} style={{opacity: open?1:0}} />
        <aside
          ref={panelRef}
          className="sidebar-panel"
          style={{ transform: `translateX(${open?0:-100}%)` }}
          role="dialog" aria-modal="true" aria-label="Menu lateral"
        >
          <div className="sidebar-header">
            <h3 className="text-base font-semibold">Navegação</h3>
            <button type="button" onClick={()=> setOpen(false)} className="sidebar-close">Fechar</button>
          </div>

          <section className="sidebar-section">
            <div className="sidebar-title">Catálogo</div>
            <div className="flex flex-col gap-2">
              <Link href="/" className="sidebar-link" onClick={()=> setOpen(false)}>🏠 Home</Link>
              <Link href="/avaliacoes" className="sidebar-link" onClick={()=> setOpen(false)}>⭐ Avaliações & Loja & Contato</Link>
            </div>
          </section>

          <section className="sidebar-section">
            <div className="sidebar-title">Atalhos</div>
            <div className="flex flex-wrap gap-2">
              <Link href="/marcas" className="sidebar-chip hover-glow" onClick={()=> setOpen(false)}>Marcas</Link>
              <Link href="/ofertas" className="sidebar-chip hover-glow" onClick={()=> setOpen(false)}>Ofertas</Link>
              <Link href="/suporte" className="sidebar-chip hover-glow" onClick={()=> setOpen(false)}>Suporte</Link>
            </div>
          </section>
        </aside>
      </div>
    </ClientPortal>
  );
}
