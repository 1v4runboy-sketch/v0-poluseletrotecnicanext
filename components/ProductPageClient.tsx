'use client';

import React, { useMemo } from 'react';
import type { Product } from '@/lib/products';
import PRODUCTS from '@/lib/products';
import { SITE } from '@/lib/site';
import ProductCarousel from './ProductCarousel';
import BrandBadge from './BrandBadge';
import * as BL from '@/lib/budgetList';

/** Util para evitar imagens quebradas */
const firstImage = (p: Product) =>
  p.images?.[0]?.src || '/produtos/placeholder.webp';

/** Gera lista única por slug preservando a ordem */
function uniqueBySlug(items: Product[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const p of items) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug);
      out.push(p);
    }
  }
  return out;
}

/** Seleciona relacionados: prioridade mesma categoria e/ou marca; completa com aleatórios */
function getRelated(current: Product, max = 4): Product[] {
  const pool = PRODUCTS.filter((p) => p.slug !== current.slug);

  const sameCat = pool.filter((p) => p.category === current.category);
  const sameBrand = current.brand
    ? pool.filter((p) => p.brand === current.brand)
    : [];

  let chosen = uniqueBySlug([...sameCat, ...sameBrand]).slice(0, max);

  // se faltou, completa com pseudo-aleatório por hash do slug (estável)
  if (chosen.length < max) {
    const rest = pool.filter((p) => !chosen.some((c) => c.slug === p.slug));
    const withScore = rest.map((p) => ({
      p,
      s:
        (p.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 997) /
        997,
    }));
    withScore.sort((a, b) => a.s - b.s);
    chosen = [...chosen, ...withScore.map((x) => x.p)].slice(0, max);
  }

  return chosen;
}

export default function ProductPageClient({ product }: { product: Product }) {
  const related = useMemo(() => getRelated(product, 4), [product]);

  const addToBudget = () => {
    BL.add(product);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* IMAGENS */}
      <div className="relative">
        <div className="aspect-square bg-white/60 dark:bg-black/20 rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10">
          <ProductCarousel images={product.images} auto indicators pauseOnHover />
        </div>
        {/* Badge de marca sobre a imagem */}
        <div className="absolute top-3 left-3">
          <BrandBadge brand={product.brand} name={product.brand} />
        </div>
      </div>

      {/* DETALHES */}
      <div>
        {/* Breadcrumb “simples” (sem dependência externa) */}
        <nav className="text-xs opacity-70 mb-2">
          <a className="hover:underline" href="/">Home</a>
          {' '}›{' '}
          <a className="hover:underline" href={`/?cat=${encodeURIComponent(product.category)}`}>
            {product.category}
          </a>
          {product.subcategory ? (
            <>
              {' '}›{' '}
              <a className="hover:underline" href={`/?sub=${encodeURIComponent(product.subcategory)}`}>
                {product.subcategory}
              </a>
            </>
          ) : null}
        </nav>

        <h1 className="text-2xl font-semibold leading-tight">{product.title}</h1>

        {/* Chips de classificação */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {product.brand && (
            <a
              href={`/?marca=${encodeURIComponent(product.brand)}`}
              className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Ver produtos da marca"
            >
              {product.brand}
            </a>
          )}
          <a
            href={`/?cat=${encodeURIComponent(product.category)}`}
            className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Ver produtos desta categoria"
          >
            {product.category}
          </a>
          {product.subcategory && (
            <a
              href={`/?sub=${encodeURIComponent(product.subcategory)}`}
              className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Ver produtos desta subcategoria"
            >
              {product.subcategory}
            </a>
          )}
        </div>

        {product.shortDescription && (
          <p className="mt-3 opacity-85">{product.shortDescription}</p>
        )}

        {/* Ações */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={SITE.whatsappHref(product.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            aria-label="Consultar por WhatsApp"
            title="Consultar por WhatsApp"
          >
            Consultar / Cotação
          </a>
          <button
            onClick={addToBudget}
            className="btn-magnetic px-4 py-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Adicionar à lista de orçamento"
            title="Adicionar à lista de orçamento"
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
            }}
            className="btn-magnetic px-3 py-2 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Copiar link"
            title="Copiar link do produto"
          >
            Copiar link
          </button>
        </div>

        {/* Ficha técnica */}
        {product.techSpecs && product.techSpecs.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Ficha técnica</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {product.techSpecs.map(([k, v], i) => (
                <div
                  key={`${k}-${i}`}
                  className="flex items-center justify-between rounded border px-3 py-1"
                >
                  <span className="opacity-80">{k}</span>
                  <span className="font-medium text-right ml-3">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RELACIONADOS */}
      {related.length > 0 && (
        <div className="lg:col-span-2 mt-4">
          <h3 className="font-semibold mb-2">Relacionados</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/produtos/${p.slug}`}
                className="rounded border p-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-weg/60"
                aria-label={`Abrir ${p.title}`}
              >
                <div className="relative aspect-square overflow-hidden rounded bg-white/60 dark:bg-black/20">
                  {/* Badge da marca também nos relacionados (sutil) */}
                  <div className="absolute top-2 left-2 z-10">
                    <BrandBadge brand={p.brand} name={p.brand} />
                  </div>
                  <img
                    src={firstImage(p)}
                    alt={p.images?.[0]?.alt || p.title}
                    className="w-full h-full object-contain transition-transform duration-200"
                  />
                </div>
                <div className="mt-1 text-xs line-clamp-2">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
