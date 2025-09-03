'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { searchProducts } from '@/lib/products';

export default function SearchOverlay(){
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  // abre com Ctrl+K / Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(v => !v); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => q.trim() ? searchProducts(q.trim()).slice(0, 8) : [], [q]);

  return (
    <div className={`search-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
      {open && (
        <div className="search-panel">
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busque por nome, marca, modelo..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-900/70 outline-none"
            />
            <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">Fechar</button>
          </div>

          <div className="mt-3 flex flex-col">
            {results.map((p) => (
              <Link key={p.slug} href={`/produto/${p.slug}`} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setOpen(false)}>
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="text-xs opacity-70">{p.brand} • {p.category}{p.model ? ` • ${p.model}` : ''}</div>
              </Link>
            ))}
            {!q && <div className="text-sm opacity-70 px-2 py-2">Dica: pressione <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd></div>}
            {q && results.length === 0 && <div className="text-sm opacity-70 px-2 py-2">Nenhum produto encontrado.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
