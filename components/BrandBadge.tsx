'use client';
export default function BrandBadge({ brand }){
  const src = `/marcas/${String(brand||'').toLowerCase()}.svg`;
  return (
    <div className="absolute left-2 top-2 p-1.5 rounded-lg bg-white/80 dark:bg-black/40 shadow">
      <img src={src} alt={brand} className="w-16 h-6 object-contain brand-logo"/>
    </div>
  );
}
