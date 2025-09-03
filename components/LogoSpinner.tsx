'use client';
import { useRouter } from 'next/navigation';

export default function LogoSpinner(){
  const router = useRouter();
  const goHome = ()=> router.push('/');
  const onKey = (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goHome(); } };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Voltar ao catálogo"
      onKeyDown={onKey}
      onClick={goHome}
      className="relative w-14 h-14 select-none cursor-pointer"
      style={{ perspective: '800px' }}
    >
      {/* shell gira continuamente (não reinicia nunca) */}
      <div
        className="absolute inset-0 will-change-transform group"
        style={{
          transformStyle:'preserve-3d',
          animation: 'spinY_slow 6s linear infinite', // rápido e estável
          filter: 'drop-shadow(0 8px 24px rgba(10,108,178,.45))'
        }}
      >
        {/* core só dá um leve punch no hover (sem alterar timeline) */}
        <div className="absolute inset-0 will-change-transform group-hover:scale-[1.02]" style={{ transformStyle:'preserve-3d' }}>
          {/* Frente */}
          <img
            src="/polus-logo.svg"
            alt="Polus"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ backfaceVisibility:'hidden' }}
          />
          {/* Verso não espelhado → rotateY(180) + scaleX(-1) */}
          <img
            src="/polus-logo.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            style={{ transform:'rotateY(180deg) scaleX(-1)', backfaceVisibility:'hidden' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spinY_slow { from { transform: rotateY(0deg) } to { transform: rotateY(360deg) } }
      `}</style>
    </div>
  );
}
