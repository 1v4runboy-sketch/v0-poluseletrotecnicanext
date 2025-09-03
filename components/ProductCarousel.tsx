'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import BrandBadge from './BrandBadge';
import ImageSafe from './ImageSafe';

export default function ProductCarousel({ images, brand, product }){
  // limpa a lista de imagens (só src válidos)
  const pics = useMemo(()=> (Array.isArray(images) ? images.filter(x => x && x.src) : []), [images]);
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const progRef = useRef(null);
  const n = pics.length;

  // autoplay
  useEffect(()=>{
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mql.matches || n <= 1) return;
    let t;
    const loop = ()=> { t = setTimeout(()=>{ if(!hover) setIdx(i=> (i+1)%n); loop(); }, 3000); };
    loop();
    return ()=> clearTimeout(t);
  },[n, hover]);

  // barra de progresso
  useEffect(()=>{
    if(!progRef.current || n<=1) return;
    progRef.current.style.width = '0%';
    const id = setTimeout(()=>{
      if(progRef.current) progRef.current.style.transition = 'width 3s linear';
      if(progRef.current) progRef.current.style.width = '100%';
    }, 50);
    return ()=>{ clearTimeout(id); if(progRef.current){ progRef.current.style.transition='none'; } };
  },[idx, n]);

  const go = (d)=> setIdx(i=> (i + d + n) % Math.max(n,1));

  // mostra apenas UMA imagem
  const cur = pics[idx] || pics[0];

  return (
    <div className="relative select-none" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        {cur && (
          <ImageSafe
            src={cur.src}
            alt={cur.alt || ''}
            className="absolute inset-0 w-full h-full object-contain"
            loading="eager"
            decoding="async"
          />
        )}
        <BrandBadge brand={brand} product={product} />
        {n>1 && <>
          <button aria-label="Anterior" onClick={()=>go(-1)} className="carousel-arrow left-2">‹</button>
          <button aria-label="Próxima" onClick={()=>go(1)} className="carousel-arrow right-2">›</button>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div ref={progRef} className="h-full bg-weg" />
          </div>
        </>}
      </div>
    </div>
  );
}
