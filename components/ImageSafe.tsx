'use client';
import { useState } from 'react';

export default function ImageSafe({ src, alt, className, loading='lazy', decoding='async' }){
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? '/produtos/placeholder.webp' : src}
      alt={alt || ''}
      loading={loading}
      decoding={decoding}
      onError={()=> setErr(true)}
      className={className}
    />
  );
}
