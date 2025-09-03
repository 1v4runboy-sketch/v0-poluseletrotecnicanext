'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Giro contínuo (rAF) com aceleração fluida no hover sem reset.
 * Verso correto: frente = 0deg, verso = 180deg; ambos com backface-visibility:hidden
 */
export default function LogoSpinner(){
  const router = useRouter();
  const goHome = ()=> router.push('/');

  const shellRef = useRef<HTMLDivElement|null>(null);

  const angleRef  = useRef(0);      // graus acumulados
  const speedRef  = useRef(40);     // deg/s atual (40 normal)
  const targetRef = useRef(40);     // alvo (120 no hover)
  const hoverRef  = useRef(false);
  const runningRef= useRef(false);

  useEffect(()=>{
    if (runningRef.current) return;
    runningRef.current = true;

    let raf = 0;
    let last = performance.now();
    const lerp = (a:number,b:number,t:number)=> a + (b-a)*t;

    const loop = (now: number)=>{
      const dt = (now - last) / 1000; last = now;
      targetRef.current = hoverRef.current ? 120 : 40;
      speedRef.current  = lerp(speedRef.current, targetRef.current, Math.min(1, dt*6));
      angleRef.current  = (angleRef.current + speedRef.current * dt) % 360;

      const shell = shellRef.current;
      if (shell) shell.style.transform = `rotateY(${angleRef.current}deg)`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=> cancelAnimationFrame(raf);
  },[]);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Voltar ao catálogo"
      onClick={goHome}
      onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); goHome(); } }}
      onMouseEnter={()=> (hoverRef.current = true)}
      onMouseLeave={()=> (hoverRef.current = false)}
      className="relative w-14 h-14 select-none cursor-pointer"
      style={{ perspective:'900px', filter:'drop-shadow(0 8px 24px rgba(10,108,178,.45))' }}
    >
      <div ref={shellRef} className="absolute inset-0 will-change-transform" style={{ transformStyle:'preserve-3d' }}>
        {/* Frente (0deg) */}
        <img
          src="/polus-logo.svg"
          alt="Polus"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform:'rotateY(0deg)', backfaceVisibility:'hidden' }}
        />
        {/* Verso (180deg) — sem scaleX, sem espelhamento */}
        <img
          src="/polus-logo.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform:'rotateY(180deg)', backfaceVisibility:'hidden' }}
        />
      </div>
    </div>
  );
}
