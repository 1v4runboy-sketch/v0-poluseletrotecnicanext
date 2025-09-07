'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';
import LogoSpinner from './LogoSpinner';
import ThemeToggle from './ThemeToggle';

export default function HeaderShell() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header-hero bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/70 dark:border-slate-700/70">
        <div className="max-w-7xl mx-auto px-3 md:px-6 relative">
          <div className="flex items-center justify-between gap-3 py-2">
            <SidebarToggle onOpen={() => setOpen(true)} />
            <div className="h-10" />
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-sm font-semibold text-slate-800 dark:text-slate-100">
                Polus Eletrotécnica
              </span>
              <span className="hidden md:inline text-sm text-slate-600 dark:text-slate-300">
                Catálogo Técnico
              </span>
              <ThemeToggle />
            </div>
          </div>
          <LogoSpinner size={84} />
        </div>
      </header>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
