'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ClientPortal from './ClientPortal';
import ProductCard from './ProductCard';
import * as DB from '../lib/products';
import * as SITEUTIL from '../lib/site';

const SOURCE = (DB && (DB.default || DB.products || DB.PRODUCTS)) || [];
const PRODUCTS = Array.isArray(SOURCE) ? SOURCE : [];

const titleCaseSmart = SITEUTIL?.titleCaseSmart || ((s) => s || '');
const hashSlug = SITEUTIL?.hashSlug || ((s) => s.split('').reduce((a,c)=>((a*31)^c.charCodeAt(0))>>>0,0));

function toSrc(img) { return !img ? '' : (typeof img === 'string' ? img : (img.src || '')); }
function toAlt(img) { return !img ? '' : (typeof img === 'string' ? '' : (img.alt || '')); }

function formatTitle(raw) {
  if (!raw) return '';
  let s = String(raw).replace(/mf/gi, 'uf');
  const vol = s.match(/(\d{2,4})\s*vac|\b(\d{2,4})\s*v\b/i);
  const uf = s.match(/(\d{1,4})\s*uf\b/i);
  if (vol && uf) {
    const v = (vol[1] || vol[2] || '').trim();
    const u = uf[1].trim();
    s = s.replace(/(\d{2,4})\s*vac/ig, '').replace(/\b(\d{2,4})\s*v\b/ig, '').replace(/(\d{1,4})\s*uf/ig, '');
    s = `${s} ${u} UF ${v ? v + ' V' : ''}`;
  }
  return titleCaseSmart(s.replace(/[-_]/g, ' ').replace(/\s{2,}/g, ' ').trim());
}

/* Util: alinhar a viewport no topo da grade de produtos */
function scrollToGrid(behavior) {
  try {
    const el = document.getElementById('gridTop');
    if (el) el.scrollIntoView({ behavior: behavior || 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: behavior || 'smooth' });
  } catch {}
}

