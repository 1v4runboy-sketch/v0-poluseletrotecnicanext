'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

/* importa o módulo inteiro e escolhe o array disponível
   (funciona com qualquer um destes exports no seu lib/products.ts):
   - export const products = [...]
   - export const PRODUCTS = [...]
   - export default [...]
*/
import * as DB from '@/lib/products';
const ALL: any[] =
  (DB as any).products ||
  (DB as any).PRODUCTS ||
  (DB as any).default ||
  [];

// normaliza acentos/caixa para busca
function fold(s = '') {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const PER_PAGE = 15;

export default function ProductListPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [q, setQ] = useState(searchParams.get('q') || '');
  const [debounced, setDebounced] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const marca = searchParams.get('marca') || '';
  const cat   = searchParams.get('cat')   || '';
  const sub   = searchParams.get('sub')   || '';
  const ord   = searchParams.get('ord')   || 'rand';
  const page  = parseInt(searchParams.get('page') || '1', 10);

  // sobe pro topo ao trocar de página
  useEffect(() => {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    catch { window.scrollTo(0, 0); }
  }, [page, pathname]);

  const filtered = useMemo(() => {
    let arr = Array.isArray(ALL) ? [...ALL] : [];

    if (marca) arr = arr.filter((p: any) => String(p.brand || '') === marca);
    if (cat)   arr = arr.filter((p: any) => String(p.category || '') === cat);
    if (sub)   arr = arr.filter((p: any) => String(p.subcategory || '') === sub);

    if (debounced.trim()) {
      const s = fold(debounced.trim());
      arr = arr.filter((p: any) => {
        const hay = fold(
          [p.title, p.slug, p.brand, p.model, p.category, p.subcategory]
            .filter(Boolean)
            .join(' ')
        );
        return s.split(/\s+/).every(tok => hay.includes(tok));
      });
    }

    if (ord === 'rand') {
      // embaralhamento estável simples (determinístico)
      const seed = 1337;
      arr = arr
        .map((x: any, i: number) => ({ x, k: Math.sin(i + seed) }))
        .sort((a: any, b: any) => a.k - b.k)
        .map((o: any) => o.x);
    } else {
      arr.sort((a: any, b: any) =>
        String(a.title || '').localeCompare(String(b.title || ''))
      );
    }
    return arr;
  }, [marca, cat, sub, debounced, ord]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const curPage = Math.min(Math.max(1, page), totalPages);
  const pageItems = filtered.slice((curPage - 1) * PER_PAGE, curPage * PER_PAGE);

  function setParam(key: string, value: string, resetPage = true) {
    const sp = new URLSearchParams(searchParams.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    if (resetPage) sp.set('page', '1');
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <div className="space-y-5">
      {/* Busca/ordem */}
      <div className="card-modern p-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, marca, modelo…"
            className="px-3 py-2 rounded-xl bg-white/90 dark:bg-white/10 outline-none w-64 md:w-80"
          />
          <select
            className="chip"
            value={ord}
            onChange={(e) => setParam('ord', e.target.value)}
          >
            <option value="rand">Misturar</option>
            <option value="">A–Z</option>
          </select>
          {(marca || cat || sub || debounced) && (
            <button
              className="chip"
              onClick={() => { router.push(pathname); setQ(''); }}
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Grade */}
      {pageItems.length === 0 ? (
        <div className="card-modern p-4 text-sm">Nenhum produto encontrado.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {pageItems.map((p: any) => (
            <ProductCard key={p.id || p.slug} product={p} />
          ))}
        </div>
      )}

      {/* Paginação */}
      {pageItems.length > 0 && totalPages > 1 && (
        <nav className="flex justify-center items-center gap-2 select-none">
          <button
            disabled={curPage <= 1}
            onClick={() => setParam('page', String(curPage - 1), false)}
            className="chip disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                onClick={() => setParam('page', String(n), false)}
                className={`chip ${n === curPage ? 'ring-2 ring-weg/60' : ''}`}
              >
                {n}
              </button>
            );
          })}
          <button
            disabled={curPage >= totalPages}
            onClick={() => setParam('page', String(curPage + 1), false)}
            className="chip disabled:opacity-50"
          >
            Próxima
          </button>
        </nav>
      )}
    </div>
  );
}
