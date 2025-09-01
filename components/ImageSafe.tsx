'use client';
import React, { useState } from 'react';

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function ImageSafe({ src, alt = '', className, width, height, ...rest }: Props){
  const [err, setErr] = useState(false);
  const finalSrc = err ? '/produtos/placeholder.webp' : (src || '/produtos/placeholder.webp');
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      onError={()=> setErr(true)}
      {...rest}
    />
  );
}
