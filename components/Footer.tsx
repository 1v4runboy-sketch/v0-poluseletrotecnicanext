import { SITE } from '@/lib/site';
import { IconWhats, IconInsta } from './icons';

export default function Footer() {
  return (
    <footer className="mt-10 py-8 border-t border-white/10 text-sm bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="opacity-75">&copy; {new Date().getFullYear()} {SITE.name} — CNPJ {SITE.cnpj}</p>
        <div className="flex items-center gap-3">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Instagram"><IconInsta/></a>
          <a href={SITE.whatsappHref()} target="_blank" rel="noopener noreferrer" className="icon-btn" title="WhatsApp"><IconWhats/></a>
          <a href={`mailto:${SITE.email}`} className="underline">E-mail</a>
        </div>
      </div>
    </footer>
  );
}
