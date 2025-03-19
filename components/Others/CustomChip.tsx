import React from "react";
import { bgColors, BgColorType, txtColors, TxtColorType } from "../../constants/colors";
import { Typography, TypographyType } from "@/constants/typography";
import clsx from "clsx";

interface CustomChipProps {
  bgColor?: BgColorType;
  fontColor?: TxtColorType;
  typography?: TypographyType;
  text: string;
  className?: string;
}

const CustomChip: React.FC<CustomChipProps> = ({
  bgColor = bgColors.tertiary,
  fontColor = txtColors.black,
  typography = Typography.Tag,
  text,
  className,
}) => {
  return <span className={clsx(className, bgColor, fontColor, typography, "px-2 py-1 rounded-md shadow-sm")}>{text}</span>;
};

export default CustomChip;
