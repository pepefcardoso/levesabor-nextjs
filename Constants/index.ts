export const NAV_LINKS = [
  { href: "/recipes", key: "recipes", label: "Receitas" },
  { href: "/posts", key: "blog", label: "Blog" },
  { href: "/about", key: "about", label: "Sobre nós" },
  { href: "/contact", key: "contact", label: "Contato" },
];

export const FOOTER_LINKS = [
  { href: "/", key: "privacy", label: "Política de Privacidade" },
  { href: "/", key: "terms", label: "Termos de Uso" },
  { href: "/advertisement", key: "ads", label: "Anuncie Conosco" },
];

const defaultRecipeImageSrc = "/food-sample1.jpg";
const defaultAuthorImageSrc = "/avatar-sample1.jpg";
const defaultPostImageSrc = "/post-sample1.jpg";

export const DUMMY_RECIPES = [
  {
    id: 1,
    title: "Bolo de Maracujá",
    description:
      "Um bolo de maracujá delicioso, sem glúten e lactose, numa receita rápida e prática.",
    imageSrc: defaultRecipeImageSrc,
    diets: ["Sem Glúten", "Sem Lactose", "Diet", "Vegetariana"],
    category: "Bolos",
    steps: ["Juntar os ingredientes secos", "Adicionar os líquidos", "Assar"],
    ingredients: ["Farinha de arroz", "Açúcar", "Maracujá", "Leite de coco"],
    author: "Maria Silva",
    authorImageSrc: defaultAuthorImageSrc,
    time: "1h",
    difficulty: "Fácil",
    portions: "12",
  },
  {
    id: 2,
    title: "Risoto de Cogumelos",
    description:
      "Um risoto cremoso com cogumelos frescos e parmesão, perfeito para um jantar especial.",
    imageSrc: defaultRecipeImageSrc,
    diets: ["Vegetariana"],
    category: "Pratos Principais",
    steps: [
      "Refogar cebola e alho na manteiga",
      "Adicionar o arroz e o caldo aos poucos",
      "Misturar os cogumelos e finalizar com parmesão",
    ],
    ingredients: [
      "Arroz arbóreo",
      "Cogumelos frescos",
      "Caldo de legumes",
      "Parmesão",
    ],
    author: "Carlos Pereira",
    authorImageSrc: defaultAuthorImageSrc,
    time: "40min",
    difficulty: "Média",
    portions: "4",
  },
  {
    id: 3,
    title: "Salada de Quinoa com Legumes",
    description:
      "Uma salada nutritiva e refrescante, feita com quinoa, legumes e temperos frescos.",
    imageSrc: defaultRecipeImageSrc,
    diets: ["Sem Glúten", "Vegana"],
    category: "Saladas",
    steps: [
      "Cozinhar a quinoa e deixar esfriar",
      "Picar os legumes e misturar",
      "Temperar com azeite, limão e ervas frescas",
    ],
    ingredients: [
      "Quinoa",
      "Tomate cereja",
      "Pepino",
      "Azeite de oliva",
      "Salsinha",
    ],
    author: "Ana Costa",
    authorImageSrc: defaultAuthorImageSrc,
    time: "30min",
    difficulty: "Fácil",
    portions: "3",
  },
  {
    id: 4,
    title: "Torta de Limão Low Carb",
    description:
      "Uma torta deliciosa e saudável, feita com ingredientes low carb e sem açúcar.",
    imageSrc: defaultRecipeImageSrc,
    diets: ["Sem Glúten", "Low Carb"],
    category: "Sobremesas",
    steps: [
      "Preparar a base com farinha de amêndoas",
      "Fazer o creme com limão e leite de coco",
      "Montar e levar à geladeira",
    ],
    ingredients: [
      "Farinha de amêndoas",
      "Limão",
      "Leite de coco",
      "Adoçante natural",
    ],
    author: "Juliana Ribeiro",
    authorImageSrc: defaultAuthorImageSrc,
    time: "2h",
    difficulty: "Fácil",
    portions: "8",
  },
  {
    id: 5,
    title: "Sopa de Lentilha com Especiarias",
    description:
      "Uma sopa reconfortante e cheia de sabor, ideal para dias mais frios.",
    imageSrc: defaultRecipeImageSrc,
    diets: ["Vegana", "Sem Lactose"],
    category: "Sopas",
    steps: [
      "Refogar cebola, alho e especiarias",
      "Adicionar lentilhas e o caldo",
      "Cozinhar até as lentilhas ficarem macias",
    ],
    ingredients: [
      "Lentilhas",
      "Cebola",
      "Alho",
      "Caldo de legumes",
      "Cominho",
      "Gengibre",
    ],
    author: "Roberto Lima",
    authorImageSrc: defaultAuthorImageSrc,
    time: "1h",
    difficulty: "Fácil",
    portions: "6",
  },
];

