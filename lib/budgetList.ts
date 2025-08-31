'use client';

export type BudgetItem = { id: string; title: string; qty: number; brand?: string };

const KEY = 'polus:budget';
const EVT = 'budget:update';

function read(): BudgetItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function write(items: BudgetItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function onBudgetUpdate(handler: () => void) {
  if (typeof window === 'undefined') return;
  window.addEventListener(EVT, handler as EventListener);
  return () => window.removeEventListener(EVT, handler as EventListener);
}

export function list(): BudgetItem[] { return read(); }

export function add(item: BudgetItem) {
  const items = read();
  const i = items.findIndex(x => x.id === item.id);
  if (i >= 0) items[i].qty += item.qty;
  else items.push(item);
  write(items);
}

export function remove(id: string) {
  write(read().filter(x => x.id !== id));
}

export function setQty(id: string, qty: number) {
  const items = read().map(x => x.id === id ? { ...x, qty } : x);
  write(items);
}

export function clear() { write([]); }
