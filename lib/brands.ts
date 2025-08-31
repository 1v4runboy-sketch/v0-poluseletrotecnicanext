export type Brand = { slug: string; name: string; logo: string };

export const BRANDS: Brand[] = [
  { slug: 'nsk', name: 'NSK', logo: '/marcas/nsk-logo.webp' },
  { slug: 'hch', name: 'HCH', logo: '/marcas/hch-logo.webp' },
  { slug: 'weg', name: 'WEG', logo: '/marcas/weg.webp' },
  { slug: 'cifa', name: 'CIFA', logo: '/marcas/cifa.webp' },
  { slug: 'igui', name: 'iGUi', logo: '/marcas/igui.webp' },
  { slug: 'jacuzzi', name: 'Jacuzzi', logo: '/marcas/jacuzzi.webp' },
  { slug: 'jl-capacitores', name: 'JL Capacitores', logo: '/marcas/jl-capacitores.webp' },
  { slug: 'lanc-comercial', name: 'LANC Comercial', logo: '/marcas/lanc-comercial.webp' },
  { slug: 'solda-cobix', name: 'Solda Cobix', logo: '/marcas/solda-cobix.webp' },
];

export function brandLogoByName(name?: string): string | undefined {
  if (!name) return undefined;
  const lower = name.toLowerCase();
  const b = BRANDS.find(b => b.name.toLowerCase() === lower);
  return b?.logo;
}
