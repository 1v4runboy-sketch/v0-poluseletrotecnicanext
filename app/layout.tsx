import './globals.css';
import WhatsFloat from '@/components/WhatsFloat';
import InstagramFloat from '@/components/InstagramFloat';
import { whatsappHref, SITE } from '@/lib/site';

export const metadata = {
  title: 'Polus Eletrotécnica — Catálogo',
  description: 'Catálogo técnico de produtos',
    generator: 'v0.app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {/* Header simples (fixo) */}
        <header className="header-hero">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/polus-logo.svg" alt="Polus" className="h-7 w-auto" />
              <span className="text-sm font-semibold opacity-80">Polus Eletrotécnica</span>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="hero-wrap">
          {children}
        </main>

        {/* Flutuantes (Instagram acima / WhatsApp abaixo) */}
        <InstagramFloat href={SITE?.instagram || 'https://www.instagram.com/'} />
        <WhatsFloat href={whatsappHref()} />
      </body>
    </html>
  );
}
