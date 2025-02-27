import { FaChartLine, FaClock, FaEnvelope, FaInstagram, FaPen, FaPhone, FaSeedling, FaUsers } from "react-icons/fa";
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

export const DEV_LINK = "https://instagram.com/pepefcardoso";

export const ABOUT_US_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const ABOUT_US_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
];

export const ADVERTISEMENTS_ITEMS = [
  { icon: FaUsers, text: "+500 Usuários ativos por mês" },
  { icon: FaChartLine, text: "+2000 Acessos diários" },
  { icon: FaClock, text: "Exposição 24 horas, 7 dias" },
  { icon: FaSeedling, text: "Marketing orgânico" },
  { icon: FaPen, text: "Conteúdo relevante e atualizado" },
];

export const CONTACT_ITEMS = [
  { icon: FaPhone, text: "(48) 99634-5124" },
  { icon: FaInstagram, text: "@levesabor" },
  { icon: FaInstagram, text: "@levesabor" },
  { icon: FaEnvelope, text: "contato@levesabor.com.br" },
];