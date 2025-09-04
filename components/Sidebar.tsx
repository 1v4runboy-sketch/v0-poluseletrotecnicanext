'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ClientPortal from '@/components/ClientPortal';

type Props = { open: boolean; setOpen: (v:boolean)=>void };

export default function Sidebar({ open, setOpen }: Props){
  // trava/destrava scroll do body
  useEffect(()=>{ document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  // ESC fecha
  useEffect(()=>{
    const onKey = (e: KeyboardEvent)=>{ if(e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  // swipe para fechar
  const panelRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    if(!open) return;
    let s=0, x=0, drag=false;
    const onStart=(e:TouchEvent)=>{ drag=true; s=e.touches[0].clientX; x=s; };
    const onMove =(e:TouchEvent)=>{ if(!drag) return; x=e.touches[0].clientX; const dx=x-s; if(dx<0) return; if(panelRef.current) panelRef.current.style.transform=`translateX(${dx}px)`; };
    const onEnd  =()=>{ if(!drag) return; drag=false; const dx=x-s; if(dx>80) setOpen(false); if(panelRef.current) panelRef.current.style.transform='' };
    const el = panelRef.current;
    el?.addEventListener('touchstart', onStart, {passive:true});
    el?.addEventListener('touchmove',  onMove,  {passive:true});
    el?.addEventListener('touchend',   onEnd,   {passive:true});
    return ()=>{ el?.removeEventListener('touchstart', onStart); el?.removeEventListener('touchmove', onMove); el?.removeEventListener('touchend', onEnd); };
  },[open, setOpen]);

  // estilos essenciais inline (funcionam sem depender do seu globals.css)
  const overlay: React.CSSProperties = {
    position:'fixed', inset:'0', zIndex:2147483000, pointerEvents: open ? 'auto' : 'none'
  };
  const mask: React.CSSProperties = {
    position:'absolute', inset:'0', background:'rgba(0,0,0,.45)', opacity: open ? 1 : 0,
    transition:'opacity .25s cubic-bezier(.2,.8,.2,1)'
  };
  const panel: React.CSSProperties = {
    position:'fixed', left:0, top:0, height:'100vh', width:'min(88vw,360px)',
    padding:'18px', overflow:'auto',
    background:'linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.78))',
    backdropFilter:'blur(14px)',
    WebkitBackdropFilter:'blur(14px)',
    borderRight:'1px solid rgba(0,0,0,.06)',
    boxShadow:'0 10px 50px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.35)',
    borderRadius:'0 18px 18px 0',
    transform:`translateX(${open ? 0 : -100}%)`,
    transition:'transform .28s cubic-bezier(.2,.8,.2,1)'
  };

  return (
    <ClientPortal>
      <div style={overlay} aria-hidden={!open}>
        <div style={mask} onClick={()=> setOpen(false)} />
        <aside ref={panelRef} style={panel} role="dialog" aria-modal="true" aria-label="Menu lateral">
          {/* Cabeçalho */}
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
            <div className="text-base font-semibold">Menu</div>
            <button onClick={()=> setOpen(false)} className="rounded-xl px-3 py-1 bg-black/10 dark:bg-white/10">Fechar</button>
          </div>

          {/* Seções */}
          <nav style={{display:'flex', flexDirection:'column', gap:8}}>
            <Link href="/" onClick={()=> setOpen(false)} className="sidebar-link">🏠 Home</Link>
            <Link href="/avaliacoes" onClick={()=> setOpen(false)} className="sidebar-link">⭐ Avaliações & Loja & Contato</Link>
          </nav>

          <div style={{marginTop:16}} className="sidebar-section">
            <div className="sidebar-title">Atalhos</div>
            <div className="flex flex-wrap gap-2">
              <Link href="/marcas"   onClick={()=> setOpen(false)} className="sidebar-chip hover-glow">Marcas</Link>
              <Link href="/ofertas"  onClick={()=> setOpen(false)} className="sidebar-chip hover-glow">Ofertas</Link>
              <Link href="/suporte"  onClick={()=> setOpen(false)} className="sidebar-chip hover-glow">Suporte</Link>
            </div>
          </div>
        </aside>
      </div>
    </ClientPortal>
  );
}
