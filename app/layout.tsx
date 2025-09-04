import './globals.css';
import HeaderShell from '@/components/HeaderShell';
import WhatsFloat from '@/components/WhatsFloat';
import InstagramFloat from '@/components/InstagramFloat';
import { whatsappHref, SITE } from '@/lib/site';

export const metadata = {
  title: 'Polus Eletrotécnica — Catálogo Técnico',
  description: 'Catálogo técnico de produtos da Polus Eletrotécnica',
    generator: 'v0.app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <HeaderShell />
        <main className="hero-wrap">{children}</main>

        {/* Flutuantes (Uiverse) */}
        <InstagramFloat href={SITE?.instagram || 'https://www.instagram.com/'} />
        <WhatsFloat href={whatsappHref()} />
      </body>
    </html>
  );
}
