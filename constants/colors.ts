export type BgColorType = (typeof bgColors)[keyof typeof bgColors];
export type TxtColorType = (typeof txtColors)[keyof typeof txtColors];
export type IconColorType = (typeof iconColors)[keyof typeof iconColors];

export const bgColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  background: "bg-background",
  gray200: "bg-gray-200",
  gray500: "bg-gray-500",
  gray800: "bg-gray-800",
  white: "bg-white",
  black: "bg-black",
} as const;

export const txtColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  background: "text-background",
  gray200: "text-gray-200",
  gray500: "text-gray-500",
  gray800: "text-gray-800",
  white: "text-white",
  black: "text-black",
} as const;

export const borderColors = {
  primary: "border-primary",
  secondary: "border-secondary",
  tertiary: "border-tertiary",
} as const;

export const ringColors = {
  primary: "ring-primary",
  secondary: "ring-secondary",
  tertiary: "ring-tertiary",
} as const;

export const iconColors = {
  primary: "#A94A4A",
  secondary: "#F4D793",
  tertiary: "#889E73",
  white: "#FFFFFF",
  black: "#000000",
} as const;
