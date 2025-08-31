import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import Starfield from '@/components/Starfield';
import CursorTrail from '@/components/CursorTrail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsFloat from '@/components/WhatsFloat';

export const metadata: Metadata = {
  title: 'Polus Eletrotécnica — Catálogo Técnico',
  description: 'Catálogo técnico de peças para motores elétricos e bombas d\'água.',
    generator: 'v0.app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <ThemeProvider>
          <Starfield />
          <CursorTrail />
          <Header />
          <main className="max-w-6xl mx-auto px-4">{children}</main>
          <Footer />
          <WhatsFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
