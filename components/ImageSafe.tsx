'use client';
import { useEffect, useState } from 'react';
import reviews from '../lib/reviews';
import ImageSafe from './ImageSafe';

export default function ReviewsCarousel(){
  const [i, setI] = useState(0);

  useEffect(()=>{
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(m.matches || reviews.length <= 1) return;
    const t = setInterval(()=> setI(x=> (x+1)%reviews.length), 3500);
    return ()=> clearInterval(t);
  },[]);

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5">Sem avaliações ainda.</div>;
  }

  return (
    <div className="relative select-none pointer-events-none">
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-linear" style={{ transform:`translateX(-${i*100}%)`}}>
          {reviews.map((r,idx)=>(
            <div key={idx} className="min-w-full p-6 bg-white/60 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <ImageSafe src={r.avatar} type="avatar" alt={r.name} className="w-12 h-12 rounded-full object-cover"/>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-yellow-500">{'★'.repeat(Math.max(0,Math.min(5,r.rating)))}{'☆'.repeat(Math.max(0,5-r.rating))}</div>
                </div>
              </div>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
