'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ClientPortal({ children, className }){
  const elRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(()=>{
    const el = elRef.current;
    if (className) el.className = className;
    document.body.appendChild(el);
    setMounted(true);
    return ()=> { try { document.body.removeChild(el); } catch {} };
  }, [className]);

  if (!mounted) return null;
  return createPortal(children, elRef.current);
}
