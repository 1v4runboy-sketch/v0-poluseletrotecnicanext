import PRODUCTS from '@/lib/products';
import ProductPageClient from '@/components/ProductPageClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const p = PRODUCTS.find(x => x.slug === params.slug);
  return {
    title: p ? `${p.title} — Polus Eletrotécnica` : 'Produto — Polus Eletrotécnica',
    description: p?.shortDescription || 'Detalhes do produto.'
  };
}

export default function ProductPage({ params }: Props){
  const p = PRODUCTS.find(x => x.slug === params.slug);
  if (!p) return notFound();
  return <div className="py-6"><ProductPageClient product={p} /></div>;
}
