'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoSpinner(){
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const goHome = ()=> router.push('/');

  const onKey = (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goHome(); } };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Voltar ao catálogo"
      onKeyDown={onKey}
      onClick={goHome}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      className="relative w-14 h-14 backface-hidden cursor-pointer"
      style={{ perspective: '600px', filter:'drop-shadow(0 6px 18px rgba(10,108,178,.45))' }}
    >
      <div
        className={`absolute inset-0 rounded-xl backface-hidden will-change-transform logo-spin ${hover?'fast':''}`}
        style={{ transformStyle:'preserve-3d' }}
      >
        {/* Frente */}
        <img src="/polus-logo.svg" alt="Polus" className="absolute inset-0 w-full h-full object-contain backface-hidden" />
        {/* Verso idêntico (não espelhado) */}
        <img src="/polus-logo.svg" alt="" className="absolute inset-0 w-full h-full object-contain backface-hidden" style={{ transform:'rotateY(180deg)'}}/>
      </div>
    </div>
  );
}
