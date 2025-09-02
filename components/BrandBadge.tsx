'use client';
import ImageSafe from './ImageSafe';

const BRAND_MAP: Record<string,string> = {
  'jl capastores': 'jl-capacitores',
  'jl capacitores': 'jl-capacitores',
  'nsk': 'nsk-logo',
  'hch': 'hch-logo',
  'solda cobix': 'solda-cobix',
  'lanc comercial': 'lanc-comercial',
  'lanç comercial': 'lanc-comercial',
  'cifra': 'cifa',
};

function normalizeBrandName(brand:string){
  return String(brand||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ').trim();
}

function brandCandidates(brand: string) {
  const norm = normalizeBrandName(brand);
  const mapped = BRAND_MAP[norm] || norm.replace(/\s+/g,'-');
  const bases = [mapped];
  if(mapped.endsWith('-logo')) bases.push(mapped.replace(/-logo$/, ''));
  else bases.push(mapped+'-logo');

  const cands: string[] = [];
  for(const base of bases){
    cands.push(`/marcas/${base}.svg`);
    cands.push(`/marcas/${base}.webp`);
    cands.push(`/marcas/${base}.png`);
    cands.push(`/marcas/${base}.jpg`);
  }
  return cands;
}

export default function BrandBadge({ brand }){
  const srcs = brandCandidates(brand);
  return (
    <div className="absolute left-2 top-2 p-1.5 rounded-lg bg-white/80 dark:bg-black/40 shadow">
      <ImageSafe srcs={srcs} alt={brand} className="w-16 h-6 object-contain brand-logo" type="brand" />
    </div>
  );
}
