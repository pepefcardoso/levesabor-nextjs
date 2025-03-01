export type BgColorType = (typeof bgColors)[keyof typeof bgColors];
export type TxtColorType = (typeof txtColors)[keyof typeof txtColors];

export const bgColors = {
  lime: "bg-lime",
  erin: "bg-erin",
  pineapple: "bg-pineapple",
  gray200: "bg-gray-200",
  gray500: "bg-gray-500",
  gray800: "bg-gray-800",
};

export const txtColors = {
  gray200: "text-gray-200",
  gray500: "text-gray-500",
  gray800: "text-gray-800",
  white: "text-white",
  black: "text-black",
};
