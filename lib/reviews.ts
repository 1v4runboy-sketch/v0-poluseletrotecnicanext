export type Review = {
  name: string;
  avatar?: string;
  rating: number; // 1..5
  text: string;
};

/**
 * Avatares exatamente como estão dentro de /public/reviews/ (conforme seu print).
 * Se quiser trocar os textos, pode editar só o campo "text".
 */
export const reviews: Review[] = [
  { name: "Dos Anjos",                avatar: "/reviews/dos-anjos.png",                   rating: 5, text: "Atendimento excelente e rápido. Recomendo a Polus!" },
  { name: "Rafael R. dos Santos",     avatar: "/reviews/rafael-r-dos-santos.png",         rating: 5, text: "Muito bem atendido. Ótimos preços e variedade." },
  { name: "Sandro Backschat",         avatar: "/reviews/sandro-backschat.png",            rating: 5, text: "Equipe atenciosa, tirou minhas dúvidas certinho." },
  { name: "Meire Polezi",             avatar: "/reviews/meire-polezi.png",                rating: 4, text: "Fui bem atendida e as peças chegaram no prazo." },
  { name: "Thalia Ariadna",           avatar: "/reviews/thalia-ariadna.png",              rating: 5, text: "Explicaram muito bem as peças. Ótimo comércio!" },
  { name: "Renata",                   avatar: "/reviews/renata_.png",                     rating: 5, text: "Sempre muito simpáticos e atenciosos com os clientes." },
  { name: "James Lourenço Gonçalves", avatar: "/reviews/james-lourenco-goncalves.png",    rating: 5, text: "Ótimo atendimento e bons preços. Indico!" },
  { name: "Darah Mendes",             avatar: "/reviews/darah-mendes.png",                rating: 5, text: "Gostei muito das peças e do atendimento impecável." },
  { name: "Rodrigoyasmin Almeida",    avatar: "/reviews/rodrigoyasmin-almeida.png",       rating: 5, text: "Super prestativos, resolveram meu problema rápido." },
  { name: "Jorge dos Santos",         avatar: "/reviews/jorge-dos-santos.png",            rating: 5, text: "Excelente empresa, equipe sabe o que está fazendo." }
];

export default reviews;
