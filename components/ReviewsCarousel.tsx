'use client';
import React, { useEffect, useState } from 'react';
import { REVIEWS } from '@/lib/reviews';
import { ChevronLeft, ChevronRight } from './icons';
export default function ReviewsCarousel(){
  const [i, setI] = useState(0);
  useEffect(()=>{ const t = setInterval(()=>setI(prev => (prev+1)%REVIEWS.length), 4000); return ()=>clearInterval(t); }, []);
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl border border-black/10 dark:border:white/10">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${i*100}%)` }}>
          {REVIEWS.map((r,idx)=>(
            <div key={idx} className="min-w-full p-6 bg-white/70 dark:bg-black/40 backdrop-blur">
              <div className="flex gap-4 items-center">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover border border-black/10 dark:border-white/10" onError={(e)=>{ (e.target as HTMLImageElement).src='/produtos/placeholder.webp'; }} />
                <div>
                  <div className="font-medium">{r.name}</div>
                  <p className="text-zinc-600 dark:text-zinc-300">{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button aria-label="Anterior" onClick={()=>setI((i-1+REVIEWS.length)%REVIEWS.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"><ChevronLeft/></button>
      <button aria-label="Próxima" onClick={()=>setI((i+1)%REVIEWS.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"><ChevronRight/></button>
    </div>
  );
}
