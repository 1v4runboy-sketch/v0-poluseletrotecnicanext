export type Review = {
  name: string;
  avatar: string;
  rating: number;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Dos Anjos",
    avatar: "/reviews/dos-anjos.png",
    rating: 5,
    text: "Atendimento maravilhoso e ágil, preços justos e com diversidades de produtos. Sou cliente a muitos anos, e super recomendo"
  },
  {
    name: "Rafael R. dos Santos",
    avatar: "/reviews/rafael-r-dos-santos.png",
    rating: 5,
    text: "Ótima Empresa\nAtendimento rápido, boa organização dos produtos.\nNota 10 para atendente Fernanda.\nRecomendo a Todos."
  },
  {
    name: "Sandro Backschat",
    avatar: "/reviews/sandro-backschat.png",
    rating: 5,
    text: "Ótimo atendimento, empresa cumpre o que promete !\nFernanda me explicou certinho sobre as peças, muito gente boa !\nRecomendo !!!!"
  },
  {
    name: "Meire Polezi",
    avatar: "/reviews/meire-polezi.png",
    rating: 5,
    text: "Preço muito bom e atendimento nota 10  .\nA atendente Fernanda me atendeu e esclareceu todas as minhas dúvidas. Parabéns"
  },
  {
    name: "Thalia Ariadna",
    avatar: "/reviews/thalia-ariadna.png",
    rating: 5,
    text: "Atendente Heitor super prestativo! Me explicou muito bem sobre as peças, ótimo comércio!"
  },
  {
    name: "Renata _",
    avatar: "/reviews/renata_.png",
    rating: 5,
    text: "Avaliando principalmente pelo atendimento da Fernanda, sempre muito simpática e atenciosa com os clientes."
  },
  {
    name: "James Lourenço Gonçalves",
    avatar: "/reviews/james-lourenco-goncalves.png",
    rating: 5,
    text: "Ótimo atendimento e bons preços, super indico!!"
  },
  {
    name: "Darah Mendes",
    avatar: "/reviews/darah-mendes.png",
    rating: 5,
    text: "gostei muito das peças e o atendimento impecavel da Fernanda 👏🏽 …"
  },
  {
    name: "Rodrigoyasmin Almeida",
    avatar: "/reviews/rodrigoyasmin-almeida.png",
    rating: 5,
    text: "Ótimo atendimento da Fernanda super prestativa 👍 …"
  },
  {
    name: "Jorge dos Santos",
    avatar: "/reviews/jorge-dos-santos.png",
    rating: 5,
    text: "Excelente, empresa familiar, sabem o que estão fazendo"
  }
];

export default REVIEWS;
