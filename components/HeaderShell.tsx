'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SidebarToggle from '@/components/SidebarToggle';
import LogoSpinner from '@/components/LogoSpinner';

export default function HeaderShell(){
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header-hero">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
          {/* Toggle Sidebar (esquerda) */}
          <SidebarToggle onClick={()=> setOpen(true)} />

          {/* Logo giratória central */}
          <div className="flex-1 flex items-center justify-center">
            <LogoSpinner src="/polus-logo.svg" size={56} />
          </div>

          {/* Espaçador para manter centralização */}
          <div className="w-[40px]" />
        </div>
      </header>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
