import React from "react";
import { bgColors, BgColorType, txtColors, TxtColorType } from "../../constants/colors";
import { Typography, TypographyType } from "@/constants/typography";
import clsx from "clsx";

interface CustomChipProps {
  bgColor?: BgColorType;
  fontColor?: TxtColorType;
  typography?: TypographyType;
  text: string;
}

const CustomChip: React.FC<CustomChipProps> = ({
  bgColor = bgColors.tertiary,
  fontColor = txtColors.black,
  typography = Typography.Body3,
  text,
}) => {
  return <span className={clsx(bgColor, fontColor, typography, "px-2 py-1 rounded-md shadow-sm")}>{text}</span>;
};

export default CustomChip;
