'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ClientPortal({ children }:{ children: React.ReactNode }){
  const elRef = useRef<HTMLDivElement|null>(null);
  const [mounted, setMounted] = useState(false);
  if(!elRef.current) elRef.current = document.createElement('div');

  useEffect(()=>{
    const el = elRef.current!;
    document.body.appendChild(el);
    setMounted(true);
    return ()=>{ try{ document.body.removeChild(el) }catch{} };
  },[]);
  if(!mounted) return null;
  return createPortal(children, elRef.current!);
}
