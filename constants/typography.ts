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
  // Headings & Titles
  //ok
  Display: clsx(
    fontSizes.xl4,
    fontWeights.bold,
    `sm:${fontSizes.xl5}`,
    `md:${fontSizes.xl6}`,
    `lg:${fontSizes.xl7}`,
    `sm:${fontWeights.extrabold}`,
    `lg:${fontWeights.black}`
  ),

  Headline: clsx(
    fontSizes.xl3,
    fontWeights.bold,
    `sm:${fontSizes.xl3}`,
    `md:${fontSizes.xl4}`,
    `lg:${fontSizes.xl5}`,
    `md:${fontWeights.bold}`,
    `lg:${fontWeights.extrabold}`
  ),

  //ok
  Title: clsx(
    fontSizes.xl2,
    fontWeights.semibold,
    `sm:${fontSizes.xl2}`,
    `md:${fontSizes.xl3}`,
    `lg:${fontSizes.xl4}`,
    `md:${fontWeights.semibold}`,
    `lg:${fontWeights.bold}`
  ),

  //ok
  Subtitle: clsx(
    fontSizes.lg,
    fontWeights.medium,
    `sm:${fontSizes.lg}`,
    `md:${fontSizes.xl}`,
    `lg:${fontSizes.xl2}`,
    `md:${fontWeights.medium}`,
    `lg:${fontWeights.semibold}`
  ),

  // Body & Paragraphs
  Body: clsx(
    fontSizes.base,
    fontWeights.normal,
    `sm:${fontSizes.lg}`,
    `md:${fontSizes.xl}`,
    `lg:${fontSizes.xl2}`,
    `md:${fontWeights.medium}`,
    `lg:${fontWeights.semibold}`
  ),

  //ok
  Caption: clsx(
    fontSizes.sm,
    fontWeights.light,
    `sm:${fontSizes.base}`,
    `md:${fontSizes.base}`,
    `lg:${fontSizes.lg}`,
    `md:${fontWeights.light}`,
    `lg:${fontWeights.normal}`
  ),

  Footnote: clsx(
    fontSizes.xs,
    fontWeights.light,
    `sm:${fontSizes.sm}`,
    `md:${fontSizes.base}`,
    `lg:${fontSizes.lg}`,
    `md:${fontWeights.normal}`,
    `lg:${fontWeights.medium}`
  ),

  Quote: clsx(
    fontSizes.lg,
    fontWeights.light,
    `sm:${fontSizes.xl}`,
    `md:${fontSizes.xl2}`,
    `lg:${fontSizes.xl3}`,
    `md:${fontWeights.normal}`,
    `lg:${fontWeights.medium}`
  ),

  // UI & Interactive Elements
  //ok
  Button: clsx(
    fontSizes.lg,
    fontWeights.medium,
    `sm:${fontSizes.lg}`,
    `md:${fontSizes.xl}`,
    `lg:${fontSizes.xl}`,
    `md:${fontWeights.semibold}`,
    `lg:${fontWeights.semibold}`
  ),

  Label: clsx(
    fontSizes.sm,
    fontWeights.medium,
    `sm:${fontSizes.base}`,
    `md:${fontSizes.lg}`,
    `lg:${fontSizes.xl}`,
    `md:${fontWeights.semibold}`,
    `lg:${fontWeights.bold}`
  ),

  Tag: clsx(
    fontSizes.xs,
    fontWeights.semibold,
    `sm:${fontSizes.sm}`,
    `md:${fontSizes.base}`,
    `lg:${fontSizes.lg}`,
    `md:${fontWeights.bold}`,
    `lg:${fontWeights.extrabold}`
  ),

  Helper: clsx(
    fontSizes.sm,
    fontWeights.light,
    `sm:${fontSizes.base}`,
    `md:${fontSizes.lg}`,
    `lg:${fontSizes.xl}`,
    `md:${fontWeights.normal}`,
    `lg:${fontWeights.normal}`
  ),

  Link: clsx(
    fontSizes.base,
    fontWeights.medium,
    `sm:${fontSizes.lg}`,
    `md:${fontSizes.xl}`,
    `lg:${fontSizes.xl2}`,
    `md:${fontWeights.semibold}`,
    `lg:${fontWeights.bold}`
  ),

  // Miscellaneous
  Overline: clsx(
    fontSizes.sm,
    fontWeights.semibold,
    `sm:${fontSizes.base}`,
    `md:${fontSizes.lg}`,
    `lg:${fontSizes.xl}`,
    `md:${fontWeights.bold}`,
    `lg:${fontWeights.extrabold}`
  ),

  Meta: clsx(
    fontSizes.xs,
    fontWeights.light,
    `sm:${fontSizes.sm}`,
    `md:${fontSizes.base}`,
    `lg:${fontSizes.lg}`,
    `md:${fontWeights.normal}`,
    `lg:${fontWeights.medium}`
  ),
};
