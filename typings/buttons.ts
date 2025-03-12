export type TextButtonHoverType = (typeof TextButtonHovers)[keyof typeof TextButtonHovers];
export const TextButtonHovers = {
  underline: "hover:underline",
  scale: "hover:scale-105",
  bold: "hover:font-semibold",
  none: "",
} as const;

export type FilledButtonHoverType = (typeof FilledButtonHovers)[keyof typeof FilledButtonHovers];
export const FilledButtonHovers = {
  opacity: "hover:opacity-75",
  scale: "hover:scale-[1.05]",
  shadow: "hover:shadow-md",
  lift: "hover:-translate-y-0.6",
  glow: "hover:shadow-glow",
  none: "",
} as const;

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];
export const ButtonTypes = {
  submit: "submit",
  button: "button",
  reset: "reset",
} as const;
