'use client';
import React from 'react';

export default function QuoteButton({
  href,
  text = 'Solicitar cotação',
  title,
  className = '',
  onClick,
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title || text}
        className={`QuoteBtn ${className}`}
        onClick={onClick}
        title={title || text}
      >
        <span className="qsign" aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="#fff" d="M9 2h6a2 2 0 0 1 2 2h1a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2m0 2v2h6V4H9Z"/>
          </svg>
        </span>
        <span className="qtext">{text}</span>
      </a>

      <style jsx>{`
        .QuoteBtn{
          display:flex; align-items:center; justify-content:flex-start;
          width:45px; height:45px; border:none; border-radius:50%; cursor:pointer; position:relative; overflow:hidden;
          transition-duration:.3s; text-decoration:none; color:#fff;
          background: linear-gradient(180deg, #0ea5e9, #0284c7);
          box-shadow: 0 8px 24px rgba(2,132,199,.35), inset 0 0 0 1px rgba(255,255,255,.15);
        }
        .qsign{
          width:100%; transition-duration:.3s; display:flex; align-items:center; justify-content:center;
          background: rgba(255,255,255,.16); border-radius: 14px;
        }
        .qtext{
          position:absolute; right:0%; width:0%; opacity:0; color:#fff; font-size:1.05em; font-weight:700;
          transition-duration:.3s; white-space:nowrap; line-height:1; letter-spacing:.01em;
        }
        .QuoteBtn:hover{ width:170px; border-radius:40px; transition-duration:.3s; }
        .QuoteBtn:hover .qsign{ width:32%; transition-duration:.3s; padding-left:10px; }
        .QuoteBtn:hover .qtext{ opacity:1; width:68%; transition-duration:.3s; padding-right:10px; }
        .QuoteBtn:active{ transform: translate(2px,2px); }
        @media (prefers-reduced-motion: reduce){ .QuoteBtn, .qsign, .qtext{ transition: none !important; } }
      `}</style>
    </>
  );
}
