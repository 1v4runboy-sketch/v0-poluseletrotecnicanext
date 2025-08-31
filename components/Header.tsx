'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoSpinner from './LogoSpinner';
import ThemeToggle from './ThemeToggle';
import SidebarToggle from './SidebarToggle';
import { IconCart } from './icons';
import * as BL from '@/lib/budgetList';
import SearchGlobal from './SearchGlobal';

export default function Header() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const refresh = () => setCount(BL.count());
    refresh();
    window.addEventListener('budget:update' as any, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('budget:update' as any, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 header-hero border-b border-white/10">
      <div className="container mx-auto px-4 py-2 flex items-center gap-3">
        <SidebarToggle />
        <Link href="/" className="inline-flex items-center gap-2 ml-1">
          <LogoSpinner />
          <span className="font-semibold tracking-tight hidden sm:inline">Polus Eletrotécnica</span>
        </Link>
        <div className="flex-1 flex justify-center">
          <SearchGlobal />
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('cart:toggle'))}
          className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-black/40 ring-1 ring-black/10 dark:ring-white/10 hover:shadow"
          aria-label="Abrir lista de orçamento"
        >
          <IconCart />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-weg text-white text-[11px] px-1 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
