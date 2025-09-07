'use client';

import { useEffect, useMemo, useState } from 'react';
import * as DB from '../../../lib/products';
import * as SITEUTIL from '../../../lib/site';
import Link from 'next/link';

const SOURCE = (DB && (DB.default || DB.products || DB.PRODUCTS)) || [];
const PRODUCTS = Array.isArray(SOURCE) ? SOURCE : [];

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
  return SITEUTIL.titleCaseSmart(s.replace(/[-_]/g, ' ').replace(/\s{2,}/g, ' ').trim());
}

export default function ProductPage({ params }) {
  const slug = decodeURIComponent(params?.slug || '');
  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const images = (product?.images || []).map((img) => ({ src: toSrc(img), alt: toAlt(img) }));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    try {
      const id = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash.slice(1) : 'productTop';
      const el = document.getElementById(id) || document.getElementById('productTop');
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  }, []);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <p className="text-slate-700 dark:text-slate-200">Produto não encontrado.</p>
        <Link href="/" className="text-sky-700 dark:text-sky-400 underline">Voltar</Link>
      </div>
    );
  }

  const info = SITEUTIL.resolveBrand(product);
  const title = formatTitle(product.title || product.slug || '');
  const chips = [info.name && { label: info.name }, product.category && { label: product.category }, product.subcategory && { label: product.subcategory }].filter(Boolean);
  const details = SITEUTIL.buildProductDetails(product);

  const specsEntries = (product && product.specs && typeof product.specs === 'object')
    ? Object.entries(product.specs).filter(([k,v]) => k && v !== undefined && v !== null && String(v).trim() !== '')
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* ÂNCORA PARA POSICIONAMENTO */}
      <div id="productTop" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {/* GALERIA */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
          <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
            <div className="absolute left-2 top-2 z-[2] bg-white/90 dark:bg-slate-900/90 rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1 shadow">
              <img src={info.logoSrc || '/polus-logo.svg'} alt={info.name} className="h-8 w-auto object-contain" onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}} />
            </div>

            <img
              src={images[idx]?.src || '/polus-logo.svg'}
              alt={images[idx]?.alt || title}
              className="absolute inset-0 w-full h-full object-contain p-4"
              loading="eager" decoding="async"
              onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}}
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.map((im, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`aspect-[4/3] rounded border ${i === idx ? 'border-sky-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900 overflow-hidden`}>
                  <img src={im.src} alt={im.alt || `Thumb ${i+1}`} className="w-full h-full object-contain p-2" loading="lazy" decoding="async" onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETALHES */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-[#0b1222] mb-3">
            <img src={info.logoSrc || '/polus-logo.svg'} alt={`Marca: ${info.name}`} className="h-[22px] w-auto object-contain" onError={(e)=>{e.currentTarget.src='/polus-logo.svg';}} />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 tracking-wide">{info.name}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {chips.slice(1).map((c, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
                {c.label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <a href={SITEUTIL.whatsappHref(title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
              Pedir cotação
            </a>
            <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800">
              Voltar
            </Link>
          </div>

          {/* DESCRIÇÃO TÉCNICA */}
          <section className="mt-6 space-y-3">
            <h2 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100">Descrição técnica</h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {details.desc}
            </p>
          </section>

          {/* APLICAÇÕES */}
          {details.applications?.length ? (
            <section className="mt-5">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Aplicações típicas</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
                {details.applications.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </section>
          ) : null}

          {/* DIFERENCIAIS */}
          {details.features?.length ? (
            <section className="mt-5">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Diferenciais e recursos</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
                {details.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </section>
          ) : null}

          {/* ESPECIFICAÇÕES */}
          {specsEntries.length ? (
            <section className="mt-5">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Especificações</h3>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {specsEntries.map(([k,v], i) => (
                      <tr key={i} className="odd:bg-slate-50/70 dark:odd:bg-slate-800/40">
                        <td className="px-3 py-2 font-medium text-slate-800 dark:text-slate-100 w-1/3">{k}</td>
                        <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{String(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
