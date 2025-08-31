'use client';
import React from 'react';
import { brandLogoByName } from '@/lib/brands';
export default function BrandBadge({ brand, className='' }:{ brand?: string; className?: string }){
  const logo = brandLogoByName(brand);
  if (!logo) return null;
  return (
    <div className={`absolute top-2 left-2 rounded-md px-2 py-1 bg-black/50 backdrop-blur border border-white/20 ${className}`}>
      <img src={logo} alt={brand} className="w-14 h-auto brand-logo" />
    </div>
  );
}
