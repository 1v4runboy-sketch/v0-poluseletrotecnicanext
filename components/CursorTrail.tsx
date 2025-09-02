'use client';
import { useEffect } from 'react';

export default function CursorTrail(){
  useEffect(()=>{
    let last = 0;
    const nodes = [];
    const maxNodes = 40;
    let pending = false;

    const emit = (e) => {
      const now = performance.now();
      if (now - last < 35) return; // ~28fps
      last = now;

      const d = document.createElement('div');
      d.className = 'cursor-trail';
      d.style.left = e.clientX + 'px';
      d.style.top  = e.clientY + 'px';
      document.body.appendChild(d);
      nodes.push(d);
      while (nodes.length > maxNodes) { const n = nodes.shift(); n && n.remove(); }
      setTimeout(()=> d.remove(), 600);
    };

    const onMove = (e) => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(()=> { emit(e); pending = false; });
    };

    const onVis = () => { if (document.hidden) { nodes.splice(0).forEach(n=>n.remove()); } };

    window.addEventListener('mousemove', onMove, { passive:true });
    document.addEventListener('visibilitychange', onVis);

    return ()=> {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      nodes.splice(0).forEach(n=>n.remove());
    };
  },[]);
  return null;
}
