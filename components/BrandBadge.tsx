'use client';
import React from 'react';
import { brandLogoByName } from '@/lib/brands';

type Props = { name?: string; brand?: string };

export default function BrandBadge({ name, brand }: Props){
  const label = name || brand;
  if(!label) return null;
  const logo = brandLogoByName(label);
  return (
    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md bg-white/85 dark:bg-black/50 ring-1 ring-black/10 dark:ring-white/10 px-2 py-1">
      {logo && <img src={logo} alt={label} className="h-4 w-auto object-contain brand-logo"/>}
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
}
