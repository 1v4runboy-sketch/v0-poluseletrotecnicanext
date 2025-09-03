'use client';
import { useMemo } from 'react';
import ClientPortal from './ClientPortal';
import { whatsappHref, SITE } from '@/lib/site';

/**
 * Flutuantes: Instagram (em cima, 44x44) + WhatsApp (abaixo, Uiverse).
 * Posição fixa canto inferior esquerdo, via Portal.
 */
export default function WhatsFloat({ productTitle }){
  const wa = useMemo(()=> whatsappHref(productTitle), [productTitle]);
  const ig = SITE?.instagram || 'https://www.instagram.com/';

  const stackStyle: React.CSSProperties = {
    position: 'fixed',
    left: 'max(14px, env(safe-area-inset-left))',
    bottom: 'max(14px, calc(env(safe-area-inset-bottom) + 14px))',
    zIndex: 2147483000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    pointerEvents: 'auto',
  };

  return (
    <ClientPortal>
      <div style={stackStyle}>
        {/* ===== INSTAGRAM (FAB 44px + mini-tooltip) ===== */}
        <a
          href={ig}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Polus"
          className="igFab"
          title="Instagram"
        >
          <span className="igLayer">
            <svg viewBox="0 0 448 512" className="igSvg" aria-hidden>
              <path
                fill="white"
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"
              />
            </svg>
          </span>
          <span className="igTooltip">Instagram</span>
        </a>

        {/* ===== WHATSAPP (Uiverse Gaurang7717) ===== */}
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" title="Falar no WhatsApp" className="wa Btn">
          <span className="sign" aria-hidden>
            <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16" width="16" height="16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </span>
          <span className="text">Whatsapp</span>
        </a>

        {/* ===== styles escopados ===== */}
        <style jsx>{`
          /* Instagram compacto 44x44 */
          .igFab{
            width:44px; height:44px; border-radius:12px; position: relative;
            background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
            display:flex; align-items:center; justify-content:center; text-decoration:none;
            box-shadow:2px 2px 10px rgba(0,0,0,.2);
          }
          .igLayer{ width:36px; height:36px; display:flex; align-items:center; justify-content:center; }
          .igSvg{ width:22px; height:22px; display:block; }
          .igTooltip{
            position:absolute; left:52px; bottom:50%; transform: translateY(50%);
            background: rgba(0,0,0,.75); color:#fff; font-size:.75rem; padding:4px 8px; border-radius:8px;
            opacity:0; pointer-events:none; transition:opacity .2s ease, transform .2s ease; white-space:nowrap;
          }
          .igFab:hover .igTooltip{ opacity:1; transform: translateY(50%) translateX(2px); }

          /* WhatsApp Uiverse (Gaurang7717) */
          .Btn {
            display:flex; align-items:center; justify-content:flex-start;
            width:45px; height:45px; border:none; border-radius:50%; cursor:pointer; position:relative; overflow:hidden;
            transition-duration:.3s; box-shadow:2px 2px 10px rgba(0,0,0,.199); background-color:#00d757;
            text-decoration:none; color:#fff;
          }
          .wa .sign{ width:100%; transition-duration:.3s; display:flex; align-items:center; justify-content:center; }
          .wa .sign svg{ width:25px; height:25px; display:block; }
          .wa .sign svg path{ fill:#fff; }
          .wa .text{
            position:absolute; right:0%; width:0%; opacity:0; color:#fff; font-size:1.2em; font-weight:600;
            transition-duration:.3s; white-space:nowrap; line-height:1;
          }
          .wa:hover{ width:150px; border-radius:40px; transition-duration:.3s; }
          .wa:hover .sign{ width:30%; transition-duration:.3s; padding-left:10px; }
          .wa:hover .text{ opacity:1; width:70%; transition-duration:.3s; padding-right:10px; }
          .Btn:active{ transform: translate(2px,2px); }

          @media (prefers-reduced-motion: reduce){
            .Btn, .sign, .text, .igTooltip{ transition: none !important; }
          }
        `}</style>
      </div>
    </ClientPortal>
  );
}
