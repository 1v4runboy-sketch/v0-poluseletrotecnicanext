'use client';
import { useEffect, useRef, useState } from 'react';

// normaliza: string | {src,alt?} -> string src
function toSrc(img) {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.src) return String(img.src);
  return '';
}

export default function ProductGallery({ images, alt }) {
  const norm = Array.isArray(images) ? images.map(toSrc).filter(Boolean) : [];
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${idx * 100}%)`;
    }
  }, [idx]);

  if (norm.length === 0) {
    return (
      <div className="w-full aspect-[4/3] flex items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <span className="text-xs opacity-70">sem imagens</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div ref={trackRef} className="flex transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]">
          {norm.map((src, i) => (
            <div key={i} className="min-w-full">
              <img
                src={src}
                alt={`${alt || ''} - ${i+1}`}
                className="w-full h-auto object-contain"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {norm.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i === 0 ? norm.length - 1 : i - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/70"
              aria-label="Imagem anterior"
            >‹</button>
            <button
              onClick={() => setIdx((i) => (i === norm.length - 1 ? 0 : i + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/70"
              aria-label="Próxima imagem"
            >›</button>
          </>
        )}
      </div>

      {norm.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {norm.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ir à imagem ${i+1}`}
              className={`w-2.5 h-2.5 rounded-full transition ${i === idx ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
