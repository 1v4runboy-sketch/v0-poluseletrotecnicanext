'use client';
import { brandLogoByName } from '@/lib/brands';

export default function BrandBadge({ brand }:{ brand?: string }){
  const logo = brandLogoByName(brand);
  if (!brand) return null;
  return (
    <div className="absolute top-2 left-2 z-10 rounded-md bg-white/80 dark:bg-black/50 ring-1 ring-black/10 dark:ring-white/10 backdrop-blur px-2 py-1 flex items-center gap-1">
      {logo && <img src={logo} alt={brand} className="h-4 w-auto object-contain brand-logo" />}
      <span className="text-[11px] font-medium">{brand}</span>
    </div>
  );
}
