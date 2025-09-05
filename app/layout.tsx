'use client';

import './globals.css';
import HeaderShell from '@/components/HeaderShell';
import ClientPortal from '@/components/ClientPortal';
import WhatsFloat from '@/components/WhatsFloat';
import InstagramFloat from '@/components/InstagramFloat';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <HeaderShell />
        <main>{children}</main>

        {/* Flutuantes site-wide em Portal, z-index altíssimo */}
        <ClientPortal>
          <div className="fixed left-3 bottom-3 z-[100000] flex flex-col gap-3 pointer-events-none">
            {/* Cada flutuante habilita o próprio pointer-events internamente */}
            <div className="pointer-events-auto">
              <InstagramFloat />
            </div>
            <div className="pointer-events-auto">
              <WhatsFloat />
            </div>
          </div>
        </ClientPortal>
      </body>
    </html>
  );
}

export const metadata = {
      generator: 'v0.app'
    };
