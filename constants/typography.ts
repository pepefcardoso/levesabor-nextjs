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
  Display: clsx(
    fontSizes.xl3,
    fontWeights.bold,
    `sm:${fontSizes.xl6}`,
    `md:${fontSizes.xl7}`,
    `lg:${fontSizes.xl8}`,
    `sm:${fontWeights.extrabold}`,
    `lg:${fontWeights.black}`
  ),

  Headline: clsx(
    fontSizes.xl2,
    fontWeights.semibold,
    `sm:${fontSizes.xl4}`,
    `md:${fontSizes.xl5}`,
    `lg:${fontSizes.xl6}`,
    `md:${fontWeights.bold}`,
    `lg:${fontWeights.extrabold}`
  ),

  Title: clsx(
    fontSizes.xl2,
    fontWeights.bold,
    `sm:${fontSizes.xl3}`,
    `md:${fontSizes.xl4}`,
    `lg:${fontSizes.xl5}`,
    `md:${fontWeights.semibold}`,
    `lg:${fontWeights.bold}`
  ),

  Subtitle: clsx(
    fontSizes.lg,
    fontWeights.normal,
    `sm:${fontSizes.xl2}`,
    `md:${fontSizes.xl3}`,
    `lg:${fontSizes.xl4}`,
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

  Caption: clsx(
    fontSizes.sm,
    fontWeights.light,
    `sm:${fontSizes.base}`,
    `md:${fontSizes.lg}`,
    `lg:${fontSizes.xl}`,
    `md:${fontWeights.normal}`,
    `lg:${fontWeights.medium}`
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
  Button: clsx(
    fontSizes.base,
    fontWeights.bold,
    `sm:${fontSizes.lg}`,
    `md:${fontSizes.xl}`,
    `lg:${fontSizes.xl2}`,
    `md:${fontWeights.extrabold}`,
    `lg:${fontWeights.black}`
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
    `lg:${fontWeights.medium}`
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
