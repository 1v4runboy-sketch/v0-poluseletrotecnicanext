import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Starfield from '@/components/Starfield';
import CursorTrail from '@/components/CursorTrail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsFloat from '@/components/WhatsFloat';
import BackToTop from '@/components/BackToTop';
import MiniCartDrawer from '@/components/MiniCartDrawer';
import ScrollTop from '@/components/ScrollTop';

export const metadata = {
  title: 'Polus Eletrotécnica — Catálogo Técnico',
  description: "Catálogo técnico de peças para motores elétricos e bombas d'água.",
  generator: 'polus',
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <ScrollTop />
          <Header />
          {/* Sidebar é controlada pelo Header */}
          <MiniCartDrawer />

          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

          <Footer />
          <WhatsFloat />
          <BackToTop />
          <CursorTrail />
          <Starfield />
        </ThemeProvider>
      </body>
    </html>
  );
}
