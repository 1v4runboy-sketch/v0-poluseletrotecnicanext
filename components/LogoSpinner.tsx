'use client';

import { useEffect, useRef } from 'react';

export default function LogoSpinner({ size = 84 }) {
  const angleRef = useRef(0);
  const speedRef = useRef(0.18);
  const targetRef = useRef(0.18);
  const rafRef = useRef(0);
  const coreRef = useRef(null);

  useEffect(() => {
    let last = performance.now();
    const tick = (t) => {
      const s = speedRef.current, target = targetRef.current;
      speedRef.current = s + (target - s) * 0.08;
      angleRef.current += speedRef.current;
      if (coreRef.current) coreRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size, perspective: '900px', pointerEvents: 'auto' }}
      role="button" aria-label="Voltar para a Home"
      onClick={() => { window.location.href = '/'; }}
    >
      <div className="beatWrap w-full h-full" onMouseEnter={() => { targetRef.current = 0.12; }} onMouseLeave={() => { targetRef.current = 0.18; }}>
        <div ref={coreRef} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
          {/* Frente */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
            <img src="/polus-logo.svg" alt="Polus" className="logo-glow w-full h-full object-contain" draggable={false} />
          </div>
          {/* Verso (sem espelho) */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <img src="/polus-logo.svg" alt="Polus (verso)" className="logo-glow w-full h-full object-contain" draggable={false} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .beatWrap { will-change: transform; }
        .beatWrap:hover { animation: beat 820ms ease-in-out infinite; }
        @keyframes beat { 0%,100%{ transform: scale(1);} 50%{ transform: scale(1.035);} }
      `}</style>
    </div>
  );
}
