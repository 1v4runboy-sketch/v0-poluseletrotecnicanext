'use client';
import { useState } from 'react';

export default function LogoSpinner(){
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      className="relative w-10 h-10 backface-hidden"
      style={{ perspective: '600px', filter:'drop-shadow(0 6px 18px rgba(10,108,178,.45))' }}
    >
      <div
        className="absolute inset-0 rounded-xl backface-hidden will-change-transform"
        style={{
          transform: `rotateY(${hover ? 360 : 0}deg)`,
          transition: 'transform .9s cubic-bezier(.22,.61,.36,1)',
          transformStyle:'preserve-3d'
        }}
      >
        <img src="/polus-logo.svg" alt="Polus" className="absolute inset-0 w-full h-full object-contain backface-hidden" />
        <img src="/motor-favicon.svg" alt="" className="absolute inset-0 w-full h-full object-contain backface-hidden" style={{ transform:'rotateY(180deg)'}}/>
      </div>
    </div>
  );
}
