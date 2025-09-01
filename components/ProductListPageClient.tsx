'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PRODUCTS, { type Product } from '@/lib/products';
import { BRANDS } from '@/lib/brands';
import { SITE } from '@/lib/site';
import * as BL from '@/lib/budgetList';
import BrandBadge from '@/components/BrandBadge';

/** ----------------------------
 * Configuração
 * ----------------------------- */
const PER_PAGE = 15;
const URL_KEYS = {
  q: 'q',
  brand: 'marca',
  cat: 'cat',
  sub: 'sub',
  page: 'page',
  ord: 'ord', // 'rand' para aleatória (hash)
} as const;

const LABEL_SEM_MARCA = 'Sem marca';
const LABEL_SEM_SUB = 'Sem subcategoria';

/** Hash simples (determinístico) para ordenação aleatória estável */
function hashString(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Envolvimento de ocorrências (case-insensitive) com <mark> */
function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const q = query.trim();
  const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-600/50 rounded px-0.5">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Helpers para SearchParams multi-valor (marca/cat/sub aceitam múltiplos) */
function getAllFromParams(sp: URLSearchParams, key: string): string[] {
  const list = sp.getAll(key);
  // também suportar formato separado por vírgula (compatibilidade)
  const out: string[] = [];
  list.forEach((v) => {
    if (v.includes(',')) v.split(',').forEach((x) => out.push(x));
    else out.push(v);
  });
  // normalizar espaços e remover vazios
  return Array.from(new Set(out.map((s) => s.trim()).filter(Boolean)));
}

function setMultiParam(sp: URLSearchParams, key: string, values: string[]) {
  sp.delete(key);
  values.forEach((v) => sp.append(key, v));
}

/** ----------------------------
 * Dataset derivado (marcas/categorias/subcategorias)
 * ----------------------------- */
const ALL_BRANDS = (() => {
  const set = new Set<string>();
  for (const p of PRODUCTS) {
    const b = (p.brand || '').trim();
    if (b) set.add(b);
  }
  // incluir a opção "Sem marca" se existir algum produto sem marca
  const hasNoBrand = PRODUCTS.some((p) => !p.brand || !p.brand.trim());
  const arr = Array.from(set).sort((a, b) => a.localeCompare(b));
  return hasNoBrand ? [LABEL_SEM_MARCA, ...arr] : arr;
})();

const ALL_CATEGORIES = (() => {
  const set = new Set<string>();
  for (const p of PRODUCTS) set.add(p.category);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
})();

const ALL_SUBCATEGORIES = (() => {
  const set = new Set<string>();
  for (const p of PRODUCTS) {
    const s = (p.subcategory || '').trim();
    if (s) set.add(s);
  }
  const hasNoSub = PRODUCTS.some((p) => !p.subcategory || !p.subcategory.trim());
  const arr = Array.from(set).sort((a, b) => a.localeCompare(b));
  return hasNoSub ? [LABEL_SEM_SUB, ...arr] : arr;
})();

/** ----------------------------
 * Card interno (com highlight + ações)
 * ----------------------------- */
function ListCard({ product, query }: { product: Product; query: string }) {
  const firstImg = product.images?.[0]?.src || '/produtos/placeholder.webp';

  const addToBudget = (e: React.MouseEvent) => {
    e.preventDefault();
    BL.add(product);
  };

  return (
    <a
      href={`/produtos/${product.slug}`}
      className="card-modern block p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-weg/60"
      aria-label={product.title}
    >
      <div className="relative aspect-square bg-white/60 dark:bg-black/20 rounded-lg overflow-hidden">
        <img
          src={firstImg}
          alt={product.images?.[0]?.alt || product.title}
          className="w-full h-full object-contain transition-transform duration-200"
        />
        {/* Badge de marca (se houver) */}
        <div className="absolute top-2 left-2">
          <BrandBadge brand={product.brand} name={product.brand} />
        </div>
      </div>

      <h3 className="mt-2 font-medium leading-tight line-clamp-2">
        {highlight(product.title, query)}
      </h3>
      {product.shortDescription && (
        <p className="text-xs opacity-70 line-clamp-2 mt-0.5">{product.shortDescription}</p>
      )}

      <div className="mt-2 flex items-center gap-2">
        <a
          href={SITE.whatsappHref(product.title)}
          className="btn-magnetic px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          WhatsApp
        </a>
        <button
          className="btn-magnetic px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={addToBudget}
        >
          Adicionar
        </button>
      </div>
    </a>
  );
}

/** ----------------------------
 * Página de listagem (client)
 * ----------------------------- */
export default function ProductListPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Estado da busca com debounce
  const qFromURL = searchParams.get(URL_KEYS.q) || '';
  const [qInput, setQInput] = useState(qFromURL);

  useEffect(() => {
    // sincroniza se vier mudança externa de URL (navegação etc.)
    setQInput(qFromURL);
  }, [qFromURL]);

  // Seleções do URL
  const selectedBrands = getAllFromParams(searchParams, URL_KEYS.brand);
  const selectedCats = getAllFromParams(searchParams, URL_KEYS.cat);
  const selectedSubs = getAllFromParams(searchParams, URL_KEYS.sub);
  const page = Math.max(1, parseInt(searchParams.get(URL_KEYS.page) || '1', 10) || 1);
  const ord = searchParams.get(URL_KEYS.ord) || 'padrao'; // 'rand' ou 'padrao'

  // Util: atualizar a URL preservando estado
  const pushParams = useCallback(
    (update: (sp: URLSearchParams) => void, scrollTop = true) => {
      const sp = new URLSearchParams(searchParams.toString());
      update(sp);
      const url = `${pathname}?${sp.toString()}`;
      router.push(url, { scroll: scrollTop });
    },
    [router, searchParams, pathname]
  );

  // Debounce da busca (300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      pushParams((sp) => {
        if (qInput.trim()) sp.set(URL_KEYS.q, qInput.trim());
        else sp.delete(URL_KEYS.q);
        sp.set(URL_KEYS.page, '1'); // reset page
      });
    }, 300);
    return () => clearTimeout(t);
  }, [qInput, pushParams]);

  const toggleArrayFilter = useCallback(
    (key: string, value: string) => {
      pushParams((sp) => {
        const vals = getAllFromParams(sp, key);
        const idx = vals.indexOf(value);
        if (idx >= 0) vals.splice(idx, 1);
        else vals.push(value);
        setMultiParam(sp, key, vals);
        sp.set(URL_KEYS.page, '1');
      });
    },
    [pushParams]
  );

  const clearKey = useCallback(
    (key: string) => {
      pushParams((sp) => {
        sp.delete(key);
        sp.set(URL_KEYS.page, '1');
      });
    },
    [pushParams]
  );

  const clearAll = useCallback(() => {
    pushParams((sp) => {
      [URL_KEYS.brand, URL_KEYS.cat, URL_KEYS.sub, URL_KEYS.q, URL_KEYS.page].forEach((k) => sp.delete(k));
    });
  }, [pushParams]);

  const toggleOrder = useCallback(() => {
    pushParams((sp) => {
      if (sp.get(URL_KEYS.ord) === 'rand') sp.set(URL_KEYS.ord, 'padrao');
      else sp.set(URL_KEYS.ord, 'rand');
      sp.set(URL_KEYS.page, '1');
    });
  }, [pushParams]);

  /** ----------------------------
   * Filtro + ordenação
   * ----------------------------- */
  const filtered = useMemo(() => {
    const s = (searchParams.get(URL_KEYS.q) || '').trim().toLowerCase();

    const brands = getAllFromParams(searchParams, URL_KEYS.brand);
    const cats = getAllFromParams(searchParams, URL_KEYS.cat);
    const subs = getAllFromParams(searchParams, URL_KEYS.sub);

    const matchBrand = (p: Product) => {
      if (brands.length === 0) return true;
      const b = (p.brand || '').trim();
      if (!b) return brands.includes(LABEL_SEM_MARCA);
      return brands.includes(b);
    };

    const matchCat = (p: Product) => (cats.length === 0 ? true : cats.includes(p.category));

    const matchSub = (p: Product) => {
      if (subs.length === 0) return true;
      const s = (p.subcategory || '').trim();
      if (!s) return subs.includes(LABEL_SEM_SUB);
      return subs.includes(s);
    };

    const matchQuery = (p: Product) => {
      if (!s) return true;
      const hay =
        `${p.title} ${p.shortDescription || ''} ${p.brand || ''} ${p.category} ${p.subcategory || ''}`.toLowerCase();
      return hay.includes(s);
    };

    let arr = PRODUCTS.filter((p) => matchBrand(p) && matchCat(p) && matchSub(p) && matchQuery(p));

    // Ordenação
    const ordParam = searchParams.get(URL_KEYS.ord);
    if (ordParam === 'rand') {
      arr = arr
        .slice()
        .sort((a, b) => (hashString(a.slug) % 997) - (hashString(b.slug) % 997)); // estável por slug
    }
    return arr;
  }, [searchParams]);

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE),
    [filtered, currentPage]
  );

  // Se a quantidade de páginas reduziu (por filtro), empurra para uma página válida
  useEffect(() => {
    if (page > totalPages) {
      pushParams((sp) => sp.set(URL_KEYS.page, String(totalPages)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // Listas de filtros (checados)
  const isBrandChecked = (b: string) => selectedBrands.includes(b);
  const isCatChecked = (c: string) => selectedCats.includes(c);
  const isSubChecked = (s: string) => selectedSubs.includes(s);

  // Chips ativos
  const chips = [
    ...selectedBrands.map((b) => ({ k: URL_KEYS.brand, v: b })),
    ...selectedCats.map((c) => ({ k: URL_KEYS.cat, v: c })),
    ...selectedSubs.map((s) => ({ k: URL_KEYS.sub, v: s })),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
      {/* Painel de filtros */}
      <aside className="lg:sticky lg:top-[76px] h-max space-y-6">
        <div className="card-modern p-3">
          <label htmlFor="busca" className="text-sm font-medium opacity-80">
            Buscar no catálogo
          </label>
          <input
            id="busca"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Digite para buscar..."
            className="mt-1 w-full rounded-md border bg-white/80 dark:bg-black/30 px-3 py-2"
            aria-label="Buscar produtos"
          />
          <div className="mt-2 flex items-center justify-between text-xs">
            <button
              onClick={toggleOrder}
              className="underline opacity-80 hover:opacity-100"
              title="Alternar ordenação"
            >
              Ordenação: {ord === 'rand' ? 'Aleatória' : 'Padrão'}
            </button>
            <button onClick={clearAll} className="underline opacity-80 hover:opacity-100">
              Limpar tudo
            </button>
          </div>
        </div>

        <div className="card-modern p-3">
          <p className="text-sm font-medium mb-2 opacity-80">Marcas</p>
          <div className="flex flex-col gap-1 max-h-56 overflow-auto pr-1">
            {ALL_BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBrandChecked(b)}
                  onChange={() => toggleArrayFilter(URL_KEYS.brand, b)}
                />
                <span>{b}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card-modern p-3">
          <p className="text-sm font-medium mb-2 opacity-80">Categorias</p>
          <div className="flex flex-col gap-1 max-h-44 overflow-auto pr-1">
            {ALL_CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={isCatChecked(c)} onChange={() => toggleArrayFilter(URL_KEYS.cat, c)} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card-modern p-3">
          <p className="text-sm font-medium mb-2 opacity-80">Subcategorias</p>
          <div className="flex flex-col gap-1 max-h-44 overflow-auto pr-1">
            {ALL_SUBCATEGORIES.map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={isSubChecked(s)} onChange={() => toggleArrayFilter(URL_KEYS.sub, s)} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <section>
        {/* Header: resultados + chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="text-sm opacity-80">
            Encontrados <strong>{filtered.length}</strong> produto(s){' '}
            {filtered.length > PER_PAGE && (
              <span className="opacity-60">
                — Página {currentPage}/{totalPages}
              </span>
            )}
          </div>

          {chips.length > 0 && (
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                {chips.map((c, idx) => (
                  <button
                    key={`${c.k}-${c.v}-${idx}`}
                    onClick={() => toggleArrayFilter(c.k, c.v)}
                    className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Remover filtro"
                  >
                    {c.v} ✕
                  </button>
                ))}
                <button
                  onClick={clearAll}
                  className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        {pageItems.length === 0 ? (
          <p className="text-sm opacity-70">Nenhum produto encontrado com os filtros atuais.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageItems.map((p) => (
              <ListCard key={p.slug} product={p} query={qInput} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                pushParams((sp) => {
                  sp.set(URL_KEYS.page, String(Math.max(1, currentPage - 1)));
                })
              }
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sm">
              Página {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                pushParams((sp) => {
                  sp.set(URL_KEYS.page, String(Math.min(totalPages, currentPage + 1)));
                })
              }
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
