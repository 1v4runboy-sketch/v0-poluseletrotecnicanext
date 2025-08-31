'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
type Img = { src: string; alt: string };
export default function ProductCarousel({ images }: { images: Img[] }){
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const startX = useRef<number|null>(null);
  const mql = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const go = (d: number) => setI(prev => (prev + d + images.length) % images.length);
  useEffect(()=>{
    if (mql?.matches) return;
    const t = setInterval(()=>{ if(!hover) go(1); }, 3500);
    return ()=>clearInterval(t);
  }, [hover, images.length]);
  function onPointerDown(e: React.PointerEvent){ startX.current = e.clientX; }
  function onPointerUp(e: React.PointerEvent){
    if (startX.current==null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx<0 ? 1 : -1);
    startX.current = null;
  }
  return (
    <div className="relative group" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className="overflow-hidden rounded-lg">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${i*100}%)` }}>
          {images.map((im,idx)=>(
            <div key={idx} className="min-w-full">
              <img src={im.src} alt={im.alt} className="w-full h-48 object-contain bg-white dark:bg-zinc-900" />
            </div>
          ))}
        </div>
      </div>
      <button aria-label="Anterior" onClick={()=>go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"><ChevronLeft /></button>
      <button aria-label="Próxima" onClick={()=>go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"><ChevronRight /></button>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_,idx)=>(<button key={idx} aria-label={`Ir para ${idx+1}`} onClick={()=>setI(idx)} className={`w-2 h-2 rounded-full ${i===idx?'bg-white':'bg-white/50'}`} />))}
      </div>
    </div>
  );
}
