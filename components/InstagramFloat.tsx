'use client';

import * as SITEUTIL from '../lib/site';
const SITE = SITEUTIL?.SITE || {};

export default function InstagramFloat() {
  const href = SITE.instagram || 'https://www.instagram.com/_poluseletrotecnica/';
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="insta-btn">
      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 6.5a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
      <span className="tooltip">Instagram</span>
      <style jsx>{`
        .insta-btn { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:12px; background: linear-gradient(135deg,#f58529,#feda77,#dd2a7b,#8134af,#515bd4); box-shadow:0 6px 16px rgba(0,0,0,.25); position:relative; text-decoration:none; color:#fff; }
        .icon { width:22px; height:22px; fill: currentColor; }
        .tooltip { position:absolute; left:calc(100% + 8px); top:50%; transform:translateY(-50%); background: rgba(0,0,0,.75); color:#fff; font-size:11px; padding:4px 6px; border-radius:6px; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity .2s ease; }
        .insta-btn:hover .tooltip { opacity:1; }
      `}</style>
    </a>
  );
}
