'use client';
import React, { useEffect } from 'react';
export default function HeroColorSync({ selector = '#hero-img' }: { selector?: string }){
  useEffect(() => {
    const el = document.querySelector<HTMLImageElement>(selector);
    if (!el) return;
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d'); if (!ctx) return;
    function calc(){
      const w = 64, h = 64;
      cvs.width = w; cvs.height = h;
      try {
        ctx.drawImage(el, 0, 0, w, h);
        const data = ctx.getImageData(0,0,w,h).data;
        let r=0,g=0,b=0,c=0;
        for (let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; c++; }
        r = Math.round(r/c); g = Math.round(g/c); b = Math.round(b/c);
        const color = `rgba(${r},${g},${b},0.45)`;
        document.documentElement.style.setProperty('--hero-color', color);
      } catch {}
    }
    if (el.complete) calc(); else el.addEventListener('load', calc, { once: true } as any);
  }, [selector]);
  return null;
}
