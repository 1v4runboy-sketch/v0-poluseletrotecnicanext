import * as DB from '@/lib/products';
import Link from 'next/link';

const ALL:any[] = (DB as any).products || (DB as any).PRODUCTS || (DB as any).default || [];

function toSrc(img:any){ if(!img) return ''; return typeof img==='string' ? img : (img.src||''); }
function brandLogoFor(brand:any){
  const b = String(brand||'').toUpperCase();
  const map:Record<string,string> = {
    'WEG':'/marcas/weg.webp','NSK':'/marcas/nsk-logo.webp','HCH':'/marcas/hch-logo.webp',
    'JL CAPACITORES':'/marcas/jl-capacitores.webp','LANC COMERCIAL':'/marcas/lanc-comercial.webp',
    'CIFA':'/marcas/cifa.webp','IGUI':'/marcas/igui.webp','JACUZZI':'/marcas/jacuzzi.webp',
    'TRAMAR':'/marcas/tramar.webp','COFIBAM':'/marcas/cofibam.webp',
  };
  return map[b];
}

export default function ProductPage({ params }:{ params:{ slug:string }}) {
  const p = ALL.find((x:any)=> String(x.slug) === params.slug);
  if(!p) return <div className="max-w-4xl mx-auto p-6">Produto não encontrado.</div>;

  const imgs = Array.isArray(p.images) ? p.images.map(toSrc).filter(Boolean) : [];
  const logo = p.brandLogo || brandLogoFor(p.brand);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {imgs.length ? (
            <img src={imgs[0]} alt={p.title||''} className="w-full h-auto object-contain" />
          ) : (
            <div className="w-full aspect-[4/3] flex items-center justify-center text-sm opacity-70">sem imagens</div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {logo && <img src={logo} alt={p.brand||''} className="h-[28px] w-auto object-contain" />}
            <span className="chip">{String(p.brand||'').toUpperCase()}{p.model?` • ${String(p.model).toUpperCase()}`:''}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold">{p.title}</h1>
          <div className="text-sm text-slate-600 dark:text-slate-300">{p.category}{p.subcategory?` • ${p.subcategory}`:''}</div>

          {p.specs && (
            <div className="card-modern p-3">
              <div className="text-sm font-semibold mb-2">Especificações</div>
              <ul className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(p.specs).map(([k,v])=>(
                  <li key={k} className="flex justify-between gap-2">
                    <span className="opacity-70">{k}</span>
                    <span className="font-semibold">{String(v)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Link href={`/cotacao?produto=${encodeURIComponent(p.title||'')}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:translate-y-[1px] transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 4H4a2 2 0 0 0-2 2v2l10 6 10-6V6a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2" /><path d="M22 10 12 16 2 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8Z" stroke="currentColor" strokeWidth="2" /></svg>
              <span>Solicitar cotação</span>
            </Link>
            <Link href="/" className="chip">Voltar ao catálogo</Link>
          </div>
        </div>
      </div>

      {/* relacionados */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Produtos relacionados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ALL.filter((x:any)=> x.category===p.category && x.slug!==p.slug).slice(0,4).map((r:any)=>(
            <Link key={r.slug} href={`/produto/${r.slug}`} className="card-modern p-2">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <img src={toSrc(r.images?.[0])} alt={r.title||''} className="w-full h-full object-contain" />
              </div>
              <div className="mt-2 text-sm font-semibold line-clamp-2">{r.title}</div>
              <div className="text-xs opacity-70">{String(r.brand||'').toUpperCase()}{r.model?` • ${String(r.model).toUpperCase()}`:''}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
