'use client';

import { useEffect, useRef } from 'react';
import ClientPortal from './ClientPortal';
import Link from 'next/link';

export default function Sidebar({ open, onClose }) {
  const panelRef = useRef(null);
  const touchStartX = useRef(null);

  // Fechar com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Bloquear scroll de fundo enquanto aberto
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Swipe (mobile) para fechar
  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchMove = (e) => {
    // não precisa mover o painel; só guarda delta
    if (touchStartX.current == null) return;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    // Arrastar para a esquerda fecha (gesto simples)
    if (delta < -40) onClose?.();
    touchStartX.current = null;
  };

  if (!open) return null;

  return (
    <ClientPortal>
      <div
        className="fixed inset-0 z-[99999]"
        aria-hidden="true"
        onClick={onClose}
      >
        {/* Overlay vítreo acima de tudo (vídeo/carrossel) */}
        <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-md" />

        {/* Painel esquerdo */}
        <aside
          ref={panelRef}
          className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white shadow-2xl border-r border-slate-200"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-800">Menu</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-sm bg-slate-100 hover:bg-slate-200"
            >
              Fechar
            </button>
          </div>

          <nav className="p-4 space-y-2 text-slate-700">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-slate-50">
              Início
            </Link>
            <a
              href="https://www.instagram.com/_poluseletrotecnica/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded hover:bg-slate-50"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/551135992935"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded hover:bg-slate-50"
            >
              WhatsApp
            </a>
          </nav>
        </aside>
      </div>
    </ClientPortal>
  );
}
