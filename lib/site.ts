export const SITE = {
  name: 'Polus Eletrotécnica',
  description: "Catálogo técnico de peças para motores elétricos e bombas d'água.",
  instagram: 'https://www.instagram.com/_poluseletrotecnica/',
  address: 'R. José Maria Castelo Prado, 13 - Ayrosa, Osasco - SP, 06290-130',
  whatsappNumberIntl: '+551135992935',
  email: 'poluseletrotecnica@hotmail.com',
  cnpj: '05.886.392/0001-51',
  whatsappMessage(productTitle?: string): string {
    const base = productTitle
      ? `Olá! Gostaria de consultar/cotar o produto: ${productTitle}`
      : 'Olá! Gostaria de uma cotação.';
    return encodeURIComponent(base);
  },
  whatsappHref(productTitle?: string): string {
    const number = this.whatsappNumberIntl.replace('+','');
    const text = this.whatsappMessage(productTitle);
    return `https://wa.me/${number}?text=${text}`;
  },
  mapsEmbed: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || 'https://www.google.com/maps?q=-23.516861,-46.770811&z=16&output=embed'
} as const;
