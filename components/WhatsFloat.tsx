'use client';

import * as SITEUTIL from '@/lib/site';

// Usa número do SITE (compatível com legado)
const SITE = SITEUTIL?.SITE || {};
const whatsappHref = SITEUTIL?.whatsappHref || ((t) => `https://wa.me/551135992935?text=${encodeURIComponent('Olá! Gostaria de uma cotação.')}`);

export default function WhatsFloat() {
  const href = whatsappHref();

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="whats-wrap">
      <span className="whats">
        <svg viewBox="0 0 32 32" className="icon" aria-hidden="true">
          <path d="M19.11 17.37c-.26-.13-1.52-.75-1.75-.83-.24-.09-.41-.13-.58.13-.17.25-.66.83-.81 1-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.11-1.31-.78-.7-1.31-1.57-1.46-1.83-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44l-.5-.01c-.17 0-.45.06-.68.32-.23.26-.89.86-.89 2.09s.92 2.43 1.05 2.6c.13.17 1.82 2.78 4.42 3.9.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.08 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.11-.23-.17-.49-.3zM16.03 2.67C8.65 2.67 2.67 8.66 2.67 16.03c0 2.96.96 5.7 2.59 7.93L4 30l6.21-1.63a13.3 13.3 0 0 0 5.83 1.37c7.38 0 13.36-5.98 13.36-13.36 0-7.37-5.98-13.36-13.36-13.36zm0 24.16c-2.3 0-4.43-.74-6.16-1.99l-.44-.31-3.6.94.96-3.5-.33-.46a11.72 11.72 0 1 1 9.58 5.33z" />
        </svg>
        <span className="label">Fale conosco</span>
      </span>

      <style jsx>{`
        .whats-wrap {
          display: inline-block;
          text-decoration: none;
        }
        .whats {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 9999px;
          background: #25d366;
          color: #fff;
          transition: all 0.25s ease;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          overflow: hidden;
        }
        .whats:hover {
          width: 150px; /* expande para pílula */
        }
        .icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin: 0 12px;
          fill: currentColor;
          transition: transform 0.25s ease;
        }
        .whats:hover .icon {
          transform: translateX(-4px);
        }
        .label {
          opacity: 0;
          white-space: nowrap;
          transform: translateX(8px);
          transition: all 0.25s ease;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }
        .whats:hover .label {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </a>
  );
}
