import React from 'react';

export const IconChevronLeft = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...p}>
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const IconChevronRight = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...p}>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const IconCart = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...p}>
    <path d="M6 6h15l-1.5 9h-12z" fill="currentColor"/><circle cx="9" cy="20" r="1.6" fill="currentColor"/><circle cx="17" cy="20" r="1.6" fill="currentColor"/><path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
export const IconWhats = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" width="22" height="22" {...p}>
    <defs><linearGradient id="wG" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#25D366"/><stop offset="1" stopColor="#128C7E"/></linearGradient></defs>
    <path d="M16 3c7.2 0 13 5.64 13 12.6S23.2 28.2 16 28.2c-2.2 0-4.3-.52-6.1-1.5l-5.1 1.6 1.7-4.9A12.1 12.1 0 0 1 3 15.6C3 8.64 8.8 3 16 3z" fill="url(#wG)"/>
    <path d="M11.3 10.9c.2-.4.4-.4.6-.4h.6c.2 0 .5 0 .7.5.2.5.9 1.8 1 1.9.1.2.2.3 0 .6-.1.3-.2.4-.4.7-.1.2-.3.4-.1.7.2.3.9 1.5 2.1 2.5 1.4 1.2 2.6 1.5 3 .1.3-.4.5-.6.8-.5.3 0 1.8.9 2.1 1.1.3.2.5.3.6.5.1.2.1 1.1-.2 2.1-.3 1-1.9 1.9-2.7 1.9-.7 0-1.5.2-3-.5-1.4-.7-3.1-2-4.5-3.5-1.5-1.5-2.8-3.4-3.4-4.8-.6-1.5-.6-2.7-.4-3.5.1-.9.8-1.7 1.3-1.9z" fill="#fff"/>
  </svg>
);
export const IconInsta = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...p}>
    <defs><linearGradient id="iG" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f58529"/><stop offset=".5" stopColor="#dd2a7b"/><stop offset="1" stopColor="#515bd4"/></linearGradient></defs>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#iG)"/><circle cx="12" cy="12" r="4.2" fill="#fff"/><circle cx="17.2" cy="6.8" r="1.2" fill="#fff"/>
  </svg>
);
export const IconMenu = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
