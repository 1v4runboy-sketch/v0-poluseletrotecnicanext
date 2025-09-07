'use client';

import { useEffect, useRef } from 'react';
import ClientPortal from './ClientPortal';
import Link from 'next/link';

export default function Sidebar({ open, onClose }) {
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = original; };
  }, [open, onClose]);

  const onTouchStart = (e) => { touchStartX.current = e.touches?.[0]?.clientX ?? null; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? touchStartX.current;
    if (endX - touchStartX.current < -40) onClose?.();
    touchStartX.current = null;
  };

  if (!open) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-[99999]" aria-hidden="true" onClick={onClose}>
        <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-md" />
        <aside
          className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-700"
          role="dialog" aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="font-semibold text-slate-800 dark:text-slate-100">Menu</span>
            <button onClick={onClose} className="px-3 py-1.5 rounded-md text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
              Fechar
            </button>
          </div>
          <nav className="p-4 space-y-2 text-slate-700 dark:text-slate-200">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Início</Link>
            <a href="https://www.instagram.com/_poluseletrotecnica/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Instagram</a>
            <a href="https://wa.me/551135992935" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">WhatsApp</a>
          </nav>
        </aside>
      </div>
    </ClientPortal>
  );
}
