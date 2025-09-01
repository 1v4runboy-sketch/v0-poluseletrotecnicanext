
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function LogoSpinner({ size=40 }:{ size?: number }) {
  const [speed, setSpeed] = useState(8);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    let rot = 0, raf = 0;
    const step = () => {
      rot = (rot + (360 / (speed*60))) % 360;
      el.style.transform = `rotateY(${rot}deg)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div
      className="relative [transform-style:preserve-3d] will-change-transform"
      ref={ref}
      onMouseEnter={()=>setSpeed(3)} onMouseLeave={()=>setSpeed(8)}
      style={{ width:size, height:size, filter:'drop-shadow(0 0 14px rgba(99,102,241,0.50)) drop-shadow(0 0 26px rgba(14,165,233,0.35))' }}
      aria-label="Logo giratório"
    >
      {/* face frontal */}
      <div className="absolute inset-0 backface-hidden flex items-center justify-center" style={{transform:'rotateY(0deg)'}}>
        <img src="/polus-logo.svg" alt="Polus" className="w-[70%] h-[70%] object-contain"/>
      </div>
      {/* face traseira voltada para fora (não-espelhada) */}
      <div className="absolute inset-0 backface-hidden flex items-center justify-center" style={{transform:'rotateY(180deg)'}}>
        <img src="/polus-logo.svg" alt="Polus (verso)" className="w-[70%] h-[70%] object-contain"/>
      </div>
    </div>
  );
}
