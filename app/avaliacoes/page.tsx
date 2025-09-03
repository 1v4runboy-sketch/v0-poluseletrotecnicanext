import ReviewsCarousel from '@/components/ReviewsCarousel';
import ImageSafe from '@/components/ImageSafe';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Avaliações, Loja e Contato — Polus Eletrotécnica' };

export default function AvaliacoesLojaContatoPage(){
  return (
    <main className="min-h-screen py-6 space-y-10">
      {/* Avaliações */}
      <section>
        <h1 className="text-2xl font-semibold mb-3">Avaliações de clientes</h1>
        <ReviewsCarousel />
      </section>

      {/* Fachada da loja (3 imagens) */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Nossa loja</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1,2,3].map(i=> (
            <div key={i} className="w-full h-40 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 flex items-center justify-center bg-white/5">
              <ImageSafe
                src={`/loja/fachada-${i}.webp`}
                alt={`Fachada ${i}`}
                className="max-w-full max-h-full object-contain"
                type="facade"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contato + Mapa */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Endereço e contato</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-2xl overflow-hidden shadow ring-1 ring-black/10">
              <iframe src={SITE.mapsEmbed} className="w-full h-full" loading="lazy" />
            </div>
          </div>
          <div className="space-y-2">
            <p><strong>Endereço:</strong> {SITE.address}</p>
            <p><strong>WhatsApp:</strong> {SITE.whatsappNumberIntl}</p>
            <p><strong>Instagram:</strong> <a className="text-weg underline" href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagram}</a></p>
            <p><strong>Email:</strong> {SITE.email}</p>
            <p><strong>CNPJ:</strong> {SITE.cnpj}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
