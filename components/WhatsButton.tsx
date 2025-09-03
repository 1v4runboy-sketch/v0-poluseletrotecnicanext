'use client';
import React from 'react';

/**
 * Botão de WhatsApp baseado no Uiverse (Gaurang7717),
 * adaptado para Next.js e com styled-jsx escopado.
 *
 * Uso:
 * <WhatsButton href={whatsappHref('Título do Produto')} text="Whatsapp" />
 *
 * Acessível e sem <a> aninhado.
 */
export default function WhatsButton({
  href,
  text = 'Whatsapp',
  title,
  className = '',
  onClick,
}: {
  href: string;
  text?: string;
  title?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title || text}
        className={`Btn ${className}`}
        onClick={onClick}
      >
        <span className="sign" aria-hidden>
          <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16" width="16" height="16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </span>
        <span className="text">{text}</span>
      </a>

      <style jsx>{`
        .Btn {
          --btn-bg-1: #22c55e;
          --btn-bg-2: #16a34a;
          --btn-br: 14px;

          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: none;
          outline: none;
          text-decoration: none;
          cursor: pointer;

          padding: 10px 14px;
          border-radius: var(--btn-br);
          color: #fff;
          background: linear-gradient(180deg, var(--btn-bg-1), var(--btn-bg-2));
          box-shadow: 0 10px 28px rgba(34, 197, 94, 0.35), inset 0 0 0 1px rgba(255,255,255,0.15);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .Btn:active { transform: translateY(1px); }

        .sign {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          background: rgba(255,255,255,.18);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.22);
          transition: transform 160ms ease, background 160ms ease;
        }

        .socialSvg { width: 18px; height: 18px; display: block; }
        .whatsappSvg path { fill: #fff; }

        .text {
          font-weight: 700;
          letter-spacing: .01em;
          line-height: 1;
          user-select: none;
        }

        .Btn:hover .sign { transform: translateX(2px); background: rgba(255,255,255,.24); }
        .Btn:hover { box-shadow: 0 12px 34px rgba(34, 197, 94, 0.45), inset 0 0 0 1px rgba(255,255,255,0.18); }

        /* Dark mode refinado */
        :global(.dark) .Btn {
          box-shadow: 0 10px 30px rgba(0, 0, 0, .35), inset 0 0 0 1px rgba(255,255,255,0.12);
        }
        :global(.dark) .Btn:hover {
          box-shadow: 0 14px 36px rgba(0, 0, 0, .45), inset 0 0 0 1px rgba(255,255,255,0.18);
        }
      `}</style>
    </>
  );
}
