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
      className="relative w-14 h-14 select-none cursor-pointer"
      style={{ perspective: '700px' }}
    >
      {/* núcleo que gira continuamente; no hover acelera */}
      <div
        className="absolute inset-0 rounded-xl will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          animation: `spinY ${hover ? '4.5s' : '9s'} linear infinite`,
          filter: hover
            ? 'drop-shadow(0 10px 30px rgba(34,197,94,.55))'
            : 'drop-shadow(0 6px 22px rgba(10,108,178,.45))'
        }}
      >
        {/* Frente */}
        <img
          src="/polus-logo.svg"
          alt="Polus"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ backfaceVisibility:'hidden' }}
        />
        {/* Verso idêntico, não espelhado */}
        <img
          src="/polus-logo.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform:'rotateY(180deg)', backfaceVisibility:'hidden' }}
        />
      </div>
      {/* Definição de keyframes (escopo local) */}
      <style>{`
        @keyframes spinY { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
      `}</style>
    </div>
  );
}
