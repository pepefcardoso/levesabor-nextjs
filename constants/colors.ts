export type BgColorType = (typeof bgColors)[keyof typeof bgColors];
export type TxtColorType = (typeof txtColors)[keyof typeof txtColors];
export type IconColorType = (typeof iconColors)[keyof typeof iconColors];

export const bgColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  background: "bg-background",
  white: "bg-white",
  black: "bg-black",
  transparent: "bg-transparent",
  gray500: "bg-gray-500",
} as const;

export const txtColors = {
  gray500: "text-gray-500",
  gray700: "text-gray-700",
  white: "text-white",
  black: "text-black",
} as const;

export const iconColors = {
  primary: "#A94A4A",
  secondary: "#F4D793",
  tertiary: "#889E73",
  white: "#FFFFFF",
  black: "#000000",
  red: "#EF4444",
  gray: "#6B7280",
  grayLight: "#9CA3AF",
} as const;

