'use client';
import ImageSafe from './ImageSafe';

// Arquivos reais em /public/marcas
const BRAND_FILE_MAP = {
  'weg': 'weg',
  'nsk': 'nsk-logo',
  'hch': 'hch-logo',
  'jl capacitores': 'jl-capacitores',
  'lanc comercial': 'lanc-comercial',
  'solda cobix': 'solda-cobix',
  'cifa': 'cifa',
  'igui': 'igui',
  'jacuzzi': 'jacuzzi',
};

function norm(s=''){
  return String(s)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ')
    .trim();
}

// Tenta deduzir a marca a partir do product
function inferBrand(product){
  if (!product) return '';
  const cand = [
    product.brand,
    product.subcategory,
    product.category,
    product.title,
    product.slug,
  ].filter(Boolean).map(norm).join(' ');

  // ordem importa (evita colisão de "jl"/"lanc" etc.)
  if (/\bweg\b/.test(cand)) return 'WEG';
  if (/\bnsk\b/.test(cand)) return 'NSK';
  if (/\bhch\b/.test(cand)) return 'HCH';
  if (/\bjl\b|\bcapacitor(es)?\b/.test(cand)) return 'JL Capacitores';
  if (/\blanc\b/.test(cand)) return 'Lanc Comercial';
  if (/\bcobix\b|\bsolda\b/.test(cand)) return 'Solda Cobix';
  if (/\bcifa\b/.test(cand)) return 'Cifa';
  if (/\bigui\b/.test(cand)) return 'IGUI';
  if (/\bjacuzzi\b/.test(cand)) return 'Jacuzzi';
  return (product.brand || '').trim();
}

// Constrói candidatos de caminho a partir do nome
function brandCandidatesName(name){
  const n = norm(name);
  const mapped = BRAND_FILE_MAP[n] || n.replace(/\s+/g,'-');
  const base = mapped;
  return [
    `/marcas/${base}.webp`,
    `/marcas/${base}.png`,
    `/marcas/${base}.jpg`,
    `/marcas/${base}-logo.webp`,
    `/marcas/${base}-logo.png`,
    `/marcas/${base}-logo.jpg`,
  ];
}

export default function BrandBadge({ brand, product }){
  const logicalBrand = brand || inferBrand(product);
  if (!logicalBrand) return null;
  const srcs = brandCandidatesName(logicalBrand);
  return (
    <div className="absolute left-2 top-2 p-2 rounded-lg bg-white/90 dark:bg-black/55 shadow">
      <ImageSafe srcs={srcs} alt={logicalBrand} className="w-28 h-12 object-contain brand-logo" type="brand" />
    </div>
  );
}
