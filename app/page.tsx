import BrandCarousel from '@/components/BrandCarousel';
import ProductListPageClient from '@/components/ProductListPageClient';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO — vídeo/animado webp */}
      <section className="w-full h-[36vh] md:h-[52vh] overflow-hidden">
        <img
          src="/Loop-ezgif.com-video-to-webp-converter.webp"
          alt="Apresentação Polus Eletrotécnica"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </section>

      {/* Marcas que Trabalhamos — título + carrossel imediatamente abaixo */}
      <section className="w-full">
        <BrandCarousel />
      </section>

      {/* Grade de produtos */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <ProductListPageClient />
      </section>
    </div>
  );
}
