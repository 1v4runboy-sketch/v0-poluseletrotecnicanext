'use client';
import React, { useEffect, useRef, useState } from 'react';
export default function LogoSpinner() {
  const [speed, setSpeed] = useState(8);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let start: number | null = null;
    let rot = 0; let raf = 0;
    function step(ts: number){
      if (start==null) start = ts;
      const degPerSec = 360 / speed;
      rot = (rot + degPerSec * (1/60)) % 360;
      el.style.transform = `rotateY(${rot}deg)`;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  return (
    <div ref={ref} onMouseEnter={()=>setSpeed(3)} onMouseLeave={()=>setSpeed(8)} className="relative w-10 h-10 [transform-style:preserve-3d]" style={{ filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.45)) drop-shadow(0 0 24px rgba(14,165,233,0.35))' }} aria-label="Logo giratório">
      <div className="absolute inset-0 [backface-visibility:hidden] flex items-center justify-center bg-white rounded-full">
        <img src="/polus-logo.svg" alt="Polus" className="w-8 h-8" />
      </div>
      <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center bg-black rounded-full">
        <img src="/polus-logo.svg" alt="Polus (verso)" className="w-8 h-8 invert" />
      </div>
    </div>
  );
}
