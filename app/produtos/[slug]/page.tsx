import ProductPageClient from '@/components/ProductPageClient';
import PRODUCTS from '@/lib/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { titleCaseSmart } from '@/lib/site';

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const p = PRODUCTS.find(x => x.slug === params.slug);
  const nice = p ? titleCaseSmart(p.title || '') : 'Produto';
  return {
    title: p ? `${nice} — Polus Eletrotécnica` : 'Produto — Polus Eletrotécnica',
    description: p?.shortDescription || 'Detalhes do produto.'
  };
}

export default function ProductPage({ params }: Props){
  const p = PRODUCTS.find(x => x.slug === params.slug);
  if (!p) return notFound();
  return <ProductPageClient product={p} />;
}
