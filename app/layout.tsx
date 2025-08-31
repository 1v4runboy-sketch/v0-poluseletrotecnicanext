import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import Starfield from '@/components/Starfield';
import CursorTrail from '@/components/CursorTrail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import WhatsFloat from '@/components/WhatsFloat';
import MiniCartDrawer from '@/components/MiniCartDrawer';

export const metadata: Metadata = {
  title: 'Polus Eletrotécnica — Catálogo Técnico',
  description: "Catálogo técnico de peças para motores elétricos e bombas d'água.",
  generator: 'polus-fix'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-noise antialiased">
        <ThemeProvider>
          <Starfield />
          <CursorTrail />
          <Header />
          <Sidebar />
          <MiniCartDrawer />
          <main className="container mx-auto px-4 py-6">{children}</main>
          <Footer />
          <WhatsFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
