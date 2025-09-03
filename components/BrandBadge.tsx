'use client';
import ImageSafe from './ImageSafe';

const BRAND_MAP = {
  'jl capastores': 'jl-capacitores',
  'jl capacitores': 'jl-capacitores',
  'nsk': 'nsk-logo',
  'hch': 'hch-logo',
  'solda cobix': 'solda-cobix',
  'lanc comercial': 'lanc-comercial',
  'lanç comercial': 'lanc-comercial',
  'cifra': 'cifa',
};

function normalizeBrandName(brand){
  return String(brand||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ').trim();
}

function brandCandidates(brand) {
  const norm = normalizeBrandName(brand);
  const mapped = BRAND_MAP[norm] || norm.replace(/\s+/g,'-');
  const bases = [mapped, mapped.endsWith('-logo') ? mapped.replace(/-logo$/,'') : mapped+'-logo'];

  const cands = [];
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
    <div className="absolute left-2 top-2 p-2 rounded-lg bg-white/85 dark:bg-black/50 shadow">
      <ImageSafe srcs={srcs} alt={brand} className="w-24 h-10 object-contain brand-logo" type="brand" />
    </div>
  );
}
