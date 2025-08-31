import React from 'react';
import { SITE } from '@/lib/site';
import { IconWhats, IconInsta } from '@/components/icons';

export const metadata = { title: 'Contato — Polus Eletrotécnica' };

export default function ContatoPage() {
  return (
    <main className="min-h-screen py-6">
      <h1 className="text-2xl font-semibold mb-4">Contato</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10">
            <iframe src={SITE.mapsEmbed} className="w-full h-full" loading="lazy" />
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p><strong>Endereço:</strong> {SITE.address}</p>
          <p className="flex items-center gap-2"><IconWhats /><a href={SITE.whatsappHref()} className="text-weg underline" target="_blank" rel="noopener noreferrer">{SITE.whatsappNumberIntl}</a></p>
          <p className="flex items-center gap-2"><IconInsta /><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="underline">Instagram</a></p>
          <p><strong>E-mail:</strong> <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></p>
          <p><strong>CNPJ:</strong> {SITE.cnpj}</p>
        </div>
      </div>
    </main>
  );
}
