'use client';
import { useEffect } from 'react';

export default function HeroColorSync({ src }:{ src: string }) {
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = canvas.width = 64, h = canvas.height = 64;
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0,0,w,h).data;
      let r=0,g=0,b=0,c=0;
      for (let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; c++; }
      r=Math.floor(r/c); g=Math.floor(g/c); b=Math.floor(b/c);
      const color = `rgba(${r},${g},${b},0.55)`;
      document.documentElement.style.setProperty('--hero-color', color);
    };
  }, [src]);
  return null;
}
