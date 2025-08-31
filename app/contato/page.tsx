import { SITE } from '@/lib/site';
export default function ContatoPage(){
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Contato</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
          <iframe title="Mapa" src={SITE.mapsEmbed} className="w-full h-72" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="space-y-2 text-sm">
          <div><strong>WhatsApp:</strong> <a className="underline" href={SITE.whatsappHref()} target="_blank">Abrir conversa</a></div>
          <div><strong>Instagram:</strong> <a className="underline" href={SITE.instagram} target="_blank">@_poluseletrotecnica</a></div>
          <div><strong>E-mail:</strong> <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          <div><strong>Endereço:</strong> {SITE.address}</div>
          <div><strong>CNPJ:</strong> {SITE.cnpj}</div>
        </div>
      </div>
    </div>
  );
}
