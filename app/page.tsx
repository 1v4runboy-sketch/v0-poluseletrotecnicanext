import BrandCarousel from '@/components/BrandCarousel';
import ProductListPageClient from '@/components/ProductListPageClient';

export const metadata = {
  title: 'Polus Eletrotécnica — Catálogo Técnico',
  description: 'Catálogo técnico de produtos da Polus Eletrotécnica',
};

export default function Page() {
  return (
    <main>
      {/* HERO (WEBP animado) */}
      <section className="relative rounded-[20px] overflow-hidden mt-4 mx-auto max-w-7xl ring-1 ring-white/10 hero-wrap">
        <img
          src="/Loop-ezgif.com-video-to-webp-converter.webp"
          alt="Polus — vídeo em loop"
          className="w-full h-[36vh] md:h-[52vh] object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.25), transparent 40%)' }}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white drop-shadow text-center px-3">
          <h1 className="text-2xl md:text-3xl font-semibold">Polus Eletrotécnica — Catálogo Técnico</h1>
          <p className="opacity-90 text-sm">Peças e insumos para motores elétricos e bombas d’água.</p>
        </div>
      </section>

      {/* Marcas que Trabalhamos */}
      <section className="py-8">
        <BrandCarousel />
      </section>

      {/* Grade de produtos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-[2]">
        <header className="mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
            Produtos em destaque
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Use a busca e os filtros para encontrar rapidamente.
          </p>
        </header>

        <ProductListPageClient />
      </section>
    </main>
  );
}
