'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import BrandBadge from './BrandBadge';

export default function ProductCarousel({ images, brand, product }){
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
    const loop = ()=> { t = setTimeout(()=>{ if(!hover) setIdx(i=> (i+1)%n); loop(); }, 3500); };
    loop();
    return ()=> clearTimeout(t);
  },[n, hover]);

  // progress bar
  useEffect(()=>{
    if(!progRef.current || n<=1) return;
    progRef.current.style.width = '0%';
    const id = setTimeout(()=>{
      if(progRef.current){ progRef.current.style.transition = 'width 3.5s linear'; progRef.current.style.width = '100%'; }
    }, 50);
    return ()=>{ clearTimeout(id); if(progRef.current){ progRef.current.style.transition='none'; } };
  },[idx, n]);

  const go = (d)=> setIdx(i=> (i + d + n) % Math.max(n,1));

  // swipe
  useEffect(()=>{
    let startX=0, dx=0, el;
    const onStart = (e)=>{ el=e.currentTarget; startX=(e.touches?.[0]?.clientX)||0; dx=0; };
    const onMove = (e)=>{ dx=((e.touches?.[0]?.clientX)||0) - startX; };
    const onEnd  = ()=>{ if(Math.abs(dx)>50) go(dx>0?-1:1); };
    const node = document.getElementById('prod-slider');
    node?.addEventListener('touchstart', onStart, {passive:true});
    node?.addEventListener('touchmove', onMove, {passive:true});
    node?.addEventListener('touchend', onEnd, {passive:true});
    return ()=>{ node?.removeEventListener('touchstart', onStart); node?.removeEventListener('touchmove', onMove); node?.removeEventListener('touchend', onEnd); };
  },[n]);

  return (
    <div className="relative select-none" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} id="prod-slider">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        {pics.map((im, i)=>(
          <img
            key={i}
            src={im.src}
            alt={im.alt||''}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              opacity: i===idx?1:0,
              transform: `scale(${i===idx?1:1.02})`,
              transition: 'opacity .45s ease, transform .45s ease'
            }}
            loading={i===0?'eager':'lazy'}
            decoding="async"
          />
        ))}

        <BrandBadge brand={brand} product={product} />

        {n>1 && <>
          <button aria-label="Anterior" onClick={()=>go(-1)} className="carousel-arrow left-2">‹</button>
          <button aria-label="Próxima" onClick={()=>go(1)} className="carousel-arrow right-2">›</button>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div ref={progRef} className="h-full bg-weg" />
          </div>
        </>}
      </div>
    </di
