'use client';
import React from 'react';
import { SITE } from '@/lib/site';
export default function Footer(){
  return (
    <footer className="mt-12 border-t border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 gap-6">
        <div>
          <img src="/polus-logo.svg" alt="Polus" className="h-10 w-auto mb-3" />
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{SITE.description}</p>
        </div>
        <div className="text-sm space-y-1">
          <div><strong>Endereço:</strong> {SITE.address}</div>
          <div><strong>E-mail:</strong> <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></div>
          <div><strong>CNPJ:</strong> {SITE.cnpj}</div>
          <div><strong>Instagram:</strong> <a className="underline" href={SITE.instagram} target="_blank">/@_poluseletrotecnica</a></div>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-500 py-4">© {new Date().getFullYear()} Polus Eletrotécnica</div>
    </footer>
  );
}
