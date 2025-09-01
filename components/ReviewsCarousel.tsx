
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { REVIEWS } from '@/lib/reviews';

export default function ReviewsCarousel(){
  const [idx,setIdx]=useState(0);
  const startX=useRef<number|null>(null);
  const next=()=> setIdx(i=>(i+1)%REVIEWS.length);
  const prev=()=> setIdx(i=>(i-1+REVIEWS.length)%REVIEWS.length);

  useEffect(()=>{
    const prefersReduced = typeof window!=='undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const id = setInterval(next, 4000);
    return ()=> clearInterval(id);
  },[]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
      <div className="h-64 md:h-72 relative">
        {REVIEWS.map((r,i)=>(
          <div key={r.name}
               className="absolute inset-0 p-4 grid grid-cols-[72px,1fr] gap-3 items-center transition-opacity duration-300"
               style={{opacity: i===idx?1:0, transform: `translateX(${i===idx?0:(i<idx?-8:8)}px)`}}>
            <img src={r.avatar} alt={r.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-white/60" loading="lazy" decoding="async"/>
            <div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm" aria-label={`${r.rating} estrelas`}>
                {'★★★★★'.slice(0, r.rating)}<span className="opacity-60 text-xs">{r.rating}.0</span>
              </div>
              <h4 className="font-semibold">{r.name}</h4>
              <p className="opacity-80 text-sm whitespace-pre-line">{r.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {REVIEWS.map((_,i)=>(
          <button key={i} onClick={()=>setIdx(i)} className={`w-2 h-2 rounded-full ${i===idx?'bg-weg':'bg-white/60 dark:bg-white/30'}`} aria-label={'Slide '+(i+1)}/>
        ))}
      </div>
    </div>
  );
}
