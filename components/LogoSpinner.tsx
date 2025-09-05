'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoSpinner() {
  const angleRef = useRef(0);  // ângulo acumulado
  const speedRef = useRef(0.5); // velocidade de rotação
  const targetRef = useRef(0.5); // alvo da rotação
  const containerRef = useRef(null);
  const router = useRouter(); // Para redirecionar para a página inicial

  // Redireciona para a Home ao clicar
  const handleClick = () => {
    router.push('/');
  };

  useEffect(() => {
    let last = performance.now();
    const tick = (t) => {
      const dt = t - last;
      last = t;

      // controle de rotação (sem resetar)
      const s = speedRef.current;
      const target = targetRef.current;
      speedRef.current = s + (target - s) * 0.08;

      angleRef.current += speedRef.current; // acumula
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestAnimationFrame(tick));
  }, []);

  return (
    <div
      className="logo-spinner"
      style={{
        width: '120px', // Tamanho reduzido da logo (ajustado para ser menor)
        height: 'auto', // A altura será ajustada automaticamente
        position: 'absolute', // Agora está posicionado na barra
        top: '50%', // Centraliza verticalmente na barra
        left: '50%', // Centraliza horizontalmente na barra
        transform: 'translate(-50%, -50%)', // Centraliza perfeitamente
        zIndex: 1000,
      }}
      onMouseEnter={() => { targetRef.current = 2.5; }} // acelera mais no hover
      onMouseLeave={() => { targetRef.current = 0.5; }} // desacelera
      onClick={handleClick}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Frente */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <img
            src="/polus-logo.svg" // Verifique se a imagem está corretamente no diretório /public
            alt="Polus"
            className="w-full h-full object-contain transition-transform transform hover:scale-110"
            draggable={false}
          />
        </div>
        {/* Verso — sem espelhar a arte */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <img
            src="/polus-logo.svg"
            alt="Polus"
            className="w-full h-full object-contain transform scaleX(-1)"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
