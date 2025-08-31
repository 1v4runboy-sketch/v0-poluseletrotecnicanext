'use client';
import React, { useEffect, useState } from 'react';
import { BudgetItem, clear, list, remove, setQty } from '@/lib/budgetList';
export default function MiniCartDrawer(){
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<BudgetItem[]>([]);
  useEffect(()=>{
    const t = () => setOpen(v=>!v);
    const refresh = () => setItems(list());
    window.addEventListener('cart:toggle' as any, t);
    window.addEventListener('budget:update' as any, refresh);
    refresh();
    return () => { window.removeEventListener('cart:toggle' as any, t); window.removeEventListener('budget:update' as any, refresh); };
  }, []);
  const total = items.reduce((a,b)=>a+b.qty,0);
  return (
    <div className={`fixed inset-0 z-50 ${open?'':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={()=>setOpen(false)} />
      <aside className={`absolute right-0 top-0 h-full w-96 bg-white dark:bg-zinc-900 border-l border-black/10 dark:border-white/10 p-4 transition-transform ${open?'translate-x-0':'translate-x-full'}`}>
        <h2 className="text-lg font-semibold mb-3">Orçamento</h2>
        <div className="space-y-3 max-h-[70vh] overflow-auto pr-2">
          {items.length===0 && <div className="text-sm text-zinc-500">Sua lista está vazia.</div>}
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between gap-2 border-b pb-2 border-black/10 dark:border-white/10">
              <div>
                <div className="font-medium">{it.title}</div>
                {it.brand && <div className="text-xs text-zinc-500">{it.brand}</div>}
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Diminuir" onClick={()=>setQty(it.id, Math.max(1, it.qty-1))} className="px-2 py-1 rounded border">-</button>
                <span>{it.qty}</span>
                <button aria-label="Aumentar" onClick={()=>setQty(it.id, it.qty+1)} className="px-2 py-1 rounded border">+</button>
                <button aria-label="Remover" onClick={()=>remove(it.id)} className="px-2 py-1 rounded border">Remover</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">Itens: <strong>{total}</strong></div>
          <div className="space-x-2">
            <button onClick={()=>clear()} className="px-3 py-2 rounded border">Limpar</button>
            <a href="/orcamento" className="px-3 py-2 rounded bg-emerald-600 text-white">Ver tudo</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
