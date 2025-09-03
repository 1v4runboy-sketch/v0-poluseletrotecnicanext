'use client';

const BRANDS = [
  { label: 'Cifa',            src: '/marcas/cifa.webp' },
  { label: 'HCH',             src: '/marcas/hch-logo.webp' },
  { label: 'IGUI',            src: '/marcas/igui.webp' },
  { label: 'Jacuzzi',         src: '/marcas/jacuzzi.webp' },
  { label: 'JL Capacitores',  src: '/marcas/jl-capacitores.webp' },
  { label: 'Lanc Comercial',  src: '/marcas/lanc-comercial.webp' },
  { label: 'NSK',             src: '/marcas/nsk-logo.webp' },
  { label: 'Solda Cobix',     src: '/marcas/solda-cobix.webp' },
  { label: 'WEG',             src: '/marcas/weg.webp' },
];

export default function BrandCarousel(){
  return (
    <section className="py-8">
      <h2 className="text-center text-sm sm:text-base tracking-[0.25em] text-slate-600 dark:text-slate-300 mb-6">
        MARCAS QUE TRABALHAMOS
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 place-items-center">
        {BRANDS.map((b, i) => (
          <img
            key={i}
            src={b.src}
            alt={b.label}
            className="h-16 sm:h-20 md:h-24 w-auto object-contain brand-logo"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </section>
  );
}
