import * as DB from '@/lib/products';

function toSrc(img:any) {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.src) return String(img.src);
  return '';
}
const ALL: any[] = (DB as any).products || (DB as any).PRODUCTS || (DB as any).default || [];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = ALL.find((x:any) => String(x.slug) === params.slug);
  if (!p) return <div className="max-w-4xl mx-auto p-6">Produto não encontrado.</div>;

  const imgs = Array.isArray(p.images) ? p.images.map(toSrc).filter(Boolean) : [];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {imgs.length ? (
            <img src={imgs[0]} alt={p.title || ''} className="w-full h-auto object-contain" />
          ) : (
            <div className="w-full aspect-[4/3] flex items-center justify-center text-sm opacity-70">sem imagens</div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{p.title}</h1>
          <div className="flex flex-wrap gap-2">
            {p.brand && <span className="chip">{p.brand}</span>}
            {p.category && <span className="chip">{p.category}</span>}
            {p.subcategory && <span className="chip">{p.subcategory}</span>}
          </div>

          <div className="card-modern p-3">
            <div className="text-sm opacity-80">Mais fotos</div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {imgs.slice(0,8).map((s:string,i:number)=>(
                <img key={i} src={s} alt={`${p.title} ${i+1}`} className="w-full h-20 object-contain rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" />
              ))}
              {!imgs.length && <div className="text-xs opacity-70">sem imagens</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
