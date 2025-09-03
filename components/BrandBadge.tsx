'use client';
import ImageSafe from './ImageSafe';

const BRAND_FILE_MAP: Record<string,string> = {
  'weg':'weg','nsk':'nsk-logo','hch':'hch-logo','jl capacitores':'jl-capacitores',
  'lanc comercial':'lanc-comercial','solda cobix':'solda-cobix','cifa':'cifa',
  'igui':'igui','jacuzzi':'jacuzzi','tramar':'tramar','cofibam':'cofibam',
};

function norm(s=''){
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

// dedução simples (mantém suas heurísticas)
function inferBrand(product:any){
  if(!product) return '';
  const bag = [product.brand, product.subcategory, product.category, product.title, product.slug]
    .filter(Boolean).join(' ').toLowerCase();
  if (/\bresina|calas|incolor|vermelh/.test(bag)) return 'Lanc Comercial';
  if (/\bsilicone|espaguete|flexnor|130c|130\s*graus/.test(bag)) return 'Tramar';
  if (/\blides\b/.test(bag)) return 'Cofibam';
  if (/\bweg\b/.test(bag)) return 'WEG';
  if (/\bnsk\b/.test(bag)) return 'NSK';
  if (/\bhch\b/.test(bag)) return 'HCH';
  if (/\bcapacitor| jl\b/.test(bag)) return 'JL Capacitores';
  if (/\bcobix|solda\b/.test(bag)) return 'Solda Cobix';
  if (/\bcifa\b/.test(bag)) return 'Cifa';
  if (/\bigui\b/.test(bag)) return 'IGUI';
  if (/\bjacuzzi\b/.test(bag)) return 'Jacuzzi';
  return (product.brand || '').toString();
}

function candidates(name:string){
  const key = norm(name);
  const base = BRAND_FILE_MAP[key] || key.replace(/\s+/g,'-');
  return [
    `/marcas/${base}.webp`,
    `/marcas/${base}.png`,
    `/marcas/${base}.jpg`,
    `/marcas/${base}-logo.webp`,
    `/marcas/${base}-logo.png`,
    `/marcas/${base}-logo.jpg`,
  ];
}

export default function BrandBadge({ brand, product }:{
  brand?: string; product?: any;
}){
  const logical = brand || inferBrand(product);
  if (!logical) return null;
  const srcs = candidates(logical);

  // aumento sutil para Jacuzzi/Cifa/Cofibam
  const big = ['jacuzzi','cifa','cofibam'].includes(norm(logical));
  const cls = big ? 'w-32 h-[60px]' : 'w-28 h-12';

  return (
    <div className="absolute left-2 top-2 p-2 rounded-lg bg-white/90 dark:bg-black/55 shadow">
      <ImageSafe srcs={srcs} alt={logical} className={`${cls} object-contain brand-logo`} type="brand" />
    </div>
  );
}
