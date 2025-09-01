import HeroColorSync from "@/components/HeroColorSync"
import BrandCarousel from "@/components/BrandCarousel"
import ProductListPageClient from "@/components/ProductListPageClient"

export default function HomePage() {
  return (
    <>
      <section className="relative rounded-[20px] overflow-hidden mt-4 ring-1 ring-white/10">
        <HeroColorSync src="/Loop-ezgif.com-video-to-webp-converter.webp" />
        <img
          src="/Loop-ezgif.com-video-to-webp-converter.webp"
          alt="Polus Eletrotécnica — vídeo loop cinematográfico"
          className="w-full h-[36vh] md:h-[52vh] object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,0))" }}
        />
        <div className="absolute bottom-6 left-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.45)]">
          <h1 className="text-2xl md:text-3xl font-semibold">Polus Eletrotécnica — Catálogo Técnico</h1>
          <p className="opacity-90 text-sm">Peças para motores elétricos e bombas d’água.</p>
        </div>
      </section>

      <BrandCarousel />

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Catálogo</h2>
        <ProductListPageClient />
      </section>
    </>
  )
}
