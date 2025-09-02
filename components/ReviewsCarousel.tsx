'use client';
import { useEffect, useState } from 'react';
import { reviews } from '../lib/reviews';

export default function ReviewsCarousel(){
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(()=>{
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mql.matches) return;
    const t = setInterval(()=>{ if(!hover) setI(x=> (x+1)%reviews.length); }, 3500);
    const onVis = ()=>{ if(document.hidden) setHover(true); };
    document.addEventListener('visibilitychange', onVis);
    return ()=>{ clearInterval(t); document.removeEventListener('visibilitychange', onVis); };
  },[hover]);
  return (
    <div className="relative" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform" style={{ transform:`translateX(-${i*100}%)`}}>
          {reviews.map((r,idx)=>(
            <div key={idx} className="min-w-full p-6 bg-white/60 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                </div>
              </div>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {reviews.map((_,idx)=>(
          <button key={idx} aria-label={`Ir ao slide ${idx+1}`} onClick={()=>setI(idx)} className="w-2 h-2 rounded-full"
            style={{ background: idx===i?'#0A6CB2':'rgba(0,0,0,.2)'}} />
        ))}
      </div>
    </div>
  );
}
