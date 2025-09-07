// Helpers de site (JS-only)
export const SITE = {
  instagram: 'https://www.instagram.com/_poluseletrotecnica/',
};

export function whatsappHref(text) {
  return `https://wa.me/551135992935?text=${encodeURIComponent('Olá! Gostaria de uma cotação: ' + (text || ''))}`;
}

export function titleCaseSmart(s) {
  if (!s) return '';
  return s.replace(/\w\S*/g, (w) => {
    if (w.toUpperCase() === w) return w; // mantém códigos/siglas
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
}

export function hashSlug(s) {
  let h = 0; for (let i=0;i<s.length;i++) h = ((h*31) ^ s.charCodeAt(i)) >>> 0; return h;
}

function norm(x) {
  return String(x || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // remove acentos
    .toLowerCase().trim();
}

/**
 * Mapa de arquivos de logo JÁ EXISTENTES (não renomear no /public).
 * Chaves = nomes oficiais de exibição.
 *
 * OBS: adicionado COBIX conforme seu pedido (coloque o arquivo em /public/marcas/cobix.webp).
 */
const BRAND_FILES = {
  'WEG': '/marcas/weg.webp',
  'NSK': '/marcas/nsk-logo.webp',
  'HCH': '/marcas/hch-logo.webp',
  'JL CAPACITORES': '/marcas/jl-capacitores.webp',
  'LANC COMERCIAL': '/marcas/lanc-comercial.webp',
  'IGUI': '/marcas/igui.webp',
  'JACUZZI': '/marcas/jacuzzi.webp',
  'TRAMAR': '/marcas/tramar.webp',
  'COFIBAM': '/marcas/cofibam.webp',
  'CIFA Fios e Linhas': '/marcas/cifa.webp',
  'COBIX': '/marcas/cobix.webp',
  'POLUS': '/polus-logo.svg',
};

/**
 * Aliases → nome oficial (exibição)
 * (Exibição SEMPRE usa o nome oficial. Arquivo é resolvido a partir do oficial.)
 */
const ALIASES = {
  // simples
  'weg': 'WEG',
  'nsk': 'NSK',
  'hch': 'HCH',
  'jl': 'JL CAPACITORES',
  'jl capacitores': 'JL CAPACITORES',
  'jl-capacitores': 'JL CAPACITORES',
  'jl capasitores': 'JL CAPACITORES',
  'lanc comercial': 'LANC COMERCIAL',
  'lanque comercial': 'LANC COMERCIAL',
  'lanq': 'LANC COMERCIAL',
  'jacuzzi': 'JACUZZI',
  'tramar': 'TRAMAR',
  'cofibam': 'COFIBAM',
  'cofiban': 'COFIBAM',
  'cobix': 'COBIX',

  // IGUI (oficial)
  'ig': 'IGUI',
  'igu': 'IGUI',
  'igui': 'IGUI',

  // CIFA Fios e Linhas (oficial)
  'cifa': 'CIFA Fios e Linhas',
  'sifa': 'CIFA Fios e Linhas',
  'cifa fios e linhas': 'CIFA Fios e Linhas',
  'sifa fios e linhas': 'CIFA Fios e Linhas',
};

// ==== Regras específicas (as suas prioridades) ====
// - Cabos leads/lides → COFIBAM
// - Capacitores permanentes → WEG (se citar WEG) senão JL CAPACITORES
// - Capacitores eletrolíticos → JL CAPACITORES
// - Tintas → WEG (não LANC)
// - Resinas incolor/vermelha → LANC COMERCIAL
// - Barbante encerado → CIFA Fios e Linhas
// - Solda Cobix → COBIX
// - Vernizes "1 litro" ou "5 litros" → WEG
function pickBrandBySpecialRules(blob) {
  // blob sempre em lower-case
  // solda Cobix
  if (/\bcobix\b/.test(blob) || (/\bsolda\b/.test(blob) && /\bcobix\b/.test(blob))) return 'COBIX';

  // tintas
  if (/\btinta(s)?\b/.test(blob)) return 'WEG';

  // vernizes 1 litro / 5 litros → WEG
  if (/\bverniz(es)?\b/.test(blob) && /\b(1|5)\s*(l|litro|litros)\b/.test(blob)) return 'WEG';

  // resinas incolor/vermelha → LANC
  if (/\bresina(s)?\b/.test(blob) && (/\bincolor\b/.test(blob) || /\bvermelh(a|o)\b/.test(blob))) return 'LANC COMERCIAL';

  // barbante encerado → CIFA Fios e Linhas
  if ((/\bbarbante\b/.test(blob) && /\bencerad/.test(blob)) || /\bcifa\b/.test(blob) || /\bsifa\b/.test(blob)) return 'CIFA Fios e Linhas';

  // cabos leads/lides → COFIBAM
  if ((/\bcabo(s)?\b/.test(blob) && (/\blead(s)?\b/.test(blob) || /\blide(s)?\b/.test(blob))) || /\bespaguete(s)?\b/.test(blob)) return 'COFIBAM';

  // capacitores permanentes → WEG se citar WEG, senão JL
  if (/\bcapacitor(es)?\b.*\bpermanente(s)?\b/.test(blob) || /\bpermanente(s)?\b.*\bcapacitor(es)?\b/.test(blob)) {
    if (/\bweg\b/.test(blob)) return 'WEG';
    return 'JL CAPACITORES';
  }

  // capacitores eletrolíticos → JL
  if (/\bcapacitor(es)?\b.*\beletrol[ií]tic/.test(blob) || /\beletrol[ií]tic/.test(blob)) return 'JL CAPACITORES';

  return null; // sem match específico
}

// Pistas gerais (fallback quando nada acima decidir)
const KEY_HINTS = [
  { match: /rotores?/i, also: /ig|igu|igui/i, brand: 'IGUI' },
  { match: /jacuzzi/i, brand: 'JACUZZI' },
  { match: /(cabo(s)?\s*lead(s)?|espaguete(s)?|sleeve|isolante)/i, brand: 'COFIBAM' },
  { match: /silicone/i, also: /cabo/i, brand: 'TRAMAR' },
  { match: /cifa|sifa/i, brand: 'CIFA Fios e Linhas' },
  { match: /nsk/i, brand: 'NSK' },
  { match: /hch/i, brand: 'HCH' },
  { match: /weg/i, brand: 'WEG' },
  { match: /resina|encapsulamento|verniz/i, brand: 'LANC COMERCIAL' }, // atenção: "vernizes 1/5 litros" já capturados acima como WEG
];

/**
 * resolveBrand(product)
 * - Retorna { name, logoSrc } usando:
 *   1) brand do produto (aplica alias → nome oficial), exibindo SEMPRE o nome oficial
 *   2) regras específicas que você definiu (pickBrandBySpecialRules)
 *   3) inferência genérica (KEY_HINTS)
 *   4) fallback POLUS
 */
export function resolveBrand(product) {
  try {
    const rawBrand = (product && product.brand) ? String(product.brand).trim() : '';
    const title = String(product?.title || '');
    const slug = String(product?.slug || '');
    const category = String(product?.category || '');
    const subcategory = String(product?.subcategory || '');
    const blob = [title, slug, category, subcategory, rawBrand].join(' ').toLowerCase();

    // 1) Se brand vier no dado → alias → NOME OFICIAL
    const bnorm = norm(rawBrand);
    if (bnorm) {
      const canonical = ALIASES[bnorm] || rawBrand; // se existir alias, usa oficial; senão, usa como está
      const official = BRAND_FILES[canonical] ? canonical : rawBrand.toUpperCase(); // tenta arquivo por oficial, senão por UPPER
      const logoSrc = BRAND_FILES[official] || BRAND_FILES['POLUS'];
      return { name: canonical, logoSrc };
    }

    // 2) Regras específicas (suas prioridades)
    const special = pickBrandBySpecialRules(blob);
    if (special) {
      const logoSrc = BRAND_FILES[special] || BRAND_FILES['POLUS'];
      return { name: special, logoSrc };
    }

    // 3) Inferência por texto (genérico)
    for (const hint of KEY_HINTS) {
      if (hint.match.test(blob) && (!hint.also || hint.also.test(blob))) {
        const official = hint.brand;
        const logoSrc = BRAND_FILES[official] || BRAND_FILES['POLUS'];
        return { name: official, logoSrc };
      }
    }

    // 4) Fallback
    return { name: 'POLUS', logoSrc: BRAND_FILES['POLUS'] };
  } catch {
    return { name: 'POLUS', logoSrc: BRAND_FILES['POLUS'] };
  }
}

/* ============================
   DESCRIÇÃO TÉCNICA (build)
   ============================ */
function has(s, re) { return re.test(String(s || '').toLowerCase()); }

function parseBearingHints(txt) {
  const x = String(txt || '').toUpperCase();
  const hints = [];
  if (/\b(60|62|63|68|69)\d{2}\b/.test(x)) hints.push('Série rígida de esferas (dimensões ISO)');
  if (/ZZ|2Z/.test(x)) hints.push('Blindagens metálicas (ZZ)');
  if (/2RS|2RSH|RS\b/.test(x)) hints.push('Vedações em borracha (2RS)');
  if (/\bC3\b/.test(x)) hints.push('Folga interna aumentada (C3)');
  return hints;
}

function parseCapHints(txt) {
  const t = String(txt || '');
  const uf = t.match(/(\d{1,4})\s*(uF|µF)/i);
  const v  = t.match(/(\d{2,4})\s*(VAC|V)\b/i);
  const out = [];
  if (uf) out.push(`${uf[1]} µF`);
  if (v)  out.push(`${v[1]} V`);
  return out;
}

export function buildProductDetails(product) {
  const brand = resolveBrand(product).name;
  const blob = `${product?.title || ''} ${product?.slug || ''} ${product?.category || ''} ${product?.subcategory || ''}`.toLowerCase();
  const details = { desc: '', features: [], applications: [], notes: [] };

  // JL CAPACITORES / Capacitores (inclui permanentes/eletrolíticos)
  if (brand === 'JL CAPACITORES' || has(blob, /capacitor|µf|uf\b/)) {
    const hints = parseCapHints(product?.title || product?.slug || '');
    details.desc =
      `Capacitor para motores monofásicos (partida e/ou permanente), construído com filme de polipropileno metalizado autorregenerativo, com baixas perdas e excelente estabilidade elétrica. Indicado para partidas seguras e funcionamento contínuo, conforme a seleção de ${hints.join(' · ') || 'capacitância/tensão indicadas no motor'}.`;
    details.features.push(
      'Filme PP metalizado autorregenerativo (baixas perdas)',
      'Projeto leve e compacto',
      'Aplicável em 50/60 Hz',
      'Diretrizes típicas IEC 60252 para capacitores de motores'
    );
    details.applications.push(
      'Motores monofásicos de bombas centrífugas',
      'Compressores, ventiladores e exaustores',
      'Lavadoras, secadoras e sopradores industriais'
    );
    details.notes.push(
      'Substituir por capacitância (µF) idêntica e tensão igual ou superior',
      'Respeitar diagrama elétrico do fabricante'
    );
    return details;
  }

  // WEG – Tintas, vernizes e componentes para motores
  if (brand === 'WEG' || has(blob, /\btinta(s)?\b|verniz/)) {
    details.desc =
      'Linha de revestimentos eletroisolantes e componentes para manutenção e fabricação de máquinas elétricas, priorizando rigidez dielétrica, aderência e durabilidade. Embalagens com volumes usuais (ex.: 1 L, 5 L) para diferentes escalas de aplicação.';
    details.features.push(
      'Propriedades dielétricas elevadas e boa adesão',
      'Opções de cura ao ar e/ou estufa conforme a linha',
      'Compatibilidade com processos de impregnação e acabamento'
    );
    details.applications.push(
      'Impregnação e proteção de enrolamentos',
      'Proteção/repintura de motores e transformadores'
    );
    details.notes.push('Seguir ficha técnica: viscosidade, diluição, ciclo de cura');
    return details;
  }

  // LANC COMERCIAL – Resinas (incolor/vermelha)
  if (brand === 'LANC COMERCIAL' || has(blob, /\bresina(s)?\b/)) {
    details.desc =
      'Resina epóxi para encapsulamento e proteção elétrica, com alta rigidez dielétrica e resistência à umidade. Formulações incolor e vermelha para diferentes necessidades de identificação e acabamento.';
    details.features.push(
      'Ótimas propriedades dielétricas e adesão',
      'Resistência a umidade/maresia e agentes químicos',
      'Opções de cura ambiente ou em estufa'
    );
    details.applications.push(
      'Encapsulamento de estatores, rotores e bobinas',
      'Transformadores e reatores'
    );
    details.notes.push('Respeitar proporção de mistura e pot life; cura conforme boletim técnico');
    return details;
  }

  // TRAMAR – Cabos/isolantes em silicone
  if (brand === 'TRAMAR' || has(blob, /silicone\b.*cabo|cabo\b.*silicone|espaguete/)) {
    details.desc =
      'Cabo/isolante à base de borracha de silicone para ampla faixa térmica e alta flexibilidade, indicado para circuitos sujeitos a temperatura elevada e vibração.';
    details.features.push(
      'Faixa térmica típica de -70 °C a 200 °C',
      'Opções 500–750 V e linhas com certificações específicas'
    );
    details.applications.push(
      'Ligação de motores e resistências',
      'Chicotes industriais e fornos'
    );
    details.notes.push('Selecionar bitola, tensão e classe térmica adequadas');
    return details;
  }

  // COFIBAM – Leads/espaguetes/cabos especiais
  if (brand === 'COFIBAM' || has(blob, /lead|lide|espaguete/)) {
    details.desc =
      'Condutores especiais (leads) e isolantes trançados (espaguetes) para ligação elétrica em motores e chicotes industriais, com foco em flexibilidade e desempenho dielétrico.';
    details.features.push(
      'Soluções sob medida para diferentes aplicações',
      'Variações de isolamento (PVC, borracha, silicone, fibra de vidro)'
    );
    details.applications.push(
      'Leads de motores, chicotes e automação',
      'Isolação local com espaguete'
    );
    details.notes.push('Confirmar composição do isolante e classe térmica');
    return details;
  }

  // CIFA Fios e Linhas – Barbante/fios/linhas
  if (brand === 'CIFA Fios e Linhas' || has(blob, /barbante|linha|fio/)) {
    details.desc =
      'Fios e linhas de alta tenacidade para amarração técnica e costura industrial, com excelente resistência à tração e à abrasão.';
    details.features.push('Alta resistência mecânica', 'Estabilidade dimensional');
    details.applications.push('Amarração técnica em bobinagem', 'Costura técnica e manutenção');
    details.notes.push('Selecione o título/espessura adequado ao processo');
    return details;
  }

  // COBIX – Solda
  if (brand === 'COBIX' || has(blob, /solda|estanho/)) {
    details.desc =
      'Liga de solda e consumíveis para soldagem eletrônica, com boa molhabilidade e baixa formação de escória, voltada a conexões confiáveis.';
    details.features.push('Boa fluidez e molhabilidade', 'Composição balanceada para eletrônica');
    details.applications.push('Soldagem de terminais, cabos e placas', 'Manutenção elétrica');
    details.notes.push('Utilizar fluxo apropriado e controle térmico adequado');
    return details;
  }

  // NSK / HCH – Rolamentos
  if (brand === 'NSK' || brand === 'HCH' || has(blob, /rolamento|bearing/)) {
    const bh = parseBearingHints(`${product?.title || ''} ${product?.slug || ''}`);
    details.desc =
      'Rolamento rígido de esferas para cargas radiais e axiais moderadas, com baixo atrito e operação em altas rotações. Opções com blindagem metálica (ZZ) ou vedação em borracha (2RS).';
    details.features.push(
      'Geometria de pistas para alto giro e baixo ruído',
      'Dimensões conforme séries ISO (60xx, 62xx, 63xx)',
      ...bh
    );
    details.applications.push('Motores, ventiladores e bombas', 'Máquinas industriais gerais');
    details.notes.push('Conferir folga interna (C3) e tipo de vedação conforme aplicação');
    return details;
  }

  // IGUI / JACUZZI – Piscinas
  if (brand === 'IGUI' || brand === 'JACUZZI' || has(blob, /piscina|hidromassagem|filtro|bomba/)) {
    details.desc =
      'Componente/reposição para sistemas de piscina, desenvolvido para manter a performance e a compatibilidade com o conjunto original do fabricante.';
    details.features.push('Materiais adequados a ambientes úmidos/chlorados', 'Foco em durabilidade');
    details.applications.push('Circulação e filtragem', 'Bombas e hidromassagem');
    details.notes.push('Verificar o modelo exato para compatibilidade');
    return details;
  }

  // Fallback genérico
  details.desc =
    'Componente técnico para aplicação industrial, com foco em confiabilidade e compatibilidade dimensional. Para especificação precisa, consulte a placa do equipamento e a ficha do produto.';
  details.features.push('Construção robusta', 'Compatibilidade dimensional', 'Foco em durabilidade');
  details.applications.push('Integração em conjuntos eletromecânicos', 'Reposição/manutenção');
  details.notes.push('Em caso de dúvida, consulte nosso time técnico');
  return details;
}
