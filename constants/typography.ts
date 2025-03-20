import clsx from "clsx";

export const fontSizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xl2: "text-2xl",
  xl3: "text-3xl",
  xl4: "text-4xl",
  xl5: "text-5xl",
  xl6: "text-6xl",
  xl7: "text-7xl",
  xl8: "text-8xl",
} as const;

export const fontWeights = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
} as const;

export type TypographyType = (typeof Typography)[keyof typeof Typography];

export const Typography = {
  // Headings
  Display: clsx(fontSizes.xl4, fontWeights.extrabold, `md:${fontSizes.xl5}`, `md:${fontWeights.black}`),
  Headline: clsx(fontSizes.xl2, fontWeights.bold, `md:${fontSizes.xl3}`, `md:${fontWeights.extrabold}`),
  Title: clsx(fontSizes.lg, fontWeights.medium, `md:${fontSizes.xl}`, `md:${fontWeights.bold}`),
  Subtitle: clsx(fontSizes.base, fontWeights.normal, `md:${fontSizes.lg}`, `md:${fontWeights.medium}`),

  // Body
  Body: clsx(fontSizes.base, fontWeights.normal, `md:${fontSizes.lg}`, `md:${fontWeights.normal}`),
  Caption: clsx(fontSizes.sm, fontWeights.normal, `md:${fontSizes.base}`, `md:${fontWeights.normal}`),
  Footnote: clsx(fontSizes.sm, fontWeights.light, `md:${fontSizes.base}`, `md:${fontWeights.normal}`),
  Quote: clsx(fontSizes.xs, fontWeights.thin, `md:${fontSizes.sm}`, `md:${fontWeights.light}`),

  // Interactive Elements
  Button: clsx(fontSizes.base, fontWeights.normal, `md:${fontSizes.lg}`, `md:${fontWeights.medium}`),
  Label: clsx(fontSizes.sm, fontWeights.normal, `md:${fontSizes.base}`, `md:${fontWeights.medium}`),
  Tag: clsx(fontSizes.sm, fontWeights.normal),
  Helper: clsx(fontSizes.sm, fontWeights.light, `md:${fontSizes.lg}`, `md:${fontWeights.normal}`),
  Link: clsx(fontSizes.base, fontWeights.medium, `md:${fontSizes.lg}`, `md:${fontWeights.semibold}`),
};
