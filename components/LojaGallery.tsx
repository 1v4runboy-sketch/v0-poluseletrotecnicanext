'use client';
import React, { useState } from 'react';
const images = ['/loja/fachada-1.webp','/loja/fachada-2.webp','/loja/fachada-3.webp'];
export default function LojaGallery(){
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {images.map((src, idx)=> (
          <button key={idx} onClick={()=>{ setI(idx); setOpen(true); }} className="aspect-[4/3] overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
            <img src={src} alt={`Fachada ${idx+1}`} className="w-full h-full object-cover" onError={(e)=>{ (e.target as HTMLImageElement).src='/produtos/placeholder.webp'; }} />
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={()=>setOpen(false)}>
          <img src={images[i]} alt="" className="max-w-[90vw] max-h-[90vh]" />
        </div>
      )}
    </div>
  );
}
