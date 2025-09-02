'use client';
import { useEffect, useRef, useState } from 'react';
import BrandBadge from './BrandBadge';

export default function ProductCarousel({ images, brand }){
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const progRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const n = images?.length || 0;

  useEffect(()=>{
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mql.matches) return;
    let t: any;
    function loop(){
      t = setTimeout(()=>{ if(!hover) setIdx(i=> (i+1)%n); loop(); }, 3000);
    }
    if(n>0){ loop(); }
    return ()=> clearTimeout(t);
  },[n, hover]);

  useEffect(()=>{
    if(!progRef.current) return;
    progRef.current.style.width = '0%';
    const id = setTimeout(()=>{
      if(progRef.current) progRef.current.style.transition = 'width 3s linear';
      if(progRef.current) progRef.current.style.width = '100%';
    }, 50);
    return ()=>{ clearTimeout(id); if(progRef.current){ progRef.current.style.transition='none'; } };
  },[idx]);

  const go = (d)=> setIdx(i=> (i + d + n) % n);
  const onTouch = (()=>{
    let startX=0;
    return {
      onTouchStart:(e)=>{ startX = e.touches[0].clientX; },
      onTouchEnd:(e)=>{ const dx = e.changedTouches[0].clientX - startX; if(Math.abs(dx)>40){ go(dx>0?-1:1); } }
    };
  })();

  return (
    <div className="relative select-none" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} ref={container}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800" {...onTouch}>
        {images?.map((im, i)=> (
          <img key={i} src={im.src} alt={im.alt||''} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
               style={{ opacity: i===idx?1:0}} loading={i===0?'eager':'lazy'} decoding="async"/>
        ))}
        <BrandBadge brand={brand} />
        <button aria-label="Anterior" onClick={()=>go(-1)} className="carousel-arrow left-2">‹</button>
        <button aria-label="Próxima" onClick={()=>go(1)} className="carousel-arrow right-2">›</button>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div ref={progRef} className="h-full bg-weg" />
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images?.map((_,i)=>(
            <button key={i} aria-label={`Ir à imagem ${i+1}`} onClick={()=>setIdx(i)} className="w-2 h-2 rounded-full"
              style={{ background: i===idx?'#0A6CB2':'rgba(255,255,255,.6)'}} />
          ))}
        </div>
      </div>
    </div>
  );
}
