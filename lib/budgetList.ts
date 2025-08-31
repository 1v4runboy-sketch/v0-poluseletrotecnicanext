import type { Product } from './products';

type Item = { slug: string; title: string; image?: string; qty: number };
const KEY = 'polus_budget_v1';

function read(): Item[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function write(items: Item[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('budget:update'));
}

export function list() { return read(); }
export function count() { return read().reduce((a,b)=>a+b.qty,0); }
export function add(p: Product, qty = 1) {
  const items = read();
  const i = items.findIndex(x => x.slug === p.slug);
  if (i >= 0) items[i].qty += qty;
  else items.push({ slug: p.slug, title: p.title, image: p.images?.[0]?.src, qty });
  write(items);
}
export function remove(slug: string) {
  write(read().filter(x => x.slug !== slug));
}
export function setQty(slug: string, qty: number) {
  const items = read(); const i = items.findIndex(x => x.slug === slug);
  if (i>=0) { items[i].qty = Math.max(1, qty); write(items); }
}
export function clear() { write([]); }
