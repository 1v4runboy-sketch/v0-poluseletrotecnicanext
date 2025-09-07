import './globals.css';
import HeaderShell from '../components/HeaderShell';
import ClientPortal from '../components/ClientPortal';
import WhatsFloat from '../components/WhatsFloat';
import InstagramFloat from '../components/InstagramFloat';
import Script from 'next/script';

const THEME_INIT = `
try {
  var ls = localStorage.getItem('theme');
  var theme = ls ? ls : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  var root = document.documentElement;
  if(theme === 'dark'){ root.classList.add('dark'); } else { root.classList.remove('dark'); }
  root.style.colorScheme = theme;
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 antialiased">
        <Script id="theme-init" strategy="beforeInteractive">{THEME_INIT}</Script>

        <HeaderShell />
        <main>{children}</main>

        <ClientPortal>
          <div className="fixed left-3 bottom-3 z-[100000] flex flex-col gap-3 pointer-events-none">
            <div className="pointer-events-auto"><InstagramFloat /></div>
            <div className="pointer-events-auto"><WhatsFloat /></div>
          </div>
        </ClientPortal>
      </body>
    </html>
  );
}

export const metadata = {
      generator: 'v0.app'
    };
