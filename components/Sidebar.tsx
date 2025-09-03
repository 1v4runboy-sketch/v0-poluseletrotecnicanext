'use client';
import { useEffect, useRef } from 'react';
import { brands, products } from '../lib/products';
import { useRouter } from 'next/navigation';
import { whatsappHref } from '../lib/site';
import ClientPortal from './ClientPortal';

const norm = (s)=> String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();

function treeFromProducts(){
  const out = {};
  for (const p of products){
    if(!p.category) continue;
    const cat = p.category;
    const sub = p.subcategory || 'Outros';
    (out[cat] ??= {});
    out[cat][sub] = (out[cat][sub] || 0) + 1;
  }
  return out;
}

export default function Sidebar({ open, setOpen }){
  const router = useRouter();
  const tree = treeFromProducts();
  const brandList = brands.filter(b => !['polus','polus eletrotecnica','polus eletrotécnica'].includes(norm(b)));

  // ESC fecha
  useEffect(()=>{
    const onEsc = (e)=>{ if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', onEsc);
    return ()=> window.removeEventListener('keydown', onEsc);
  },[setOpen]);

  // scroll lock ao abrir
  useEffect(()=>{
    if(open){
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      return ()=> { document.documentElement.style.overflow = prev; };
    }
  },[open]);

  // Focus primeiro elemento ao abrir
  const firstBtn = useRef(null);
  useEffect(()=>{ if(open && firstBtn.current) firstBtn.current.focus(); },[open]);

  // Swipe para fechar (mobile)
  const panelRef = useRef(null);
  useEffect(()=>{
    if(!open) return;
    let startX = 0, curX = 0, dragging = false;
    const onTouchStart = (e)=>{ dragging = true; startX = curX = e.touches[0].clientX; };
    const onTouchMove  = (e)=>{ if(!dragging) return; curX = e.touches[0].clientX; const dx = curX - startX; if(dx<0) return; panelRef.current.style.transform = `translateX(${dx}px)`; };
    const onTouchEnd   = ()=>{ if(!dragging) return; dragging=false; const dx = curX - startX; if(dx>80) setOpen(false); panelRef.current.style.transform=''; };
    const el = panelRef.current;
    el?.addEventListener('touchstart', onTouchStart, {passive:true});
    el?.addEventListener('touchmove', onTouchMove, {passive:true});
    el?.addEventListener('touchend', onTouchEnd, {passive:true});
    return ()=>{ el?.removeEventListener('touchstart', onTouchStart); el?.removeEventListener('touchmove', onTouchMove); el?.removeEventListener('touchend', onTouchEnd); };
  },[open, setOpen]);

  // Helpers de navegação
  const go = (url)=>{ setOpen(false); router.push(url); };

  // UI
  return (
    <ClientPortal className="sidebar-portal">
      <div className={`sidebar-backdrop ${open?'sb-open':''}`} aria-hidden={!open}>
        <div className="sidebar-mask" onClick={()=> setOpen(false)} />

        <aside ref={panelRef} className={`sidebar-panel ${open?'sb-in':''}`}>
          {/* Cabeçalho */}
          <div className="sidebar-header">
            <div className="text-base font-semibold">Menu</div>
            <button
              ref={firstBtn}
              onClick={()=> setOpen(false)}
              className="sidebar-close"
              aria-label="Fechar menu"
            >×</button>
          </div>

          {/* Ações rápidas */}
          <nav className="sidebar-section">
            <button onClick={()=> go('/')} className="sidebar-link">🏠 Catálogo</button>
            <button onClick={()=> go('/avaliacoes')} className="sidebar-link">⭐ Avaliações & Loja & Contato</button>
            <a href="https://www.instagram.com/_poluseletrotecnica/" target="_blank" rel="noopener noreferrer" className="sidebar-link">📸 Instagram</a>
          </nav>

          {/* Marcas */}
          <div className="sidebar-section">
            <div className="sidebar-title">Marcas</div>
            <div className="flex flex-wrap gap-2">
              {brandList.map((b)=>(
                <button key={b} onClick={()=> go('/?marca='+encodeURIComponent(b))} className="sidebar-chip hover-glow">{b}</button>
              ))}
            </div>
          </div>

          {/* Categorias + Subcategorias com contagem */}
          <div className="sidebar-section">
            <div className="sidebar-title">Categorias</div>
            <div className="flex flex-col gap-3">
              {Object.keys(tree).sort().map(cat=>(
                <div key={cat} className="space-y-2">
                  <button onClick={()=> go('/?cat='+encodeURIComponent(cat))} className="sidebar-chip w-full justify-between">
                    <span>{cat}</span>
                    <span className="opacity-70">
                      {Object.values(tree[cat]).reduce((a,b)=>a+b,0)}
                    </span>
                  </button>
                  <div className="flex flex-wrap gap-2 pl-2">
                    {Object.keys(tree[cat]).sort().map(sub=>(
                      <button key={sub}
                        onClick={()=> go(`/?cat=${encodeURIComponent(cat)}&sub=${encodeURIComponent(sub)}`)}
                        className="sidebar-chip hover-glow">
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
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-quote w-full justify-center inline-flex">Falar no WhatsApp</a>
          </div>

          {/* rodapé */}
          <div className="pt-6 text-xs opacity-60">© {new Date().getFullYear()} Polus Eletrotécnica</div>
        </aside>
      </div>
    </ClientPortal>
  );
}
