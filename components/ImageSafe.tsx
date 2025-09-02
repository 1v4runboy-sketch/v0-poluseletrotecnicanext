'use client';
import { useMemo, useState } from 'react';

export default function ImageSafe({
  src,
  srcs,
  alt = '',
  className,
  loading = 'lazy',
  decoding = 'async',
  type = 'product', // 'product' | 'brand'
}) {
  const initialList = useMemo(() => {
    const cand: string[] = [];
    const push = (s?: string) => { if (s && !cand.includes(s)) cand.push(s); };

    if (Array.isArray(srcs) && srcs.length) {
      srcs.forEach(push);
    } else if (src) {
      push(src);
      if (/\.(webp)$/i.test(src)) {
        push(src.replace(/\.webp$/i, '.png'));
        push(src.replace(/\.webp$/i, '.jpg'));
        push(src.replace(/\.webp$/i, '.jpeg'));
      }
      push(src.replace(/-\d+(\.\w+)$/i, '$1'));
    }

    if (type === 'brand') {
      push('/polus-logo.svg');
    } else {
      push('/produtos/placeholder.webp');
    }
    return cand;
  }, [src, srcs, type]);

  const [i, setI] = useState(0);
  const cur = initialList[i] || initialList[initialList.length - 1];

  return (
    <img
      src={cur}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={() => { if (i < initialList.length - 1) setI(i + 1); }}
    />
  );
}
