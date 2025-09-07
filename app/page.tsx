import BrandCarousel from '../components/BrandCarousel';
import ProductListPageClient from '../components/ProductListPageClient';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO CINEMATOGRÁFICO */}
      <section className="hero-cinema">
        <img
          src="/Loop-ezgif.com-video-to-webp-converter.webp"
          alt="Polus Eletrotécnica — Apresentação"
          className="hero-media"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-overlay vignette" aria-hidden="true" />
        <div className="hero-overlay fade" aria-hidden="true" />
        <div className="hero-contents">
          <h1 className="hero-title">
            <span className="line1">POLUS ELETROTÉCNICA</span>
            <span className="line2">CATÁLOGO TÉCNICO</span>
          </h1>
          <p className="hero-tag">Componentes que movem a indústria</p>
          <span className="hero-hairline" aria-hidden="true" />
        </div>

        <style jsx>{`
          .hero-cinema {
            position: relative; height: clamp(480px, 68vh, 880px);
            width: 100%; overflow: hidden; background: var(--hero-fade, #ffffff); isolation: isolate;
          }
          .hero-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.02); }
          .hero-overlay { position: absolute; inset: 0; pointer-events: none; }
          .vignette {
            background:
              linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.10) 58%, rgba(0,0,0,0.00) 75%),
              linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.40) 30%, rgba(0,0,0,0.00) 68%);
            mix-blend-mode: multiply;
          }
          .fade {
            background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, var(--hero-fade, #ffffff) 92%, var(--hero-fade, #ffffff) 100%);
          }
          .hero-contents {
            position: relative; z-index: 2; height: 100%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            text-align: center; color: #fff; padding: 0 1rem;
          }
          .hero-title { margin: 0; display: flex; flex-direction: column; gap: 8px; }
          .line1 {
            text-transform: uppercase; letter-spacing: 0.22em; font-weight: 500; font-size: clamp(14px, 2.6vh, 18px);
            opacity: 0; transform: translateY(10px); animation: fadeUp .75s ease forwards .10s;
            text-shadow: 0 2px 10px rgba(0,0,0,0.45);
          }
          .line2 {
            text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; font-size: clamp(28px, 6.4vh, 64px); line-height: 1.05;
            opacity: 0; transform: translateY(12px); animation: fadeUp .8s ease forwards .20s, microGlow 1.8s ease .9s 1;
            text-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.45);
          }
          .hero-tag {
            margin-top: 10px; opacity: 0.7; font-size: clamp(13px, 2.2vh, 16px);
            opacity: 0; transform: translateY(10px); animation: fadeUp .7s ease forwards .35s;
            text-shadow: 0 2px 8px rgba(0,0,0,0.35);
          }
          .hero-hairline {
            display: inline-block; height: 1px; width: 140px; margin-top: 14px; background: var(--hairline, rgba(255,255,255,0.6));
            transform-origin: left center; transform: scaleX(0); opacity: .9; animation: wipe .9s ease forwards .55s; box-shadow: 0 0 8px rgba(255,255,255,0.28);
          }
          @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
          @keyframes wipe { to { transform: scaleX(1); } }
          @keyframes microGlow {
            0% { text-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.45); }
            50%{ text-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.45), 0 0 18px rgba(255,255,255,0.25); }
            100%{ text-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.45); }
          }
        `}</style>
      </section>

      {/* MARCAS QUE TRABALHAMOS */}
      <section className="w-full">
        <BrandCarousel />
      </section>

      {/* FILTROS + GRADE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        <ProductListPageClient />
      </section>
    </div>
  );
}
