'use client';
import { useEffect, useRef } from 'react';

export default function LogoSpinner({ src, size=56 }:{ src:string; size?:number }){
  const elRef = useRef<HTMLDivElement|null>(null);
  const animRef = useRef<Animation|null>(null);

  useEffect(()=>{
    const el = elRef.current;
    if(!el) return;
    // Web Animations API (sem reset)
    animRef.current = el.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 8000, iterations: Infinity, easing: 'linear' }
    );
    const a = animRef.current;
    const onEnter = ()=> a && a.updatePlaybackRate(2.2);
    const onLeave = ()=> a && a.updatePlaybackRate(1.0);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return ()=> { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); a?.cancel(); };
  },[]);

  return (
    <div ref={elRef} style={{ width:size, height:size, willChange:'transform' }}>
      <img src={src} alt="Polus" className="w-full h-full object-contain select-none" />
    </div>
  );
}
