export type TypographyType = (typeof Typography)[keyof typeof Typography];

export const Typography = {
  h1: "text-2xl sm:text-3xl font-bold my-4 leading-tight",
  h2: "text-lg sm:text-xl font-bold my-2 line-clamp-2",
  h3: "text-base sm:text-lg font-semibold my-3",
  h4: "text-sm sm:text-base font-semibold my-2",
  h5: "text-xs sm:text-sm font-semibold my-1",
  h6: "text-sm font-semibold",
  body: "text-sm leading-relaxed",
  subtitle: "text-xs sm:text-sm font-medium italic",
  caption: "text-xs leading-snug",
  overline: "text-xs uppercase tracking-widest",
  button: "text-sm font-semibold uppercase tracking-wide",
  link: "text-sm font-medium underline hover:text-primary transition-colors",
  summary: "text-sm line-clamp-3 h-[4.5rem] overflow-hidden",
};
