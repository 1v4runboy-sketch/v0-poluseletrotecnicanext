'use client';
import React, { useState } from 'react';
export default function ImageSafe({ src, alt, className, ...rest }:{src:string; alt:string; className?:string} & React.ImgHTMLAttributes<HTMLImageElement>){
  const [err, setErr] = useState(false);
  return <img src={err? '/produtos/placeholder.webp' : src} alt={alt} className={className} onError={()=>setErr(true)} {...rest} />;
}
