const fontSizes = {
  // xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xl2: "text-2xl",
  xl3: "text-3xl",
  xl4: "text-4xl",
  // xl5: "text-5xl",
  // xl6: "text-6xl",
  // xl7: "text-7xl",
  // xl8: "text-8xl",
} as const;

const fontWeights = {
  // thin: "font-thin",
  // extralight: "font-extralight",
  // light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  // extrabold: "font-extrabold",
  // black: "font-black",
} as const;

export type TypographyType = (typeof Typography)[keyof typeof Typography];

export const Typography = {
  Title: `${fontSizes.xl2} sm:${fontSizes.xl4} ${fontWeights.bold}`,
  Title2: `${fontSizes.lg} sm:${fontSizes.xl} ${fontWeights.bold}`,
  Body: `${fontSizes.base} sm:${fontSizes.lg} ${fontWeights.normal}`,
  Body2: `${fontSizes.sm} sm:${fontSizes.base} ${fontWeights.normal}`,
  Body3:`${fontSizes.sm} ${fontWeights.medium}`,
  Button: `${fontSizes.sm} sm:${fontSizes.base} ${fontWeights.medium}`,
  Link: `${fontSizes.base} sm:${fontSizes.lg} ${fontWeights.medium}`,
  Link2: `${fontSizes.sm} sm:${fontSizes.base} ${fontWeights.normal}`,
};
