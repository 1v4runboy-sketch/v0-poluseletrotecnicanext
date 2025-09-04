'use client';
import { useEffect, useRef } from 'react';

/**
 * Rotação 3D contínua em 360°, mostrando frente e verso da mesma arte
 * sem espelhamento/inversão. Acelera suavemente no hover e não reseta.
 *
 * COMO FUNCIONA (sem espelhar):
 * - O container (spinner) gira no eixo Y.
 * - Duas faces internas (front e back) NÃO giram; apenas estão orientadas:
 *   front = rotateY(0deg), back = rotateY(180deg).
 * - Ambas usam backface-visibility:hidden. Assim, quando o spinner passa de 180°,
 *   a "back" já está de frente para a câmera e a arte continua legível (sem mirror).
 */
export default function LogoSpinner({ src, size = 56 }: { src: string; size?: number }) {
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const angle = useRef(0);
  const speed = useRef(45);      // deg/s atual
  const target = useRef(45);     // 45 normal, 120 no hover
  const hover = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      // aceleração suave
      target.current = hover.current ? 120 : 45;
      speed.current = lerp(speed.current, target.current, Math.min(1, dt * 6));
      // acumula ângulo (sem reset)
      angle.current = (angle.current + speed.current * dt) % 360;

      const el = spinnerRef.current;
      if (el) el.style.transform = `rotateY(${angle.current}deg)`;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="logo-frame"
      style={{ width: size, height: size, perspective: '900px' }}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      aria-label="Logotipo Polus giratório"
    >
      <div ref={spinnerRef} className="logo-spinner">
        {/* Frente */}
        <div className="logo-face logo-front">
          <img src={src} alt="Polus" />
        </div>
        {/* Verso (mesma arte, orientada 180° — NÃO espelha/inverte) */}
        <div className="logo-face logo-back">
          <img src={src} alt="" />
        </div>
      </div>

      <style jsx>{`
        .logo-frame { filter: drop-shadow(0 8px 24px rgba(10,108,178,.45)); }
        .logo-spinner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .logo-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .logo-front { transform: rotateY(0deg); }
        .logo-back  { transform: rotateY(180deg); }
        .logo-face img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
