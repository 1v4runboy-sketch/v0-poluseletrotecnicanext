import { type MetadataRoute } from 'next';
import PRODUCTS from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://polus-eletrotecnica.vercel.app';
  const now = new Date().toISOString();
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/avaliacoes`, lastModified: now },
    { url: `${base}/contato`, lastModified: now },
  ];
  for (const p of PRODUCTS) {
    items.push({ url: `${base}/produtos/${p.slug}`, lastModified: now });
  }
  return items;
}
