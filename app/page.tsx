import ProductListPageClient from '@/components/ProductListPageClient';

export const metadata = {
  title: 'Polus Eletrotécnica — Catálogo',
  description: 'Lista de produtos do catálogo técnico',
};

export default function Page() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Catálogo de Produtos
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Use a busca e os filtros para encontrar rapidamente.
          </p>
        </header>

        {/* Grade de produtos (client) */}
        <ProductListPageClient />
      </section>
    </main>
  );
}
