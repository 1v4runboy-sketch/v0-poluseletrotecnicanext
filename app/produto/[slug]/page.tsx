'use client';

import { useMemo, useState } from 'react';
import * as DB from '@/lib/products';
import * as SITEUTIL from '@/lib/site';
import Link from 'next/link';

const SOURCE = (DB && (DB.default || DB.products || DB.PRODUCTS)) || [];
const PRODUCTS = Array.isArray(SOURCE) ? SOURCE : [];

const whatsappHref = SITEUTIL?.whatsappHref || ((t) => `https://wa.me/551135992935?text=${encodeURIComponent('Olá! Gostaria de uma cotação: ' + (t || ''))}`);
const titleCaseSmart = SITEUTIL?.titleCaseSmart || ((s) => s || '');

function toSrc(img) { return !img ? '' : (typeof img === 'string' ? img : (img.src || '')); }
function toAlt(img) { return !img ? '' : (typeof img === 'string' ? '' : (img.alt || '')); }
function normalizeBrand(b) { const s = (b == null ? '' : String(b)).trim().toUpperCase(); return s || 'POLUS'; }

function formatTitle(raw) {
  if (!raw) return '';
  let s = String(raw);
  s = s.replace(/mf/gi, 'uf');
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

export default function ProductPage({ params }) {
  const slug = decodeURIComponent(params?.slug || '');
  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  // Galeria simples (principal + thumbs)
  const images = (product?.images || []).map((img) => ({ src: toSrc(img), alt: toAlt(img) }));
  const [idx, setIdx] = useState(0);

  const brand = normalizeBrand(product?.brand);
  const title = formatTitle(product?.title || product?.slug || '');
  const chips = [
    brand && { label: brand },
    product?.category && { label: product.category },
    product?.subcategory && { label: product.subcategory },
  ].filter(Boolean);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCat = (p) => p.category && product.category && p.category === product.category;
    const sameBrand = (p) => normalizeBrand(p.brand) === brand && brand !== 'POLUS';
    const pool = PRODUCTS.filter((p) => p.slug !== product.slug && (sameCat(p) || sameBrand(p)));
    return pool.slice(0, 6);
  }, [product, brand]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <p className="text-slate-700">Produto não encontrado.</p>
        <Link href="/" className="text-sky-700 underline">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        {/* Galeria */}
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="relative aspect-[4/3] bg-slate-100 rounded-md overflow-hidden">
            <img
              src={images[idx]?.src || '/polus-logo.svg'}
              alt={images[idx]?.alt || title}
              className="absolute inset-0 w-full h-full object-contain p-4"
              loading="eager"
              decoding="async"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.map((im, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`aspect-[4/3] rounded border ${i === idx ? 'border-sky-500' : 'border-slate-200'} bg-white overflow-hidden`}
                >
                  <img src={im.src} alt={im.alt || `Thumb ${i+1}`} className="w-full h-full object-contain p-2" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">{title}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-slate-300 bg-white">
                {c.label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <a
              href={whatsappHref(title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Pedir cotação
            </a>
            <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50">
              Voltar
            </Link>
          </div>

          {/* Especificações técnicas (quando houver) */}
          {product.techSpecs && (
            <div className="mt-6">
              <h2 className="text-base font-semibold text-slate-800 mb-2">Especificações Técnicas</h2>
              <pre className="text-sm bg-slate-50 border border-slate-200 rounded-md p-3 overflow-auto">
                {typeof product.techSpecs === 'string'
                  ? product.techSpecs
                  : JSON.stringify(product.techSpecs, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="mt-10">
          <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3">Produtos relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {related.map((p) => {
              const img = (p.images && p.images[0]) || '';
              return (
                <Link
                  key={p.slug}
                  href={`/produto/${encodeURIComponent(p.slug)}`}
                  className="block rounded-xl border border-slate-200 bg-white hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <img
                      src={toSrc(img) || '/polus-logo.svg'}
                      alt={toAlt(img) || p.title || p.slug}
                      className="absolute inset-0 w-full h-full object-contain p-3"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-3 text-sm font-medium text-slate-800 line-clamp-2">
                    {formatTitle(p.title || p.slug)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
