'use client';
import { useEffect, useRef, useState } from 'react';
import BrandBadge from './BrandBadge';
import ImageSafe from './ImageSafe';

export default function ProductCarousel({ images, brand }){
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const progRef = useRef(null);
  const n = images?.length || 0;

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches) return;
    let t;
    function loop(){ t = setTimeout(()=>{ if(!hover) setIdx(i=> (i+1)%n); loop(); }, 3000); }
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

  return (
    <div className="relative select-none" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        {images?.map((im, i)=> (
          <ImageSafe key={i} src={im.src} alt={im.alt||''} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
               loading={i===0?'eager':'lazy'} decoding="async"
               style={{ opacity: i===idx?1:0 }} />
        ))}
        <BrandBadge brand={brand} />
        <button aria-label="Anterior" onClick={()=>go(-1)} className="carousel-arrow left-2">‹</button>
        <button aria-label="Próxima" onClick={()=>go(1)} className="carousel-arrow right-2">›</button>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div ref={progRef} className="h-full bg-weg" />
        </div>
      </div>
    </div>
  );
}
