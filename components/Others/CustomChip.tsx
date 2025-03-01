import React from "react";
import { bgColors, BgColorType, txtColors, TxtColorType } from "../../constants/colors";

interface CustomChipProps {
  bgColor?: BgColorType;
  fontColor?: TxtColorType;
  text: string;
}

const CustomChip: React.FC<CustomChipProps> = ({
  bgColor = bgColors.erin,
  fontColor = txtColors.white,
  text,
}) => {
  const chipClasses = [
    "text-xs",
    "font-semibold",
    "px-3",
    "py-1",
    "rounded-lg",
    "shadow-md",
    bgColor,
    fontColor,
  ].join(" ");

  return <span className={chipClasses}>{text}</span>;
};

export default CustomChip;
