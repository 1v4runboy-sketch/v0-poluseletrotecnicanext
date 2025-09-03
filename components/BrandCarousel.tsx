'use client';
import Image from 'next/image';
import { useMemo } from 'react';

type Brand = { name: string; src: string; alt?: string };

type Props = {
  brands?: Brand[];
  duplicate?: number; // quantas duplicações para scroll infinito
};

const DEFAULT_BRANDS: Brand[] = [
  { name: 'WEG', src: '/images/brands/weg.png' },
  { name: 'JACUZZI', src: '/images/brands/jacuzzi.png' },
  { name: 'CIFA', src: '/images/brands/cifa.png' },
  { name: 'COFIBAM', src: '/images/brands/distribuidor-cabos-cofibam-sp-removebg-preview.webp' },
  { name: 'TRAMAR', src: '/images/brands/logo_2x-removebg-preview.webp' },
];

export default function BrandCarousel({ brands = DEFAULT_BRANDS, duplicate = 2 }: Props){
  const list = useMemo(() => Array.from({length: duplicate}).flatMap(() => brands), [brands, duplicate]);

  return (
    <div className="brand-tape-sm">
      <div className="brand-viewport">
        <div className="brand-scroller">
          {/* bloco 1 */}
          <div className="brand-seq">
            {list.map((b, i) => (
              <div className="brand-cell" key={`b1-${b.name}-${i}`}>
                <Image
                  className="brand-logo-item"
                  src={b.src}
                  alt={b.alt ?? b.name}
                  width={150} height={40}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* bloco 2 (duplica pra infinito) */}
          <div className="brand-seq">
            {list.map((b, i) => (
              <div className="brand-cell" key={`b2-${b.name}-${i}`}>
                <Image
                  className="brand-logo-item"
                  src={b.src}
                  alt={b.alt ?? b.name}
                  width={150} height={40}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
