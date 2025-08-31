import HeroColorSync from '@/components/HeroColorSync';
import BrandCarousel from '@/components/BrandCarousel';
import ProductGrid from '@/components/ProductGrid';

export default function HomePage(){
  return (
    <>
      <section className="relative rounded-[20px] overflow-hidden mt-4 ring-1 ring-white/10">
        <HeroColorSync src="/Loop-ezgif.com-video-to-webp-converter.webp" />
        <video
          className="w-full h-[36vh] md:h-[52vh] object-cover"
          src="/Loop-ezgif.com-video-to-webp-converter.webp"
          autoPlay loop muted playsInline
        />
        <div className="absolute bottom-6 left-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.45)]">
          <h1 className="text-2xl md:text-3xl font-semibold">Polus Eletrotécnica — Catálogo Técnico</h1>
          <p className="opacity-90 text-sm">Peças para motores elétricos e bombas d’água.</p>
        </div>
      </section>

      <BrandCarousel />

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Catálogo</h2>
        <ProductGrid />
      </section>
    </>
  );
}
