export type Review = {
  name: string;
  avatar?: string;
  rating: number;
  text: string;
};

export const REVIEWS: Review[] = [
  { name: "Dos Anjos", avatar: "/reviews/dos-anjos.png", rating:...es de produtos. Sou cliente a muitos anos, e super recomendo" },
  { name: "Rafael R. dos Santos", avatar: "/reviews/rafael-r-dos...dutos.\nNota 10 para atendente Fernanda.\nRecomendo a Todos." },
  { name: "Sandro Backschat", avatar: "/reviews/sandro-backschat...u certinho sobre as peças, muito gente boa !\nRecomendo !!!!" },
  { name: "Meire Polezi", avatar: "/reviews/meire-polezi.png", r...da me atendeu e esclareceu todas as minhas dúvidas. Parabéns" },
  { name: "Thalia Ariadna", avatar: "/reviews/thalia-ariadna.png...ativo! Me explicou muito bem sobre as peças, ótimo comércio!" },
  { name: "Renata _", avatar: "/reviews/renata_.png", rating: 5,...ernanda, sempre muito simpática e atenciosa com os clientes." },
  { name: "James Lourenço Gonçalves", avatar: "/reviews/james-lo...g: 5, text: "Ótimo atendimento e bons preços, super indico!!" },
  { name: "Darah Mendes", avatar: "/reviews/darah-mendes.png", r...i muito das peças e o atendimento impecavel da Fernanda 👏🏽 …" },
  { name: "Rodrigoyasmin Almeida", avatar: "/reviews/rodrigoyasm...5, text: "Ótimo atendimento da Fernanda super prestativa 👍 …" },
  { name: "Jorge dos Santos", avatar: "/reviews/jorge-dos-santos...text: "Excelente, empresa familiar, sabem o que estão fazendo" }
];


export const reviews = REVIEWS;
export default reviews;
