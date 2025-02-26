import routes from "../routes/routes";

export const NAV_LINKS = [
  { href: routes.recipes.index, key: "recipes", label: "Receitas" },
  { href: routes.posts.index, key: "blog", label: "Blog" },
  { href: routes.about, key: "about", label: "Sobre nós" },
  { href: routes.contact, key: "contact", label: "Contato" },
];

export const FOOTER_LINKS = [
  { href: routes.privacy, key: "privacy", label: "Política de Privacidade" },
  { href: routes.terms, key: "terms", label: "Termos de Uso" },
  { href: routes.advertisement, key: "ads", label: "Anuncie Conosco" },
];
