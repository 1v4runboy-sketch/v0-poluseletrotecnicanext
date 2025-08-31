import HeroColorSync from '@/components/HeroColorSync';
import BrandCarousel from '@/components/BrandCarousel';
import ProductGrid from '@/components/ProductGrid';

export default function HomePage(){
  return (
    <div className="space-y-8">
      <section className="relative">
        <div className="h-[36vh] sm:h-[52vh] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
          <img id="hero-img" src="/Loop-ezgif.com-video-to-webp-converter.webp" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <HeroColorSync />
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-3">Marcas em destaque</h2>
        <BrandCarousel />
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-3">Catálogo</h2>
        <ProductGrid />
      </section>
    </div>
  );
}
