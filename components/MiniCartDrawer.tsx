'use client';
import React, { useEffect, useState } from 'react';
import { clear, list, remove, setQty } from '@/lib/budgetList';

export default function MiniCartDrawer(){
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const t = () => setOpen(v=>!v);
    const refresh = () => setItems(list());
    window.addEventListener('cart:toggle', t);
    window.addEventListener('budget:update', refresh);
    refresh();
    return () => { window.removeEventListener('cart:toggle', t); window.removeEventListener('budget:update', refresh); };
  }, []);

  const total = items.reduce((a,b)=>a+(b?.qty||0),0);

  return (
    <div className={`fixed inset-0 z-50 ${open?'':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={()=>setOpen(false)} />
      <aside className={`absolute right-0 top-0 h-full w-96 bg-white dark:bg-slate-900 shadow-xl transition-transform ${open?'translate-x-0':'translate-x-full'}`}>
        <h2 className="text-lg font-semibold mb-3">Orçamento</h2>
        <div className="space-y-3">
          {items.length===0 && <div className="text-sm opacity-70">Sua lista está vazia.</div>}
          {items.map(item=>(
            <div key={item.id} className="flex items-center justify-between p-2 rounded border border-black/10 dark:border-white/10">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs opacity-70">{item.brand || ''}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="chip" onClick={()=> setQty(item.id, Math.max(1, (item.qty||1)-1))}>-</button>
                <span className="w-6 text-center">{item.qty||1}</span>
                <button className="chip" onClick={()=> setQty(item.id, (item.qty||1)+1)}>+</button>
                <button className="chip" onClick={()=> remove(item.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
        {items.length>0 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">Itens: <strong>{total}</strong></div>
            <button className="chip" onClick={()=> clear()}>Limpar</button>
          </div>
        )}
      </aside>
    </div>
  );
}
