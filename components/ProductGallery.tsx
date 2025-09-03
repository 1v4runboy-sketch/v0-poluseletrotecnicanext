'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = { images: string[]; alt: string };

export default function ProductGallery({ images, alt }: Props){
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if(!el) return;
    el.style.transform = `translateX(-${idx * 100}%)`;
  }, [idx]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <div ref={trackRef} className="flex transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]">
          {images.map((src, i) => (
            <div key={i} className="min-w-full">
              <Image src={src} alt={`${alt} - ${i+1}`} width={1200} height={900} className="w-full h-auto object-contain bg-white dark:bg-slate-900" />
            </div>
          ))}
        </div>

        {/* setas */}
        {images.length > 1 && (
          <>
            <button onClick={() => setIdx((i) => (i === 0 ? images.length-1 : i-1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/70"
              aria-label="Imagem anterior">‹</button>
            <button onClick={() => setIdx((i) => (i === images.length-1 ? 0 : i+1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/70"
              aria-label="Próxima imagem">›</button>
          </>
        )}
      </div>

      {/* bolinhas */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Ir à imagem ${i+1}`}
              className={`w-2.5 h-2.5 rounded-full transition ${i === idx ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
          ))}
        </div>
      )}
    </div>
  );
}