export const DUMMY_POSTS = [
  {
    id: 1,
    title: "Dicas para celíacos",
    description:
      "Vamos ajudar quem descobriu-se celíaco a pouco tempo e não sabe por onde começar",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies. Nullam nec pur",
    imageSrc: defaultPostImageSrc,
    author: "Maria Silva",
    authorImageSrc: defaultAuthorImageSrc,
    postDate: "2021-10-10",
    category: "Doença Celíaca",
  },
  {
    id: 2,
    title: "Receitas sem glúten para o dia a dia",
    description:
      "Explore ideias práticas e deliciosas para preparar refeições sem glúten.",
    content:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet felis id nisi",
    imageSrc: defaultPostImageSrc,
    author: "João Pereira",
    authorImageSrc: defaultAuthorImageSrc,
    postDate: "2021-11-15",
    category: "Receitas",
  },
  {
    id: 3,
    title: "Alimentos que você não sabia que contêm glúten",
    description:
      "Descubra produtos que parecem seguros, mas podem conter glúten escondido.",
    content:
      "Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    imageSrc: defaultPostImageSrc,
    author: "Ana Costa",
    authorImageSrc: defaultAuthorImageSrc,
    postDate: "2021-12-01",
    category: "Informação",
  },
  {
    id: 4,
    title: "Dicas de restaurantes para celíacos",
    description:
      "Saiba como encontrar lugares seguros para comer fora de casa.",
    content:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum",
    imageSrc: defaultPostImageSrc,
    author: "Carlos Almeida",
    authorImageSrc: defaultAuthorImageSrc,
    postDate: "2022-01-05",
    category: "Guia",
  },
  {
    id: 5,
    title: "O impacto da contaminação cruzada",
    description:
      "Entenda a importância de evitar a contaminação cruzada para quem tem restrições alimentares.",
    content:
      "Curabitur blandit tempus porttitor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio",
    imageSrc: defaultPostImageSrc,
    author: "Fernanda Rocha",
    authorImageSrc: defaultAuthorImageSrc,
    postDate: "2022-02-20",
    category: "Saúde",
  },
];

const DUMMY_POST_CATEGORY_IMAGE_SRC = "/post-sample1.jpg";
export const DUMMY_POST_CATEGORIES = [
  {
    id: "1",
    title: "Doença Celíaca",
    imageSrc: DUMMY_POST_CATEGORY_IMAGE_SRC,
  },
  {
    id: "2",
    title: "Intolerância à Lactose",
    imageSrc: DUMMY_POST_CATEGORY_IMAGE_SRC,
  },
  {
    id: "3",
    title: "Receitas Sem Glúten",
    imageSrc: DUMMY_POST_CATEGORY_IMAGE_SRC,
  },
  {
    id: "4",
    title: "Sobremesas Sem Glúten e Lactose",
    imageSrc: DUMMY_POST_CATEGORY_IMAGE_SRC,
  },
  {
    id: "5",
    title: "Lanches Saudáveis",
    imageSrc: DUMMY_POST_CATEGORY_IMAGE_SRC,
  },
  {
    id: "6",
    title: "Dieta Sem Glúten",
    imageSrc: DUMMY_POST_CATEGORY_IMAGE_SRC,
  },
];

const DUMMY_RECIPE_CATEGORY_IMAGE_SRC = "/post-sample1.jpg";
export const DUMMY_RECIPE_CATEGORIES = [
  {
    id: "1",
    title: "Doença Celíaca",
    imageSrc: DUMMY_RECIPE_CATEGORY_IMAGE_SRC,
  },
  {
    id: "2",
    title: "Intolerância à Lactose",
    imageSrc: DUMMY_RECIPE_CATEGORY_IMAGE_SRC,
  },
  {
    id: "3",
    title: "Receitas Sem Glúten",
    imageSrc: DUMMY_RECIPE_CATEGORY_IMAGE_SRC,
  },
  {
    id: "4",
    title: "Sobremesas Sem Glúten e Lactose",
    imageSrc: DUMMY_RECIPE_CATEGORY_IMAGE_SRC,
  },
  {
    id: "5",
    title: "Lanches Saudáveis",
    imageSrc: DUMMY_RECIPE_CATEGORY_IMAGE_SRC,
  },
  {
    id: "6",
    title: "Dieta Sem Glúten",
    imageSrc: DUMMY_RECIPE_CATEGORY_IMAGE_SRC,
  },
];

const DUMMY_RECIPE_DIET_IMAGE_SRC = "/post-sample1.jpg";
export const DUMMY_RECIPE_DIETS = [
  {
    id: "1",
    title: "Doença Celíaca",
    imageSrc: DUMMY_RECIPE_DIET_IMAGE_SRC,
  },
  {
    id: "2",
    title: "Intolerância à Lactose",
    imageSrc: DUMMY_RECIPE_DIET_IMAGE_SRC,
  },
  {
    id: "3",
    title: "Receitas Sem Glúten",
    imageSrc: DUMMY_RECIPE_DIET_IMAGE_SRC,
  },
  {
    id: "4",
    title: "Sobremesas Sem Glúten e Lactose",
    imageSrc: DUMMY_RECIPE_DIET_IMAGE_SRC,
  },
  {
    id: "5",
    title: "Lanches Saudáveis",
    imageSrc: DUMMY_RECIPE_DIET_IMAGE_SRC,
  },
  {
    id: "6",
    title: "Dieta Sem Glúten",
    imageSrc: DUMMY_RECIPE_DIET_IMAGE_SRC,
  },
];
