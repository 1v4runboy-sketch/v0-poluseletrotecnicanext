'use client';
import { useEffect, useState } from 'react';

export default function BackToTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return ()=> window.removeEventListener('scroll', on);
  },[]);
  if (!show) return null;
  return (
    <button
      onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-4 z-40 rounded-full w-10 h-10 bg-white/80 dark:bg-black/60 ring-1 ring-black/10 dark:ring-white/10 shadow"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >↑</button>
  );
}
