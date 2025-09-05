'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientPortal from './ClientPortal';
import ProductCard from './ProductCard';
import * as DB from '@/lib/products';
import * as SITEUTIL from '@/lib/site';

const SOURCE = (DB && (DB.default || DB.products || DB.PRODUCTS)) || [];
const PRODUCTS = Array.isArray(SOURCE) ? SOURCE : [];

// helpers de título e hash estáveis
const titleCaseSmart = SITEUTIL?.titleCaseSmart || ((s) => s || '');
const hashSlug = SITEUTIL?.hashSlug || ((s) => s.split('').reduce((a,c)=>((a*31)^c.charCodeAt(0))>>>0,0));

function toSrc(img) {
  if (!img) return '';
  return typeof img === 'string' ? img : (img.src || '');
}
function toAlt(img) {
  if (!img) return '';
  return typeof img === 'string' ? '' : (img.alt || '');
}

/**
 * Regras de formatação para capacitores:
 * - MF -> UF
 * - "UF" deve vir antes de "VAC"
 */
function formatTitle(raw) {
  if (!raw) return '';
  let s = String(raw);
  s = s.replace(/mf/gi, 'uf');
  // Tentativa de reordenar "<voltage>v ... <uf>uf" -> "<uf> UF <voltage> V"
  const vol = s.match(/(\d{2,4})\s*vac|\b(\d{2,4})\s*v\b/i);
  const uf = s.match(/(\d{1,4})\s*uf\b/i);
  if (vol && uf) {
    const v = (vol[1] || vol[2] || '').trim();
    const u = uf[1].trim();
    // remove duplicações básicas
    s = s.replace(/(\d{2,4})\s*vac/ig, '').replace(/\b(\d{2,4})\s*v\b/ig, '').replace(/(\d{1,4})\s*uf/ig, '');
    s = `${s} ${u} UF ${v ? v + ' V' : ''}`;
  }
  return titleCaseSmart(s.replace(/[-_]/g, ' ').replace(/\s{2,}/g, ' ').trim());
}

function normalizeBrand(b) {
  const s = (b == null ? '' : String(b)).trim().toUpperCase();
  return s || 'POLUS';
}

function unique(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

export default function ProductListPageClient() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [brand, setBrand] = useState('');
  const [cat, setCat] = useState('');
  const [sub, setSub] = useState('');
  const [sort, setSort] = useState('A-Z'); // 'A-Z' | 'RAND'
  const [page, setPage] = useState(1);

  // Derivação de filtros
  const allBrands = useMemo(
    () => unique(PRODUCTS.map((p) => normalizeBrand(p.brand))),
    []
  );
  const allCats = useMemo(
    () => unique(PRODUCTS.map((p) => (p.category || '').trim()).filter(Boolean)),
    []
  );
  const allSubs = useMemo(
    () => unique(PRODUCTS.map((p) => (p.subcategory || '').trim()).filter(Boolean)),
    []
  );

  // Filtragem + ordenação
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const pb = normalizeBrand(p.brand);
      const pc = (p.category || '').trim();
      const ps = (p.subcategory || '').trim();
      if (brand && pb !== brand) return false;
      if (cat && pc !== cat) return false;
      if (sub && ps !== sub) return false;
      if (query) {
        const hay =
          `${p.slug || ''} ${(p.title || '')} ${pb} ${pc} ${ps}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    if (sort === 'A-Z') {
      list = [...list].sort((a, b) => {
        const ta = formatTitle(a.title || a.slug || '');
        const tb = formatTitle(b.title || b.slug || '');
        return ta.localeCompare(tb, 'pt-BR');
      });
    } else {
      // RAND determinístico por hash do slug (estável)
      list = [...list].sort((a, b) => {
        const ha = hashSlug(a.slug || a.title || '');
        const hb = hashSlug(b.slug || b.title || '');
        return ha - hb;
      });
    }
    return list;
  }, [q, brand, cat, sub, sort]);

  // Paginação 15/pg
  const perPage = 15;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSafe = Math.min(totalPages, Math.max(1, page));
  const pageItems = filtered.slice((pageSafe - 1) * perPage, pageSafe * perPage);

  useEffect(() => {
    setPage(1); // reset página quando muda qualquer filtro/busca
  }, [q, brand, cat, sub, sort]);

  // Sugestões em overlay/portal (acima do vídeo)
  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const matches = PRODUCTS.filter((p) =>
      `${p.slug || ''} ${(p.title || '')}`.toLowerCase().includes(query)
    ).slice(0, 8);
    return matches;
  }, [q]);

  return (
    <div className="w-full">
      {/* Barra de busca + filtros */}
      <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">Buscar</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex.: WEG, capacitor 40 UF 250 V, 6203ZZ..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Marca</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="min-w-[160px] rounded-md border border-slate-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">Todas</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Categoria</label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="min-w-[160px] rounded-md border border-slate-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">Todas</option>
            {allCats.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Subcategoria</label>
          <select
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            className="min-w-[160px] rounded-md border border-slate-300 bg-white px-2 py-2 text-sm"
          >
            <option value="">Todas</option>
            {allSubs.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Ordenar</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-w-[140px] rounded-md border border-slate-300 bg-white px-2 py-2 text-sm"
          >
            <option value="A-Z">A → Z</option>
            <option value="RAND">Aleatória (estável)</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {pageItems.map((p) => (
          <ProductCard
            key={p.slug || p.title}
            product={p}
            titleDisplay={formatTitle(p.title || p.slug)}
            imgSrc={toSrc((p.images && p.images[0]) || '')}
            imgAlt={toAlt((p.images && p.images[0]) || '') || (p.title || '')}
            brand={normalizeBrand(p.brand)}
            onOpen={() => router.push(`/produto/${encodeURIComponent(p.slug)}`)}
          />
        ))}
      </div>

      {/* Paginação */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={pageSafe <= 1}
          className="px-3 py-1.5 text-sm rounded border border-slate-300 bg-white disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-slate-700">
          Página <strong>{pageSafe}</strong> / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={pageSafe >= totalPages}
          className="px-3 py-1.5 text-sm rounded border border-slate-300 bg-white disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      {/* Overlay de sugestões (aparece acima do vídeo) */}
      <ClientPortal>
        {suggestions.length > 0 && (
          <div className="fixed left-1/2 -translate-x-1/2 top-16 z-[10001] w-[92vw] max-w-xl bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg shadow-lg">
            <div className="px-3 py-2 border-b border-slate-200 text-xs text-slate-500">
              Sugestões
            </div>
            <ul className="max-h-[60vh] overflow-auto">
              {suggestions.map((p) => (
                <li
                  key={p.slug}
                  className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                  onClick={() => {
                    // fecha “overlay” ao navegar
                    setQ('');
                    // navega
                    router.push(`/produto/${encodeURIComponent(p.slug)}`);
                  }}
                >
                  {formatTitle(p.title || p.slug)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ClientPortal>
    </div>
  );
}
