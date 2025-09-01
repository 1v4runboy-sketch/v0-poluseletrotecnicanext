
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Avaliações — Polus Eletrotécnica' };

export default function AvaliacoesPage(){
  return (
    <main className="min-h-screen py-6 space-y-6">
      <section>
        <h1 className="text-2xl font-semibold mb-3">Avaliações de clientes</h1>
        <ReviewsCarousel />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-semibold mb-2">Nossa localização</h2>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
            <iframe src={SITE.mapsEmbed} className="w-full h-full" loading="lazy" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Fachada da loja</h2>
          <div className="grid grid-cols-2 gap-2">
            <img src="/loja/fachada-1.webp" alt="Fachada 1" className="w-full h-28 object-cover rounded"/>
            <img src="/loja/fachada-2.webp" alt="Fachada 2" className="w-full h-28 object-cover rounded"/>
            <img src="/loja/fachada-3.webp" alt="Fachada 3" className="w-full h-28 object-cover rounded"/>
            <img src="/loja/fachada-4.webp" alt="Fachada 4" className="w-full h-28 object-cover rounded"/>
          </div>
        </div>
      </section>
    </main>
  );
}
