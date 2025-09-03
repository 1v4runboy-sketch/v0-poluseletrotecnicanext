'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoSpinner(){
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const goHome = ()=> router.push('/');
  const onKey = (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goHome(); } };

  // leve “breathing” glow quando não estiver em hover
  const [glow, setGlow] = useState(false);
  useEffect(()=>{
    const t = setInterval(()=> setGlow(g => !g), 1800);
    return ()=> clearInterval(t);
  },[]);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Voltar ao catálogo"
      onKeyDown={onKey}
      onClick={goHome}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      className="relative w-14 h-14 backface-hidden cursor-pointer select-none"
      style={{ perspective: '600px' }}
    >
      <div
        className={`absolute inset-0 rounded-xl backface-hidden will-change-transform logo-spin ${hover?'fast':''}`}
        style={{
          transformStyle:'preserve-3d',
          filter: hover
            ? 'drop-shadow(0 10px 30px rgba(34,197,94,.50))'
            : (glow ? 'drop-shadow(0 6px 22px rgba(10,108,178,.45))' : 'drop-shadow(0 4px 16px rgba(10,108,178,.35))')
        }}
      >
        {/* Frente */}
        <img src="/polus-logo.svg" alt="Polus" className="absolute inset-0 w-full h-full object-contain backface-hidden" />
        {/* Verso idêntico (não espelhado) */}
        <img src="/polus-logo.svg" alt="" className="absolute inset-0 w-full h-full object-contain backface-hidden" style={{ transform:'rotateY(180deg)'}}/>
      </div>
    </div>
  );
}
