export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];
export const ButtonTypes = {
  submit: "submit",
  button: "button",
  reset: "reset",
} as const;

export type ButtonHoverType = (typeof ButtonHovers)[keyof typeof ButtonHovers];
export const ButtonHovers = {
  bold: "hover:font-bold",
  underline: "hover:underline",
  opacity: "hover:opacity-75",
  scale: "hover:scale-[1.05]",
  shadow: "hover:shadow-md",
  none: "",
} as const;
