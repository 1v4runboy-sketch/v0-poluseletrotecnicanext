'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ClientPortal({ children }) {
  const [mounted, setMounted] = useState(false);
  const [el, setEl] = useState(null);

  useEffect(() => {
    const portalEl = document.createElement('div');
    portalEl.setAttribute('id', 'portal-root');
    document.body.appendChild(portalEl);
    setEl(portalEl);
    setMounted(true);
    return () => {
      document.body.removeChild(portalEl);
      setMounted(false);
    };
  }, []);

  if (!mounted || !el) return null;
  return createPortal(children, el);
}
