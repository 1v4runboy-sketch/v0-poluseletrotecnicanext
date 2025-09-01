"use client"
import { useMemo } from "react"
import PRODUCTS from "@/lib/products"
import { SITE } from "@/lib/site"
import ProductCarousel from "./ProductCarousel"
import BrandBadge from "./BrandBadge"
import * as BL from "@/lib/budgetList"

function firstImage(p: any) {
  return (p && p.images && p.images[0] && p.images[0].src) || "/produtos/placeholder.webp"
}
function uniqueBySlug(items: any[]) {
  const s = new Set(),
    out = []
  for (const p of items) {
    if (!s.has(p.slug)) {
      s.add(p.slug)
      out.push(p)
    }
  }
  return out
}
function getRelated(current: any, max = 4) {
  const pool = PRODUCTS.filter((p) => p.slug !== current.slug)
  const sameCat = pool.filter((p) => p.category === current.category)
  const sameBrand = current.brand ? pool.filter((p) => p.brand === current.brand) : []
  let chosen = uniqueBySlug([...sameCat, ...sameBrand]).slice(0, max)
  if (chosen.length < max) {
    const rest = pool.filter((p) => !chosen.some((c) => c.slug === p.slug))
    const withScore = rest.map((p) => ({
      p,
      s: (p.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 997) / 997,
    }))
    withScore.sort((a, b) => a.s - b.s)
    chosen = [...chosen, ...withScore.map((x) => x.p)].slice(0, max)
  }
  return chosen
}

function formatTitleCommercial(title: string) {
  if (!title) return ""
  const KEEP_UP = new Set(["WEG", "HCH", "NSK", "JL", "IGUI", "iGUi", "CIFA", "LANC", "AC", "DC", "DDU", "ZZ"])
  const LOWER = new Set(["de", "da", "do", "das", "dos", "e", "para", "em", "com"])
  return title
    .split(/\s+/)
    .map((w, i) => {
      const up = w.toUpperCase()
      if (KEEP_UP.has(up)) return up
      if (LOWER.has(w.toLowerCase()) && i !== 0) return w.toLowerCase()
      if (/^\d+[/-]\d+$/.test(w) || /mm$/i.test(w) || /^\d{3,}$/.test(w)) return w
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })
    .join(" ")
}

export default function ProductPageClient({ product }: { product: any }) {
  const related = useMemo(() => getRelated(product, 4), [product])
  const addToBudget = () => BL.add(product)

  if (!product) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="relative">
        <div className="aspect-square bg-white/60 dark:bg-black/20 rounded-lg overflow-hidden ring-1 ring-black/10 dark:ring-white/10">
          <ProductCarousel images={product.images || []} auto indicators pauseOnHover />
        </div>
        <div className="absolute top-3 left-3">
          <BrandBadge brand={product.brand} name={product.brand} />
        </div>
      </div>

      <div>
        <nav className="text-xs opacity-70 mb-2">
          <a className="hover:underline" href="/">
            Home
          </a>{" "}
          ›{" "}
          <a className="hover:underline" href={`/?cat=${encodeURIComponent(product.category)}`}>
            {product.category}
          </a>
          {product.subcategory ? (
            <>
              {" "}
              ›{" "}
              <a className="hover:underline" href={`/?sub=${encodeURIComponent(product.subcategory)}`}>
                {product.subcategory}
              </a>
            </>
          ) : null}
        </nav>

        <h1 className="text-2xl font-semibold leading-tight">{formatTitleCommercial(product.title)}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {product.brand ? (
            <a
              href={`/?marca=${encodeURIComponent(product.brand)}`}
              className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {product.brand}
            </a>
          ) : null}
          <a
            href={`/?cat=${encodeURIComponent(product.category)}`}
            className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {product.category}
          </a>
          {product.subcategory ? (
            <a
              href={`/?sub=${encodeURIComponent(product.subcategory)}`}
              className="chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs anim-soft hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {product.subcategory}
            </a>
          ) : null}
        </div>

        {product.shortDescription ? <p className="mt-3 opacity-85">{product.shortDescription}</p> : null}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={SITE.whatsappHref(product.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Consultar / Cotação
          </a>
          <button
            onClick={addToBudget}
            className="btn-magnetic px-4 py-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(window.location.href)
            }}
            className="btn-magnetic px-3 py-2 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Copiar link
          </button>
        </div>

        {Array.isArray(product.techSpecs) && product.techSpecs.length > 0 ? (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Ficha técnica</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {product.techSpecs.map((pair, i) => {
                const k = String(pair?.[0] ?? "")
                const v = String(pair?.[1] ?? "")
                return (
                  <div key={k + "-" + i} className="flex items-center justify-between rounded border px-3 py-1">
                    <span className="opacity-80">{k}</span>
                    <span className="font-medium text-right ml-3">{v}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>

      {related.length > 0 ? (
        <div className="lg:col-span-2 mt-4">
          <h3 className="font-semibold mb-2">Relacionados</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/produtos/${p.slug}`}
                className="rounded border p-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-weg/60"
              >
                <div className="relative aspect-square overflow-hidden rounded bg-white/60 dark:bg-black/20">
                  <div className="absolute top-2 left-2 z-10">
                    <BrandBadge brand={p.brand} name={p.brand} />
                  </div>
                  <img
                    src={firstImage(p) || "/placeholder.svg"}
                    alt={(p.images && p.images[0] && p.images[0].alt) || p.title}
                    className="w-full h-full object-contain transition-transform duration-200"
                  />
                </div>
                <div className="mt-1 text-xs line-clamp-2">{formatTitleCommercial(p.title)}</div>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
