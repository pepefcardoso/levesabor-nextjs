"use client";

import { ComponentType, SVGProps } from "react";
import { bgColors } from "../../constants/colors";
import { Typography } from "@/constants/typography";

export const IconBox = ({
    Icon,
}: {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) => (
    <div className={`flex items-center justify-center w-10 h-10  rounded-md shadow-md ${bgColors.secondary}`}>
        <Icon className={Typography.Title} />
    </div>
);