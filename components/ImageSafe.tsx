'use client';
import { useMemo, useState } from 'react';

const DATA_URI_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0A6CB2"/><stop offset="1" stop-color="#4F46E5"/>
      </linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" font-family="Arial" font-size="28" text-anchor="middle" fill="#fff">Sem imagem</text>
    </svg>`
  );

function slugify(s=''){
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}

export default function ImageSafe({
  src,
  srcs,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  type = 'product', // 'product' | 'brand' | 'facade' | 'avatar'
}) {
  const initialList = useMemo(() => {
    const cand = [];
    const push = (s) => { if (s && !cand.includes(s)) cand.push(s); };

    if (Array.isArray(srcs) && srcs.length) srcs.forEach(push);
    else if (src) {
      push(src);
      if (/\.webp$/i.test(src)) { push(src.replace(/\.webp$/i, '.png')); push(src.replace(/\.webp$/i, '.jpg')); push(src.replace(/\.webp$/i, '.jpeg')); }
      push(src.replace(/-\d+(\.\w+)$/i, '$1'));
    }

    // Heurística avatar a partir do nome
    if (type === 'avatar' && !src && alt){
      const base = slugify(alt);
      push(`/reviews/${base}.png`); push(`/reviews/${base}.jpg`); push(`/reviews/${base}_.png`);
    }

    // Placeholders finais
    if (type === 'avatar') push('/reviews/avatar-1.png');
    if (type === 'brand')  push('/polus-logo.svg');
    if (type === 'facade') push('/loja/fachada-1.webp');
    push('/produtos/placeholder.webp');
    push(DATA_URI_PLACEHOLDER);

    return cand;
  }, [src, srcs, type, alt]);

  const [i, setI] = useState(0);
  const cur = initialList[i] || initialList[initialList.length - 1];

  return (
    <img
      src={cur}
      alt={alt}
      className={String(className || '')}
      loading={loading}
      decoding={decoding}
      onError={() => { if (i < initialList.length - 1) setI(i + 1); }}
    />
  );
}
