'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { BudgetItem, clear, list, remove, setQty } from '@/lib/budgetList';
import { SITE } from '@/lib/site';
export default function OrcamentoPage(){
  const [items, setItems] = useState<BudgetItem[]>([]);
  useEffect(()=>{
    const refresh = ()=>setItems(list());
    refresh();
    window.addEventListener('budget:update' as any, refresh);
    return () => window.removeEventListener('budget:update' as any, refresh);
  }, []);
  const waHref = useMemo(()=>{
    const lines = items.map(it => `• ${it.title} (qtd: ${it.qty})`).join('%0A');
    const text = encodeURIComponent(`Olá! Gostaria de um orçamento:%0A${lines}`);
    const number = SITE.whatsappNumberIntl.replace('+','');
    return `https://wa.me/${number}?text=${text}`;
  }, [items]);
  return (
    <div className="py-6 space-y-4">
      <h1 className="text-2xl font-semibold">Orçamento</h1>
      <div className="space-y-3">
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
      {items.length>0 && (
        <div className="flex gap-2">
          <a href={waHref} target="_blank" className="px-4 py-2 rounded-md bg-emerald-600 text-white">Enviar orçamento via WhatsApp</a>
          <button onClick={()=>clear()} className="px-4 py-2 rounded-md border">Limpar</button>
        </div>
      )}
    </div>
  );
}
