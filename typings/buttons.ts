export type TextButtonHoverType = (typeof TextButtonHovers)[keyof typeof TextButtonHovers];
export const TextButtonHovers = {
  underline: "hover:underline",
  scale: "hover:scale-[1.05]",
  bold: "hover:font-bold",
  none: "",
} as const;

export type FilledButtonHoverType = (typeof FilledButtonHovers)[keyof typeof FilledButtonHovers];
export const FilledButtonHovers = {
  opacity: "hover:opacity-75",
  scale: "hover:scale-[1.05]",
  shadow: "hover:shadow-md",
  none: "",
} as const;

export type FilledIconButtonHoverType = (typeof FilledIconButtonHovers)[keyof typeof FilledIconButtonHovers];
export const FilledIconButtonHovers = {
  opacity: "hover:opacity-75",
  scale: "hover:scale-[1.05]",
  shadow: "hover:shadow-md",
  none: "",
} as const;

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];
export const ButtonTypes = {
  submit: "submit",
  button: "button",
  reset: "reset",
} as const;
