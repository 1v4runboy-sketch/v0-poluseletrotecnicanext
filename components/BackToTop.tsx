'use client';
import React, { useEffect, useState } from 'react';
export default function BackToTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    function onScroll(){ setShow(window.scrollY > 500); }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button aria-label="Voltar ao topo" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-6 right-6 z-40 rounded-full px-3 py-2 bg-black/80 text-white dark:bg-white/80 dark:text-black border border-white/20 shadow-lg backdrop-blur">
      ↑ Topo
    </button>
  );
}
