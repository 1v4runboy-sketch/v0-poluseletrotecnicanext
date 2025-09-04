import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function HomeProductGrid() {
  // Pega os primeiros 12 produtos (ajuste como quiser)
  const items = PRODUCTS.slice(0, 12);

  return (
    <section className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <header className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">
          Produtos em destaque
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Seleção inicial do catálogo
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
