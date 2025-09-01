'use client';
import React, { useEffect, useState } from 'react';
import LogoSpinner from './LogoSpinner';
import ThemeToggle from './ThemeToggle';
import SidebarToggle from './SidebarToggle';
import { CartIcon } from './icons';
import { list } from '@/lib/budgetList';
import SearchGlobal from './SearchGlobal';
export default function Header(){
  const [count, setCount] = useState(0);
  useEffect(()=>{
    const refresh = ()=>setCount(list().reduce((a,b)=>a+b.qty,0));
    refresh();
    window.addEventListener('budget:update' as any, refresh);
    return () => window.removeEventListener('budget:update' as any, refresh);
  }, []);
  return (
    <header className="sticky top-0 z-40">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-[color:var(--hero-color,rgba(255,255,255,0.6))] border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
          <SidebarToggle />
          <a href="/" className="flex items-center gap-2">
            <LogoSpinner />
            <span className="font-semibold hidden sm:block">Polus Eletrotécnica</span>
          </a>
          <div className="flex-1" />
          <SearchGlobal />
          <a aria-label="Orçamento" href="/orcamento" className="relative p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
            <CartIcon />
            {count>0 && <span className="absolute -top-1 -right-1 text-xs bg-emerald-600 text-white rounded-full px-1">{count}</span>}
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
