'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';
import LogoSpinner from './LogoSpinner';

export default function HeaderShell() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header-hero bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center gap-3 py-2">
            {/* Botão abre sidebar (ícone é /loading-logo.png) */}
            <SidebarToggle onOpen={() => setOpen(true)} />

            {/* Logo giratória 3D (acelera no hover, sem reset) */}
            <LogoSpinner size={36} />

            <div className="flex-1" />

            <div className="hidden md:flex items-center gap-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Polus Eletrotécnica</span>
              <span className="hidden md:inline">Catálogo Técnico</span>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
