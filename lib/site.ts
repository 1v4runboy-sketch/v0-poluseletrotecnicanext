// lib/site.ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** Mensagem padrão para abrir o WhatsApp (URL-encoded) */
export function whatsappMessage(productTitle?: string): string {
  const base = productTitle
    ? `Olá! Gostaria de consultar/cotar o produto: ${productTitle}`
    : 'Olá! Gostaria de uma cotação.';
  return encodeURIComponent(base);
}

/** Link direto para o WhatsApp usando wa.me + número internacional */
export function whatsappHref(productTitle?: string): string {
  const numberIntl =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+551135992935';
  const num = String(numberIntl).replace(/\D/g, ''); // só dígitos
  const text = whatsappMessage(productTitle);
  return `https://wa.me/${num}?text=${text}`;
}

/** URL de embed do Google Maps (da env) */
export const mapsEmbed: string =
  process.env.NEXT_PUBLIC_MAPS_EMBED_URL ||
  'https://www.google.com/maps?q=-23.516861,-46.770811&z=16&output=embed';

/** Hash simples estável (para ordenações pseudo-aleatórias determinísticas) */
export function hashSlug(slug: string): number {
  let h = 0 >>> 0;
  for (let i = 0; i < slug.length; i++) h = ((h * 31) ^ slug.charCodeAt(i)) >>> 0;
  return h >>> 0;
}

/** Embaralhamento estável baseado em seed (xorshift-like) */
export function stableShuffle<T>(arr: T[], seed: number): T[] {
  let s = seed || 123456;
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Title Case inteligente para nomes de produtos técnicos (PT-BR).
 * - Troca hífens/underscores por espaço.
 * - Mantém siglas em CAIXA ALTA (WEG, NSK, HCH, JL, DDU, ZZ, AC, DC, IP, NBR).
 * - Espaço entre números e unidades (mm, AWG, CV, HP, Hz, V, A, kW, RPM).
 * - Normaliza µF (uf/µf -> µF) e °C (200c -> 200 °C).
 * - Converte "12-50mm" -> "12,50 mm".
 */
export function titleCaseSmart(raw: string): string {
  if (!raw) return '';
  let s = String(raw).trim();

  s = s.replace(/(\d+)-(\d+)\s*(mm)\b/gi, (_m, a, b, u) => `${a},${b} ${u.toUpperCase()}`);
  s = s.replace(/[_]+/g, ' ').replace(/[-]+/g, ' ');

  const unitMap: Record<string, string> = {
    mm: 'mm', cm: 'cm', m: 'm', awg: 'AWG', cv: 'CV', hp: 'HP', hz: 'Hz',
    v: 'V', vac: 'VAC', vca: 'VCA', vcc: 'VCC', a: 'A', w: 'W', kw: 'kW', rpm: 'RPM',
  };
  s = s.replace(
    /(\d+)\s*(mm|cm|m|awg|cv|hp|hz|v|vac|vca|vcc|a|w|kw|rpm)\b/gi,
    (_m, num, u) => `${num} ${unitMap[u.toLowerCase()] || u}`
  );

  s = s.replace(/(\d+)\s*(uF|uf|µf)\b/gi, (_m, num) => `${num} µF`);
  s = s.replace(/(\d+)\s*c\b/gi, (_m, num) => `${num} °C`);

  const words = s.split(/\s+/).filter(Boolean);
  const keepUpper = new Set(['WEG','NSK','HCH','JL','DDU','ZZ','AC','DC','IP','NBR']);
  const lowerSmall = new Set(['de','da','do','das','dos','e','em','para','por','com','sem',
    'a','o','as','os','no','na','nos','nas','ao','à','às','aos','pra','pro']);

  const upAcronym = (w: string) => {
    if (/^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*$/.test(w)) return w.toUpperCase(); // 6203ZZ
    if (keepUpper.has(w.toUpperCase())) return w.toUpperCase();
    return w;
  };
  const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  const out: string[] = [];
  for (let i = 0; i < words.length; i++) {
    let w = words[i];

    if (w.includes('/')) {
      w = w.split('/').map(part => upAcronym(part)).join('/');
      out.push(i === 0 ? cap(w) : w);
      continue;
    }
    if (/^[0-9]+[a-zA-Z]+/.test(w) || /^[A-Z0-9\-]{2,}$/.test(w)) {
      out.push(upAcronym(w));
      continue;
    }
    const lower = w.toLowerCase();
    if (i > 0 && lowerSmall.has(lower)) {
      out.push(lower);
    } else {
      out.push(cap(upAcronym(w)));
    }
  }
  return out.join(' ').replace(/\s{2,}/g, ' ').trim();
}

export const SITE = {
  name: 'Polus Eletrotécnica',
  description: "Catálogo técnico de peças para motores elétricos e bombas d'água.",
  instagram: 'https://www.instagram.com/_poluseletrotecnica/',
  address: 'R. José Maria Castelo Prado, 13 - Ayrosa, Osasco - SP, 06290-130',
  whatsappNumberIntl: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+551135992935',
  email: 'poluseletrotecnica@hotmail.com',
  cnpj: '05.886.392/0001-51',
  // ✅ compatibilidade com código legado:
  whatsappMessage,
  whatsappHref,
  mapsEmbed,
} as const;

export default SITE;
