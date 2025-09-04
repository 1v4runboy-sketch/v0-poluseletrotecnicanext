'use client';

export default function InstagramFloat({ href }:{ href:string }){
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      title="Instagram"
      className="igFab"
      style={{
        position:'fixed',
        left:'max(14px, env(safe-area-inset-left))',
        bottom:'max(70px, calc(env(safe-area-inset-bottom) + 70px))',
        zIndex:2147483000
      }}
    >
      <span className="igLayer">
        <svg viewBox="0 0 448 512" className="igSvg" aria-hidden>
          <path
            fill="white"
            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"
          />
        </svg>
      </span>

      <style jsx>{`
        .igFab{
          width:44px; height:44px; border-radius:12px;
          background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
          display:flex; align-items:center; justify-content:center;
          box-shadow:2px 2px 10px rgba(0,0,0,.2);
        }
        .igLayer{ width:36px; height:36px; display:flex; align-items:center; justify-content:center; }
        .igSvg{ width:22px; height:22px; display:block; }
      `}</style>
    </a>
  );
}
