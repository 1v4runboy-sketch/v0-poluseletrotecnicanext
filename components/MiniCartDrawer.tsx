'use client';
import { useEffect, useState } from 'react';
import * as BL from '@/lib/budgetList';
import { SITE } from '@/lib/site';

export default function MiniCartDrawer(){
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(BL.list());

  useEffect(()=>{
    const t = () => setOpen(v=>!v);
    const r = () => setItems(BL.list());
    window.addEventListener('cart:toggle' as any, t);
    window.addEventListener('budget:update' as any, r);
    return ()=> { window.removeEventListener('cart:toggle' as any, t); window.removeEventListener('budget:update' as any, r); };
  },[]);

  const send = () => {
    const lines = items.map(i => `• ${i.title} (x${i.qty})`).join('%0A');
    const text = `Olá! Gostaria de solicitar uma cotação:%0A${lines}`;
    const number = SITE.whatsappNumberIntl.replace('+','');
    const href = `https://wa.me/${number}?text=${text}`;
    window.open(href, '_blank');
  };

  return (
    <aside className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl z-50 transition-transform ${open? 'translate-x-0':'translate-x-full'}`}>
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-semibold">Lista de orçamento</h3>
        <button onClick={()=> setOpen(false)} className="text-sm rounded px-2 py-1 border">Fechar</button>
      </div>
      <div className="p-3 space-y-2 overflow-y-auto h-[calc(100%-120px)]">
        {items.length===0 && <p className="text-sm opacity-70">Sua lista está vazia.</p>}
        {items.map(i=>(
          <div key={i.slug} className="flex items-center gap-2 rounded border p-2">
            <img src={i.image || '/produtos/placeholder.webp'} alt={i.title} className="w-12 h-12 object-contain"/>
            <div className="text-sm flex-1">
              <div className="font-medium line-clamp-1">{i.title}</div>
              <div className="opacity-70">Qtd:
                <button onClick={()=>{ BL.setQty(i.slug, Math.max(1, i.qty-1)); setItems(BL.list()); }} className="px-1 ml-2 border rounded">-</button>
                <span className="px-2">{i.qty}</span>
                <button onClick={()=>{ BL.setQty(i.slug, i.qty+1); setItems(BL.list()); }} className="px-1 border rounded">+</button>
              </div>
            </div>
            <button onClick={()=>{ BL.remove(i.slug); setItems(BL.list()); }} className="text-xs underline">remover</button>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/10">
        <button disabled={!items.length} onClick={send} className="w-full px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50">Enviar por WhatsApp</button>
      </div>
    </aside>
  );
}
