'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ProductCarousel({ images=[], auto=true, interval=4000, indicators=true, pauseOnHover=true, className='' }){
  const [idx,setIdx]=useState(0);
  const [paused,setPaused]=useState(false);
  const startX=useRef(null);
  const go=(n)=> setIdx(i=>(n+images.length)%images.length);
  const next=()=> go(idx+1);
  const prev=()=> go(idx-1);

  useEffect(()=>{
    const prefersReduced = typeof window!=='undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!auto || paused || images.length<=1 || prefersReduced) return;
    const id=setInterval(()=> setIdx(i=>(i+1)%images.length), interval);
    return ()=> clearInterval(id);
  },[auto, paused, interval, images.length]);

  const onPointerDown=e=>{ startX.current=e.clientX; };
  const onPointerUp=e=>{
    if(startX.current==null) return;
    const dx=e.clientX-startX.current;
    if(Math.abs(dx)>50) dx>0 ? prev() : next();
    startX.current=null;
  };

  return (
    <div className={`relative w-full h-full ${className}`} onPointerDown={onPointerDown} onPointerUp={onPointerUp}
         onMouseEnter={()=> pauseOnHover&&setPaused(true)} onMouseLeave={()=> pauseOnHover&&setPaused(false)}>
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {images.map((im,i)=>(
          <img key={i} src={im.src} alt={im.alt||''} className="absolute inset-0 w-full h-full object-contain transition-all duration-300"
               style={{opacity: i===idx?1:0, transform:`translateX(${i===idx?0:(i<idx?-12:12)}px)`}}/>
        ))}
      </div>
      {images.length>1 && (
        <>
          <button className="carousel-arrow left-2" aria-label="Anterior" onClick={prev}>‹</button>
          <button className="carousel-arrow right-2" aria-label="Próximo" onClick={next}>›</button>
        </>
      )}
      {indicators && images.length>1 && (
        <div className="absolute bottom-2 right-2 flex gap-1">
          {images.map((_,i)=>(
            <button key={i} onClick={()=>go(i)} className={`w-2 h-2 rounded-full ${i===idx?'bg-weg':'bg-gray-400/70 dark:bg-gray-500/70'}`} aria-label={`Ir para imagem ${i+1}`} />
          ))}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 dark:bg-white/10">
        <div className="h-full bg-weg transition-all" style={{width:`${((idx+1)/images.length)*100}%`}}/>
      </div>
    </div>
  );
}
