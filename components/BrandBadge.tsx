'use client';
import ImageSafe from './ImageSafe';

function brandCandidates(brand: string) {
  const base = String(brand || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return [
    `/marcas/${base}.svg`,
    `/marcas/${base}.webp`,
    `/marcas/${base}.png`,
    `/marcas/${base}-logo.svg`,
    `/marcas/${base}-logo.webp`,
    `/marcas/${base}-logo.png`,
    `/marcas/${base}.jpg`,
  ];
}

export default function BrandBadge({ brand }) {
  const srcs = brandCandidates(brand);
  return (
    <div className="absolute left-2 top-2 p-1.5 rounded-lg bg-white/80 dark:bg-black/40 shadow">
      <ImageSafe srcs={srcs} alt={brand} className="w-16 h-6 object-contain brand-logo" type="brand" />
    </div>
  );
}
