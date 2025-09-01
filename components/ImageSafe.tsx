
'use client';
import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

const isExternal = (s?: string) => !!s && /^https?:\/\//i.test(s);

export default function ImageSafe({ src, alt = '', className, width, height }: Props) {
  const final = src || '/produtos/placeholder.webp';
  if (isExternal(final)) {
    return <img src={final} alt={alt} className={className} loading="lazy" decoding="async" />;
  }
  return <Image src={final} alt={alt} width={width ?? 1200} height={height ?? 900} className={className} priority={false} />;
}