export default function ProductListPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Filtros
  const [q, setQ] = useState('');
  const [brands, setBrands] = useState([]);
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const [sort, setSort] = useState('A-Z');

  // Paginação
  const perPage = 15;
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10) || 1;
  const [page, setPage] = useState(pageFromUrl);
  useEffect(() => { setPage(pageFromUrl); }, [pageFromUrl]);

  const allBrands = useMemo(() => Array.from(new Set(PRODUCTS.map((p)=>SITEUTIL.resolveBrand(p).name).filter(Boolean))).sort(), []);
  const allCats = useMemo(() => Array.from(new Set(PRODUCTS.map((p)=>(p.category||'').trim()).filter(Boolean))).sort(), []);
  const allSubs = useMemo(() => Array.from(new Set(PRODUCTS.map((p)=>(p.subcategory||'').trim()).filter(Boolean))).sort(), []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const brandInfo = SITEUTIL.resolveBrand(p);
      const pb = brandInfo.name;
      const pc = (p.category || '').trim();
      const ps = (p.subcategory || '').trim();
      if (brands.length && !brands.includes(pb)) return false;
      if (cats.length && !cats.includes(pc)) return false;
      if (subs.length && !subs.includes(ps)) return false;
      if (query) {
        const hay = `${p.slug || ''} ${(p.title || '')} ${pb} ${pc} ${ps}`.toLowerCase();
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
      list = [...list].sort((a, b) => {
        const ha = hashSlug(a.slug || a.title || '');
        const hb = hashSlug(b.slug || b.title || '');
        return ha - hb;
      });
    }
    return list;
  }, [q, brands, cats, subs, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageSafe = Math.min(totalPages, Math.max(1, page));
  const from = filtered.length ? (pageSafe - 1) * perPage + 1 : 0;
  const to = Math.min(filtered.length, pageSafe * perPage);
  const pageItems = filtered.slice((pageSafe - 1) * perPage, pageSafe * perPage);

  // Sugestões
  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const sug = [];
    for (const p of PRODUCTS) {
      const title = formatTitle(p.title || p.slug || '');
      if (title.toLowerCase().includes(query)) sug.push({ type: 'produto', label: title, slug: p.slug });
      if (sug.length > 6) break;
    }
    for (const b of allBrands) {
      if (b.toLowerCase().includes(query)) sug.push({ type: 'marca', label: b });
      if (sug.length > 10) break;
    }
    return sug;
  }, [q, allBrands]);

  function pushPage(n) {
    const clamped = Math.min(totalPages, Math.max(1, n));
    const qs = new URLSearchParams(Array.from(searchParams.entries()));
    qs.set('page', String(clamped));
    router.push(`${pathname}?${qs.toString()}`, { scroll: false });
    setPage(clamped);
    // Alinha a viewport no topo da grade
    setTimeout(() => scrollToGrid('smooth'), 0);
  }

  // Reset para página 1 ao mudar filtros (e alinhamento)
  useEffect(() => {
    const qs = new URLSearchParams(Array.from(searchParams.entries()));
    if (qs.get('page') !== '1') {
      qs.set('page', '1');
      router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
    } else {
      setPage(1);
    }
    setTimeout(() => scrollToGrid('auto'), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, brands, cats, subs, sort]);

  // Util: janela de números
  function pageNumbers() {
    const maxBtns = 7;
    if (totalPages <= maxBtns) return Array.from({length: totalPages}, (_,i)=>i+1);
    const arr = [];
    const left = Math.max(1, pageSafe - 2);
    const right = Math.min(totalPages, left + 4);
    if (left > 1) arr.push(1, '…');
    for (let n = left; n <= right; n++) arr.push(n);
    if (right < totalPages) arr.push('…', totalPages);
    return arr;
  }

  const toggle = (arr, setArr, value) => {
    const has = arr.includes(value);
    setArr(has ? arr.filter((v)=>v!==value) : [...arr, value]);
  };
  const clearAll = () => { setQ(''); setBrands([]); setCats([]); setSubs([]); setSort('A-Z'); };

  return (
    <div className="w-full">
      {/* FILTROS */}
      <div className="filters-card">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-4">
          <div className="flex-1 min-w-[220px]">
            <label className="filter-label">Buscar</label>
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Ex.: WEG, capacitor 40 UF 250 V, 6203ZZ..."
              className="filter-input"
            />
          </div>

          <div className="hidden md:grid grid-cols-2 gap-3">
            <div>
              <label className="filter-label">Ordenar</label>
              <select value={sort} onChange={(e)=>setSort(e.target.value)} className="filter-select">
                <option value="A-Z">A → Z</option>
                <option value="RAND">Aleatória (estável)</option>
              </select>
            </div>
            <div className="flex gap-2 items-end">
              <button onClick={clearAll} className="btn-soft">Limpar todos</button>
            </div>
          </div>

          <div className="md:hidden flex items-end gap-2">
            <button onClick={() => alert('Drawer mobile pronto para ativar.')} className="btn-accent">Abrir filtros</button>
            <button onClick={clearAll} className="btn-soft">Limpar</button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="filter-label">Marca</label>
            <div className="filter-box">
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto pr-1">
                {allBrands.map((b) => (
                  <label key={b} className="check-row">
                    <input type="checkbox" checked={brands.includes(b)} onChange={()=>toggle(brands, setBrands, b)} />
                    <span>{b}</span>
                    <em>({filtered.filter(p=>SITEUTIL.resolveBrand(p).name===b).length})</em>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="filter-label">Categoria</label>
            <div className="filter-box">
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto pr-1">
                {allCats.map((c) => (
                  <label key={c} className="check-row">
                    <input type="checkbox" checked={cats.includes(c)} onChange={()=>toggle(cats, setCats, c)} />
                    <span>{c || '—'}</span>
                    <em>({filtered.filter(p=>(p.category||'').trim()===c).length})</em>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="filter-label">Subcategoria</label>
            <div className="filter-box">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[220px] overflow-auto pr-1">
                {allSubs.map((s) => (
                  <label key={s} className="check-row">
                    <input type="checkbox" checked={subs.includes(s)} onChange={()=>toggle(subs, setSubs, s)} />
                    <span>{s || '—'}</span>
                    <em>({filtered.filter(p=>(p.subcategory||'').trim()===s).length})</em>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {(brands.length || cats.length || subs.length || q) ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {q && (<button className="chip" onClick={()=>setQ('')}><strong>Busca:</strong> {q} <span className="x">×</span></button>)}
            {brands.map((b)=>(<button key={'b-'+b} className="chip" onClick={()=>toggle(brands, setBrands, b)}><strong>Marca:</strong> {b} <span className="x">×</span></button>))}
            {cats.map((c)=>(<button key={'c-'+c} className="chip" onClick={()=>toggle(cats, setCats, c)}><strong>Categoria:</strong> {c} <span className="x">×</span></button>))}
            {subs.map((s)=>(<button key={'s-'+s} className="chip" onClick={()=>toggle(subs, setSubs, s)}><strong>Sub:</strong> {s} <span className="x">×</span></button>))}
            <button className="chip-clear" onClick={clearAll}>Limpar todos</button>
          </div>
        ) : null}
      </div>

      {/* Sugestões (overlay) */}
      {suggestions.length > 0 && q.trim().length >= 2 && (
        <ClientPortal>
          <div className="fixed left-1/2 -translate-x-1/2 top-[74px] z-[100000] w-[min(92vw,760px)]">
            <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl ring-1 ring-slate-200/70 dark:ring-white/10 overflow-hidden">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (sug.type === 'produto' && sug.slug) router.push(`/produto/${encodeURIComponent(sug.slug)}#productTop`);
                    else if (sug.type === 'marca') setBrands((arr)=>arr.includes(sug.label)?arr:[...arr, sug.label]);
                    setQ('');
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/70 text-sm text-slate-800 dark:text-slate-100"
                >
                  <span className="opacity-70 mr-2">{sug.type === 'produto' ? 'Produto' : 'Marca'}</span>
                  {sug.label}
                </button>
              ))}
            </div>
          </div>
        </ClientPortal>
      )}

      {/* Indicador e Grade */}
      <div className="mt-6 mb-3 text-center text-sm text-slate-700 dark:text-slate-300">
        {`Exibindo ${from}–${to} de ${filtered.length} produtos`}
      </div>

      <div id="gridTop" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {pageItems.map((p) => {
          const img = (p.images && p.images[0]) || '';
          return (
            <ProductCard
              key={p.slug || p.title}
              product={p}
              titleDisplay={formatTitle(p.title || p.slug)}
              imgSrc={toSrc(img)}
              imgAlt={toAlt(img) || (p.title || '')}
            />
          );
        })}
      </div>

      {/* Paginação numerada */}
      <nav className="mt-8 flex items-center justify-center gap-1" aria-label="Paginação">
        <button onClick={()=>pushPage(1)} disabled={pageSafe<=1} className="pg-btn" aria-label="Primeira página">{'<<'}</button>
        <button onClick={()=>pushPage(pageSafe-1)} disabled={pageSafe<=1} className="pg-btn" aria-label="Página anterior">{'<'}</button>
        {pageNumbers().map((n, i) => (
          typeof n === 'number' ? (
            <button
              key={i} onClick={()=>pushPage(n)}
              className={`pg-num ${n===pageSafe?'active':''}`}
              aria-current={n===pageSafe ? 'page' : undefined}
            >{n}</button>
          ) : <span key={i} className="px-2 text-slate-500 dark:text-slate-400">…</span>
        ))}
        <button onClick={()=>pushPage(pageSafe+1)} disabled={pageSafe>=totalPages} className="pg-btn" aria-label="Próxima página">{'>'}</button>
        <button onClick={()=>pushPage(totalPages)} disabled={pageSafe>=totalPages} className="pg-btn" aria-label="Última página">{'>>'}</button>
      </nav>

      {/* Estilos escopados */}
      <style jsx>{`
        .filters-card{
          border-radius: 18px; padding: 16px;
          background: rgba(255,255,255,0.66); box-shadow: 0 10px 30px rgba(2,8,23,0.06);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(15,23,42,0.06);
        }
        :global(html.dark) .filters-card{ background: rgba(11,18,34,0.66); border-color: rgba(255,255,255,0.10); box-shadow: 0 10px 30px rgba(0,0,0,0.28); }
        .filter-label{ display:block; margin-bottom:6px; font-size:12px; font-weight:600; color:#334155; }
        :global(html.dark) .filter-label{ color:#e2e8f0; }
        .filter-input, .filter-select{
          width:100%; border-radius: 14px; border:1px solid rgba(15,23,42,0.15);
          background:#fff; padding:10px 12px; font-size:14px; outline: none; transition: border-color .2s, box-shadow .2s;
        }
        .filter-input::placeholder{ color:#94a3b8; }
        .filter-input:focus, .filter-select:focus{ border-color:#8AD8FF; box-shadow: 0 0 0 3px rgba(138,216,255,0.35); }
        :global(html.dark) .filter-input, :global(html.dark) .filter-select{ background:#0b1222; border-color: rgba(255,255,255,0.12); color:#f8fafc; }

        .filter-box{
          border-radius: 14px; border:1px solid rgba(15,23,42,0.12);
          background:#fff; padding:10px; box-shadow: inset 0 1px 2px rgba(2,8,23,0.04);
        }
        :global(html.dark) .filter-box{ background:#0b1222; border-color: rgba(255,255,255,0.12); box-shadow: inset 0 1px 2px rgba(0,0,0,0.25); }

        .check-row{ display:flex; align-items:center; gap:8px; font-size:13px; padding:6px 8px; border-radius:10px; transition: background .15s, border-color .15s; border:1px solid transparent; }
        .check-row:hover{ background: rgba(138,216,255,0.12); border-color: rgba(138,216,255,0.35); }
        :global(html.dark) .check-row:hover{ background: rgba(138,216,255,0.10); border-color: rgba(138,216,255,0.28); }
        .check-row em{ font-style:normal; opacity:0.65; margin-left:auto; }

        .chip{ display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px; background: #f1f5f9; color:#0f172a; border:1px solid #e2e8f0; font-size:12px; font-weight:600; }
        .chip .x{ margin-left:6px; opacity:0.6; }
        :global(html.dark) .chip{ background:#111827; color:#e5e7eb; border-color:#1f2937; }
        .chip-clear{ padding:6px 10px; border-radius:999px; font-size:12px; font-weight:600; background: transparent; color:#0284c7; border:1px solid rgba(2,132,199,0.25); }

        .btn-accent{ border-radius:12px; padding:10px 14px; font-weight:700; font-size:14px; background: #8AD8FF; color:#0b1222; border:1px solid rgba(2,8,23,0.08); box-shadow: 0 8px 18px rgba(138,216,255,0.35); transition: transform .15s, box-shadow .15s; }
        .btn-accent:hover{ transform: translateY(-1px); box-shadow: 0 10px 22px rgba(138,216,255,0.45); }
        .btn-soft{ border-radius:12px; padding:10px 14px; font-weight:700; font-size:14px; background: #f1f5f9; color:#0f172a; border:1px solid #e2e8f0; }
        :global(html.dark) .btn-soft{ background:#111827; color:#e5e7eb; border-color:#1f2937; }

        .pg-btn, .pg-num{
          min-width: 36px; height: 38px; padding: 0 10px; border-radius: 10px; border:1px solid #e5e7eb; background:#fff; color:#0f172a;
          display:inline-flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; transition: background .15s, box-shadow .15s, transform .15s;
        }
        .pg-btn[disabled]{ opacity: .4; cursor:not-allowed; }
        .pg-num.active{ background:#0ea5e9; border-color:#0ea5e9; color:#fff; }
        .pg-btn:hover, .pg-num:hover{ transform: translateY(-1px); box-shadow: 0 8px 18px rgba(2,8,23,.08); }
        :global(html.dark) .pg-btn, :global(html.dark) .pg-num{ background:#0b1222; border-color: rgba(255,255,255,.12); color:#e5e7eb; }
        :global(html.dark) .pg-num.active{ background:#38bdf8; border-color:#38bdf8; color:#0b1222; }
      `}</style>
    </div>
  );
}
