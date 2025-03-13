"use client";

import { IconType } from "react-icons";
import { IconBox } from "./IconBox";
import { Typography } from "../../constants/typography";

export const IconTextItem = ({ icon, text }: { icon: IconType; text: string }) => (
  <div className="flex items-center space-x-3">
    <IconBox Icon={icon} /> 
    <span className={`${Typography.Subtitle}`}>{text}</span>
  </div>
);